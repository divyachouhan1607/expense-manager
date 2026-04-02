# Deploy Skill

---
disable-model-invocation: true
invocation: /deploy [production|preview|status]
---

## Description
Deploy the Expense Manager app to Vercel.

## Usage
- `/deploy production` - Deploy to production
- `/deploy preview` - Create a preview deployment
- `/deploy status` - Check deployment status

## Steps

### For `status`:
```bash
npx vercel ls --limit 5
```

### For `preview`:
1. Run quality checks first:
```bash
npm run lint && npm run test:ci
```
2. If checks pass, deploy:
```bash
npx vercel
```

### For `production`:
1. Run quality checks first:
```bash
npm run lint && npm run test:ci
```
2. If checks pass, deploy to production:
```bash
npx vercel --prod
```

## Rules
- NEVER deploy if lint or tests fail
- Always run `npm run lint && npm run test:ci` before any deployment
- Show the deployment URL to the user after successful deploy
