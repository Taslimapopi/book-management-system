import { Pool } from "pg";

export const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_TXW6NK9pGCsZ@ep-spring-feather-bel194iv-pooler.c-9.us-east-2.aws.neon.tech/neondb?sslmode=false&channel_binding=require",
});

export const initDb = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) DEFAULT user,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()

        )
        
        `);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
