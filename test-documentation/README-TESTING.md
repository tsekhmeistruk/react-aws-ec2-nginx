# README - Testing

## Quick Start

Run tests locally:

```bash
npm install
npm run test
```

## Using Helper Utilities

### BasePage
```typescript
const basePage = new BasePage(page);
await basePage.goto('/login');
await basePage.waitForPageLoad();
await basePage.takeScreenshot('login-page');
```

### Assertion Helpers
```typescript
import { expect } from '@playwright/test';
await expect(page).toHaveTitle('Example');
```
