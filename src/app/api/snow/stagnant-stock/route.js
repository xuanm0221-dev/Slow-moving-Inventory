import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const snowflake = require("snowflake-sdk");

export async function GET(request) {
  // 환경 변수 체크
  const requiredEnvVars = [
    'SNOWFLAKE_ACCOUNT',
    'SNOWFLAKE_USERNAME',
    'SNOWFLAKE_PASSWORD',
    'SNOWFLAKE_WAREHOUSE',
    'SNOWFLAKE_DATABASE',
    'SNOWFLAKE_SCHEMA',
    'SNOWFLAKE_ROLE'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    console.error("Missing environment variables:", missingVars);
    return NextResponse.json({ 
      error: `Missing environment variables: ${missingVars.join(', ')}`,
      details: "Please configure all required Snowflake environment variables in Vercel."
    }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const yyyymm = searchParams.get("yyyymm") || "202510";
  const brdCd = searchParams.get("brdCd") || "M"; // M=MLB, I=MLB KIDS, X=DISCOVERY
  const channel = searchParams.get("channel") || "ALL"; // ALL, FR, OR
  const productType = searchParams.get("productType") || "cd"; // "cd", "color", "size", "color_size", "scs" (호환성)

  // yyyymm을 날짜 범위로 변환 (예: "202510" → "2025-10-01" ~ "2025-10-31")
  const year = yyyymm.substring(0, 4);
  const month = yyyymm.substring(4, 6);
  const startDate = `${year}-${month}-01`;
  // 해당 월의 마지막 날짜 계산
  const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
  const endDate = `${year}-${month}-${String(lastDay).padStart(2, '0')}`;

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
        connection.destroy();
        resolve(
          NextResponse.json({ 
            error: err.message,
            details: "Failed to connect to Snowflake. Please check environment variables and network connectivity."
          }, { status: 500 })
        );
        return;
      }

      const sql = `
        WITH PARAM AS (
            SELECT 'CY'      AS DIV
                 , '${yyyymm}'  AS STD_YYYYMM
                 , '${brdCd}'       AS BRD_CD
                 , TRY_TO_DATE('${startDate}', 'YYYY-MM-DD') AS START_DATE
                 , TRY_TO_DATE('${endDate}', 'YYYY-MM-DD') AS END_DATE
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
              AND CASE 
                    WHEN prdt_hrrc1_nm = 'ACC' AND prdt_hrrc2_nm = 'Headwear' THEN '모자'
                    WHEN prdt_hrrc1_nm = 'ACC' AND prdt_hrrc2_nm = 'Shoes'    THEN '신발'
                    WHEN prdt_hrrc1_nm = 'ACC' AND prdt_hrrc2_nm = 'Bag'      THEN '가방'
                    WHEN prdt_hrrc1_nm = 'ACC' AND prdt_hrrc2_nm = 'Acc_etc'  THEN '기타'
                  END IN ('신발', '모자', '가방', '기타')
        )
        , item_seq AS (
            SELECT '신발' AS item_std, 1 AS seq
            UNION ALL SELECT '모자', 2
            UNION ALL SELECT '가방', 3
            UNION ALL SELECT '기타', 4
        )
        , SALE_1M AS (
            SELECT  s.brd_cd
                  , p.div
                  , p.STD_YYYYMM            AS yyyymm
                  , CASE 
                      WHEN d.fr_or_cls = 'HQ' THEN 'OR'
                      WHEN d.fr_or_cls IS NULL THEN 'UNKNOWN'
                      ELSE d.fr_or_cls
                    END AS channel
                  , s.prdt_cd
                  , s.color_cd
                  , s.size_cd
                  , s.prdt_scs_cd
                  , i.item_std
                  , SUM(s.tag_amt)           AS sale_amt
            FROM fnf.chn.DW_SALE s
            JOIN PARAM p
              ON s.SALE_DT >= p.START_DATE
             AND s.SALE_DT <= p.END_DATE
             AND s.brd_cd = p.BRD_CD
            LEFT JOIN fnf.chn.dw_shop_wh_detail d
              ON s.shop_id = d.oa_map_shop_id
            JOIN item i
              ON s.prdt_cd = i.prdt_cd
            WHERE i.item_std IN ('신발', '모자', '가방', '기타')
            GROUP BY s.brd_cd, p.div, p.STD_YYYYMM, 
                     CASE 
                       WHEN d.fr_or_cls = 'HQ' THEN 'OR'
                       WHEN d.fr_or_cls IS NULL THEN 'UNKNOWN'
                       ELSE d.fr_or_cls 
                     END, 
                     s.prdt_cd, s.color_cd, s.size_cd, s.prdt_scs_cd, i.item_std
        )
        , STOCK AS (
            SELECT  a.brd_cd
                  , p.div
                  , p.STD_YYYYMM                  AS yyyymm
                  , CASE 
                      WHEN b.fr_or_cls = 'HQ' THEN 'OR'
                      WHEN b.fr_or_cls IS NULL THEN 'UNKNOWN'
                      ELSE b.fr_or_cls
                    END AS channel
                  , a.prdt_cd
                  , a.color_cd
                  , a.size_cd
                  , a.prdt_scs_cd
                  , i.item_std
                  , i.sesn
                  , SUM(a.STOCK_TAG_AMT_EXPECTED) AS end_stock_tag_amt
                  , SUM(a.stock_qty_expected) AS end_stock_qty
            FROM fnf.chn.dw_stock_m a
            LEFT JOIN fnf.chn.dw_shop_wh_detail b
              ON a.shop_id = b.oa_map_shop_id
            JOIN PARAM p
              ON a.yymm   = p.STD_YYYYMM
             AND a.brd_cd = p.BRD_CD
            JOIN item i
              ON a.prdt_cd = i.prdt_cd
            WHERE i.item_std IN ('신발', '모자', '가방', '기타')
            GROUP BY a.brd_cd, p.div, p.STD_YYYYMM, 
                     CASE 
                       WHEN b.fr_or_cls = 'HQ' THEN 'OR'
                       WHEN b.fr_or_cls IS NULL THEN 'UNKNOWN'
                       ELSE b.fr_or_cls 
                     END, 
                     a.prdt_cd, a.color_cd, a.size_cd, a.prdt_scs_cd, i.item_std, i.sesn
        )
        , BASE AS (
            SELECT  
                  b.yyyymm                  AS yyyymm
                , b.brd_cd                  AS brd_cd
                , b.channel                 AS channel
                , b.item_std                AS item_std
                , CASE
                    WHEN '${productType}' = 'cd' THEN b.prdt_cd
                    WHEN '${productType}' = 'color' THEN b.color_cd
                    WHEN '${productType}' = 'size' THEN b.size_cd
                    WHEN '${productType}' = 'color_size' THEN CONCAT(b.color_cd, '-', b.size_cd)
                    WHEN '${productType}' = 'scs' THEN b.prdt_scs_cd
                    ELSE b.prdt_cd
                  END AS prdt_scs_cd
                , b.sesn                    AS sesn
                , SUM(b.end_stock_tag_amt)  AS end_stock_tag_amt
                , SUM(b.end_stock_qty)      AS end_stock_qty
                , COALESCE(SUM(a.sale_amt), 0) AS sale_amt
            FROM STOCK b
            LEFT JOIN SALE_1M a
              ON b.brd_cd   = a.brd_cd
             AND b.div      = a.div
             AND b.channel  = a.channel
             AND b.prdt_cd  = a.prdt_cd
             AND b.color_cd = a.color_cd
             AND b.size_cd = a.size_cd
             AND b.yyyymm   = a.yyyymm
             AND b.item_std = a.item_std
            JOIN item_seq s
              ON b.item_std = s.item_std
            WHERE b.div = 'CY'
              AND b.item_std IN ('신발', '모자', '가방', '기타')
            GROUP BY b.yyyymm, b.brd_cd, b.channel, b.item_std, s.seq, 
                     CASE
                       WHEN '${productType}' = 'cd' THEN b.prdt_cd
                       WHEN '${productType}' = 'color' THEN b.color_cd
                       WHEN '${productType}' = 'size' THEN b.size_cd
                       WHEN '${productType}' = 'color_size' THEN CONCAT(b.color_cd, '-', b.size_cd)
                       WHEN '${productType}' = 'scs' THEN b.prdt_scs_cd
                       ELSE b.prdt_cd
                     END, 
                     b.sesn
        )
        , RATIO AS (
            SELECT
                  yyyymm
                , brd_cd
                , channel
                , item_std
                , prdt_scs_cd
                , sesn
                , COALESCE(sale_amt, 0)          AS sale_amt
                , end_stock_tag_amt
                , end_stock_qty
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
            , prdt_scs_cd                    AS prdt_cd
            , sesn
            , sale_amt
            , end_stock_tag_amt
            , end_stock_qty
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
        ORDER BY yyyymm, brd_cd, item_std, channel, prdt_scs_cd
      `;

      connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
          if (err) {
            console.error("Snowflake query error:", err);
            console.error("SQL query:", sql);
            connection.destroy();
            resolve(
              NextResponse.json({ 
                error: err.message,
                sqlError: err.sqlState,
                sqlMessage: err.sqlMessage 
              }, { status: 500 })
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
