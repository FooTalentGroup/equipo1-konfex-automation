import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  fullyParallel: true,
  reporter: [['list'], ['html']],
  use: {
    // 👇 Ajustá esto si tu app corre en otro puerto
    baseURL: 'https://konfex-web-app-gilt.vercel.app',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Mobile Chromium - Pixel 5',
      use: {
        ...devices['Pixel 5'],  // 👉 simula mobile
      },
    },
    // Más adelante, si querés, sumamos Safari mobile:
    // {
    //   name: 'Mobile WebKit - iPhone 12',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
  ],
});
