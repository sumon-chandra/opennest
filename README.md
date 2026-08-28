<p align="center">
  <img src="public/logo.png" alt="OpenNest Logo" width="80" />
</p>

<h1 align="center">OpenNest</h1>

<p align="center">
  <strong>A modern, full-featured property rental management platform built with Next.js 16.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#url-routes">URL Routes</a> •
  <a href="#environment-variables">Environment Variables</a> •
  <a href="#scripts">Scripts</a>
</p>

---

## Overview

**OpenNest** is a premium property rental platform that connects landlords, tenants, and administrators. It features a rich public-facing storefront for browsing and filtering properties, a multi-role dashboard system with analytics and management tools, and integrated payment processing — all wrapped in a polished, dark-mode-ready UI with smooth animations.

---

## Features

### 🏠 Public Storefront

- **Hero landing page** with system features, platform benefits, how-it-works guide, stats, and call-to-action sections
- **Property browsing** with advanced search, filtering (location, price range, bedrooms, amenities), sorting, and pagination
- **Property detail pages** with image galleries, rich-text descriptions, amenity lists, reviews, and landlord info
- **Category browsing** to explore properties by type
- **About, Contact, and FAQ** informational pages

### 🔐 Authentication

- JWT-based authentication with access and refresh tokens
- Secure cookie storage with automatic token refresh
- Role-based access control (Admin, Landlord, Tenant)
- User registration with role selection
- Profile management with avatar support

### 📊 Dashboard — Admin

- **Overview** with platform-wide statistics (users, properties, financials, rental requests, engagement)
- **User Management** — view all users, search, update status (Active/Banned)
- **Property Moderation** — review and update property statuses
- **Rental Request Management** — oversee all rental requests across the platform
- **Review Moderation** — view and delete inappropriate reviews

### 🏗️ Dashboard — Landlord

- **Overview** with personal revenue metrics, active properties, and recent bookings
- **Property Management** — full CRUD with rich-text editor, image uploads (Cloudinary), amenity selection, categorization, and drag-and-drop sorting
- **Requests & Bookings** — manage incoming rental requests (approve, reject, etc.)
- **Payment History** — track all incoming payments with status tracking
- **Reporting** — interactive charts and analytics on property performance

### 🏡 Dashboard — Tenant

- **Overview** with booking stats, pending requests, saved properties, and total investment
- **Rental Requests** — view all requests with status tracking, submit new rental requests
- **Payment History** — track payment records with provider and status details
- **My Reviews** — manage reviews left on rented properties

### 💳 Payments

- Integrated payment flow with **Stripe** and **SSLCommerz** support
- Payment status tracking (Pending, Completed, Failed, Refunded)
- Payment success confirmation page

### 🎨 UI/UX

- **Dark mode / Light mode** with system preference detection via `next-themes`
- **Framer Motion** animations throughout the interface
- **Responsive design** — mobile-first with a dedicated `useMobile` hook
- **Shadcn UI** component library (30+ components) for a consistent design system
- **OKLCH color system** for perceptually uniform, accessible theming
- **Outfit** font from Google Fonts for modern typography
- **Sonner** toast notifications for real-time user feedback
- **Progress bar** navigation indicator
- **Loading skeletons** and error boundaries for graceful state handling
- **Rich text editor** (React Quill) for property descriptions

### ⚙️ Architecture & DX

- **Next.js 16** App Router with route groups and nested layouts
- **React 19** with Server Components and Server Actions
- **TanStack React Query** for client-side data fetching and cache management
- **TanStack React Table** for feature-rich data tables (sorting, filtering, pagination)
- **Zod v4** schema validation for forms
- **React Hook Form** with Zod resolver for type-safe form handling
- **Cloudinary** for image upload, optimization, and management
- **Multi-backend failover** — the API client automatically cycles through multiple backend URLs
- **TypeScript** throughout with strict, well-defined types for every entity

---

## Tech Stack

| Category              | Technology                                                                        |
| --------------------- | --------------------------------------------------------------------------------- |
| **Framework**         | [Next.js 16](https://nextjs.org/) (App Router)                                    |
| **Language**          | [TypeScript 5](https://www.typescriptlang.org/)                                   |
| **UI Library**        | [React 19](https://react.dev/)                                                    |
| **Styling**           | [Tailwind CSS 4](https://tailwindcss.com/) + OKLCH tokens                         |
| **Component Library** | [shadcn/ui](https://ui.shadcn.com/) (30+ components)                              |
| **Animations**        | [Framer Motion](https://www.framer.com/motion/)                                   |
| **Data Fetching**     | [TanStack React Query](https://tanstack.com/query)                                |
| **Data Tables**       | [TanStack React Table](https://tanstack.com/table)                                |
| **Forms**             | [React Hook Form](https://react-hook-form.com/) + [Zod v4](https://zod.dev/)      |
| **Rich Text**         | [React Quill](https://github.com/zenoamaro/react-quill)                           |
| **Charts**            | [Recharts](https://recharts.org/)                                                 |
| **Drag & Drop**       | [@dnd-kit](https://dndkit.com/)                                                   |
| **Image Management**  | [Cloudinary](https://cloudinary.com/) + [Sharp](https://sharp.pixelplumbing.com/) |
| **Theming**           | [next-themes](https://github.com/pacocoursey/next-themes)                         |
| **Notifications**     | [Sonner](https://sonner.emilkowal.dev/)                                           |
| **Auth**              | JWT (Access + Refresh tokens)                                                     |
| **Icons**             | [Lucide React](https://lucide.dev/)                                               |
| **Date Utilities**    | [date-fns](https://date-fns.org/)                                                 |
| **Package Manager**   | [Bun](https://bun.sh/)                                                            |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18 (or [Bun](https://bun.sh/))
- A running backend API (see [Environment Variables](#environment-variables))
- A [Cloudinary](https://cloudinary.com/) account for image uploads

### Installation

```bash
# Clone the repository
git clone https://github.com/sumon-chandra/opennest.git
cd opennest

# Install dependencies (using bun)
bun install

# Or with npm
npm install
```

### Environment Setup

Create a `.env` file in the project root (see [Environment Variables](#environment-variables) for details):

```env
BACKEND_API_URLS=https://your-api.vercel.app/api/v1
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run the Development Server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
opennest/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group (no public nav)
│   │   ├── login/                # Login page
│   │   ├── signup/               # Registration page
│   │   └── _actions/             # Server actions for auth
│   ├── (public)/                 # Public route group (with navbar/footer)
│   │   ├── page.tsx              # Home page
│   │   ├── properties/           # Property listing + detail pages
│   │   ├── categories/           # Category browsing
│   │   ├── about/                # About page
│   │   ├── contact/              # Contact page
│   │   ├── faq/                  # FAQ page
│   │   └── profile/              # User profile management
│   ├── dashboard/                # Protected dashboard area
│   │   ├── admin/                # Admin dashboard
│   │   │   ├── page.tsx          # Admin overview
│   │   │   ├── users/            # User management
│   │   │   ├── properties/       # Property moderation
│   │   │   ├── rental-requests/  # Rental request oversight
│   │   │   └── reviews/          # Review moderation
│   │   ├── landlord/             # Landlord dashboard
│   │   │   ├── page.tsx          # Landlord overview
│   │   │   ├── properties/       # Property CRUD (list, create, edit)
│   │   │   ├── requests/         # Booking request management
│   │   │   ├── payments/         # Payment history
│   │   │   └── reporting/        # Analytics & reporting
│   │   └── tenant/               # Tenant dashboard
│   │       ├── page.tsx          # Tenant overview
│   │       ├── requests/         # Rental request tracking
│   │       ├── payments/         # Payment history
│   │       └── reviews/          # Review management
│   ├── payment-success/          # Post-payment confirmation
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles + design tokens
│   └── not-found.tsx             # Custom 404 page
├── components/
│   ├── ui/                       # shadcn/ui primitives (30+ components)
│   ├── shared/                   # Navbar, Footer
│   ├── (public)/                 # Public page components
│   ├── property/                 # PropertyCard component
│   ├── dashboard/                # Dashboard-specific components
│   ├── common/                   # Shared utilities (ProgressBar, etc.)
│   └── AppProviders.tsx          # Client-side provider composition
├── services/                     # Server-side API service layer
│   ├── auth-service.ts           # Auth operations (getAuthUser, logout)
│   ├── users.service.ts          # User registration
│   ├── admin.service.ts          # Admin API calls
│   └── refresh-token.ts          # JWT token refresh logic
├── types/                        # TypeScript type definitions
│   ├── index.ts                  # Shared types (Role, Status enums, ApiResponse)
│   ├── property.ts               # Property, Category, Landlord types
│   ├── user.ts                   # User, TenantStats types
│   ├── payment.ts                # Payment types (Stripe/SSLCommerz)
│   ├── requests.ts               # RentalRequest types
│   ├── reviews.ts                # Review types
│   ├── admin.ts                  # Admin statistics types
│   └── category.ts               # Category type
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts             # Responsive breakpoint hook
│   ├── usePropertiesFilters.ts   # Property filter state management
│   └── usePropertiesPagination.ts# Pagination state management
├── lib/                          # Library / config
│   ├── constants.ts              # Navigation links, amenities, locations, FAQ
│   ├── property-schema.ts        # Zod validation for property forms
│   └── utils.ts                  # General utilities (cn helper)
├── utils/                        # Utility functions
│   ├── apiFetch.ts               # Multi-backend fetch with failover
│   └── cloudinary.ts             # Cloudinary upload/delete helpers
├── utilities/
│   └── jwt.ts                    # JWT verification utility
└── public/                       # Static assets (icons, images)
```

---

## URL Routes

### Public Pages

| Route              | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| `/`                | Home page — Hero, features, benefits, how-it-works, stats, CTA |
| `/properties`      | Property listing with search, filters, sorting, and pagination |
| `/properties/[id]` | Property detail page with gallery, description, reviews        |
| `/categories`      | Browse properties by category                                  |
| `/about`           | About OpenNest                                                 |
| `/contact`         | Contact form                                                   |
| `/faq`             | Frequently asked questions                                     |
| `/profile`         | User profile management                                        |
| `/payment-success` | Post-payment confirmation page                                 |

### Authentication

| Route     | Description                 |
| --------- | --------------------------- |
| `/login`  | User login                  |
| `/signup` | User registration with role |

### Dashboard — Admin

| Route                              | Description                         |
| ---------------------------------- | ----------------------------------- |
| `/dashboard/admin`                 | Admin overview with platform stats  |
| `/dashboard/admin/users`           | User management (search, ban/unban) |
| `/dashboard/admin/properties`      | Property moderation                 |
| `/dashboard/admin/rental-requests` | All rental requests oversight       |
| `/dashboard/admin/reviews`         | Review moderation                   |

### Dashboard — Landlord

| Route                                   | Description                            |
| --------------------------------------- | -------------------------------------- |
| `/dashboard/landlord`                   | Landlord overview with revenue metrics |
| `/dashboard/landlord/properties`        | Property listing management            |
| `/dashboard/landlord/properties/create` | Create a new property listing          |
| `/dashboard/landlord/properties/[id]`   | Edit an existing property              |
| `/dashboard/landlord/requests`          | Manage incoming booking requests       |
| `/dashboard/landlord/payments`          | Payment history and tracking           |
| `/dashboard/landlord/reporting`         | Analytics and performance charts       |

### Dashboard — Tenant

| Route                        | Description                |
| ---------------------------- | -------------------------- |
| `/dashboard/tenant`          | Tenant overview with stats |
| `/dashboard/tenant/requests` | Rental request history     |
| `/dashboard/tenant/payments` | Payment history            |
| `/dashboard/tenant/reviews`  | Review management          |

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

| Variable                            | Description                                              | Required |
| ----------------------------------- | -------------------------------------------------------- | -------- |
| `BACKEND_API_URLS`                  | Comma-separated backend API base URLs (failover support) | ✅       |
| `JWT_ACCESS_SECRET`                 | Secret key for verifying JWT access tokens               | ✅       |
| `JWT_REFRESH_SECRET`                | Secret key for verifying JWT refresh tokens              | ✅       |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                                    | ✅       |
| `CLOUDINARY_API_KEY`                | Cloudinary API key                                       | ✅       |
| `CLOUDINARY_API_SECRET`             | Cloudinary API secret                                    | ✅       |

> **Note:** `BACKEND_API_URLS` supports multiple comma-separated URLs for automatic failover. The client will try each URL in order until one succeeds.

---

## Scripts

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `bun dev`           | Start the development server                  |
| `bun run build`     | Build the production bundle                   |
| `bun start`         | Start the production server                   |
| `bun run lint`      | Run ESLint                                    |
| `bun run format`    | Format all `.ts` / `.tsx` files with Prettier |
| `bun run typecheck` | Run TypeScript type checking without emitting |

> All commands also work with `npm` — replace `bun` with `npm run`.

---

## User Roles

OpenNest supports three user roles, each with distinct permissions:

| Role         | Capabilities                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------- |
| **Admin**    | Full platform oversight — manage users, moderate properties and reviews, oversee all requests |
| **Landlord** | List and manage properties, handle booking requests, track payments, view analytics           |
| **Tenant**   | Browse properties, submit rental requests, make payments, leave reviews                       |

---

## API Architecture

The frontend communicates with a RESTful backend API through a server-side service layer:

- **`utils/apiFetch.ts`** — A resilient fetch wrapper that cycles through multiple backend URLs for automatic failover
- **`services/`** — Server Actions that encapsulate all API calls, handling authentication headers and token refresh transparently
- **`services/refresh-token.ts`** — Automatic JWT token rotation — if the access token is expired but the refresh token is valid, a new access token is obtained seamlessly

---

## License

This project is private and not currently licensed for public distribution.
