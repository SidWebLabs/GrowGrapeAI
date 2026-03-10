const GROQ_MODELS = [
  "llama-3.1-8b-instant",
  "llama3-70b-8192",
  "mixtral-8x7b-32768",
];

export async function callGroq(systemPrompt, messages) {
  const apiKey = process.env.GROQ_API_KEY;

  for (const model of GROQ_MODELS) {
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: [{ role: "system", content: systemPrompt }, ...messages],
            max_tokens: 800,
          }),
        }
      );

      if (!response.ok) continue;

      const data = await response.json();

      return data.choices[0].message.content;

    } catch {
      continue;
    }
  }

  throw new Error("Groq models unavailable");
}