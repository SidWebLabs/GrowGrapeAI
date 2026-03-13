import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "10mb" }));

app.use("/api", chatRoutes);

app.get("/", (req, res) => {
  res.json({ status: "GrowGrape API is running" });
});

export default app;