# New Feature Skill

---
invocation: /new-feature <description>
---

## Description
Scaffold a complete feature end-to-end: database schema, server actions, components, and tests.

## Usage
- `/new-feature add expense categories` - Scaffold a categories feature
- `/new-feature recurring expenses` - Scaffold recurring expenses support

## Process

1. **Understand the feature**: Analyze the description and ask clarifying questions if needed.

2. **Follow the checklist**: Read and follow `@.claude/skills/new-feature/templates/feature-checklist.md`

3. **Scaffold in order**:
   - Database: Add/modify Prisma schema, create migration
   - Validation: Create Zod schemas in `src/lib/validations/`
   - Server Actions: Create actions in `src/actions/`
   - Components: Create UI components in `src/components/`
   - Pages: Add/modify pages in `src/app/`
   - Tests: Co-locate tests next to each new file

4. **Verify**: Run lint and tests to ensure everything works.

## Rules
- Follow ALL project coding standards from CLAUDE.md
- Store money as cents (integers)
- Validate all inputs with Zod
- Use Server Components by default
- Co-locate tests next to source files
- Use named exports (except pages/layouts)
