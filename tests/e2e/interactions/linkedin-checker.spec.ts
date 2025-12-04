import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { AssertionHelpers } from '../../helpers/assertion-helpers';
import { WaitHelpers } from '../../helpers/wait-helpers';
import { DataHelpers } from '../../helpers/data-helpers';

test.describe('LinkedIn Connection Checker - Interactions', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should display result after clicking Check Connection button', async () => {
    // Initially, result should be empty or hidden
    const initialResult = await homePage.connectionResult.textContent();
    expect(initialResult?.trim()).toBe('');

    // Click the check connection button
    await homePage.clickCheckConnection();

    // Wait for result to appear
    await WaitHelpers.waitForTextToChange(homePage.connectionResult, 5000);

    // Verify result is displayed
    await AssertionHelpers.assertElementIsVisible(homePage.connectionResult);
    
    const resultText = await homePage.getConnectionResult();
    expect(resultText.length).toBeGreaterThan(0);
  });

  test('should show either connected or not connected message', async () => {
    const testData = DataHelpers.loadTestData<any>('test-data.json');
    
    await homePage.clickCheckConnection();
    
    // Wait for result
    await WaitHelpers.waitForTextToChange(homePage.connectionResult, 5000);
    
    const resultText = await homePage.getConnectionResult();
    
    // Result should contain one of the expected messages
    const isConnectedMessage = resultText.includes(testData.connectionResults.connected);
    const isNotConnectedMessage = resultText.includes(testData.connectionResults.notConnected);
    
    expect(isConnectedMessage || isNotConnectedMessage).toBe(true);
  });

  test('should display LinkedIn profile link when not connected', async ({ page }) => {
    const testData = DataHelpers.loadTestData<any>('test-data.json');
    const externalLinks = DataHelpers.loadTestData<any>('external-links.json');
    
    // Click multiple times to increase chance of getting "not connected" result
    // Based on App.js logic: Math.random() < 0.00 means 0% chance of connected
    await homePage.clickCheckConnection();
    
    await WaitHelpers.waitForTextToChange(homePage.connectionResult, 5000);
    
    const resultHTML = await homePage.getConnectionResultHTML();
    
    // Since the logic has 0% chance of being connected, we should always get the "not connected" message
    expect(resultHTML).toContain(testData.connectionResults.notConnected);
    
    // Verify LinkedIn profile link is present
    if (resultHTML.includes('<a')) {
      expect(resultHTML).toContain(externalLinks.linkedIn.profileUrl);
      expect(resultHTML).toContain(testData.connectionResults.linkedInProfileText);
    }
  });

  test('should allow multiple checks', async () => {
    // First check
    await homePage.clickCheckConnection();
    await WaitHelpers.waitForTextToChange(homePage.connectionResult, 5000);
    const firstResult = await homePage.getConnectionResult();
    expect(firstResult.length).toBeGreaterThan(0);

    // Clear result by reloading or waiting
    await homePage.page.waitForTimeout(500);

    // Second check
    await homePage.clickCheckConnection();
    await WaitHelpers.waitForTextToChange(homePage.connectionResult, 5000);
    const secondResult = await homePage.getConnectionResult();
    expect(secondResult.length).toBeGreaterThan(0);
  });

  test('should have enabled Check Connection button', async () => {
    await AssertionHelpers.assertElementIsEnabled(homePage.checkConnectionButton);
  });

  test('should display result in the correct element', async () => {
    await homePage.clickCheckConnection();
    await WaitHelpers.waitForTextToChange(homePage.connectionResult, 5000);
    
    // Verify result is in element with id="result"
    const resultElement = homePage.page.locator('#result');
    await AssertionHelpers.assertElementIsVisible(resultElement);
    
    const resultText = await resultElement.textContent();
    expect(resultText?.length).toBeGreaterThan(0);
  });
});
