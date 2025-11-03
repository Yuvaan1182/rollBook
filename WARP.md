# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repo overview

Monorepo with two apps:
- backend/ — Node.js + Express API with MongoDB, Redis, BullMQ jobs, Stripe/Razorpay, email, PDF, and LLM helpers. Tests use Vitest.
- frontend/ — React + TypeScript + Vite. Feature-first architecture with Redux, Tailwind, and shared libs.

## Common commands

- Install dependencies
  - Backend: `cd backend && npm install`
  - Frontend: `cd frontend && npm install`

- Local development
  - API: `cd backend && npm run dev`
  - Web app: `cd frontend && npm run dev`

- Build
  - Frontend: `cd frontend && npm run build`

- Lint
  - Frontend: `cd frontend && npm run lint`

- Tests (backend)
  - All tests with coverage: `cd backend && npm test`
  - Silent run: `cd backend && npm run test:silent`
  - Single file: `cd backend && npx vitest run tests/path/to/file.test.ts`
  - By test name: `cd backend && npx vitest run -t "name substring"`
  - Watch/interactive: `cd backend && npx vitest`

- Workers (backend jobs)
  - Start all workers (dev): `cd backend && npm run start:worker`
  - Email worker (prod-style single): `cd backend && npm run worker:email`

- Observability stack (optional)
  - Up: `docker compose -f backend/infra/docker-compose.yml up -d`
  - Down: `docker compose -f backend/infra/docker-compose.yml down`

## Environment

Backend `.env` (place in `backend/`):
- `PORT`, `MONGO_URI`, `JWT_SECRET`, `REDIS_URL`, `STRIPE_SECRET`, `EMAIL_API_KEY`, `OPENAI_API_KEY`

## High-level architecture

- Backend (Express API)
  - Entry: `src/index.js` boots the server; `src/app.js` wires middleware and routes.
  - Layers:
    - controllers/ — thin HTTP adapters; delegate to services
    - services/ — business logic and orchestration (validation, DB ops, flows)
    - models/ — Mongoose schemas (User, Client, Invoice, etc.)
    - middlewares/ — auth, validation, error, rate limiting
    - validators/ — Zod/Yup request schemas
    - utils/ — shared helpers (OTP, PDF, email, logger)
    - security/ — 2FA/OTP, resend limits, cooldowns
    - jobs/ — BullMQ queues and schedulers; worker entrypoints under `src/jobs/`
    - llm/ — provider clients and prompt templates; `llmService` as facade
    - webhooks/ — outbound integrations (Slack, Zapier, Notion)
    - config/ — env loading, connectors (Mongo, Redis, Stripe, mail), constants
  - Testing: Vitest config at `backend/tests/vitest.config.js` (Node env, setup file, v8 coverage).
  - Metrics/observability: `prom-client` in app; optional Grafana/Prometheus/Loki stack via `backend/infra/`.

- Frontend (React + Vite)
  - Feature-first structure under `src/`:
    - app/ (store, hooks, providers, routes)
    - features/ (auth, invoices, payments, subscriptions, analytics) each self-contained with components, hooks, services, types, slice
    - components/ (ui, layout, feedback), lib/, services/, utils/, types/
  - Tooling: Vite config `frontend/vite.config.ts`; TypeScript project refs; ESLint config `frontend/eslint.config.js`.

## Pointers for agents

- Prefer running backend tests via Vitest commands above; coverage is produced by `npm test`.
- When debugging jobs, use `npm run start:worker` to run worker code with Nodemon.
- Observability services are optional and isolated to `backend/infra/`; they don’t affect app startup.
- Frontend lint rules are strict TypeScript + React; no backend linter is configured yet.
