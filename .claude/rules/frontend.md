---
globs: ["src/components/**", "src/app/**/*.tsx"]
description: Frontend component and UI conventions
---

# Frontend Rules

## Server vs Client Components
- Default to Server Components (no directive needed)
- Only add `"use client"` when the component uses: hooks, event handlers, browser APIs, or context
- Keep client components small — push state to the leaf, keep data fetching at the root

## Styling
- Use Tailwind CSS utility classes exclusively — no CSS modules or styled-components
- Follow mobile-first responsive design: `base` -> `sm:` -> `md:` -> `lg:`
- Use `cn()` helper (clsx + tailwind-merge) for conditional classes
- Design tokens via Tailwind config — never hardcode colors or spacing values

## Forms
- Use `react-hook-form` with Zod resolver for all forms
- Define Zod schemas in `src/lib/validations/` and share between client and server
- Show inline validation errors below each field
- Disable submit button while submitting, show loading state

## Accessibility
- All interactive elements must be keyboard accessible
- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<section>`)
- Images require `alt` text; decorative images use `alt=""`
- Form inputs must have associated `<label>` elements
- Use `aria-` attributes only when semantic HTML is insufficient

## Component Patterns
- One component per file, named export matching filename
- Props interface defined above the component: `interface ButtonProps { ... }`
- Use `React.forwardRef` for components that wrap native elements
- Colocate component-specific types in the same file

## Money Display
- Always format cents to display currency: `(amount / 100).toFixed(2)`
- Use `Intl.NumberFormat` for locale-aware currency formatting
- Never pass raw cent values to UI — convert at the component boundary
