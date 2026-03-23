# GrowGrapeAI Monorepo Overview

This is the common root documentation for the GrowGrapeAI project.
It includes both frontend and backend structure in one place.

## Projects

- `growgrapeai-webapp` - React + Vite frontend
- `growgrapeai-backend` - Node.js + Express backend API

## Combined Folder Structure

```text
GrowGrapeAI/
|-- README.md
|-- growgrapeai-webapp/
|   |-- README.md
|   |-- package.json
|   |-- index.html
|   |-- public/
|   |   |-- GrowGrape.AI.png
|   |   |-- GrowGrape.AI..png
|   |   `-- robots.txt
|   |-- src/
|   |   |-- App.tsx
|   |   |-- main.tsx
|   |   |-- index.css
|   |   |-- assets/
|   |   |-- components/
|   |   |   |-- Chatbot.tsx
|   |   |   |-- ChatWidget.tsx
|   |   |   |-- HeroSection.tsx
|   |   |   |-- Footer.tsx
|   |   |   `-- ui/
|   |   |-- pages/
|   |   |   |-- Index.tsx
|   |   |   `-- NotFound.tsx
|   |   |-- hooks/
|   |   |-- lib/
|   |   |-- data/
|   |   `-- test/
|   |-- vite.config.ts
|   |-- tailwind.config.ts
|   `-- tsconfig.json
`-- growgrapeai-backend/
    |-- README.md
    |-- package.json
    |-- vercel.json
    `-- src/
        |-- server.js
        |-- app.js
        |-- routes/
        |   `-- chatRoutes.js
        |-- controllers/
        |   |-- chatController.js
        |   `-- imageController.js
        |-- services/
        |   |-- groqService.js
        |   |-- geminiService.js
        |   `-- imageService.js
        |-- models/
        |   `-- knowledgeModel.js
        |-- utils/
        |   `-- contextBuilder.js
        `-- data/
            `-- knowledge-base.json
```

## Quick Start

Frontend:

```bash
cd growgrapeai-webapp
npm install
npm run dev
```

Backend:

```bash
cd growgrapeai-backend
npm install
npm run dev
```

Then open frontend in browser and ensure backend is running for chat and image analysis features.
