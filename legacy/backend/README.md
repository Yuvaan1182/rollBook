# 📦 Backend Structure — Freelancer Invoice SaaS

This backend powers the core logic of the Freelancer Invoice SaaS platform — handling authentication, invoicing, payments, notifications, proposal generation, and more.

---

## 🛠 Tech Stack

- **Node.js + Express** – RESTful API
- **MongoDB Atlas** – Primary database
- **Redis** – OTPs, cache, rate limiting
- **BullMQ / Node-Cron** – Job queues & scheduled tasks
- **LLM (OpenAI)** – Proposal & communication assistant
- **PDF-lib / Puppeteer** – PDF generation
- **SendGrid / Resend / Nodemailer** – Email delivery
- **Stripe / Razorpay** – Payment gateway integrations

---

## 📁 Folder Structure

```

backend/
├── src/
│   ├── config/                 # Env, MongoDB, Redis, Stripe, Mail setup
│   │   ├── constants/          # 📄 Timeout, retry counts, enums
│   │   └── db-connectors       # Db connection for different dbs
│   ├── controllers/            # Route handlers (no business logic)
│   ├── services/               # Core app logic (validation, DB ops, flow)
│   ├── models/                 # Mongoose schemas (User, Invoice, Client...)
│   ├── routes/                 # Express routes, versioned & grouped
│   ├── middlewares/            # Auth, error, rate-limiter, validators
│   ├── utils/                  # OTP gen, PDF creator, email sender, logger
│   ├── validators/             # Input schema validators (Zod/Yup)
│   ├── security/               # OTP manager, resend limiter, 2FA helpers
│   ├── jobs/                   # Queues & scheduled jobs (reminders, digests)
│   ├── llm/                    # Proposal summarizer & smart comms (OpenAI)
│   ├── lib/                    # 🧱 Shared tools (like HTTP client, logger, etc.)
│   ├── webhooks/               # Emitters for Slack, Zapier, Notion
│   ├── index.js                # Entry point (load env, init server)
│   └── app.js                  # Express app setup, middleware mounting
├── public/                     # Static files (logos, invoice templates)
├── tests/                      # Unit & integration tests (Jest + Supertest)
├── .env.example                # Sample env vars
├── package.json
└── README.md

````

---

## 🧩 Key Modules

| Folder         | Description |
|----------------|-------------|
| `controllers/` | Thin layer to receive requests and call services |
| `services/`    | Contains core logic like invoice creation, OTP, payment link gen |
| `models/`      | Mongoose schemas with methods, hooks, virtuals |
| `middlewares/` | Handles authentication, input validation, error catching |
| `jobs/`        | BullMQ queues for email dispatch, overdue invoice reminders, digests |
| `utils/`       | Reusable helpers (OTP gen, PDF builder, logger) |
| `llm/`         | LLM-based proposal writer and summarizer |
| `webhooks/`    | Emits structured payloads to 3rd-party platforms |
| `security/`    | OTP resend limits, rate-limiting, 2FA token helpers |
| `validators/`  | Schema-based input validation for requests |

---

## ✅ Environment Variables (.env)

```env
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
STRIPE_SECRET=your_stripe_key
EMAIL_API_KEY=your_email_provider_key
OPENAI_API_KEY=your_openai_key
````

---

## 📦 Installation

```bash
# Clone the repo
$ git clone https://github.com/your-username/invoice-saas.git
$ cd invoice-saas/backend

# Install dependencies
$ npm install

# Run dev server
$ npm run dev
```

---

## 🧪 Testing

```bash
# Run tests
$ npm test
```

---

## 📤 Deployment-Ready

* 🐳 Docker-friendly setup (optional)
* 🛡 Secure headers & rate-limiting middleware
* 📈 Production logging via Winston/Pino (planned)
* 📬 Mail & OTP backed by Redis TTL and BullMQ
* 🌍 i18n & locale-ready data formatting

---

## 🧠 Upcoming Add-ons

* Swagger-based API docs
* PostgreSQL migration layer
* Optional GraphQL interface
* Audit logs & request tracing
* Role-based access guard (RBAC)


# ✅ Configuration & Readiness Tracker

This checklist tracks configuration progress for the backend of the **Freelancer Invoice SaaS** app.

---

## 🧰 Core Environment Setup

| Configuration                       | Status | Notes |
|-------------------------------------|--------|-------|
| `.env` with proper structure        | ✅     | `PORT`, `MONGO_URI`, `REDIS_URL`, etc. |
| Environment abstraction (`env.js`)  | ✅     | Central config loader |
| `.env.example`                      | ✅     | Shared safely for new devs |
| Graceful shutdown (SIGINT/TERM)     | ✅     | For Redis & DB |

---

## 🗄️ Database & Cache

| Configuration           | Status | Notes |
|-------------------------|--------|-------|
| MongoDB connection      | ✅     | In `connectDB.js` |
| Redis connection        | ✅     | TTL, key prefix helpers |
| Multi-DB fallback ready | 🔲     | Add PostgreSQL in future phase |

---

## ✉️ Email / 📱 SMS

| Configuration            | Status | Notes |
|--------------------------|--------|-------|
| Resend provider          | ✅     | With HTTP client & fallback |
| SendGrid fallback        | ✅     | Auto retry via opossum |
| SMS provider setup       | ✅     | OTP + resend cooldown |
| Email queue + retry      | ✅     | BullMQ or custom queue layer |
| Email template system    | 🔲     | To be integrated in UI editor |

---

## 💳 Payments

| Configuration            | Status | Notes |
|--------------------------|--------|-------|
| Stripe client setup      | ✅     | From `lib/stripe.js` |
| Razorpay client setup    | ✅     | From `lib/razorpay.js` |
| Payment verification     | ✅     | Secure + fallback ready |
| Webhook handling         | ✅     | Basic retry logic added |

---

## 🔐 Security & 2FA

| Configuration                  | Status | Notes |
|--------------------------------|--------|-------|
| OTP Manager (email/SMS)        | ✅     | TTL-based with resend limit |
| 2FA toggle in user model       | ✅     | Email, SMS, Auth App support |
| Redis cooldown/resend tracking | ✅     | Per channel |
| Security utils bundle          | ✅     | `src/security/` reusable logic |
| Rate limiter (per endpoint)    | 🔲     | Add Redis-backed limiter |
| API key-based route protection | 🔲     | For external integrations/webhooks |

---

## ⚙️ Dev & DX Tools

| Configuration              | Status | Notes |
|----------------------------|--------|-------|
| Logger (morgan + helmet)   | ✅     | Dev vs Prod logging modes |
| ESLint + Prettier setup    | 🔲     | Add for code hygiene |
| Husky pre-commit hooks     | 🔲     | Format/lint checks |
| Nodemon (local dev)        | ✅     | Already in use |
| Docker + Compose setup     | 🔲     | Add Redis, MongoDB, Mailhog |

---

## 🧪 Testing & CI/CD

| Configuration                 | Status | Notes |
|-------------------------------|--------|-------|
| `jest` + `supertest` setup    | 🔲     | Needed for unit + integration tests |
| Test factories & mock clients | 🔲     | Stub Redis, email, payments |
| Separate `.env.test`          | 🔲     | Use isolated DB + queues |
| GitHub Actions for CI         | 🔲     | Build, lint, test stages |
| Lint/test badge in README     | 🔲     | Auto status via GitHub CI |

---

## 📤 Webhooks & LLM

| Configuration               | Status | Notes |
|-----------------------------|--------|-------|
| Webhook emitter system      | ✅     | Slack, Zapier, Notion |
| Proposal summarizer (LLM)   | ✅     | OpenAI API in place |
| LLM fallback mechanism      | 🔲     | Add Cohere / Together AI fallback |

---

## 📦 Misc

| Configuration                 | Status | Notes |
|-------------------------------|--------|-------|
| Feature flags system          | 🔲     | Per-user toggle via Redis or DB |
| Central constants file        | ✅     | Roles, enums, messages, retries |
| Service URLs in one place     | ✅     | `config/serviceEndpoints.js` |
| PDF Generator abstraction     | ✅     | For invoice digest / export |
| Cron job layer (BullMQ-ready) | ✅     | Digests, reminders, etc. |

---

✅ **Legend**
- ✅ = Complete
- 🔲 = Pending

backend/
└── src/
    ├── llm/                                 # 🔮 LLM logic module
    │   ├── providers/                       # 📦 Model-specific clients
    │   │   ├── openaiClient.js              # -> src/llm/providers/openaiClient.js
    │   │   ├── claudeClient.js              # -> src/llm/providers/claudeClient.js
    │   │   ├── perplexityClient.js          # -> src/llm/providers/perplexityClient.js
    │   │   └── modelRouter.js               # -> src/llm/providers/modelRouter.js
    │   ├── promptTemplates/                 # 📄 Prompt templates
    │   │   ├── proposal.js                  # -> src/llm/promptTemplates/proposal.js
    │   │   └── invoiceNote.js               # -> src/llm/promptTemplates/invoiceNote.js
    │   └── llmService.js                    # -> src/llm/llmService.js
