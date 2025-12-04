/**
 * Production environment configuration
 */
export const productionConfig = {
  baseURL: process.env.PROD_URL || 'https://codewithmuh.com',
  timeout: 30000,
  retries: 3,
  workers: 4,
  environment: 'production',
  features: {
    enableVideoPlayback: true,
    enableExternalLinks: true,
    enableLinkedInChecker: true,
  },
};
