import type { Request, Response } from "express";
import app from "./app";
import { initDb } from "./config/db";

const startServer = () => {
  app.get("/", (req: Request, res: Response) => {
    res.send("helloworld");
  });

  initDb();

  app.listen(5000, () => {
    console.log("server listenong port-5000");
  });
};

startServer();
