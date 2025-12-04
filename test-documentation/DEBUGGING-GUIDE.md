# 🐛 Debugging Guide for Playwright Tests

This guide provides strategies and tools for debugging test failures and understanding test behavior.

---

## 📋 Table of Contents

- [Quick Debugging Commands](#quick-debugging-commands)
- [Debugging Strategies](#debugging-strategies)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Using Playwright Tools](#using-playwright-tools)
- [CI/CD Debugging](#cicd-debugging)

---

## ⚡ Quick Debugging Commands

### Run Tests in Headed Mode

See the browser while tests run:

```bash
npm run test:headed
```

### Run Tests in Debug Mode

Step through tests with debugger:

```bash
npm run test:debug
```

### Run Tests in UI Mode

Interactive test runner with time travel:

```bash
npm run test:ui
```

### Run Specific Test File

```bash
npx playwright test tests/e2e/home/home-page.spec.ts
```

### Run Single Test

```bash
npx playwright test tests/e2e/home/home-page.spec.ts -g "should display the correct page title"
```

### Run with Trace

```bash
npx playwright test --trace on
```

### Generate Code

Record actions and generate test code:

```bash
npm run test:codegen
```

---

## 🔍 Debugging Strategies

### 1. Use Console Logging

Add console logs to understand test flow:

```typescript
test('should display result', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  console.log('Before clicking button');
  await homePage.clickCheckConnection();
  
  console.log('After clicking button');
  const result = await homePage.getConnectionResult();
  console.log('Result:', result);
  
  expect(result.length).toBeGreaterThan(0);
});
```

### 2. Take Screenshots

Capture page state at specific points:

```typescript
test('should display result', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  // Take screenshot before action
  await page.screenshot({ path: 'debug-before.png' });
  
  await homePage.clickCheckConnection();
  
  // Take screenshot after action
  await page.screenshot({ path: 'debug-after.png' });
});
```

### 3. Use Page Pause

Pause test execution to inspect:

```typescript
test('should display result', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  // Pause here - browser will stay open
  await page.pause();
  
  await homePage.clickCheckConnection();
});
```

### 4. Slow Down Test Execution

Add delays to see what's happening:

```typescript
test('should display result', async ({ page }) => {
  const homePage = new HomePage(page);
  
  // Slow down by 1 second between actions
  await page.context().setDefaultTimeout(60000);
  await page.waitForTimeout(1000);
  
  await homePage.navigateToHome();
});
```

### 5. Check Element State

Verify element properties:

```typescript
test('debug element state', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  const button = homePage.checkConnectionButton;
  
  console.log('Is visible:', await button.isVisible());
  console.log('Is enabled:', await button.isEnabled());
  console.log('Text content:', await button.textContent());
  console.log('Inner HTML:', await button.innerHTML());
});
```

---

## 🛠️ Using Playwright Tools

### Playwright Inspector

Launch with debugger:

```bash
npx playwright test --debug
```

Features:
- Step through test execution
- Inspect locators
- View page state
- Record actions

### Trace Viewer

View detailed test execution:

```bash
# Run with trace
npx playwright test --trace on

# View trace
npx playwright show-trace trace.zip
```

Trace includes:
- Screenshots at each step
- Network requests
- Console logs
- DOM snapshots
- Action timeline

### UI Mode

Interactive test runner:

```bash
npm run test:ui
```

Features:
- Watch mode
- Time travel debugging
- Pick locators
- View traces inline
- Filter tests

### Codegen

Generate test code by recording:

```bash
npm run test:codegen
```

Use to:
- Discover locators
- Record user flows
- Generate boilerplate code

---

## 🚨 Common Issues and Solutions

### Issue 1: Element Not Found

**Error:**
```
Error: locator.click: Timeout 30000ms exceeded.
```

**Solutions:**

1. **Check if element exists:**
   ```typescript
   const isVisible = await homePage.checkConnectionButton.isVisible();
   console.log('Button visible:', isVisible);
   ```

2. **Wait for element:**
   ```typescript
   await homePage.checkConnectionButton.waitFor({ state: 'visible', timeout: 10000 });
   ```

3. **Verify locator:**
   ```typescript
   // Try different locator strategies
   const button1 = page.locator('button', { hasText: 'Check Connection' });
   const button2 = page.getByRole('button', { name: 'Check Connection' });
   const button3 = page.getByText('Check Connection');
   ```

4. **Check page load:**
   ```typescript
   await page.waitForLoadState('domcontentloaded');
   await page.waitForLoadState('networkidle');
   ```

### Issue 2: Flaky Tests

**Symptoms:**
- Tests pass sometimes, fail other times
- Timing-related failures

**Solutions:**

1. **Use auto-waiting (already configured):**
   ```typescript
   // Playwright waits automatically
   await homePage.checkConnectionButton.click();
   ```

2. **Avoid arbitrary timeouts:**
   ```typescript
   // ❌ Bad
   await page.waitForTimeout(5000);
   
   // ✅ Good
   await homePage.connectionResult.waitFor({ state: 'visible' });
   ```

3. **Wait for specific conditions:**
   ```typescript
   await WaitHelpers.waitForTextToChange(homePage.connectionResult, 5000);
   ```

4. **Use retries (already configured):**
   ```typescript
   // In playwright.config.ts
   retries: 3
   ```

### Issue 3: Timeout Errors

**Error:**
```
Test timeout of 30000ms exceeded.
```

**Solutions:**

1. **Increase timeout for specific test:**
   ```typescript
   test('slow test', async ({ page }) => {
     test.setTimeout(60000); // 60 seconds
     // ... test code
   });
   ```

2. **Increase timeout globally:**
   ```typescript
   // In playwright.config.ts
   use: {
     actionTimeout: 30000,
     navigationTimeout: 30000,
   }
   ```

3. **Check network issues:**
   ```typescript
   // Monitor network
   page.on('request', request => console.log('Request:', request.url()));
   page.on('response', response => console.log('Response:', response.url()));
   ```

### Issue 4: Element State Issues

**Error:**
```
Element is not clickable
```

**Solutions:**

1. **Wait for element to be ready:**
   ```typescript
   await homePage.checkConnectionButton.waitFor({ state: 'visible' });
   await homePage.checkConnectionButton.waitFor({ state: 'attached' });
   ```

2. **Scroll into view:**
   ```typescript
   await homePage.checkConnectionButton.scrollIntoViewIfNeeded();
   await homePage.checkConnectionButton.click();
   ```

3. **Force click if needed:**
   ```typescript
   await homePage.checkConnectionButton.click({ force: true });
   ```

### Issue 5: New Page/Tab Not Opening

**Error:**
```
Timeout waiting for new page
```

**Solutions:**

1. **Use proper new page handling:**
   ```typescript
   const [newPage] = await Promise.all([
     page.context().waitForEvent('page'),
     homePage.subscribeButton.click()
   ]);
   await newPage.waitForLoadState();
   ```

2. **Check popup blocker:**
   ```typescript
   // Ensure context allows popups
   const context = await browser.newContext({
     // ... options
   });
   ```

### Issue 6: Test Data Not Loading

**Error:**
```
Cannot find module './test-data.json'
```

**Solutions:**

1. **Check file path:**
   ```typescript
   // Correct path from helper
   const testData = DataHelpers.loadTestData<any>('test-data.json');
   ```

2. **Verify file exists:**
   ```bash
   ls tests/data/test-data.json
   ```

3. **Check JSON syntax:**
   ```bash
   cat tests/data/test-data.json | jq .
   ```

---

## 🔄 CI/CD Debugging

### View CI Logs

1. Go to GitHub Actions tab
2. Click on failed workflow
3. Expand failed job
4. Review logs

### Download Artifacts

1. Scroll to bottom of workflow run
2. Download artifacts:
   - `playwright-report`
   - `playwright-artifacts`
   - `test-results`

### View HTML Report

```bash
# Download and extract playwright-report.zip
unzip playwright-report.zip
cd playwright-report
npx playwright show-report .
```

### View Traces

```bash
# Download and extract traces
npx playwright show-trace trace.zip
```

### Debug CI-Specific Issues

Add debug logging to workflow:

```yaml
- name: Run Playwright tests
  run: |
    echo "Running tests..."
    npx playwright test --reporter=list
  env:
    DEBUG: pw:api
```

### Run Tests in Docker (CI Environment)

```bash
docker run -it --rm \
  -v $(pwd):/work \
  -w /work \
  mcr.microsoft.com/playwright:v1.40.0-focal \
  npm run test
```

---

## 📊 Debugging Checklist

When debugging a failing test:

- [ ] Run test in headed mode
- [ ] Check console logs
- [ ] Take screenshots at failure point
- [ ] Verify element locators
- [ ] Check page load state
- [ ] Review network requests
- [ ] Verify test data
- [ ] Check for timing issues
- [ ] Review trace viewer
- [ ] Test in different browsers
- [ ] Compare with passing tests

---

## 🎯 Best Practices

### DO:
- ✅ Use Playwright's built-in waiting
- ✅ Use descriptive error messages
- ✅ Take screenshots on failure (auto-configured)
- ✅ Use trace viewer for complex issues
- ✅ Test in multiple browsers
- ✅ Use UI mode for interactive debugging

### DON'T:
- ❌ Use arbitrary `waitForTimeout`
- ❌ Ignore flaky tests
- ❌ Use fragile locators (xpath, nth-child)
- ❌ Skip error messages
- ❌ Test only in one browser

---

## 📚 Additional Resources

- [Playwright Debugging Docs](https://playwright.dev/docs/debug)
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer)
- [Playwright Inspector](https://playwright.dev/docs/inspector)
- [Test Strategy](./TEST-STRATEGY.md)
- [README Testing](./README-TESTING.md)

---

**Need Help?** Open an issue or contact the QA team!
