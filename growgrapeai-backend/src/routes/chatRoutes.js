import express from "express";
import { chatHandler, healthCheck, getTopics } from "../controllers/chatController.js";

const router = express.Router();

router.post("/chat", chatHandler);
router.get("/health", healthCheck);
router.get("/kb/topics", getTopics);

export default router;