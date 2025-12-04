/**
 * Utility helper functions for Playwright tests
 */

/**
 * Wait for a specific amount of time
 * @param {number} ms - milliseconds to wait
 */
async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random string
 * @param {number} length - length of the string
 * @returns {string} random string
 */
function generateRandomString(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Get current timestamp
 * @returns {string} formatted timestamp
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * Check if URL is valid
 * @param {string} url - URL to validate
 * @returns {boolean} true if valid
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Extract domain from URL
 * @param {string} url - full URL
 * @returns {string} domain name
 */
function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return '';
  }
}

/**
 * Take screenshot with custom name
 * @param {Page} page - Playwright page object
 * @param {string} name - screenshot name
 */
async function takeScreenshot(page, name) {
  const timestamp = Date.now();
  await page.screenshot({ 
    path: `test-results/screenshots/${name}-${timestamp}.png`,
    fullPage: true 
  });
}

module.exports = {
  wait,
  generateRandomString,
  getTimestamp,
  isValidUrl,
  extractDomain,
  takeScreenshot
};
