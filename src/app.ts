import express, { type Application } from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.route";

const app: Application = express();

const corsOptions = {
  origin: ["localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);

export default app;
