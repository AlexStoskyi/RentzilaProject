import { defineConfig, devices } from '@playwright/test';

import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  timeout: 60000,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html',{open: 'never'}],[process.env.CI ? 'dot' : 'list']],
  expect: { timeout: 10_000 },
 use: {
    screenshot: 'only-on-failure',
    video: process.env.CI ? 'on-first-retry' : 'on',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
