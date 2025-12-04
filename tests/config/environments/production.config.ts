import baseConfig from '../../playwright.config';

const productionConfig = {
  ...baseConfig,
  use: {
    ...baseConfig.use,
    baseURL: 'https://www.example.com',
  },
};

export default productionConfig;