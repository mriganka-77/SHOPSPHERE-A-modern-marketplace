# 🛍️ ShopSphere — Modern E-Commerce Marketplace

ShopSphere is a highly interactive, premium, full-stack e-commerce marketplace built using **TanStack Start**, **React 19**, and **Tailwind CSS v4**. It features a refined user experience, custom transitions, a robust state management system, and responsive layout designs tailored for modern web browsing.

Live Site: [https://shopsphere-a-modern-marketplace.vercel.app/](https://shopsphere-a-modern-marketplace.vercel.app/)

---

## ✨ Features

- 📦 **Dynamic Product Catalog**: Browse products with client-side category filtering, sorting, and live search.
- 🔍 **Detailed Product Pages**: Deep-dive product views featuring high-quality image galleries, specifications, and related items.
- 🛒 **Interactive Cart**: Real-time cart state management with persistent storage, side-panel slide-out (drawer), and item updates.
- 💳 **Seamless Checkout Flow**: Multi-step, client-side validated checkout process with custom shipping/billing addresses and order summarization.
- 🏷️ **Dynamic Categories**: Filter products by department (electronics, fashion, jewelry, home, and more).
- 🌓 **Aesthetic Theme System**: Sleek modern dark mode and light mode tailormade using OKLCH color profiles.
- 🪄 **Fluid Micro-interactions**: Smooth transitions and animations powered by Framer Motion.
- 🛡️ **Robust Validation**: Forms and API payloads validated via Zod and integrated with React Hook Form.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (Server-side rendering, streaming, and server functions built on Vite & Nitro)
- **Frontend Core**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & CSS variables with HSL/OKLCH color system
- **State Management & Queries**: [TanStack Query v5](https://tanstack.com/query/latest) & React Context API
- **Routing**: [TanStack Router](https://tanstack.com/router/latest) (Typesafe file-based routing)
- **UI Components**: Radix UI primitives & Lucide React icons
- **Animations**: Motion (Framer Motion)
- **Form Handling**: React Hook Form & Zod validation resolvers
- **Deployment**: Vercel & [Nitro Engine](https://nitro.unjs.io/)

---

## 📂 Project Structure

```bash
├── public/                  # Static assets (Favicons, images)
├── src/
│   ├── components/          # Reusable UI components (buttons, inputs, cards, layouts)
│   ├── context/             # React context providers (Cart, Theme)
│   ├── data/                # Mock datasets / API definitions
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries, error capturing, helpers
│   ├── routes/              # TanStack Router file-based routes
│   │   ├── __root.tsx       # Root layout, meta definitions, navigation wrapper
│   │   ├── index.tsx        # Homepage
│   │   ├── products.$id.tsx # Dynamic product detail page
│   │   ├── cart.tsx         # Detailed shopping cart page
│   │   └── checkout.tsx     # Order checkout
│   ├── server.ts            # Server entry point wrapper (Nitro adapter)
│   ├── start.ts             # Client hydration entry point
│   ├── styles.css           # Global Tailwind CSS directives & theme design tokens
│   └── routeTree.gen.ts     # Automatically generated type-safe routes
├── package.json             # Build commands and package dependencies
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration featuring TanStack Start & Nitro
```

---

## 🚀 Getting Started

### Prerequisites

You will need [Node.js](https://nodejs.org/) installed (v18+ recommended) along with standard package managers (`npm`, `pnpm`, or `bun`).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mriganka-77/SHOPSPHERE-A-modern-marketplace.git
   cd SHOPSPHERE-A-modern-marketplace
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To spin up the local development server:
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

### Building for Production

Compile both the client-side files and server-side functions:
```bash
npm run build
```
This command compiles the project outputs and saves the runtime structure in the `.output/` directory ready for deployment.

---

## ☁️ Deployment (Vercel)

ShopSphere is designed to deploy seamlessly on Vercel:

1. **Framework Preset**: In Vercel Project Settings, select **TanStack Start** (or **Vite** / **Other**).
2. **Build Configuration**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.output`
3. Nitro will automatically bundle the server routing into Vercel Serverless Functions.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
