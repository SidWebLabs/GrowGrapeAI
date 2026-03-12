import "dotenv/config";
import app from "./app.js";

const PORT = process.env.SERVER_PORT || 3001;

// Only call app.listen() when running locally (not on Vercel)
if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// Vercel needs this export
export default app;