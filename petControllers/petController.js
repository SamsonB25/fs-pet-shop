// import postgres from "postgres";
// const sql = postgres("postgres://samson:samson@127.0.0.1:5432/pet_shop");
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "samson",
  host: "127.0.0.1",
  database: "pet_shop",
  password: "samson",
  port: 5432,
});

export const getPets = (req, res) => {
  pool.query("SELECT * FROM pets", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error retrieving pets from database" });
    } else {
      res.status(200).json(results.rows);
    }
  });
};
