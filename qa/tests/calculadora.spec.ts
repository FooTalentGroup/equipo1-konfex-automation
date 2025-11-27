import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { CalculadoraPage } from '../pages/calculadora';

test.describe('Calculadora - flujo feliz', () => {
    test('Relleno de form exitoso', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const calculadora = new CalculadoraPage(page);

        // 1) LOGIN → termina en /calculator
        await loginPage.login('testqa1@example.com', 'testQA1!');

        // 2) FLUJO DE CALCULADORA
        await calculadora.calculadora();

        // 3) Validación extra
        await expect(page).toHaveURL(/calculator/i);
    });
});