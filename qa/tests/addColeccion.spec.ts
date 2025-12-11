import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { MenuPage } from '../pages/menu';
import { TusColeccionesPage } from '../pages/colecciones';


test.describe('Telas - flujo feliz de creación', () => {
    test('Login + Crear Tela exitosamente', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const menu = new MenuPage(page);
        const colecciones = new TusColeccionesPage(page);


        // 1) Ejecutar el flujo de login
        await loginPage.login('testqa1@example.com', 'testQA1!');
        //await expect(page).toHaveURL(/inbox/i);

        // 2) Ir a colecciones
        await menu.irAColecciones();
        await colecciones.goVerano();

        // 3) Ejecutar form de agregar coleccion


    });
});