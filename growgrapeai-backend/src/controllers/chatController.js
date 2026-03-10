import { searchKnowledgeBase, getKnowledgeBase } from "../models/knowledgeModel.js";
import { buildContext } from "../utils/contextBuilder.js";
import { callGroq } from "../services/groqService.js";
import { callGemini } from "../services/geminiService.js";

export const chatHandler = async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  const userQuery = lastUserMsg?.content || "";

  const matches = searchKnowledgeBase(userQuery);
  const context = buildContext(matches);

  const systemPrompt = context
    ? `You are GrowGrape AI, expert in grape farming.

Use knowledge base if possible.

${context}`
    : `You are GrowGrape AI expert in grape farming.`;

  const providers = [
    { name: "Groq", fn: () => callGroq(systemPrompt, messages) },
    { name: "Gemini", fn: () => callGemini(systemPrompt, messages) },
  ];

  for (const provider of providers) {
    try {
      const text = await provider.fn();

      return res.json({
        message: text,
        provider: provider.name,
        kbMatches: matches.map((m) => m.topic),
      });
    } catch (err) {
      console.warn(`${provider.name} failed`);
    }
  }

  res.status(500).json({ error: "All AI providers failed" });
};

export const healthCheck = (req, res) => {
  res.json({
    status: "ok",
    knowledgeBaseEntries: getKnowledgeBase().length,
  });
};

export const getTopics = (req, res) => {
  const kb = getKnowledgeBase();
  res.json(kb.map((e) => ({ id: e.id, topic: e.topic, category: e.category })));
};