# Playwright Test Suite

This directory contains the Playwright test automation framework for the React AWS EC2 Nginx application.

## Directory Structure

```
tests/
├── config/              # Environment-specific configurations
│   ├── dev.config.js    # Development environment config
│   └── staging.config.js # Staging environment config
├── data/                # Test data and assertions
│   └── data.json        # Shared test data, labels, and expected values
├── e2e/                 # End-to-end tests
│   ├── pages/           # Page Object Models
│   │   └── HomePage.js  # Home page object
│   └── specs/           # Test specifications
│       ├── home.spec.js              # Home page core functionality tests
│       ├── linkedin-connection.spec.js # LinkedIn connection feature tests
│       └── navigation.spec.js        # External navigation tests
├── fixtures/            # Shared test fixtures
│   └── baseFixtures.js  # Base fixtures for all tests
├── unit/                # Unit tests
│   ├── App.test.js      # App component unit tests
│   └── helpers.test.js  # Helper utilities unit tests
└── utils/               # Utility functions
    └── helpers.js       # Common helper functions
```

## Test Types

### End-to-End (E2E) Tests
Located in `tests/e2e/specs/`, these tests verify the application's functionality from a user's perspective:
- **home.spec.js**: Tests core home page elements (header, logo, video, buttons, footer)
- **linkedin-connection.spec.js**: Tests the LinkedIn connection checker feature
- **navigation.spec.js**: Tests external link navigation (YouTube, GitHub)

### Unit Tests
Located in `tests/unit/`, these tests verify individual functions and components:
- **App.test.js**: Tests the main App component rendering and interactions
- **helpers.test.js**: Tests utility helper functions

## Running Tests

### Install Dependencies
```bash
npm install
npx playwright install
```

### Run All Tests
```bash
# Run all Playwright e2e tests
npx playwright test

# Run all unit tests
npm test
```

### Run Specific Test Types
```bash
# Run only e2e tests
npx playwright test tests/e2e

# Run only unit tests
npm test -- tests/unit
```

### Run Tests by Browser
```bash
# Run on specific browser
npx playwright test --project=chromium-dev
npx playwright test --project=firefox-dev
npx playwright test --project=webkit-dev
```

### Run Tests by Environment
```bash
# Development environment (default)
npx playwright test --project=chromium-dev

# Staging environment
npx playwright test --project=chromium-staging
BASE_URL=https://your-staging-url.com npx playwright test --project=chromium-staging
```

### Run Specific Test File
```bash
npx playwright test tests/e2e/specs/home.spec.js
```

### Run Tests in UI Mode
```bash
npx playwright test --ui
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests in Headed Mode
```bash
npx playwright test --headed
```

## Viewing Reports

### Playwright HTML Report
```bash
# Generate and open HTML report
npx playwright show-report
```

The report will be available at `playwright-report/index.html`

### View Last Test Results
```bash
npx playwright show-report
```

## Configuration

### Main Configuration
The main Playwright configuration is in `playwright.config.js` at the root level.

Key settings:
- **Workers**: 4 parallel workers
- **Retries**: 3 retries for failed tests
- **Browsers**: Chromium, Firefox, WebKit
- **Environments**: Dev and Staging projects
- **Timeout**: 30 seconds default
- **Screenshots**: Captured on failure
- **Videos**: Retained on failure
- **Traces**: Captured on first retry

### Environment Variables
Set these environment variables to customize test execution:

```bash
# Base URL for dev environment
BASE_URL=http://localhost:3000

# Base URL for staging environment
STAGING_URL=https://staging.example.com

# CI mode (affects retries and workers)
CI=true
```

## Test Data

Test data is centralized in `tests/data/data.json` for easy maintenance and reusability.

Example usage in tests:
```javascript
const testData = require('../../data/data.json');
expect(heading).toBe(testData.app.heading);
```

## Page Objects

Page objects encapsulate page-specific selectors and actions, making tests more maintainable.

Example:
```javascript
const { HomePage } = require('../pages/HomePage');

test('example test', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.clickCheckConnection();
});
```

## Best Practices

1. **Use Page Objects**: Encapsulate page logic in page objects
2. **Use Test Data**: Store expected values in `data.json`
3. **Independent Tests**: Each test should be independent and not rely on others
4. **Proper Waits**: Use Playwright's auto-waiting instead of fixed timeouts
5. **Meaningful Names**: Use descriptive test and variable names
6. **Clean Up**: Close popups and clean up resources after tests

## Troubleshooting

### Tests Failing Locally
1. Ensure the app is running: `npm start`
2. Check if the correct port is used (default: 3000)
3. Clear browser cache: `npx playwright test --clear-cache`

### Tests Timing Out
1. Increase timeout in `playwright.config.js`
2. Check network connectivity
3. Verify the application is responsive

### Screenshots and Videos
Failed test artifacts are stored in:
- Screenshots: `test-results/`
- Videos: `test-results/`
- Traces: `test-results/`

## CI/CD Integration

Tests are integrated with GitHub Actions. See `.github/workflows/` for pipeline configurations:
- **playwright-pr.yml**: Runs on pull requests
- **playwright-manual.yml**: Manual trigger workflow
- **playwright-nightly.yml**: Scheduled nightly runs

## Support

For issues or questions about the test suite, please refer to:
- [Playwright Documentation](https://playwright.dev)
- [Project Repository](https://github.com/tsekhmeistruk/react-aws-ec2-nginx)
