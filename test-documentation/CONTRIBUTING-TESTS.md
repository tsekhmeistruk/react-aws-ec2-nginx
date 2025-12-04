# 🤝 Contributing to Test Automation

Thank you for your interest in contributing to the CodeWithMuh test automation suite! This guide will help you understand our testing standards and contribution process.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Test Writing Guidelines](#test-writing-guidelines)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Review Checklist](#review-checklist)

---

## 🚀 Getting Started

### 1. Fork and Clone

```bash
git clone https://github.com/tsekhmeistruk/react-aws-ec2-nginx.git
cd react-aws-ec2-nginx
```

### 2. Create a Feature Branch

```bash
git checkout -b test/feature-name
```

### 3. Install Dependencies

```bash
npm install
npm run install:browsers
```

---

## ✍️ Test Writing Guidelines

### Test Structure

Follow the **Arrange-Act-Assert (AAA)** pattern:

```typescript
test('should display welcome message', async ({ page }) => {
  // Arrange
  const homePage = new HomePage(page);
  const testData = DataHelpers.loadTestData<any>('test-data.json');
  
  // Act
  await homePage.navigateToHome();
  
  // Assert
  await AssertionHelpers.assertElementContainsText(
    homePage.headerTitle,
    testData.pageContent.headerTitle
  );
});
```

### Test Naming Conventions

- Use descriptive names that explain what is being tested
- Start with "should" for behavior-driven descriptions
- Be specific about the expected outcome

**Good Examples:**
```typescript
test('should display React logo with animation')
test('should open YouTube subscription page in new tab')
test('should show connection result after clicking button')
```

**Bad Examples:**
```typescript
test('test logo')
test('check button')
test('navigation')
```

### Locator Strategy Priority

Use locators in this order:

1. **data-testid** (most reliable)
   ```typescript
   page.getByTestId('submit-button')
   ```

2. **Role-based** (accessibility-friendly)
   ```typescript
   page.getByRole('button', { name: 'Submit' })
   ```

3. **Unique text** (stable)
   ```typescript
   page.getByText('Welcome to CodeWithMuh')
   ```

4. **CSS with unique attributes**
   ```typescript
   page.locator('[data-test="user-form"]')
   ```

5. **NEVER use**: xpath or nth-child

### Page Object Model

Always use Page Objects for element interactions:

**✅ Good:**
```typescript
await homePage.clickCheckConnection();
await AssertionHelpers.assertElementIsVisible(homePage.connectionResult);
```

**❌ Bad:**
```typescript
await page.click('button');
await expect(page.locator('#result')).toBeVisible();
```

### Test Data Management

Store test data in JSON files:

```typescript
// Load from JSON
const testData = DataHelpers.loadTestData<any>('test-data.json');

// Use in test
await AssertionHelpers.assertElementContainsText(
  homePage.headerTitle,
  testData.pageContent.headerTitle
);
```

### Helper Usage

Use helper utilities for common operations:

```typescript
// Assertions
await AssertionHelpers.assertElementIsVisible(element);
await AssertionHelpers.assertElementContainsText(element, 'text');

// Waits
await WaitHelpers.waitForTextToChange(element, 5000);
await WaitHelpers.waitForTextToContain(element, 'expected', 5000);

// Data
const uniqueId = DataHelpers.generateUniqueId();
const email = DataHelpers.generateRandomEmail('test.com');
```

---

## 🎨 Code Style

### TypeScript Standards

- Use TypeScript strict mode
- Add JSDoc comments for public methods
- Use meaningful variable names
- Follow async/await patterns

### Formatting

We use Prettier for code formatting:

```bash
npm run format
```

### Linting

We use ESLint for code quality:

```bash
npm run lint
npm run lint:fix
```

### Example: Well-Formatted Test

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { AssertionHelpers } from '../../helpers/assertion-helpers';
import { DataHelpers } from '../../helpers/data-helpers';

/**
 * Test suite for home page layout and content validation
 */
test.describe('Home Page - Layout and Content', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  /**
   * Verify that the page displays the correct title
   */
  test('should display the correct page title', async ({ page }) => {
    await AssertionHelpers.assertPageTitle(page, 'Subscribe CodeWithMuh');
  });

  /**
   * Verify that the header contains the welcome message
   */
  test('should display the header with correct title', async () => {
    const testData = DataHelpers.loadTestData<any>('test-data.json');
    
    await AssertionHelpers.assertElementIsVisible(homePage.header);
    await AssertionHelpers.assertElementContainsText(
      homePage.headerTitle,
      testData.pageContent.headerTitle
    );
  });
});
```

---

## 🔄 Pull Request Process

### 1. Before Submitting

- [ ] Run all tests locally: `npm run test`
- [ ] Run linter: `npm run lint`
- [ ] Format code: `npm run format`
- [ ] Update documentation if needed
- [ ] Add test data to JSON files if required

### 2. Commit Messages

Follow conventional commit format:

```
test(feature): add tests for LinkedIn checker functionality

- Add interaction tests for connection checker
- Add validation for result messages
- Include test data for expected outcomes
```

Types:
- `test`: Adding or updating tests
- `fix`: Fixing test failures
- `refactor`: Refactoring test code
- `docs`: Documentation updates
- `chore`: Maintenance tasks

### 3. Create Pull Request

- Use descriptive PR title
- Fill out the PR template
- Link related issues
- Add screenshots/videos if applicable
- Request review from QA team

### 4. PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New test suite
- [ ] Test fix
- [ ] Test refactoring
- [ ] Documentation update

## Test Coverage
- [ ] All tests pass locally
- [ ] New tests added for new features
- [ ] Existing tests updated if needed

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests are well-documented
- [ ] Page objects updated if needed
- [ ] Test data added/updated
- [ ] CI/CD passes
```

---

## ✅ Review Checklist

### For Test Authors

Before requesting review:

- [ ] Tests follow AAA pattern
- [ ] Descriptive test names
- [ ] Use Page Objects
- [ ] Use helper utilities
- [ ] Test data in JSON files
- [ ] No hardcoded values
- [ ] Proper locator strategy
- [ ] JSDoc comments added
- [ ] All tests pass
- [ ] Code formatted and linted

### For Reviewers

When reviewing tests:

- [ ] Tests are clear and understandable
- [ ] Proper use of Page Objects
- [ ] Appropriate assertions
- [ ] No flaky waits (no arbitrary timeouts)
- [ ] Test data properly managed
- [ ] Follows project conventions
- [ ] Documentation updated
- [ ] CI/CD passes

---

## 🐛 Reporting Issues

### Test Failures

When reporting test failures:

1. **Describe the failure:**
   - Which test failed?
   - What was expected?
   - What actually happened?

2. **Provide context:**
   - Browser and version
   - Environment (local/staging/prod)
   - Test run logs

3. **Steps to reproduce:**
   - Exact commands run
   - Any special configuration

4. **Artifacts:**
   - Screenshots
   - Videos
   - Trace files

### Example Issue

```markdown
**Test Failure: LinkedIn Checker**

**Description:**
Test "should display result after clicking Check Connection button" fails intermittently

**Expected:**
Result message should appear within 5 seconds

**Actual:**
Timeout waiting for result element

**Environment:**
- Browser: Chromium 120.0
- OS: Ubuntu 22.04
- Environment: Local

**Steps to Reproduce:**
1. Run `npm run test:chromium`
2. Test fails ~30% of the time

**Artifacts:**
- Screenshot: attached
- Trace: attached
```

---

## 📚 Additional Resources

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Test Strategy](./TEST-STRATEGY.md)
- [Debugging Guide](./DEBUGGING-GUIDE.md)
- [README Testing](./README-TESTING.md)

---

## 🙏 Thank You!

Your contributions help improve the quality and reliability of our application. We appreciate your time and effort!

---

**Questions?** Open an issue or contact the QA team.
