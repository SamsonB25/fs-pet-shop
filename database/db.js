import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "samson",
  host: "127.0.0.1",
  database: "pet_shop",
  password: "samson",
  port: 5432,
});

export default pool;
