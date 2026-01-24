# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 16.1.4 application using the App Router architecture, React 19, TypeScript, and Tailwind CSS v4. The project uses pnpm as its package manager (note: `pnpm-workspace.yaml` and `pnpm-lock.yaml` are present).

## Common Commands

**Development:**
```bash
pnpm dev          # Start development server on http://localhost:3000
pnpm build        # Create production build
pnpm start        # Start production server
```

**Code Quality:**
```bash
pnpm lint         # Run ESLint (uses eslint-config-next with TypeScript support)
```

**Note:** There are no test scripts configured in this project yet. If adding tests, follow Next.js conventions (typically with Jest or Vitest).

## Architecture & Structure

**App Router Structure:**
- Uses Next.js App Router (app directory) with file-based routing
- `app/layout.tsx` - Root layout with Geist font configuration and global metadata
- `app/page.tsx` - Home page component
- `app/globals.css` - Global styles with Tailwind CSS v4 imports and custom CSS variables

**Styling:**
- Uses Tailwind CSS v4 (PostCSS-based, configured in `postcss.config.mjs`)
- Custom design tokens defined in `app/globals.css` using CSS variables
- Dark mode support via `prefers-color-scheme` media query
- Fonts: Geist Sans and Geist Mono loaded via `next/font/google`

**TypeScript Configuration:**
- Path alias `@/*` maps to root directory for cleaner imports
- Strict mode enabled
- React JSX transform (`"jsx": "react-jsx"`)

**ESLint Configuration:**
- Uses `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Custom ignores for `.next/`, `out/`, `build/`, and `next-env.d.ts`

## Key Considerations

- Always use pnpm (not npm or yarn) for package management
- When creating new pages/routes, follow the App Router conventions in the `app/` directory
- Server Components are the default; use `"use client"` directive only when needed (e.g., for hooks, event handlers)
- Image optimization: Use `next/image` component (already imported in existing pages)
- Path imports: Use `@/*` alias for cleaner imports (e.g., `@/app/components/Button`)
