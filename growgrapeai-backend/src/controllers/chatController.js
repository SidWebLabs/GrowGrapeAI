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

import { searchKnowledgeBase } from "../models/knowledgeModel.js";
import { buildContext } from "../utils/contextBuilder.js";
import { callGroq } from "../services/groqService.js";
import { callGemini } from "../services/geminiService.js";

const REFUSAL =
  "I'm **Dr.DRS**, your viticulture expert. I can only help with grape farming. Please ask me something about your grape farm!";

const TOPIC_RULES = `
You are Dr.DRS, a grape farming expert ONLY.
- Only answer viticulture, vineyard, grape pest/disease, harvest, and grape market/pricing questions.
- For off-topic questions (sports, politics, celebrities, movies, general knowledge), reply with EXACTLY this and nothing else: "${REFUSAL}"
- Do NOT add bullet lists, suggestions, or extra paragraphs when refusing.
- If the user's message mentions grapes, vines, vineyards, or viticulture, always answer it — never refuse.
- Never discuss cricket, politicians, celebrities, or entertainment.
`;

const SYSTEM_PROMPT_WITH_CONTEXT = (context) => `
You are Dr.DRS (GrowGrape AI), a specialist assistant for grape farming.
${TOPIC_RULES}
Use the knowledge base below if relevant.

KNOWLEDGE BASE:
${context}
`;

const SYSTEM_PROMPT_GENERAL = `
You are Dr.DRS (GrowGrape AI), a specialist assistant for grape farming.
${TOPIC_RULES}
`;

export const chatHandler = async (req, res) => {
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

  const isGrapeTopic = /\b(grape|grapes|vine|vineyard|viticulture)\b/i.test(userQuery);
  const grapeHint = isGrapeTopic ? "\nThe user's latest message is about grapes — answer it helpfully.\n" : "";

  const systemPrompt = (context ? SYSTEM_PROMPT_WITH_CONTEXT(context) : SYSTEM_PROMPT_GENERAL) + grapeHint;

  const providers = [
    { name: "Groq", fn: () => callGroq(systemPrompt, messages) },
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
};

export const healthCheck = (req, res) => {
  res.json({ status: "ok" });
};

export const getTopics = (req, res) => {
  const kb = searchKnowledgeBase(""); // or getKnowledgeBase()
  res.json(kb.map((e) => ({ id: e.id, topic: e.topic, category: e.category })));
};