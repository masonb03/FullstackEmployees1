import pg from "pg";
import dotenv from "dotenv"
dotenv.config()

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost/fullstack_employees";


const db = new pg.Client({ connectionString });


export default db;
