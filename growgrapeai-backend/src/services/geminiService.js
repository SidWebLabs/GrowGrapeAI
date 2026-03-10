import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_MODELS = [
  "gemini-1.5-flash-8b",
  "gemini-1.5-flash",
  "gemini-2.0-flash-lite",
];

export async function callGemini(systemPrompt, messages) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const lastMessage = messages[messages.length - 1];

  const history = messages.slice(0, -1).map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  for (const modelName of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      const chat = model.startChat({
        history,
        systemInstruction: { parts: [{ text: systemPrompt }] },
      });

      const result = await chat.sendMessage(lastMessage.content);

      return result.response.text();

    } catch {
      continue;
    }
  }

  throw new Error("Gemini quota exceeded");
}