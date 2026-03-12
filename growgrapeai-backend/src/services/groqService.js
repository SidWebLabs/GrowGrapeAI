const GROQ_MODELS = [
  "llama-3.1-8b-instant",   // primary free model
  "llama-3.3-70b-versatile", // fallback
  "gemma2-9b-it",            // fallback
];

export async function callGroq(systemPrompt, messages) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not set");

  for (const model of GROQ_MODELS) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          max_tokens: 800,
          temperature: 0.5,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        const msg = err?.error?.message || "";
        if (msg.includes("decommissioned") || msg.includes("deprecated") || msg.includes("not supported")) {
          console.warn(`Groq model ${model} deprecated, trying next...`);
          continue;
        }
        throw new Error(msg || `Groq HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ Groq model used: ${model}`);
      return data.choices[0].message.content;

    } catch (err) {
      if (err.message?.includes("decommissioned") || err.message?.includes("not supported")) {
        continue;
      }
      throw err;
    }
  }

  throw new Error("All Groq models unavailable");
}