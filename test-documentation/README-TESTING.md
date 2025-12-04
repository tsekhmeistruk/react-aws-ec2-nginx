# Playwright Test Automation

## Getting Started

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   npx playwright test
   ```

## Helper Utilities

### Assertion Helpers
Example:
```typescript
import { customExpect } from '../helpers/assertion-helpers';
await customExpect.toBeVisible(page.locator('selector'));
```

### Wait Helpers
Example:
```typescript
import { waitHelpers } from '../helpers/wait-helpers';
await waitHelpers.waitForSelector(page, 'selector');
```

## Configuration
- **Staging**: `playwright.staging.config.ts`
- **Production**: `playwright.production.config.ts`

## CI/CD
- Tests are automatically executed on the `main` branch.