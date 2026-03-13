import express from "express";
import { chatHandler, healthCheck, getTopics } from "../controllers/chatController.js";
import { imageAnalysisHandler } from "../controllers/imageController.js";

const router = express.Router();

router.post("/chat", chatHandler);
router.post("/analyze-image", imageAnalysisHandler);
router.get("/health", healthCheck);
router.get("/kb/topics", getTopics);

export default router;