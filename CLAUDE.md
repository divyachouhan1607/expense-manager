# Expense Manager

Personal expense tracking app built with modern web technologies.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS v4
- **Auth**: NextAuth.js v5 (beta)
- **Validation**: Zod
- **Testing**: Vitest + React Testing Library
- **Formatting**: Prettier + ESLint

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run test         # Vitest (watch mode)
npm run test:ci      # Vitest (single run, coverage)
npx prisma studio    # Database GUI
npx prisma migrate dev --name <name>  # Create migration
npx prisma generate  # Regenerate client after schema change
```

## Project Structure

```
src/
  app/              # Next.js App Router pages and layouts
    api/            # API routes (prefer Server Actions instead)
    (auth)/         # Auth-related pages (login, register)
    (dashboard)/    # Protected dashboard pages
  components/       # Reusable React components
    ui/             # Primitive UI components (Button, Input, etc.)
  lib/              # Shared utilities and configuration
    db.ts           # Prisma client singleton
    auth.ts         # NextAuth configuration
    validations/    # Zod schemas
  actions/          # Server Actions
  types/            # TypeScript type definitions
prisma/
  schema.prisma     # Database schema
  migrations/       # Migration history
tests/              # Integration/E2E tests
```

## Coding Standards

- **Server Components by default** - only add `"use client"` when needed (interactivity, hooks, browser APIs)
- **Money in cents** - store all monetary values as integers (cents) to avoid floating-point issues
- **Zod everywhere** - validate all user input with Zod schemas, both client and server
- **No `any`** - use `unknown` and narrow with type guards instead
- **Conventional Commits** - `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`
- **Prefer Server Actions** over API routes for mutations
- **Co-locate tests** - place `*.test.ts(x)` next to source files
- **Named exports** - prefer named exports over default exports (except pages/layouts)

## Environment

- **OS**: Windows 11
- **Shell**: Git Bash / PowerShell (use cross-platform commands)
- **Path separator**: Use forward slashes in code, OS-agnostic in scripts

## Path-Scoped Rules

Detailed rules auto-load based on file context:
- `@.claude/rules/frontend.md` - Component and UI patterns
- `@.claude/rules/api.md` - API and Server Action patterns
- `@.claude/rules/database.md` - Prisma and database patterns
- `@.claude/rules/testing.md` - Testing patterns and conventions
