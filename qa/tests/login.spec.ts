import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test.describe('Login - flujo feliz', () => {
  test('Login exitoso', async ({ page }) => {

    const loginPage = new LoginPage(page);

    // Ejecutar el flujo feliz


    // Validar que llegamos a dashboard (cambia la ruta cuando la tengas)
    //await expect(page).toHaveURL(/calculator/i);
  });
});
