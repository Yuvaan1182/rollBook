# 📄 INVOXY (Automated Invoice Generator for Freelancers)

A SaaS application that helps freelancers create, send, and track invoices with PDF generation and payment links.

---

## 🚀 Features

### ✅ MVP Scope

* 🔐 User authentication (JWT based)
* 👤 Client management (CRUD)
* 🧾 Invoice generation with line items, tax, and discounts
* 📄 PDF export of invoices
* 📧 Email invoice to clients
* 💳 Stripe/Razorpay payment integration
* 📊 Dashboard with income summaries and invoice status

### 🌟 Planned Enhancements

* 🤁 Recurring invoices and reminder emails
* 🎨 Invoice design templates
* 👥 Multi-user/team support
* 📊 Advanced analytics dashboard
* 💰 Subscription plans with Stripe Checkout
* 🌐 Public invoice view + pay portal

### 🔹 Optional Suggestions (Future Enhancements)

| Feature                           | Description                                         |
| --------------------------------- | --------------------------------------------------- |
| 🧾 Invoice Item Library           | Save commonly used line items for quick reuse       |
| 🌍 i18n / Locale Support          | Multi-language and currency formatting              |
| 🥉 Custom Fields                  | User-defined fields in client, invoice, or project  |
| 🗓️ Due Date Notifications        | Email/SMS reminders before due                      |
| 📱 WhatsApp API Integration       | Send invoices or reminders via WhatsApp             |
| 🧠 AI Suggestions                 | Smart text generation for proposals/invoices        |
| 📥 Inbox Parsing                  | Auto-create client from email parsing               |
| 🔄 Zapier/Webhook Integration     | Connect with 3rd party tools like Notion, Slack     |
| 🧪 A/B Template Testing           | Test invoice/proposal templates for conversion      |
| 🧲 Regional Tax Formats           | Support GST, VAT, and region-specific formats       |
| 💼 Export to Marketplaces         | Convert proposal into Upwork/Fiverr-friendly format |
| 👨‍👩‍👦 Team Roles & Permissions | Admin, editor, viewer-level controls                |

---

## 🧠 Tech Stack

| Layer         | Technology                           |
| ------------- | ------------------------------------ |
| Frontend      | React, Tailwind CSS, Redux           |
| Backend       | Node.js, Express                     |
| Database      | MongoDB Atlas                        |
| Auth          | JWT, bcrypt                          |
| PDF Generator | pdf-lib / Puppeteer                  |
| Email Service | Nodemailer / Resend / SendGrid       |
| Payments      | Stripe / Razorpay                    |
| Hosting       | Vercel (FE), Render/Railway (BE)     |
| Storage       | Firebase Storage / AWS S3 (optional) |

---

## 🛠️ Local Development Setup

```bash
# Clone the repo
$ git clone https://github.com/your-username/invoice-saas.git
$ cd invoice-saas

# Install dependencies
$ cd backend && npm install
$ cd ../frontend && npm install

# Create .env files for backend and frontend
```

Example `.env` for backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
EMAIL_API_KEY=your_email_provider_key
```

---

## 🗓️ 4-Week Timeline

| Week | Focus                          |
| ---- | ------------------------------ |
| 1    | Auth, project setup, DB schema |
| 2    | Client & invoice CRUD          |
| 3    | PDF, email, and payments       |
| 4    | Dashboard, polish, deployment  |

---

## 📦 Folder Structure (Example)

```
invoice-saas/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
├── .env
└── README.md
```

## 🙌 Contributing
Pull requests and suggestions are welcome! Open an issue first to discuss any breaking changes.

📜 License
Software Engineer, IIIT Gwalior © Yuvaan Singh

