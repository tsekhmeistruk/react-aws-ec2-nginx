/**
 * Staging environment configuration
 */
export const stagingConfig = {
  baseURL: process.env.STAGING_URL || 'https://staging.codewithmuh.com',
  timeout: 30000,
  retries: 3,
  workers: 4,
  environment: 'staging',
  features: {
    enableVideoPlayback: true,
    enableExternalLinks: true,
    enableLinkedInChecker: true,
  },
};
