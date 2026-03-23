# GrowGrape AI Backend

Backend API for GrowGrape AI chatbot and grape image analysis.

## Tech Stack

- Node.js
- Express
- Groq API (chat + vision)
- Google Gemini API (fallback for chat)

## Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm 9+

## Setup

```bash
npm install
```

## Environment Variables

Create a `.env` file in `growgrapeai-backend`:

```env
SERVER_PORT=8000
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
```

Required:
- `GROQ_API_KEY`
- `GEMINI_API_KEY` (used as fallback provider for chat)

Optional:
- `SERVER_PORT` (defaults to `8000`)

## Run Locally

Development (auto-reload):

```bash
npm run dev
```

Production:

```bash
npm start
```

Backend default URL:
- `http://localhost:8000`

## Available Scripts

- `npm run dev` - Start with nodemon
- `npm run start` - Start with node
- `npm run server` - Alias for nodemon server
- `npm run vercel-build` - Vercel build placeholder command

## API Endpoints

Base path: `/api`

- `POST /api/chat`
  - Body: `{ "messages": [{ "role": "user" | "assistant", "content": "..." }] }`
  - Returns AI chat response using Groq (primary) and Gemini (fallback).

- `POST /api/analyze-image`
  - Body: `{ "image": "<base64>", "mimeType": "image/jpeg", "analysisType": "disease" | "pesticide" | "auto" }`
  - Validates grape-related image, analyzes it, and returns farmer-friendly advice.

- `GET /api/health`
  - Basic API health check.

- `GET /api/kb/topics`
  - Returns knowledge-base topics list.

- `GET /`
  - Root status response.

## Notes

- CORS is enabled for all origins in current configuration.
- Designed for deployment on Vercel and local Node runtime.
