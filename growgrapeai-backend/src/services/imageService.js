// Groq vision models (free tier, support image input)
const GROQ_VISION_MODELS = [
  "meta-llama/llama-4-scout-17b-16e-instruct",
  "meta-llama/llama-4-maverick-17b-128e-instruct",
];

async function callGroqVision(prompt, base64Image, mimeType) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not set");

  for (const model of GROQ_VISION_MODELS) {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${mimeType};base64,${base64Image}`,
                  },
                },
                {
                  type: "text",
                  text: prompt,
                },
              ],
            },
          ],
          max_tokens: 500,
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        const msg = err?.error?.message || `HTTP ${response.status}`;
        if (msg.includes("decommissioned") || msg.includes("not supported") || msg.includes("404")) {
          console.warn(`⚠️  ${model} not available, trying next...`);
          continue;
        }
        throw new Error(msg);
      }

      const data = await response.json();
      console.log(`✅ Vision via ${model}`);
      return data.choices[0].message.content;
    } catch (err) {
      if (err.message?.includes("decommissioned") || err.message?.includes("not supported")) {
        continue;
      }
      throw err;
    }
  }

  throw new Error("All Groq vision models unavailable");
}

/**
 * Step 1 — Validate image is grape/pesticide related
 */
export async function validateGrapeImage(base64Image, mimeType) {
  const prompt = `Look at this image carefully.

Answer ONLY with a valid JSON object, no extra text, no markdown:
{
  "isGrapeRelated": true,
  "type": "disease",
  "confidence": "high",
  "detectedSubject": "what you see"
}

Rules:
- isGrapeRelated = true ONLY for: grape leaves, vines, berries, grape diseases, grape pests, pesticide products for grapes, vineyards
- isGrapeRelated = false for everything else (people, animals, food, cars, etc.)
- type must be one of: "disease", "pest", "pesticide", "grape_plant", "unrelated"
- confidence must be one of: "high", "medium", "low"`;

  const text = await callGroqVision(prompt, base64Image, mimeType);
  const clean = text.replace(/```json|```/g, "").trim();

  // Extract JSON safely
  const jsonMatch = clean.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Invalid validation response from AI");
  return JSON.parse(jsonMatch[0]);
}

/**
 * Step 2 — Deep analysis of grape image
 */
export async function analyzeGrapeImage(base64Image, mimeType, analysisType) {
  const prompt = analysisType === "pesticide"
    ? `Analyze this pesticide or fungicide product image for grape farming.

Answer ONLY with a valid JSON object, no markdown:
{
  "productName": "product name if visible or Unknown",
  "activeIngredient": "active ingredient if visible or Unknown",
  "targetProblems": "what pests or diseases it targets",
  "searchQuery": "one keyword like powdery mildew or botrytis or spider mites",
  "summary": "one or two sentence description"
}`
    : `Analyze this grape plant image and identify any disease or pest.

Answer ONLY with a valid JSON object, no markdown:
{
  "identified": "name of disease or pest",
  "symptoms": "visible symptoms",
  "severity": "mild or moderate or severe",
  "searchQuery": "one keyword like powdery mildew or botrytis or spider mites",
  "summary": "one or two sentence description"
}`;

  const text = await callGroqVision(prompt, base64Image, mimeType);
  const clean = text.replace(/```json|```/g, "").trim();

  const jsonMatch = clean.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Invalid analysis response from AI");
  return JSON.parse(jsonMatch[0]);
}