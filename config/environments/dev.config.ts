import baseConfig from '../../playwright.config';

export default {
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: 'http://localhost:3000',
  },
};