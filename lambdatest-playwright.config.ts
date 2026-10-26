import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

// LambdaTest capabilities, sent to the cloud grid via the CDP websocket URL
const buildLambdaTestCapabilities = () => {
  return {
    browserName: 'pw-chromium',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'LambdaTest Playwright Suite',
      name: 'LambdaTest Playwright Suite - Chromium',
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
      name: 'chromium',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(buildLambdaTestCapabilities())
          )}`,
        },
      },
    },
  ],
});
