# VibeRise — Landing Page

A modern, neon-styled landing page for **VibeRise**, built with prompt-driven development (Vercel v0). It presents the product story — animated hero, problem/solution narrative, how-it-works, target audience, and FAQ — plus a real working waitlist backed by Upstash (Vercel KV).

## What it does

- Renders a full marketing site for the VibeRise product with an animated, neon-inspired hero and floating "coin" visuals.
- Provides a **working waitlist signup**: visitors submit an email + role (investor / talent / supporter) through `POST /api/waitlist`; duplicates are rejected and the live signup count is exposed via `GET /api/waitlist`.
- Includes custom loading, 404, and error pages; fully responsive and mobile-first with reduced-motion accessibility support.

## Features

- Neon-inspired animated hero with floating "coin" visuals and confetti burst on signup
- Scroll-linked section animations via Framer Motion presets
- Waitlist form with email validation, role selection, duplicate protection, and success state
- Storage abstraction: Upstash Redis (Vercel KV) when configured, in-memory fallback for local dev
- shadcn/ui component set (dialog, toast, accordion FAQ, tabs, form, etc.)
- Vercel Analytics + Speed Insights wired in
- Accessible markup, keyboard-friendly navigation, prefers-reduced-motion respected

## Tech stack

- **Framework:** Next.js 15.2 (App Router, RSC-first), React 19, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui, `next-themes`
- **Motion:** Framer Motion, canvas-confetti
- **Data:** Upstash Redis via `@vercel/kv` (`lib/waitlist-store.ts`, `lib/upstash.ts`)
- **Forms:** React Hook Form + Zod (`@hookform/resolvers`)
- **Icons:** Lucide React
- **Observability:** `@vercel/analytics`, `@vercel/speed-insights`

## Quick start

Requirements: Node.js 18+ and npm (or pnpm/yarn).

```bash
npm install          # or: pnpm install
npm run dev          # open http://localhost:3000
```

Build and run production:

```bash
npm run build
npm run start
```

## Environment variables

The waitlist works out of the box with the in-memory store (local dev). For a persistent, shared store, set Upstash/Vercel KV credentials:

| Variable | Purpose |
|---|---|
| `KV_REST_API_URL` | Upstash Redis REST URL |
| `KV_REST_API_TOKEN` | Upstash Redis REST token |

`GET /api/waitlist` reports which backend is active (`kv` vs `memory`).

## Project structure

```
app/                        # Next.js App Router
  page.tsx                  # renders the LandingPage
  layout.tsx                # root layout, fonts, providers
  globals.css               # Tailwind + custom styles
  loading.tsx / error.tsx / not-found.tsx
  api/waitlist/route.ts     # waitlist API (GET count, POST signup)
components/viberise/
  landing-page.tsx          # page composition
  components/sections/      # Hero, Problem, Solution, HowItWorks, ForWhom, FAQ
  components/layout/        # header, footer
  components/brand/         # logo, wordmark
  components/feedback/      # waitlist form + success states
  components/visuals/       # animated coin/hero visuals
  hooks/                    # scroll + reduced-motion hooks
  utils/                    # confetti burst, motion presets
lib/
  waitlist-store.ts         # waitlist storage abstraction + email validation
  upstash.ts                # KV configuration check
  site.ts                   # site metadata/content
public/                     # static assets
```

## Deployment

This is a **dynamic app** (API route + optional Upstash KV), so it needs a Node.js server runtime — Vercel (recommended) or any Node host. It cannot be statically exported because of the `/api/waitlist` route.

```bash
# Vercel
vercel --prod
```

Set `KV_REST_API_URL` / `KV_REST_API_TOKEN` in the host's environment for a persistent waitlist.

## License

Free to use and adapt.

---
Built by Girish Lade · https://ladestack.in
