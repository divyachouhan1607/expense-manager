---
globs: ["src/app/api/**", "src/actions/**"]
description: API routes and Server Actions conventions
---

# API & Server Actions Rules

## Prefer Server Actions
- Use Server Actions (`"use server"`) for all mutations (create, update, delete)
- Only use API routes (`src/app/api/`) for: webhooks, external API consumption, file uploads
- Server Actions go in `src/actions/` with descriptive filenames (e.g., `expense-actions.ts`)

## Input Validation
- Validate ALL inputs with Zod at the start of every action/handler
- Return typed error objects, never throw from Server Actions
- Use a consistent return type:
  ```typescript
  type ActionResult<T> = { success: true; data: T } | { success: false; error: string }
  ```

## Authentication
- Check session at the start of every protected action/route
- Use `auth()` from NextAuth — never trust client-sent user IDs
- Return `{ success: false, error: "Unauthorized" }` for unauthenticated requests

## API Route Conventions
- Use Next.js route handlers with typed `NextRequest`/`NextResponse`
- Return consistent JSON shape: `{ data, error, meta }`
- Set appropriate HTTP status codes (200, 201, 400, 401, 404, 500)
- Handle errors with try/catch — never let raw errors reach the client

## Data Access
- Always scope queries to the authenticated user's data
- Use Prisma transactions for multi-step mutations
- Never expose internal IDs in error messages
