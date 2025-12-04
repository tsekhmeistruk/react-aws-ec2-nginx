# 🎭 Playwright Test Automation - CodeWithMuh React Application

## 📋 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Using Helper Utilities](#using-helper-utilities)
- [Writing New Tests](#writing-new-tests)
- [Configuration](#configuration)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This test automation package provides comprehensive end-to-end testing for the CodeWithMuh React application using Playwright. The framework follows the Page Object Model (POM) design pattern and includes:

- ✅ **3 Test Suites** covering home page, interactions, and navigation
- ✅ **Multi-browser Support** (Chromium, Firefox, WebKit)
- ✅ **Multi-environment Configuration** (Local, Staging, Production)
- ✅ **Reusable Helper Utilities** for assertions, waits, and data management
- ✅ **CI/CD Integration** with GitHub Actions
- ✅ **Comprehensive Reporting** with HTML reports and artifacts

---

## 📦 Prerequisites

Before running the tests, ensure you have:

- **Node.js** 18.x or higher
- **npm** 9.x or higher
- **Git** for version control

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tsekhmeistruk/react-aws-ec2-nginx.git
cd react-aws-ec2-nginx
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npm run install:browsers
```

This will download Chromium, Firefox, and WebKit browsers.

---

## 🧪 Running Tests

### Run All Tests (All Browsers)

```bash
npm run test
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

### Run Tests with UI Mode (Interactive)

```bash
npm run test:ui
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Tests for Specific Browser

```bash
# Chromium only
npm run test:chromium

# Firefox only
npm run test:firefox

# WebKit only
npm run test:webkit
```

### Run Tests for Specific Environment

```bash
# Staging environment
npm run test:staging

# Production environment
npm run test:prod
```

### View Test Report

```bash
npm run test:report
```

### Generate Test Code (Codegen)

```bash
npm run test:codegen
```

---

## 📁 Project Structure

```
tests/
├── e2e/                          # End-to-end test specifications
│   ├── home/
│   │   └── home-page.spec.ts     # Home page layout and content tests
│   ├── interactions/
│   │   └── linkedin-checker.spec.ts  # LinkedIn checker interaction tests
│   └── navigation/
│       └── external-links.spec.ts    # External link navigation tests
├── page-objects/                 # Page Object Model classes
│   ├── base-page.ts              # Base page with common methods
│   └── pages/
│       └── home-page.ts          # Home page object with locators
├── helpers/                      # Reusable helper utilities
│   ├── assertion-helpers.ts      # Custom assertion methods
│   ├── wait-helpers.ts           # Custom wait strategies
│   └── data-helpers.ts           # Test data management
├── data/                         # Test data files
│   ├── test-data.json            # Page content and expected values
│   └── external-links.json       # External URLs and links
└── config/                       # Environment configurations
    └── environments/
        ├── staging.config.ts     # Staging environment settings
        └── production.config.ts  # Production environment settings
```

---

## 🛠️ Using Helper Utilities

### Assertion Helpers

The `AssertionHelpers` class provides custom assertion methods for enhanced test readability.

#### Example 1: Assert Element Contains Text

```typescript
import { AssertionHelpers } from '../../helpers/assertion-helpers';

test('should display welcome message', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  // Assert header contains "CodeWithMuh"
  await AssertionHelpers.assertElementContainsText(
    homePage.headerTitle,
    'CodeWithMuh'
  );
});
```

#### Example 2: Assert Multiple Elements Visible

```typescript
test('should display all main sections', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  // Assert multiple elements are visible
  await AssertionHelpers.assertMultipleElementsVisible([
    homePage.header,
    homePage.reactLogo,
    homePage.youtubeIframe,
    homePage.footer
  ]);
});
```

#### Example 3: Assert Element Has Attribute

```typescript
test('should have correct video embed URL', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  // Assert iframe has correct src attribute
  await AssertionHelpers.assertElementAttributeContains(
    homePage.youtubeIframe,
    'src',
    'youtube.com/embed'
  );
});
```

---

### Wait Helpers

The `WaitHelpers` class provides custom wait strategies for dynamic content.

#### Example 1: Wait for Text to Contain

```typescript
import { WaitHelpers } from '../../helpers/wait-helpers';

test('should display connection result', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  // Click button
  await homePage.clickCheckConnection();
  
  // Wait for result text to appear
  await WaitHelpers.waitForTextToContain(
    homePage.connectionResult,
    'connected with me on LinkedIn',
    5000
  );
});
```

#### Example 2: Wait for Text to Change

```typescript
test('should update result after clicking', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  // Click button and wait for text to change
  await homePage.checkConnectionButton.click();
  await WaitHelpers.waitForTextToChange(
    homePage.connectionResult,
    5000
  );
  
  // Verify new text is displayed
  const resultText = await homePage.getConnectionResult();
  expect(resultText.length).toBeGreaterThan(0);
});
```

#### Example 3: Wait for New Page to Open

```typescript
test('should open GitHub in new tab', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  // Wait for new page to open
  const newPage = await WaitHelpers.waitForNewPage(
    page,
    async () => await homePage.githubRepoButton.click(),
    10000
  );
  
  // Verify new page URL
  expect(newPage.url()).toContain('github.com');
  await newPage.close();
});
```

---

### Data Helpers

The `DataHelpers` class provides utilities for test data management and generation.

#### Example 1: Load Test Data from JSON

```typescript
import { DataHelpers } from '../../helpers/data-helpers';

test('should display correct button texts', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  // Load test data
  const testData = DataHelpers.loadTestData<any>('test-data.json');
  
  // Verify button texts match expected values
  await AssertionHelpers.assertElementContainsText(
    homePage.checkConnectionButton,
    testData.buttons.checkConnection
  );
});
```

#### Example 2: Generate Random Test Data

```typescript
test('should handle dynamic user input', async ({ page }) => {
  // Generate random email for testing
  const randomEmail = DataHelpers.generateRandomEmail('codewithmuh.com');
  console.log(`Testing with email: ${randomEmail}`);
  
  // Generate unique ID
  const uniqueId = DataHelpers.generateUniqueId();
  console.log(`Test ID: ${uniqueId}`);
  
  // Use in test...
});
```

#### Example 3: Work with External Links Data

```typescript
test('should navigate to correct YouTube channel', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  // Load external links data
  const externalLinks = DataHelpers.loadTestData<any>('external-links.json');
  
  // Click subscribe button
  const newPage = await homePage.clickSubscribeButton();
  
  // Verify URL contains channel name
  expect(newPage.url()).toContain(
    externalLinks.youtubeChannel.channelName.replace('@', '')
  );
  
  await newPage.close();
});
```

---

## ✍️ Writing New Tests

### Step 1: Create a New Test File

Create a new test file in the appropriate directory:

```bash
tests/e2e/[feature-name]/[test-name].spec.ts
```

### Step 2: Import Required Dependencies

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { AssertionHelpers } from '../../helpers/assertion-helpers';
import { DataHelpers } from '../../helpers/data-helpers';
```

### Step 3: Write Your Test

```typescript
test.describe('Feature Name', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should perform expected behavior', async () => {
    // Arrange
    const testData = DataHelpers.loadTestData<any>('test-data.json');
    
    // Act
    await homePage.checkConnectionButton.click();
    
    // Assert
    await AssertionHelpers.assertElementIsVisible(homePage.connectionResult);
  });
});
```

### Step 4: Run Your Test

```bash
npx playwright test tests/e2e/[feature-name]/[test-name].spec.ts
```

---

## ⚙️ Configuration

### Base Configuration (playwright.config.ts)

The base configuration includes:
- **Workers**: 4 parallel workers
- **Retries**: 3 attempts on failure
- **Browsers**: Chromium, Firefox, WebKit
- **Base URL**: http://localhost:3000
- **Reporters**: HTML report
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On first retry

### Environment-Specific Configurations

#### Staging (playwright.staging.config.ts)

```typescript
baseURL: 'https://staging.codewithmuh.com'
```

Run with:
```bash
npm run test:staging
```

#### Production (playwright.prod.config.ts)

```typescript
baseURL: 'https://codewithmuh.com'
```

Run with:
```bash
npm run test:prod
```

---

## 🔄 CI/CD Integration

### GitHub Actions Workflows

#### Pull Request Workflow (test-execution-pr.yaml)

Triggers on:
- Pull requests to `main` or `develop` branches
- Changes to `src/`, `tests/`, or config files

Features:
- Runs tests on all browsers in parallel
- Uploads test reports and artifacts
- Comments PR with test results

#### Main Branch Workflow (test-execution-main.yaml)

Triggers on:
- Push to `main` branch
- Manual workflow dispatch

Features:
- Runs full test suite
- Uploads comprehensive reports
- Notifies on test failures

---

## 🐛 Troubleshooting

### Tests Failing Locally

1. **Clear test artifacts:**
   ```bash
   rm -rf test-results/ playwright-report/
   ```

2. **Reinstall browsers:**
   ```bash
   npx playwright install --with-deps
   ```

3. **Run in headed mode to debug:**
   ```bash
   npm run test:headed
   ```

### Timeout Issues

Increase timeout in `playwright.config.ts`:

```typescript
use: {
  actionTimeout: 30000,
  navigationTimeout: 30000,
}
```

### Flaky Tests

1. Use built-in auto-waiting (already configured)
2. Add explicit waits for dynamic content
3. Use `WaitHelpers` for custom wait strategies
4. Enable retries (already configured: 3 attempts)

### Browser Not Found

```bash
npx playwright install chromium firefox webkit
```

---

## 📊 Test Coverage

Current test coverage includes:

| Feature | Test Count | Status |
|---------|-----------|--------|
| Home Page Layout | 10 tests | ✅ |
| LinkedIn Checker | 6 tests | ✅ |
| External Links | 7 tests | ✅ |
| **Total** | **23 tests** | ✅ |

---

## 🤝 Contributing

See [CONTRIBUTING-TESTS.md](./CONTRIBUTING-TESTS.md) for guidelines on contributing to the test suite.

---

## 📝 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Test Strategy](./TEST-STRATEGY.md)
- [Debugging Guide](./DEBUGGING-GUIDE.md)
- [Test Coverage Matrix](../test-specifications/test-coverage-matrix.md)

---

## 📧 Support

For questions or issues:
- Create an issue in the GitHub repository
- Contact the QA team
- Review the debugging guide

---

**Happy Testing! 🎭**
