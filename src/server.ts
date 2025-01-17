import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT;

app.get("/", (_req: Request, res: Response) => {
  res.send(`Sergio is cool ${port}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log({ testValue: process.env.SERGIO_ENV });
});
