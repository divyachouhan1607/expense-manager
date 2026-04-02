---
globs: ["**/*.test.*", "tests/**"]
description: Testing patterns and conventions
---

# Testing Rules

## Framework
- Use **Vitest** as test runner (not Jest)
- Use **React Testing Library** for component tests
- Use **@testing-library/jest-dom** for DOM matchers

## Test Organization
- Co-locate unit tests next to source: `Button.tsx` -> `Button.test.tsx`
- Integration/E2E tests go in `tests/` directory
- Name test files: `<name>.test.ts` or `<name>.test.tsx`

## Writing Tests
- Use `describe` blocks to group related tests
- Test names should describe behavior: `it("displays error when amount is negative")`
- Follow Arrange-Act-Assert pattern
- One assertion concept per test (multiple `expect` calls OK if testing same concept)

## Component Testing
- Query elements by role or label — never by test ID or class name:
  ```typescript
  screen.getByRole("button", { name: /submit/i })
  screen.getByLabelText(/email/i)
  ```
- Use `userEvent` over `fireEvent` for realistic interactions
- Wrap state updates in `act()` when not using `userEvent`
- Test user-visible behavior, not implementation details

## Mocking
- Only mock external dependencies (API calls, database, third-party libs)
- Never mock the module under test
- Use `vi.mock()` for module mocks, `vi.fn()` for function mocks
- Reset mocks in `beforeEach` or use `vi.restoreAllMocks()`

## Server Action / API Testing
- Test Server Actions by calling them directly as functions
- Mock `auth()` to simulate authenticated/unauthenticated states
- Mock Prisma client with a typed mock object
- Test both success and error paths

## Coverage
- Run with `npm run test:ci` for single-run with coverage
- Focus coverage on business logic in `src/actions/` and `src/lib/`
