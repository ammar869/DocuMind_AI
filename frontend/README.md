# DocuMind AI Frontend

This is the React + TypeScript + Vite frontend for DocuMind AI.

## Run it

```bash
npm install
npm run dev
```

## Important folders

- `src/components`: Small reusable UI pieces.
- `src/components/layout`: App-wide layout, such as the navbar.
- `src/components/ui`: Generic components like stat cards, badges, and empty states.
- `src/components/documents`: Document-specific components like cards, lists, and upload UI.
- `src/pages`: Route screens. Each page maps to a browser URL.
- `src/services`: Future FastAPI communication code.
- `src/types`: Beginner-friendly TypeScript interfaces shared across the app.
- `src/hooks`: Reusable React logic, such as document search.
- `src/lib`: Mock data and small helpers.

## Routes

- `/`: Dashboard
- `/documents`: Documents list
- `/documents/:id`: Document details
- `/chat`: AI chat placeholder
- `/upload`: Upload placeholder

## Backend connection later

Copy `.env.example` to `.env` and update:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

The placeholder API functions live in `src/services/api.ts`.
