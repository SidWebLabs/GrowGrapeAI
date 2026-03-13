import "dotenv/config";
import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

// Handle CORS preflight for ALL routes first
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
}));

app.use(express.json());

app.use("/api", chatRoutes);

// Root health check
app.get("/", (req, res) => {
  res.json({ status: "GrowGrape API is running" });
});

export default app;

// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import chatRoutes from "./routes/chatRoutes.js";

// const app = express();

// app.use(cors({
//   origin: "*",
//   methods: ["GET","POST","PUT","DELETE","OPTIONS"],
//   allowedHeaders: ["Content-Type","Authorization"]
// }));

// app.use(express.json());
// app.use("/api", chatRoutes);

// app.get("/", (req, res) => {
//   res.json({ status: "GrowGrape API is running" });
// });

// export default app;