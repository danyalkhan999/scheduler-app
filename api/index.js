import express from "express";
import { connectDB } from "./config/db.js";
import { configDotenv } from "dotenv";
import EventRouter from "./routes/scheduler.route.js";
import cors from "cors";

configDotenv();

const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.use("/api/scheduler", EventRouter);

app.listen(PORT, () => {
  try {
    connectDB();
    console.log(`App is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
