import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const snowflake = require("snowflake-sdk");

export async function GET() {
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
        resolve(
          NextResponse.json({ error: err.message }, { status: 500 })
        );
        return;
      }

      const sql =
        "SELECT CURRENT_ROLE(), CURRENT_USER(), CURRENT_DATABASE(), CURRENT_WAREHOUSE();";

      connection.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
          if (err) {
            resolve(
              NextResponse.json({ error: err.message }, { status: 500 })
            );
          } else {
            resolve(NextResponse.json({ data: rows }));
          }
        },
      });
    });
  });
}
