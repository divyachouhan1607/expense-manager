# Feature Implementation Checklist

## Database Layer
- [ ] Add/modify models in `prisma/schema.prisma`
- [ ] Include `id`, `createdAt`, `updatedAt`, `deletedAt` fields
- [ ] Use `Int` for money fields (cents)
- [ ] Add appropriate indexes and relations
- [ ] Run `npx prisma migrate dev --name <descriptive_name>`
- [ ] Run `npx prisma generate`

## Validation Layer
- [ ] Create Zod schemas in `src/lib/validations/<feature>.ts`
- [ ] Include create, update, and query schemas as needed
- [ ] Export TypeScript types inferred from schemas

## Server Actions
- [ ] Create `src/actions/<feature>-actions.ts`
- [ ] Add `"use server"` directive at top
- [ ] Validate inputs with Zod schemas
- [ ] Check authentication with `auth()`
- [ ] Scope all queries to authenticated user
- [ ] Return `ActionResult<T>` type (success/error)
- [ ] Use Prisma transactions for multi-step mutations
- [ ] Filter soft-deleted records (`deletedAt: null`)

## Components
- [ ] Create components in `src/components/<feature>/`
- [ ] Server Components by default, `"use client"` only when needed
- [ ] Use Tailwind CSS for styling
- [ ] Use `react-hook-form` + Zod resolver for forms
- [ ] Format money with `Intl.NumberFormat`
- [ ] Ensure keyboard accessibility
- [ ] Use semantic HTML elements

## Pages
- [ ] Add/modify pages in `src/app/(dashboard)/`
- [ ] Use Server Components for data fetching
- [ ] Handle loading and error states

## Tests
- [ ] Co-locate test files next to source
- [ ] Test Server Actions: success and error paths
- [ ] Test components: user-visible behavior
- [ ] Query by role/label, not test IDs
- [ ] Mock only external dependencies
- [ ] Run `npm run test:ci` to verify all pass

## Final Verification
- [ ] `npm run lint` passes
- [ ] `npm run test:ci` passes
- [ ] `npm run build` succeeds
- [ ] Manual test in browser
