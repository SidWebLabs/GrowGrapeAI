// import { searchKnowledgeBase, getKnowledgeBase } from "../models/knowledgeModel.js";
// import { buildContext } from "../utils/contextBuilder.js";
// import { callGroq } from "../services/groqService.js";
// import { callGemini } from "../services/geminiService.js";

// export const chatHandler = async (req, res) => {
//   const { messages } = req.body;

//   if (!Array.isArray(messages) || messages.length === 0) {
//     return res.status(400).json({ error: "messages array is required" });
//   }

//   const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
//   const userQuery = lastUserMsg?.content || "";

//   const matches = searchKnowledgeBase(userQuery);
//   const context = buildContext(matches);

//   const systemPrompt = context
//     ? `You are GrowGrape AI, expert in grape farming.

// Use knowledge base if possible.

// ${context}`
//     : `You are GrowGrape AI expert in grape farming.`;

//   const providers = [
//     { name: "Groq", fn: () => callGroq(systemPrompt, messages) },
//     { name: "Gemini", fn: () => callGemini(systemPrompt, messages) },
//   ];

//   for (const provider of providers) {
//     try {
//       const text = await provider.fn();

//       return res.json({
//         message: text,
//         provider: provider.name,
//         kbMatches: matches.map((m) => m.topic),
//       });
//     } catch (err) {
//       console.warn(`${provider.name} failed`);
//     }
//   }

//   res.status(500).json({ error: "All AI providers failed" });
// };

// export const healthCheck = (req, res) => {
//   res.json({
//     status: "ok",
//     knowledgeBaseEntries: getKnowledgeBase().length,
//   });
// };

// export const getTopics = (req, res) => {
//   const kb = getKnowledgeBase();
//   res.json(kb.map((e) => ({ id: e.id, topic: e.topic, category: e.category })));
// };

import { searchKnowledgeBase } from "../server/models/knowledgeModel.js";
import { buildContext } from "../server/utils/contextBuilder.js";
import { callGroq } from "../server/services/groqService.js";
import { callGemini } from "../server/services/geminiService.js";

const SYSTEM_PROMPT_WITH_CONTEXT = (context) => `
You are GrowGrape AI, a specialist assistant for grape farming.

You ONLY answer questions related to:
- grape cultivation, vineyard management, pests, diseases
- irrigation, fertilizers, pruning, harvesting, grape plant health

If the user asks something unrelated to grape farming, respond with:
"I'm GrowGrape AI 🌱 and I can only help with grape farming questions."

Use the knowledge base below if relevant and keep answers practical for farmers.

KNOWLEDGE BASE:
${context}
`;

const SYSTEM_PROMPT_GENERAL = `
You are GrowGrape AI, a specialist assistant for grape farming.
You ONLY answer grape farming related questions.
If unrelated, reply: "I'm GrowGrape AI 🌱 and I can only help with grape farming questions."
Keep answers short, practical, and farmer-friendly.
`;

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  const userQuery = lastUserMsg?.content || "";

  const matches = searchKnowledgeBase(userQuery);
  const context = buildContext(matches);

  const systemPrompt = context
    ? SYSTEM_PROMPT_WITH_CONTEXT(context)
    : SYSTEM_PROMPT_GENERAL;

  const providers = [
    { name: "Groq",   fn: () => callGroq(systemPrompt, messages) },
    { name: "Gemini", fn: () => callGemini(systemPrompt, messages) },
  ];

  for (const provider of providers) {
    try {
      const text = await provider.fn();
      return res.status(200).json({
        message: text,
        provider: provider.name,
        kbMatches: matches.map((m) => m.topic),
      });
    } catch (err) {
      console.warn(`${provider.name} failed: ${err.message}`);
    }
  }

  return res.status(500).json({ error: "All AI providers failed. Check your API keys." });
}