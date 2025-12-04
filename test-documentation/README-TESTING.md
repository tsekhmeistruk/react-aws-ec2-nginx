# Playwright Test Automation

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run all tests:
   ```bash
   npx playwright test
   ```

3. Run tests in a specific browser:
   ```bash
   npx playwright test --project=chromium
   ```

4. View the HTML report:
   ```bash
   npx playwright show-report
   ```

## Using Helper Utilities

### Assertion Helpers
```typescript
import { customExpect } from '../helpers/assertion-helpers';

await customExpect.toBeVisible(locator);
await customExpect.toHaveText(locator, 'Expected Text');
```

## Configuration
- **Dev**: `config/environments/dev.config.ts`
- **Staging**: `config/environments/staging.config.ts`
- **Production**: `config/environments/production.config.ts`