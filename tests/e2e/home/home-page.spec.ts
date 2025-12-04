import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/pages/home-page';
import { AssertionHelpers } from '../../helpers/assertion-helpers';
import { DataHelpers } from '../../helpers/data-helpers';

test.describe('Home Page - Layout and Content', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test('should display the correct page title', async ({ page }) => {
    await AssertionHelpers.assertPageTitle(page, 'Subscribe CodeWithMuh');
  });

  test('should display the header with correct title', async () => {
    await AssertionHelpers.assertElementIsVisible(homePage.header);
    const headerText = await homePage.getHeaderTitle();
    expect(headerText).toContain('Welcome to');
    expect(headerText).toContain('CodeWithMuh');
  });

  test('should display the React logo with animation', async () => {
    await AssertionHelpers.assertElementIsVisible(homePage.reactLogo);
    await AssertionHelpers.assertElementHasClass(homePage.reactLogo, 'App-logo');
    
    // Verify logo has alt text
    const altText = await homePage.reactLogo.getAttribute('alt');
    expect(altText).toBe('logo');
  });

  test('should embed YouTube video correctly', async () => {
    await AssertionHelpers.assertElementIsVisible(homePage.youtubeIframe);
    
    // Load test data
    const externalLinks = DataHelpers.loadTestData<any>('external-links.json');
    
    // Verify iframe source contains YouTube embed URL
    await AssertionHelpers.assertElementAttributeContains(
      homePage.youtubeIframe,
      'src',
      'youtube.com/embed'
    );
    
    // Verify correct video ID
    const iframeSrc = await homePage.getYouTubeVideoURL();
    expect(iframeSrc).toContain(externalLinks.youtubeChannel.embedVideoId);
  });

  test('should display video description text', async () => {
    await AssertionHelpers.assertElementIsVisible(homePage.videoDescription);
    await AssertionHelpers.assertElementContainsText(
      homePage.videoDescription,
      'AWS EC2'
    );
  });

  test('should display LinkedIn Connection Game section', async () => {
    await AssertionHelpers.assertElementIsVisible(homePage.linkedInGameTitle);
    await AssertionHelpers.assertElementContainsText(
      homePage.linkedInGameTitle,
      'LinkedIn Connection Game'
    );
    
    await AssertionHelpers.assertElementIsVisible(homePage.linkedInGameDescription);
    await AssertionHelpers.assertElementContainsText(
      homePage.linkedInGameDescription,
      'Are you connected with me on LinkedIn?'
    );
  });

  test('should display all action buttons', async () => {
    const testData = DataHelpers.loadTestData<any>('test-data.json');
    
    await AssertionHelpers.assertElementIsVisible(homePage.checkConnectionButton);
    await AssertionHelpers.assertElementIsVisible(homePage.subscribeButton);
    await AssertionHelpers.assertElementIsVisible(homePage.githubRepoButton);
    
    // Verify button texts
    await AssertionHelpers.assertElementContainsText(
      homePage.checkConnectionButton,
      testData.buttons.checkConnection
    );
    await AssertionHelpers.assertElementContainsText(
      homePage.subscribeButton,
      testData.buttons.subscribe
    );
    await AssertionHelpers.assertElementContainsText(
      homePage.githubRepoButton,
      testData.buttons.githubRepo
    );
  });

  test('should display footer with copyright', async () => {
    await AssertionHelpers.assertElementIsVisible(homePage.footer);
    
    const copyrightText = await homePage.getFooterCopyright();
    expect(copyrightText).toContain('2024');
    expect(copyrightText).toContain('CodeWithMuh');
  });

  test('should have all main elements visible on page load', async () => {
    const allVisible = await homePage.areAllMainElementsVisible();
    expect(allVisible).toBe(true);
  });

  test('should display correct number of buttons', async () => {
    const testData = DataHelpers.loadTestData<any>('test-data.json');
    const buttons = await homePage.page.locator('button').all();
    
    expect(buttons.length).toBe(testData.expectedElements.totalButtons);
  });
});
