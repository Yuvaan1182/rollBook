# 📁 **Backend Folder Structure — README.md**

## 🧱 Overview

This project follows a **Modular Monolith Architecture**, designed to keep the codebase:

* **Modular**
* **Testable**
* **Scalable**
* **Easy to convert into microservices later**

Each domain (Auth, Invoices, Payments, Clients, etc.) is isolated into its own module with its own controllers, services, repositories, models, DTOs, and routes.
Shared infrastructure lives in the `core/` and `config/` folders, and external APIs are abstracted via **adapters**.

---

# 📂 **Folder Structure**

```
src/
│
├── app/
├── config/
├── core/
├── modules/
├── adapters/
├── jobs/
├── tests/
└── index.ts
```

Below is an explanation of **each folder and why it exists**:

---

# 📌 **1. `app/` — Application Bootstrap Layer**

Handles everything related to **starting and configuring the app**.

```
app/
│── server.ts              # Starts the HTTP server
│── app.ts                 # Express app initialization
│── routes.ts              # Global route registry
└── middleware/            # Global middlewares
    │── auth.middleware.ts
    │── validation.middleware.ts
    └── error.middleware.ts
```

### **Why this exists**

* Keeps Express setup clean and separate
* Ensures middlewares are reusable
* Central place to mount all module routes
* Prevents bootstrapping logic from leaking into domain modules

---

# 📌 **2. `config/` — Environment & Config Loader**

```
config/
│── index.ts
│── logger.config.ts
│── db.config.ts
└── redis.config.ts
```

### **Why this exists**

* Centralized configuration avoids spreading secrets/env usage everywhere
* Makes it easy to swap database/redis config later
* Keeps environment variable usage consistent

---

# 📌 **3. `core/` — Shared Infrastructure Layer**

This folder contains **common utilities and core services** used by all modules.

```
core/
│── logger/
│   └── logger.ts          # Pino/Winston logger instance
│
│── database/
│   └── mongo.ts           # MongoDB connection setup
│
│── cache/
│   └── redis.ts           # Redis client setup
│
│── queue/
│   └── bullmq.ts          # Queue initialization (BullMQ)
│
│── http/
│   └── axios.ts           # HTTP client wrapper with retries, logs
│
│── errors/
│   ├── AppError.ts        # Base custom error class
│   └── error.types.ts
│
└── utils/
    ├── generateInvoiceNumber.ts
    ├── idempotency.ts
    ├── date.ts
    └── crypto.ts
```

### **Why this exists**

* All reusable components live here
* Prevents duplication
* Ensures common logic is centralized
* Helps create thin, maintainable modules

---

# 📌 **4. `modules/` — Domain Modules (Feature Folders)**

Each domain is treated like a **self-contained mini microservice** inside the monolith.

```
modules/
│
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.repository.ts
│   ├── auth.routes.ts
│   ├── auth.model.ts
│   ├── dto/
│   └── types/
│
├── invoices/
│   ├── invoice.controller.ts
│   ├── invoice.service.ts
│   ├── invoice.repository.ts
│   ├── invoice.routes.ts
│   ├── invoice.model.ts
│   ├── dto/
│   └── types/
│
├── clients/
├── payments/
├── notifications/
├── items/
├── users/
└── settings/
```

### **Why this exists**

* Every feature/domain is isolated
* Easy to extract any module to a microservice later
* No cross-module spaghetti code
* Highly testable
* Encourages clean architecture:

  * **controller** → handles request/response
  * **service** → business logic
  * **repository** → database interaction
  * **model** → mongoose model (or future Prisma/Postgres model)

---

# 📌 **5. `adapters/` — External Service Wrappers (Email/SMS/Payments)**

```
adapters/
│── email/
│   ├── email.interface.ts
│   ├── resend.adapter.ts
│   └── ses.adapter.ts
│
│── sms/
│   ├── sms.interface.ts
│   ├── twilio.adapter.ts
│   └── msg91.adapter.ts
│
└── payment/
    ├── payment.interface.ts
    ├── razorpay.adapter.ts
    └── stripe.adapter.ts
```

### **Why this exists**

* NEVER call external SDKs directly inside controllers/services
* Easy fallback logic

  * e.g., Twilio → MSG91
  * Resend → SES
* Easy to mock in tests
* Replace any 3rd-party provider without changing business logic
* Makes code **clean and test-friendly**

---

# 📌 **6. `jobs/` — Background Workers (BullMQ)**

```
jobs/
│── email/
│   └── email.process.ts
│── sms/
│── payment/
└── invoice/
```

### **Why this exists**

* Any heavy task should run asynchronously:

  * sending email
  * sending SMS
  * generating PDFs
  * payment webhook processing
* Keeps controllers fast
* Allows retries
* Works great with Redis queues
* Proven scalable pattern

---

# 📌 **7. `tests/` — Unit & Integration Tests**

```
tests/
│── auth/
│── invoices/
│── payments/
└── utils/
```

### **Why this exists**

* Each module gets its own test suite
* Isolated tests thanks to adapters & DI
* Integration tests hit only module boundaries

---

# 📌 **8. `index.ts` — Entry Point**

```
index.ts
```

### **Why this exists**

* The root file that starts the entire application
* Loads env, bootstrap, and calls `server.ts`

---
