# GrowGrape AI Frontend

Frontend web app for GrowGrape AI, built with React + Vite + TypeScript.

## Tech Stack

- React 18
- Vite 5
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vitest + Testing Library

## Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm 9+

## Setup

```bash
npm install
```

## Environment Variables

Create a `.env` file in `growgrapeai-webapp`:

```env
VITE_BACKEND_API_URL=http://localhost:8000/api/chat
```

Notes:
- `VITE_BACKEND_API_URL` must point to the backend chat endpoint.
- Image analysis requests are automatically sent to `/api/analyze-image` by deriving base URL from this value.

## Run Locally

```bash
npm run dev
```

Frontend default dev URL:
- `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Create production build
- `npm run build:dev` - Build with development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Project Structure

- `src/pages` - Route-level pages
- `src/components` - Reusable UI and feature components
- `src/components/ui` - shadcn/ui primitives
- `src/assets` - Static assets bundled by Vite
- `public` - Public static files (favicon/logo, robots.txt)

## Backend Integration

The chatbot UI depends on backend APIs:
- `POST /api/chat`
- `POST /api/analyze-image`
- `GET /api/health`

Make sure backend server is running before using chat/image analysis features.
