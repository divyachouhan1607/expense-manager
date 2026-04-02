# Commit Skill

---
disable-model-invocation: true
invocation: /commit [message]
---

## Description
Create a git commit following Conventional Commits format.

## Usage
- `/commit` - Auto-generate commit message from staged changes
- `/commit fix: resolve auth redirect loop` - Commit with provided message

## Steps

1. Check current status:
```bash
git status
```

2. Show the diff of what will be committed:
```bash
git diff --staged
```

3. If nothing is staged, show unstaged changes and ask the user which files to stage. **Never use `git add .` or `git add -A`** — always add specific files by name.

4. Create the commit with a Conventional Commits message:
   - `feat:` — new feature
   - `fix:` — bug fix
   - `chore:` — maintenance, deps, config
   - `refactor:` — code restructuring
   - `test:` — adding or updating tests
   - `docs:` — documentation changes

5. If a message was provided, use it. Otherwise, generate one from the diff.

6. Commit:
```bash
git commit -m "<type>: <description>"
```

## Rules
- NEVER use `git add .` or `git add -A`
- NEVER use `--no-verify` to skip hooks
- NEVER amend a previous commit unless explicitly asked
- Always use Conventional Commits format
- Keep commit messages concise (under 72 characters for the subject line)
