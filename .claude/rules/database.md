---
globs: ["prisma/**", "src/lib/db.ts"]
description: Prisma ORM and database conventions
---

# Database Rules

## Prisma Client
- Use singleton pattern in `src/lib/db.ts` to prevent connection exhaustion in dev:
  ```typescript
  const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
  export const db = globalForPrisma.prisma || new PrismaClient()
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db
  ```
- Always import from `@/lib/db`, never instantiate `new PrismaClient()` elsewhere

## Schema Conventions
- Use `uuid` for primary keys: `id String @id @default(uuid())`
- All tables include: `createdAt DateTime @default(now())` and `updatedAt DateTime @updatedAt`
- Soft delete with `deletedAt DateTime?` — add `@index` on `deletedAt` for filtered queries
- Money fields: `Int` type storing cents (e.g., `amount Int` where 1500 = $15.00)
- Use `@map` and `@@map` to keep snake_case in DB, camelCase in code

## Migrations
- Always name migrations descriptively: `npx prisma migrate dev --name add_categories_table`
- Never edit existing migrations — create new ones for changes
- Run `npx prisma generate` after any schema change
- Test migrations locally before committing

## Query Patterns
- Filter out soft-deleted records by default: `where: { deletedAt: null }`
- Use `select` or `include` explicitly — never fetch entire relations blindly
- Use `findUnique` for single record lookups, `findMany` with pagination for lists
- Paginate with cursor-based pagination for large datasets

## Seeding
- Seed script in `prisma/seed.ts` for development data
- Use `upsert` in seed to make it idempotent
