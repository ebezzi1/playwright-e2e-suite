import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

// Define a function to generate capabilities
const getCaps = () => {
  return {
    browserName: 'pw-chromium',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'Playwright Test Build',
      name: 'Playwright Test',
      user: process.env.LT_USERNAME,
      accessKey: process.env.LT_ACCESS_KEY,
      network: true,
      video: true,
      console: true,
      visual: true,
    },
  };
};

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 1,
  reporter: 'list',
  projects: [
    {
      name: 'chrome',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(getCaps())
          )}`,
        },
      },
    },
  ],
});
