# 🛍️ Multi-Vendor Marketplace Frontend

A premium, high-performance, and scalable multi-vendor e-commerce frontend built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**. This project implements a professional architecture designed for large-scale marketplace applications.

---

## 🚀 Key Features

-   **🔐 Advanced Authentication**: Secure login/registration with JWT token management and proactive session expiry handling.
-   **🏪 Multi-Domain Architecture**: Organized using Next.js Route Groups for distinct User Store, Vendor Dashboard, and Admin contexts.
-   **🛍️ Dynamic Storefront**: Featured products, category-based browsing, and vendor-specific storefronts.
-   **📊 Vendor Dashboard**: Comprehensive tools for vendors to manage products, orders, and settings.
-   **🛒 Cart & Wishlist**: Global state management for persistent shopping experiences.
-   **🎨 Premium UI**: Atomic design system with high-quality, reusable components.
-   **⚡ Performance Optimized**: Leveraging React 19 and TanStack Query for efficient data fetching and caching.

---

## 🛠️ Tech Stack

-   **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
-   **Library**: [React 19](https://react.dev/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **State Management**:
    *   **Server State**: [TanStack Query v5](https://tanstack.com/query) (React Query)
    *   **Client State**: [Zustand](https://zustand-demo.pmnd.rs/)
-   **API Client**: [Axios](https://axios-http.com/) with Interceptors
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Feedback**: [React Hot Toast](https://react-hot-toast.com/)

---

## 🏗️ Core Architecture & Best Practices

This project follows industry-standard architectural patterns:

1.  **Route Groups**: Uses `(auth)`, `(dashboard)`, and `(store)` groups to maintain a clean URL structure while separating domain logic.
2.  **Service Layer**: All API communication is abstracted into a dedicated `services/` layer, keeping components focused on UI logic.
3.  **Atomic UI Components**: Primitive UI elements are centralized in `src/components/ui`, ensuring visual consistency.
4.  **Hybrid State Strategy**: Clear separation between global UI state (Zustand) and server-synchronized data (React Query).
5.  **Type Safety**: Comprehensive TypeScript interfaces for API responses and domain models.

---

## 📁 Project Structure

```text
src/
├── app/               # Next.js App Router (Route Groups)
├── components/        # UI Components (Atomic Design)
│   ├── ui/            # Primitive/Shared UI elements
│   └── [feature]/     # Feature-specific components
├── hooks/             # Custom React Hooks
├── lib/               # Utility libraries (Axios instance, Auth helpers)
├── services/          # API Service Layer (Domain-specific)
├── store/             # Global State (Zustand)
└── types/             # TypeScript Definitions
```

---

## 🏁 Getting Started

### Prerequisites

-   Node.js 20+ 
-   Yarn or NPM

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root and add your API URL:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1/
   ```

4. Run the development server:
   ```bash
   yarn dev
   ```

---

## 📝 Roadmap

- [ ] Implement React Hook Form + Zod for schema validation.
- [ ] Add automated token refresh logic in Axios interceptors.
- [ ] Comprehensive Unit & E2E Testing suite.
- [ ] Dark Mode support.

---

Developed with ❤️ for premium marketplace experiences.
