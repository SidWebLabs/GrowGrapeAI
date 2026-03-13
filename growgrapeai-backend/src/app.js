import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

// CORS options
const corsOptions = {
  origin: "*", // change to frontend URL in production for safety
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS for every request
app.use((req, res, next) => {
  cors(corsOptions)(req, res, next);
});

app.use(express.json());

// Routes
app.use("/api", chatRoutes);

// Root health check
app.get("/", (req, res) => {
  res.json({ status: "GrowGrape API is running" });
});

export default app;