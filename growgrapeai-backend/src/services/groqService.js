const GROQ_MODELS = [
  "llama-3.1-8b-instant",
  "gemma2-9b-it",
  "llama-3.3-70b-versatile",
];

const GROQ_API_KEYS = [
  process.env.GROQ_API_KEY_1,
  process.env.GROQ_API_KEY_2,
  process.env.GROQ_API_KEY_3,
].filter(Boolean);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function shouldTryNext(message = "") {
  const msg = message.toLowerCase();

  return (
    msg.includes("rate limit") ||
    msg.includes("quota") ||
    msg.includes("too many requests") ||
    msg.includes("tokens per minute") ||
    msg.includes("decommissioned") ||
    msg.includes("deprecated") ||
    msg.includes("not supported")
  );
}

export async function callGroq(systemPrompt, messages) {
  if (GROQ_API_KEYS.length === 0) {
    throw new Error("No GROQ API keys configured.");
  }

  for (const apiKey of GROQ_API_KEYS) {
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
              messages: [
                {
                  role: "system",
                  content: systemPrompt,
                },
                ...messages,
              ],
              temperature: 0.2,
              max_tokens: 600,
            }),
          }
        );

        if (!response.ok) {
          const err = await response.json();

          const msg = err?.error?.message || "";

          console.warn(`${model}: ${msg}`);

          if (shouldTryNext(msg)) {
            const retry = msg.match(/try again in ([0-9.]+)s/i);

            if (retry) {
              await sleep(Number(retry[1]) * 1000);
            }

            continue;
          }

          throw new Error(msg);
        }

        const data = await response.json();

        return data.choices[0].message.content;
      } catch (err) {
        if (shouldTryNext(err.message)) {
          continue;
        }

        console.error(err.message);
      }
    }
  }

  throw new Error("All Groq API keys and models are exhausted.");
} 