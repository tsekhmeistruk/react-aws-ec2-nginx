# Playwright Test Automation Setup Guide

## Overview

This document provides a comprehensive guide to the Playwright test automation framework implemented for the React AWS EC2 Nginx application.

## Table of Contents

1. [Architecture](#architecture)
2. [Installation](#installation)
3. [Test Structure](#test-structure)
4. [Running Tests](#running-tests)
5. [Configuration](#configuration)
6. [CI/CD Integration](#cicd-integration)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Architecture

### Test Framework Stack
- **Test Runner**: Playwright Test
- **Language**: JavaScript (matching the application)
- **Unit Testing**: Jest (via React Testing Library)
- **Browsers**: Chromium, Firefox, WebKit
- **Environments**: Dev, Staging
- **Reporting**: Playwright HTML Reporter

### Directory Structure

```
react-aws-ec2-nginx/
├── .github/
│   └── workflows/
│       ├── playwright-pr.yml          # PR/merge trigger pipeline
│       ├── playwright-manual.yml      # Manual trigger pipeline
│       └── playwright-nightly.yml     # Nightly scheduled pipeline
├── tests/
│   ├── config/                        # Environment configurations
│   │   ├── dev.config.js
│   │   └── staging.config.js
│   ├── data/                          # Test data
│   │   └── data.json
│   ├── e2e/                           # End-to-end tests
│   │   ├── pages/                     # Page Object Models
│   │   │   └── HomePage.js
│   │   └── specs/                     # Test specifications
│   │       ├── home.spec.js
│   │       ├── linkedin-connection.spec.js
│   │       └── navigation.spec.js
│   ├── fixtures/                      # Shared fixtures
│   │   └── baseFixtures.js
│   ├── unit/                          # Unit tests
│   │   ├── App.test.js
│   │   └── helpers.test.js
│   ├── utils/                         # Utility functions
│   │   └── helpers.js
│   └── README.md
├── playwright.config.js               # Main Playwright configuration
├── package.json                       # Updated with Playwright scripts
└── PLAYWRIGHT_SETUP.md               # This file
```

## Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Step 1: Install Dependencies

```bash
# Install all project dependencies including Playwright
npm install

# Install Playwright browsers
npx playwright install

# Install system dependencies for browsers (Linux only)
npx playwright install-deps
```

### Step 2: Verify Installation

```bash
# Run a quick test to verify setup
npx playwright test --list

# Check Playwright version
npx playwright --version
```

## Test Structure

### End-to-End Tests

Located in `tests/e2e/specs/`, these tests cover:

1. **home.spec.js** - Core home page functionality
   - Page title verification
   - Header and logo display
   - YouTube video embed
   - Button presence
   - Footer content

2. **linkedin-connection.spec.js** - LinkedIn connection feature
   - Connection checker display
   - Button interaction
   - Result message validation
   - Multiple click behavior

3. **navigation.spec.js** - External navigation
   - YouTube channel link
   - GitHub repository link
   - New tab behavior
   - URL validation

### Unit Tests

Located in `tests/unit/`, these tests cover:

1. **App.test.js** - React component testing
   - Component rendering
   - User interactions
   - Button click handlers
   - DOM structure

2. **helpers.test.js** - Utility function testing
   - String generation
   - Timestamp creation
   - URL validation
   - Domain extraction

### Page Objects

The `HomePage.js` page object encapsulates:
- Element selectors
- Page actions (click, navigate, etc.)
- Getter methods for text content
- Popup handling

### Test Data

`tests/data/data.json` contains:
- Expected text values
- Button labels
- URLs for different environments
- CSS selectors
- Assertion data

## Running Tests

### Local Development

```bash
# Run all e2e tests
npm run test:e2e

# Run all unit tests
npm run test:unit

# Run all tests (unit + e2e)
npm run test:all
```

### Browser-Specific Tests

```bash
# Run on Chromium only
npm run test:e2e:chromium

# Run on Firefox only
npm run test:e2e:firefox

# Run on WebKit only
npm run test:e2e:webkit
```

### Environment-Specific Tests

```bash
# Run on dev environment (default)
npx playwright test --project=chromium-dev --project=firefox-dev --project=webkit-dev

# Run on staging environment
npm run test:e2e:staging

# Or with custom URL
STAGING_URL=https://your-staging-url.com npm run test:e2e:staging
```

### Interactive Modes

```bash
# UI Mode - Interactive test runner
npm run test:e2e:ui

# Debug Mode - Step through tests
npm run test:e2e:debug

# Headed Mode - See browser while tests run
npm run test:e2e:headed
```

### Viewing Reports

```bash
# Open HTML report
npm run test:report

# Or directly
npx playwright show-report
```

## Configuration

### Main Configuration (playwright.config.js)

Key settings:
- **Workers**: 4 parallel workers
- **Retries**: 3 retries on failure
- **Timeout**: 30 seconds per test
- **Browsers**: All three (Chromium, Firefox, WebKit)
- **Screenshots**: Captured on failure
- **Videos**: Retained on failure
- **Traces**: Captured on first retry

### Environment Variables

Set these in your environment or CI/CD:

```bash
# Development
BASE_URL=http://localhost:3000

# Staging
STAGING_URL=https://staging.example.com

# CI mode
CI=true
```

### Browser Configuration

Each browser is configured as a separate project:
- `chromium-dev` / `chromium-staging`
- `firefox-dev` / `firefox-staging`
- `webkit-dev` / `webkit-staging`

### Timeouts

```javascript
// Global timeout
timeout: 30000

// Expect timeout
expect: { timeout: 5000 }

// Navigation timeout (in use block)
use: { navigationTimeout: 30000 }
```

## CI/CD Integration

### GitHub Actions Workflows

#### 1. Pull Request / Merge Trigger (`playwright-pr.yml`)

**Triggers:**
- Pull requests to `main` or `develop`
- Pushes to `main` or `develop`

**Flow:**
1. Test on Dev environment (all browsers in parallel)
2. If push to main/develop: Test on Staging environment
3. Upload test results and reports
4. Publish combined report

**Usage:**
Automatically runs on PR creation or push.

#### 2. Manual Trigger (`playwright-manual.yml`)

**Triggers:**
- Manual workflow dispatch

**Options:**
- Environment: dev, staging, or both
- Browser: chromium, firefox, webkit, or all
- Headed mode: true/false

**Usage:**
```
1. Go to Actions tab in GitHub
2. Select "Playwright Tests - Manual Trigger"
3. Click "Run workflow"
4. Select options
5. Click "Run workflow" button
```

#### 3. Nightly Run (`playwright-nightly.yml`)

**Triggers:**
- Scheduled: Every night at 2 AM UTC
- Manual workflow dispatch

**Flow:**
1. Test on Dev environment (all browsers)
2. Test on Staging environment (all browsers)
3. Create summary report
4. Send notification on failure (creates GitHub issue)

**Usage:**
Runs automatically every night. Can also be triggered manually.

### Environment Sequence

Tests follow this sequence in CI/CD:
1. **Dev Environment** - Tests run first
2. **Staging Environment** - Tests run after dev passes (for push/nightly)

### Secrets Configuration

Add these secrets in GitHub repository settings:

```
STAGING_URL - URL for staging environment
```

## Best Practices

### Writing Tests

1. **Use Page Objects**
   ```javascript
   const { HomePage } = require('../pages/HomePage');
   const homePage = new HomePage(page);
   await homePage.goto();
   ```

2. **Use Test Data**
   ```javascript
   const testData = require('../../data/data.json');
   expect(text).toBe(testData.app.heading);
   ```

3. **Proper Waits**
   ```javascript
   // Good - Auto-waiting
   await page.click('button');
   
   // Avoid - Fixed timeout
   await page.waitForTimeout(5000);
   ```

4. **Independent Tests**
   - Each test should be self-contained
   - Use `beforeEach` for setup
   - Clean up resources in `afterEach`

5. **Descriptive Names**
   ```javascript
   test('should display LinkedIn connection game section', async () => {
     // Test implementation
   });
   ```

### Debugging

1. **Use UI Mode**
   ```bash
   npm run test:e2e:ui
   ```

2. **Use Debug Mode**
   ```bash
   npm run test:e2e:debug
   ```

3. **Add Console Logs**
   ```javascript
   console.log('Current URL:', page.url());
   ```

4. **Take Screenshots**
   ```javascript
   await page.screenshot({ path: 'debug.png' });
   ```

5. **Use Trace Viewer**
   ```bash
   npx playwright show-trace trace.zip
   ```

### Performance

1. **Parallel Execution**: Tests run in parallel (4 workers)
2. **Browser Reuse**: Browsers are reused across tests
3. **Smart Waiting**: Playwright auto-waits for elements
4. **Resource Optimization**: Videos/screenshots only on failure

## Troubleshooting

### Common Issues

#### 1. Tests Timeout

**Problem**: Tests fail with timeout errors

**Solutions:**
```bash
# Increase timeout in playwright.config.js
timeout: 60000

# Or per test
test('my test', async ({ page }) => {
  test.setTimeout(60000);
  // test code
});
```

#### 2. Application Not Starting

**Problem**: `wait-on` fails to detect running app

**Solutions:**
```bash
# Check if port 3000 is available
lsof -i :3000

# Kill existing process
kill -9 $(lsof -t -i:3000)

# Start app manually
npm start
```

#### 3. Browser Installation Issues

**Problem**: Browsers not installing correctly

**Solutions:**
```bash
# Reinstall browsers
npx playwright install --force

# Install system dependencies (Linux)
npx playwright install-deps
```

#### 4. Flaky Tests

**Problem**: Tests pass/fail inconsistently

**Solutions:**
- Use proper waits instead of `waitForTimeout`
- Increase retry count
- Check for race conditions
- Use `waitForLoadState('networkidle')`

#### 5. CI/CD Failures

**Problem**: Tests pass locally but fail in CI

**Solutions:**
- Check environment variables
- Verify BASE_URL is correct
- Check if app is building correctly
- Review CI logs for specific errors

### Getting Help

1. **Playwright Documentation**: https://playwright.dev
2. **GitHub Issues**: Check existing issues in the repository
3. **Test Logs**: Review `test-results/` directory
4. **CI Logs**: Check GitHub Actions logs
5. **Trace Files**: Use Playwright trace viewer for detailed debugging

## Maintenance

### Updating Playwright

```bash
# Update to latest version
npm install -D @playwright/test@latest

# Update browsers
npx playwright install
```

### Adding New Tests

1. Create test file in appropriate directory
2. Use existing page objects or create new ones
3. Add test data to `data.json`
4. Follow naming conventions
5. Run locally before committing

### Updating Test Data

1. Edit `tests/data/data.json`
2. Update references in tests
3. Run affected tests
4. Commit changes

## Summary

This Playwright setup provides:
- ✅ Comprehensive e2e and unit test coverage
- ✅ Multi-browser testing (Chromium, Firefox, WebKit)
- ✅ Multi-environment support (Dev, Staging)
- ✅ Robust CI/CD integration (PR, Manual, Nightly)
- ✅ Detailed HTML reporting
- ✅ Page Object Model architecture
- ✅ Centralized test data management
- ✅ Parallel execution with retries
- ✅ Automatic failure artifacts (screenshots, videos, traces)

For questions or issues, please refer to the repository documentation or create an issue.
