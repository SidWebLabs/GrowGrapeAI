import { validateGrapeImage, analyzeGrapeImage } from "../services/imageService.js";
import { searchKnowledgeBase } from "../models/knowledgeModel.js";
import { buildContext } from "../utils/contextBuilder.js";
import { callGroq } from "../services/groqService.js";
import { callGemini } from "../services/geminiService.js";

export const imageAnalysisHandler = async (req, res) => {
  const { image, mimeType, analysisType } = req.body;

  if (!image || !mimeType) {
    return res.status(400).json({ error: "image (base64) and mimeType are required" });
  }

  // ── Step 1: Validate image is grape-related ───────────────────────────────
  let validation;
  try {
    validation = await validateGrapeImage(image, mimeType);
  } catch (err) {
    return res.status(500).json({ error: "Image validation failed", details: err.message });
  }

  if (!validation.isGrapeRelated || validation.confidence === "low") {
    return res.status(200).json({
      valid: false,
      message: "🚫 Please upload an image related to grape plants, diseases, pests, or pesticide products only.",
      detectedSubject: validation.detectedSubject,
    });
  }

  // ── Step 2: Resolve analysis type ────────────────────────────────────────
  const resolvedType = analysisType === "auto"
    ? (validation.type === "pesticide" ? "pesticide" : "disease")
    : analysisType;

  // ── Step 3: Deep image analysis ───────────────────────────────────────────
  let analysis;
  try {
    analysis = await analyzeGrapeImage(image, mimeType, resolvedType);
  } catch (err) {
    return res.status(500).json({ error: "Image analysis failed", details: err.message });
  }

  // ── Step 4: Search knowledge base ────────────────────────────────────────
  const searchQuery = analysis.searchQuery || analysis.identified || analysis.productName || "";
  const matches = searchKnowledgeBase(searchQuery);
  const context = buildContext(matches);

  // ── Step 5: Generate AI response with KB context ──────────────────────────
  const systemPrompt = context
    ? `You are GrowGrape AI, a specialist in grape farming, diseases, and pest control.

A farmer uploaded an image. Here is what was detected:
${JSON.stringify(analysis, null, 2)}

Use the knowledge base below to give a practical response.
Be concise, clear, and farmer-friendly.

KNOWLEDGE BASE:
${context}`
    : `You are GrowGrape AI, a specialist in grape farming, diseases, and pest control.

A farmer uploaded an image. Here is what was detected:
${JSON.stringify(analysis, null, 2)}

Give practical advice based on the detected issue. Be concise and farmer-friendly.`;

  const userMessage = resolvedType === "pesticide"
    ? `I uploaded an image of a pesticide product. What is it and how should I use it on my grapes?`
    : `I uploaded an image of my grape plant. What disease or pest is this and how do I treat it?`;

  const messages = [{ role: "user", content: userMessage }];

  let aiResponse = null;
  const providers = [
    { name: "Groq",   fn: () => callGroq(systemPrompt, messages) },
    { name: "Gemini", fn: () => callGemini(systemPrompt, messages) },
  ];

  for (const provider of providers) {
    try {
      aiResponse = await provider.fn();
      break;
    } catch (err) {
      console.warn(`${provider.name} failed: ${err.message}`);
    }
  }

  if (!aiResponse) {
    return res.status(500).json({ error: "AI providers failed to generate response" });
  }

  return res.status(200).json({
    valid: true,
    analysisType: resolvedType,
    detected: analysis.identified || analysis.productName || "Unknown",
    summary: analysis.summary,
    severity: analysis.severity || null,
    message: aiResponse,
    kbMatches: matches.map((m) => m.topic),
  });
};