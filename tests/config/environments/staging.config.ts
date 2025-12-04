import baseConfig from '../../playwright.config';

const stagingConfig = {
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: 'https://staging.example.com',
  },
};

export default stagingConfig;