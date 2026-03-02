# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Build & Dev Commands

- `npm run dev` — start Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint (uses flat config in `eslint.config.mjs`)
- `npx shadcn add <component>` — add shadcn/ui components (configured in `components.json`, new-york style)

No test framework is currently configured.

## Architecture

**DevEvent** is a Next.js 16 App Router application (React 19, TypeScript) for browsing developer events (meetups, hackathons, conferences).

### Key Technology Choices

- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config` file; all theme tokens are CSS custom properties in `app/globals.css`
- **shadcn/ui** (new-york style, RSC-enabled) with Radix UI primitives and Lucide icons
- **PostHog** analytics initialized in `instrumentation-client.ts` (Next.js 16 client instrumentation hook)
- **MongoDB** as the database (connection via `MONGODB_URL` env var)
- **OGL** (WebGL) powers the `LightRays` background effect component

### Path Alias

`@/*` maps to the project root (configured in `tsconfig.json`). Always use this alias for imports.

### Project Layout

- `app/` — Next.js App Router: layouts, pages, `globals.css`
- `components/` — React components (both server and client)
- `lib/constants.ts` — static event data
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `public/icons/`, `public/images/` — static assets

### Styling Conventions

Custom Tailwind utilities are defined in `app/globals.css` using `@utility`:
- `flex-center` — flex centered
- `text-gradient` — gradient text effect
- `glass` — glassmorphism backdrop
- `card-shadow` — card drop shadow

Component-specific styles use `@layer components` with ID selectors (e.g., `#event-card`, `#explore-btn`, `#book-event`). When adding new page sections, follow this pattern.

### Fonts

Two custom fonts loaded via `next/font/google` in `app/layout.tsx`:
- **Schibsted Grotesk** (`--font-schibsted-grotesk`) — primary text
- **Martian Mono** (`--font-martian-mono`) — monospace accent

### Environment Variables

Required in `.env`:
- `NEXT_PUBLIC_POSTHOG_KEY` — PostHog project API key
- `NEXT_PUBLIC_POSTHOG_HOST` — PostHog ingest host
- `MONGODB_URL` — MongoDB connection string

### Client Components

Components using browser APIs or interactivity must have the `"use client"` directive. Currently `ExploreBtn` and `LightRays` are client components; all others are server components by default.
