process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import { router } from "./routes/payment.routes.js";
dotenv.config();

const app = express();
// app.use(express.json());

app.use((req, res, next) => {
  if (req.originalUrl === "/payment/webhook-verify") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/payment", router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});
