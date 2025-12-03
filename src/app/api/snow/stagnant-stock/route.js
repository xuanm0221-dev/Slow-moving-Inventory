import { NextResponse } from "next/server";

export const runtime = "nodejs";

const snowflake = require("snowflake-sdk");

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const yyyymm = searchParams.get("yyyymm") || "202510";
  const brdCd = searchParams.get("brdCd") || "M"; // M=MLB, I=MLB KIDS, X=DISCOVERY
  const channel = searchParams.get("channel") || "ALL"; // ALL, FR, OR

  const connection = snowflake.createConnection({
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USERNAME,
    password: process.env.SNOWFLAKE_PASSWORD,
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
    database: process.env.SNOWFLAKE_DATABASE,
    schema: process.env.SNOWFLAKE_SCHEMA,
    role: process.env.SNOWFLAKE_ROLE,
  });

  return new Promise((resolve) => {
    connection.connect((err) => {
      if (err) {
        console.error("Snowflake connection error:", err);
        resolve(
          NextResponse.json({ error: err.message }, { status: 500 })
        );
        return;
      }

      // USE DATABASE 문 제거하고 fully qualified name 사용
      const sql = `
        WITH PARAM AS (
            SELECT 'CY'      AS DIV
                 , '${yyyymm}'  AS STD_YYYYMM
                 , '${brdCd}'       AS BRD_CD
        )
        , item AS (
            SELECT  prdt_cd
                  , sesn
                  , CASE 
                        WHEN prdt_hrrc1_nm = 'ACC' AND prdt_hrrc2_nm = 'Headwear' THEN '모자'
                        WHEN prdt_hrrc1_nm = 'ACC' AND prdt_hrrc2_nm = 'Shoes'    THEN '신발'
                        WHEN prdt_hrrc1_nm = 'ACC' AND prdt_hrrc2_nm = 'Bag'      THEN '가방'
                        WHEN prdt_hrrc1_nm = 'ACC' AND prdt_hrrc2_nm = 'Acc_etc'  THEN '기타'
                    END AS item_std
            FROM fnf.sap_fnf.mst_prdt
            WHERE prdt_hrrc1_nm = 'ACC'
        )
        , item_seq AS (
            SELECT '신발' AS item_std, 1 AS seq
            UNION ALL SELECT '모자', 2
            UNION ALL SELECT '가방', 3
            UNION ALL SELECT '기타', 4
        )
        , SALE_1M AS (
            SELECT  a.brd_cd
                  , p.div
                  , p.STD_YYYYMM            AS yyyymm
                  , c.fr_or_cls             AS channel
                  , a.prdt_cd
                  , i.item_std
                  , SUM(a.sale_amt)         AS sale_amt
            FROM fnf.chn.dm_sh_s_m a
            JOIN PARAM p
              ON a.yymm   = p.STD_YYYYMM
             AND a.brd_cd = p.BRD_CD
            JOIN fnf.chn.dw_shop_wh_detail c
              ON a.shop_id = c.oa_map_shop_id
            JOIN item i
              ON a.prdt_cd = i.prdt_cd
            GROUP BY a.brd_cd, p.div, p.STD_YYYYMM, c.fr_or_cls, a.prdt_cd, i.item_std
        )
        , STOCK AS (
            SELECT  a.brd_cd
                  , p.div
                  , p.STD_YYYYMM                  AS yyyymm
                  , b.fr_or_cls                   AS channel
                  , a.prdt_cd
                  , i.item_std
                  , SUM(a.STOCK_TAG_AMT_EXPECTED) AS end_stock_tag_amt
            FROM fnf.chn.dw_stock_m a
            JOIN fnf.chn.dw_shop_wh_detail b
              ON a.shop_id = b.oa_map_shop_id
            JOIN PARAM p
              ON a.yymm   = p.STD_YYYYMM
             AND a.brd_cd = p.BRD_CD
            JOIN item i
              ON a.PRDT_CD = i.PRDT_CD
            GROUP BY a.brd_cd, p.div, p.STD_YYYYMM, b.fr_or_cls, a.prdt_cd, i.item_std
        )
        , BASE AS (
            SELECT  
                  a.yyyymm                  AS yyyymm
                , a.brd_cd                  AS brd_cd
                , a.channel                 AS channel
                , i.item_std                AS item_std
                , i.prdt_cd                 AS prdt_cd
                , i.sesn                    AS sesn
                , SUM(b.end_stock_tag_amt)  AS end_stock_tag_amt
                , SUM(a.sale_amt)           AS sale_amt
            FROM SALE_1M a
            JOIN STOCK b
              ON a.brd_cd   = b.brd_cd
             AND a.div      = b.div
             AND a.channel  = b.channel
             AND a.prdt_cd  = b.prdt_cd
             AND a.yyyymm   = b.yyyymm
            JOIN item i
              ON a.prdt_cd = i.prdt_cd
            JOIN item_seq s
              ON i.item_std = s.item_std
            WHERE a.div = 'CY'
            GROUP BY a.yyyymm, a.brd_cd, a.channel, i.item_std, s.seq, i.prdt_cd, i.sesn
        )
        , RATIO AS (
            SELECT
                  yyyymm
                , brd_cd
                , channel
                , item_std
                , prdt_cd
                , sesn
                , COALESCE(sale_amt, 0)          AS sale_amt
                , end_stock_tag_amt
                , SUM(end_stock_tag_amt) OVER (
                      PARTITION BY yyyymm, brd_cd, channel, item_std
                  ) AS mid_end_stock_amt
            FROM BASE
        )
        SELECT
              yyyymm
            , brd_cd
            , channel
            , item_std
            , prdt_cd
            , sesn
            , sale_amt
            , end_stock_tag_amt
            , mid_end_stock_amt
            , CASE 
                WHEN mid_end_stock_amt = 0 THEN NULL
                ELSE sale_amt / mid_end_stock_amt
              END AS sale_ratio_mid_stock
            , CASE 
                WHEN mid_end_stock_amt = 0 THEN '정상재고'
                WHEN sale_amt / mid_end_stock_amt < 0.0001 THEN '정체재고'
                ELSE '정상재고'
              END AS stock_status
        FROM RATIO
        ORDER BY yyyymm, brd_cd, item_std, channel, prdt_cd
      `;

      connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
          if (err) {
            console.error("Snowflake query error:", err);
            connection.destroy();
            resolve(
              NextResponse.json({ error: err.message }, { status: 500 })
            );
            return;
          }
          
          try {
            // 채널 필터링
            let filteredRows = rows || [];
            if (channel !== "ALL") {
              filteredRows = filteredRows.filter(row => row.CHANNEL === channel);
            }
            connection.destroy();
            resolve(NextResponse.json({ data: filteredRows }));
          } catch (filterErr) {
            console.error("Filter error:", filterErr);
            connection.destroy();
            resolve(
              NextResponse.json({ error: filterErr.message }, { status: 500 })
            );
          }
        },
      });
    });
  });
}
