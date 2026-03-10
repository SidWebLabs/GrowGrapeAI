import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const KB_PATH = path.join(__dirname, "../data/knowledge-base.json");

let knowledgeBase = [];

try {
  knowledgeBase = JSON.parse(fs.readFileSync(KB_PATH, "utf-8"));
  console.log(`✅ Knowledge base loaded: ${knowledgeBase.length}`);
} catch {
  console.warn("knowledge-base.json not found");
}

export function getKnowledgeBase() {
  return knowledgeBase;
}

export function searchKnowledgeBase(query) {
  const queryWords = query.toLowerCase().split(/\s+/);

  const scored = knowledgeBase.map((entry) => {
    let score = 0;

    for (const word of queryWords) {
      if (word.length < 3) continue;

      if (entry.keywords?.some((k) => k.includes(word))) score += 3;
      if (entry.topic.toLowerCase().includes(word)) score += 2;
      if (entry.category.toLowerCase().includes(word)) score += 1;
      if (entry.content.toLowerCase().includes(word)) score += 1;
    }

    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.entry);
}
