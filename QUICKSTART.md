# Playwright Quick Start Guide

Get up and running with Playwright tests in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
npx playwright install
```

### 2. Run Your First Test

```bash
# Start the app (in one terminal)
npm start

# Run tests (in another terminal)
npm run test:e2e
```

## 📋 Common Commands

### Running Tests

```bash
# All e2e tests
npm run test:e2e

# All unit tests
npm run test:unit

# All tests (unit + e2e)
npm run test:all

# Specific browser
npm run test:e2e:chromium
npm run test:e2e:firefox
npm run test:e2e:webkit

# Interactive UI mode
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug

# Headed mode (see browser)
npm run test:e2e:headed
```

### Viewing Reports

```bash
# Open HTML report
npm run test:report
```

### Environment-Specific

```bash
# Dev environment (default)
npm run test:e2e

# Staging environment
npm run test:e2e:staging

# Custom URL
BASE_URL=http://localhost:3000 npm run test:e2e
STAGING_URL=https://your-staging.com npm run test:e2e:staging
```

## 📁 Test Locations

- **E2E Tests**: `tests/e2e/specs/`
- **Unit Tests**: `tests/unit/`
- **Page Objects**: `tests/e2e/pages/`
- **Test Data**: `tests/data/data.json`

## 🔧 Configuration

Main config: `playwright.config.js`

Key settings:
- **Workers**: 4 parallel
- **Retries**: 3 times
- **Browsers**: Chromium, Firefox, WebKit
- **Environments**: Dev, Staging

## 🤖 CI/CD

Tests run automatically on:
- ✅ Pull requests
- ✅ Pushes to main/develop
- ✅ Nightly at 2 AM UTC
- ✅ Manual trigger (Actions tab)

## 📊 What's Tested

### E2E Tests
- Home page loading and display
- LinkedIn connection checker
- External navigation (YouTube, GitHub)
- Button interactions
- Video embed

### Unit Tests
- App component rendering
- Helper utility functions
- User interactions

## 🐛 Troubleshooting

### Tests timing out?
```bash
# Check if app is running
curl http://localhost:3000

# Restart app
npm start
```

### Browsers not installed?
```bash
npx playwright install --force
```

### Need to debug?
```bash
npm run test:e2e:ui
```

## 📚 More Info

- Full documentation: `PLAYWRIGHT_SETUP.md`
- Test documentation: `tests/README.md`
- Playwright docs: https://playwright.dev

## 🎯 Next Steps

1. ✅ Run tests locally
2. ✅ View HTML report
3. ✅ Try UI mode
4. ✅ Create a PR to trigger CI/CD
5. ✅ Check test results in GitHub Actions

Happy Testing! 🎭
