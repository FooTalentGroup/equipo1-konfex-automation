import { defineConfig, devices } from '@playwright/test';

// Timestamps para los reportes
const timestamp = new Date()
  .toISOString()
  .replace(/[:.]/g, '-');

const htmlBaseFolder = 'reports/html';
const htmlOutputFolder = `${htmlBaseFolder}/run-${timestamp}`;

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  fullyParallel: true,

  // Config para los reportes.
  reporter: [
    ['list'],
    ['html', { outputFolder: htmlOutputFolder, open: 'never' }],
  ],

  use: {
    baseURL: 'https://surprising-wholeness-production.up.railway.app',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Mobile Chromium - Pixel 5',
      use: {
        ...devices['Pixel 5'],
      },
    },
  ],
});
