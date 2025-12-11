import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test.describe('Login - flujo feliz', () => {
  test('Login exitoso', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.login('testqa1@example.com', 'testQA1!');

    await expect(page).toHaveURL(/inbox/i);
  });
});
