import baseConfig from '../../playwright.config';

export default {
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: 'https://www.example.com',
  },
};