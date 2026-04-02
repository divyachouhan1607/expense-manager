# Test Skill

---
disable-model-invocation: true
invocation: /test [file|pattern|--coverage]
---

## Description
Run Vitest tests with optional filtering and coverage reporting.

## Usage
- `/test` - Run all tests in watch mode
- `/test src/actions/expense-actions.test.ts` - Run a specific test file
- `/test expense` - Run tests matching pattern "expense"
- `/test --coverage` - Run all tests with coverage report

## Steps

### Run specific file:
```bash
npx vitest run <file>
```

### Run by pattern:
```bash
npx vitest run --reporter=verbose <pattern>
```

### Run with coverage:
```bash
npm run test:ci
```

### Run all (watch mode):
```bash
npm run test
```

## Rules
- Use `npx vitest run` for single runs (not watch mode) when targeting specific files
- Use `--reporter=verbose` for detailed output when running specific tests
- Show a summary of passed/failed/skipped tests after the run
- If tests fail, show the failure details and suggest fixes
