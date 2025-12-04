import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const snowflake = require("snowflake-sdk");

export async function GET() {
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
