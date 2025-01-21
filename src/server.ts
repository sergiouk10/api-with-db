import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express();
const port = process.env.PORT;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.DB_PORT),
});

app.get("/db", async (_req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    console.info({ result });
    console.info({
      user: process.env.POSTGRES_USER,
      host: process.env.DB_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: Number(process.env.DB_PORT),
    });
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

// app.get("/db", async (_req, res) => {
//   try {
//     const client = await pool.connect();

//     // Create the table if it doesn't exist
//     await client.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100),
//         email VARCHAR(100)
//       );
//     `);

//     // Insert a record
//     await client.query(`
//       INSERT INTO users (name, email)
//       VALUES ('John Doe', 'john.doe@example.com')
//       ON CONFLICT DO NOTHING; -- Avoid inserting duplicate records
//     `);

//     // Retrieve the records from the table
//     const result = await client.query("SELECT * FROM users");

//     console.info({ result: result.rows });
//     console.info({
//       user: process.env.POSTGRES_USER,
//       host: process.env.DB_HOST,
//       database: process.env.POSTGRES_DB,
//       password: process.env.POSTGRES_PASSWORD,
//       port: Number(process.env.DB_PORT),
//     });

//     res.json(result.rows); // Return all records in the 'users' table
//     client.release();
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error: " + err);
//   }
// });

app.get("/", (_req: Request, res: Response) => {
  res.send(`Sergio is cool ${port}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log({ testValue: process.env.SERGIO_ENV });
});
