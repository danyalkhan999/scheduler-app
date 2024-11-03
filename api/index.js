import express from "express";
import { connectDB } from "./config/db.js";
import { configDotenv } from "dotenv";
import EventRouter from "./routes/scheduler.route.js";

configDotenv();

const app = express();
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
