# DB Migrate Skill

---
disable-model-invocation: true
invocation: /db-migrate <name|status|reset>
---

## Description
Manage Prisma database migrations.

## Usage
- `/db-migrate add_categories_table` - Create a new migration with the given name
- `/db-migrate status` - Show migration status
- `/db-migrate reset` - Reset database (requires confirmation)

## Steps

### For `status`:
```bash
npx prisma migrate status
```

### For a migration name (e.g., `add_categories_table`):
1. Generate the Prisma client:
```bash
npx prisma generate
```
2. Create and apply the migration:
```bash
npx prisma migrate dev --name <name>
```

### For `reset`:
1. **STOP and confirm with the user**: "This will drop all data in the database. Are you sure?"
2. Only if user confirms:
```bash
npx prisma migrate reset
```

## Rules
- Always use descriptive snake_case names for migrations (e.g., `add_user_preferences`, `rename_amount_to_total`)
- Never edit existing migration files — create new ones
- Run `npx prisma generate` after any schema change
- ALWAYS confirm with the user before running `reset`
- Show the migration SQL output so the user can review changes
