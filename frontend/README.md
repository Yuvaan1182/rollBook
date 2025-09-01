# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# Invoxy SaaS App – React + TypeScript Folder Structure

This document defines the **modular folder structure** for the **Invoxy SaaS App** frontend, built with **React + TypeScript**.  
It follows a **feature-first architecture** where each feature is self-contained (components, services, hooks, utils, and types).  

This ensures **scalability, maintainability, and clarity** as the application grows.

---

## 📂 Folder Structure

src/
│── app/
│ ├── store/ # Redux / Zustand / Context store
│ ├── hooks/ # Global reusable hooks
│ ├── providers/ # App-wide providers (Theme, Router, QueryClient, StripeProvider)
│ ├── routes/ # Route definitions + guards (protected routes, role-based)
│ └── App.tsx # Main App component
│
│── assets/ # Images, fonts, icons, global styles
│
│── components/
│ ├── ui/ # Reusable generic UI (Button, Input, Modal, Dropdown)
│ ├── layout/ # Layout components (Navbar, Sidebar, Footer, DashboardShell)
│ └── feedback/ # Toasts, Alerts, Loaders, Skeletons
│
│── features/ # Feature-based modules
│ ├── auth/ # Authentication & 2FA
│ │ ├── components/ # LoginForm, SignupForm, TwoFactorForm
│ │ ├── hooks/ # useAuth, use2FA
│ │ ├── services/ # Auth API (login, register, refresh, logout)
│ │ ├── utils/ # Token utils, storage helpers
│ │ ├── types/ # Auth-related types (User, Session)
│ │ └── index.ts
│ │
│ ├── invoices/ # Invoice Management
│ │ ├── components/ # InvoiceForm, InvoiceList, InvoicePreview
│ │ ├── hooks/ # useInvoices, useInvoicePDF
│ │ ├── services/ # Invoice API (create, update, fetch, delete)
│ │ ├── types/ # Invoice, LineItem, Tax
│ │ └── index.ts
│ │
│ ├── payments/ # Payment Integrations (Stripe, Razorpay, fallback)
│ │ ├── components/ # PaymentForm, PaymentHistory
│ │ ├── hooks/ # usePaymentIntent, usePaymentStatus
│ │ ├── services/ # Payment API calls, fallback logic
│ │ ├── types/ # Payment, Transaction
│ │ └── index.ts
│ │
│ ├── subscriptions/ # User Plans & Billing
│ │ ├── components/ # PlanSelector, SubscriptionCard
│ │ ├── hooks/ # useSubscription, usePlanLimits
│ │ ├── services/ # Stripe subscription APIs
│ │ ├── types/ # Plan, Usage, Subscription
│ │ └── index.ts
│ │
│ ├── analytics/ # Dashboard Analytics
│ │ ├── components/ # RevenueChart, UsageStats, ExpenseBreakdown
│ │ ├── hooks/ # useAnalytics, useDashboardData
│ │ ├── services/ # Analytics API
│ │ ├── types/ # ChartData, KPI
│ │ └── index.ts
│
│── lib/ # Wrappers for external libraries (axios client, stripe sdk, date-fns config)
│
│── services/ # Global services (logger, analytics tracker, auth refresh, error handler)
│
│── styles/ # Global styles, Tailwind config, theme files
│
│── utils/ # Global helpers (formatDate, debounce, validators)
│
│── types/ # Global TypeScript types (ApiResponse, AppError, CommonDTOs)
│
│── index.tsx # Entry point
│── vite-env.d.ts # Vite/TS config types


---

## 🔑 Design Principles

1. **Feature-First (Modular)**  
   Each module (auth, invoices, payments, subscriptions, analytics) is **self-contained** with its own UI, hooks, services, types, and utils.  

2. **Separation of Concerns**  
   - `components/ui` → Shared generic UI (Button, Modal, Dropdown).  
   - `features/*/components` → Feature-specific UI (InvoiceForm, PlanSelector).  
   - `services` → Global APIs (analytics tracker, logger, auth refresh).  
   - `lib` → Wrappers for third-party libraries (Axios, Stripe, date-fns).  
   - `utils` → Global helper functions.  

3. **Scalability**  
   Adding a new module (e.g., `projects`, `notifications`) just requires a new folder inside `features/`.  

4. **Type Safety**  
   Each feature has its own `types/`, while shared DTOs and common contracts live in `src/types/`.  

---

## 🚀 Example Workflows

- **Login Flow** → `features/auth/services/authService.ts` + `features/auth/components/LoginForm.tsx`  
- **Create Invoice** → `features/invoices/services/invoiceService.ts` + `features/invoices/components/InvoiceForm.tsx`  
- **Process Payment** → `features/payments/hooks/usePaymentIntent.ts` + `features/payments/components/PaymentForm.tsx`  
- **Upgrade Subscription** → `features/subscriptions/components/PlanSelector.tsx` + `features/subscriptions/services/subscriptionService.ts`  
- **Analytics Dashboard** → `features/analytics/hooks/useDashboardData.ts` + `features/analytics/components/RevenueChart.tsx`  

---

This structure ensures that **Invoxy remains modular, scalable, and easy to maintain** as new features and integrations are added.

## Main Structure of frontend
src/
│── index.tsx
│── vite-env.d.ts
│
├── app/
│   ├── App.tsx
│   ├── store/
│   │   ├── index.ts          # configureStore setup
│   │   ├── rootReducer.ts    # combine feature slices
│   │   └── hooks.ts          # typed useDispatch & useSelector
│   ├── hooks/
│   │   └── useAppTheme.ts
│   ├── providers/
│   │   ├── RouterProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── QueryProvider.tsx
│   └── routes/
│       └── index.tsx
│
├── assets/                   
│   ├── images/.gitkeep
│   ├── fonts/.gitkeep
│   └── icons/.gitkeep
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── DashboardShell.tsx
│   └── feedback/
│       ├── Loader.tsx
│       ├── Toast.tsx
│       └── Alert.tsx
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   └── TwoFactorForm.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   ├── slice.ts          # Redux slice for auth
│   │   ├── types/
│   │   │   └── authTypes.ts
│   │   ├── utils/
│   │   │   └── tokenUtils.ts
│   │   └── index.ts
│   │
│   ├── invoices/
│   │   ├── components/
│   │   │   ├── InvoiceForm.tsx
│   │   │   ├── InvoiceList.tsx
│   │   │   └── InvoicePreview.tsx
│   │   ├── hooks/
│   │   │   └── useInvoices.ts
│   │   ├── services/
│   │   │   └── invoiceService.ts
│   │   ├── slice.ts          # Redux slice for invoices
│   │   ├── types/
│   │   │   └── invoiceTypes.ts
│   │   └── index.ts
│   │
│   ├── payments/
│   │   ├── components/
│   │   │   ├── PaymentForm.tsx
│   │   │   └── PaymentHistory.tsx
│   │   ├── hooks/
│   │   │   └── usePaymentIntent.ts
│   │   ├── services/
│   │   │   └── paymentService.ts
│   │   ├── slice.ts          # Redux slice for payments
│   │   ├── types/
│   │   │   └── paymentTypes.ts
│   │   └── index.ts
│   │
│   ├── subscriptions/
│   │   ├── components/
│   │   │   ├── PlanSelector.tsx
│   │   │   └── SubscriptionCard.tsx
│   │   ├── hooks/
│   │   │   └── useSubscription.ts
│   │   ├── services/
│   │   │   └── subscriptionService.ts
│   │   ├── slice.ts          # Redux slice for subscriptions
│   │   ├── types/
│   │   │   └── subscriptionTypes.ts
│   │   └── index.ts
│   │
│   ├── analytics/
│   │   ├── components/
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── UsageStats.tsx
│   │   │   └── ExpenseBreakdown.tsx
│   │   ├── hooks/
│   │   │   └── useAnalytics.ts
│   │   ├── services/
│   │   │   └── analyticsService.ts
│   │   ├── slice.ts          # Redux slice for analytics
│   │   ├── types/
│   │   │   └── analyticsTypes.ts
│   │   └── index.ts
│
├── lib/
│   ├── axiosClient.ts
│   ├── stripeClient.ts
│   └── dateUtils.ts
│
├── services/
│   ├── logger.ts
│   ├── analyticsTracker.ts
│   └── errorHandler.ts
│
├── styles/
│   ├── globals.css
│   └── tailwind.css
│
├── utils/
│   ├── formatDate.ts
│   ├── debounce.ts
│   └── validators.ts
│
└── types/
    ├── api.ts
    ├── common.ts
    └── errors.ts
