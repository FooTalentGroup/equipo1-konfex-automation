import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { MenuPage } from '../pages/menu';
import { CalculadoraPage } from '../pages/calculadora';

test.describe('Login + flujo E2E de la calculadora', () => {
    test('Login exitoso + abrir menú', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const calculadoraPage = new MenuPage(page)
        const calculadora = new CalculadoraPage(page)

        // 1) Ejecutar el flujo de login
        await loginPage.login('testqa1@example.com', 'testQA1!');


        // 2) Ir a calculadora
        await calculadoraPage.irACalculadora();

        // 3) Ejecutar calculadora
        await calculadora.calculadora();

    });
});