# GrowGrapeAI

AI-powered viticulture assistant for grape farmers. The web app features **Dr.DRS** — a chatbot for grape farming questions, pest/disease guidance, and grape image analysis.

## Projects

| Folder | Description |
|--------|-------------|
| `growgrapeai-webapp` | React + Vite + TypeScript frontend |
| `growgrapeai-backend` | Node.js + Express API |

## Features

- **Chat assistant** — Ask about pruning, pests, diseases, harvest, irrigation, and grape market pricing
- **Topic restriction** — Off-topic questions (sports, celebrities, politics, movies) receive a short refusal; grape-related questions are always answered
- **Image analysis** — Upload grape plant or pesticide images for AI diagnosis
- **Knowledge base** — Backend injects relevant viticulture context into responses

## Quick Start

### 1. Backend

```bash
cd growgrapeai-backend
npm install
```

Create `growgrapeai-backend/.env`:

```env
SERVER_PORT=8000
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
```

```bash
npm run dev
```

Backend runs at `http://localhost:8000`

### 2. Frontend

```bash
cd growgrapeai-webapp
npm install
```

Create `growgrapeai-webapp/.env`:

```env
VITE_BACKEND_API_URL=http://localhost:8000/api/chat
```

```bash
npm run dev
```

Frontend runs at `http://localhost:8080`

## API Endpoints

Base path: `/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Chat with Dr.DRS |
| `POST` | `/api/analyze-image` | Analyze grape-related images |
| `GET` | `/api/health` | Health check |
| `GET` | `/api/kb/topics` | List knowledge-base topics |

### Chat request example

```json
{
  "messages": [
    { "role": "user", "content": "how do I treat powdery mildew?" }
  ]
}
```

## Folder Structure

```text
GrowGrapeAI/
|-- README.md
|-- growgrapeai-webapp/
|   |-- src/
|   |   |-- components/
|   |   |   |-- Chatbot.tsx
|   |   |   |-- ChatWidget.tsx
|   |   |   `-- ui/
|   |   |-- pages/
|   |   `-- ...
|   `-- .env
`-- growgrapeai-backend/
    |-- src/
    |   |-- server.js
    |   |-- controllers/
    |   |   |-- chatController.js
    |   |   `-- imageController.js
    |   |-- services/
    |   |   |-- groqService.js
    |   |   |-- geminiService.js
    |   |   `-- imageService.js
    |   |-- models/
    |   |   `-- knowledgeModel.js
    |   |-- utils/
    |   |   `-- contextBuilder.js
    |   `-- data/
    |       `-- knowledge-base.json
    `-- .env
```

## Tech Stack

**Frontend:** React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui

**Backend:** Node.js, Express, Groq API (primary), Google Gemini (fallback)

## Deployment

- Backend is configured for Vercel (`vercel.json`) and local Node runtime
- Set the same environment variables in your deployment dashboard
- Point `VITE_BACKEND_API_URL` to your deployed backend `/api/chat` endpoint

## More Documentation

- [Frontend README](growgrapeai-webapp/README.md)
- [Backend README](growgrapeai-backend/README.md)
