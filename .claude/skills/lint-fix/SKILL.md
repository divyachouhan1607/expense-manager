# Lint Fix Skill

---
disable-model-invocation: true
invocation: /lint-fix [path]
---

## Description
Run Prettier, ESLint, and TypeScript compiler to auto-fix and check code quality.

## Usage
- `/lint-fix` - Fix and check the entire project
- `/lint-fix src/actions/` - Fix and check a specific directory
- `/lint-fix src/components/Button.tsx` - Fix and check a specific file

## Steps

### 1. Format with Prettier:
```bash
npx prettier --write "<path_or_default>"
```
Default path: `"src/**/*.{ts,tsx,js,jsx}"`

### 2. Lint with ESLint and auto-fix:
```bash
npx eslint --fix "<path_or_default>"
```
Default path: `"src/"`

### 3. Type-check with TypeScript:
```bash
npx tsc --noEmit
```

## Output
- Report number of files formatted by Prettier
- Report ESLint errors/warnings (with auto-fixed count)
- Report TypeScript errors if any
- Summarize: "All clean" or list remaining issues

## Rules
- Always run all three tools in order: Prettier -> ESLint -> tsc
- Prettier runs first so ESLint doesn't flag formatting issues
- Never skip the TypeScript check
