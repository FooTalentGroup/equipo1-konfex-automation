import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { MenuPage } from '../pages/menu';
import { MateriaPrimaPage } from '../pages/materiaPrima';
import { TelaPage } from '../pages/tela';
import { AddTelaPage } from '../pages/addTela';

test.describe('Telas - flujo feliz de creación', () => {
    test('Login + Crear Tela exitosamente', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const menu = new MenuPage(page);
        const materia = new MateriaPrimaPage(page);
        const telaPage = new TelaPage(page);
        const addTelaPage = new AddTelaPage(page);

        await loginPage.login('testqa1@example.com', 'testQA1!');

        await menu.irAMateriaPrima();
        await materia.irATela();

        // 1) Click en "Agregar" en la página /materia-prima/tela
        await telaPage.agregarTela();

        // 2) Sincronizar: o por URL...
        await page.waitForURL('**/materia-prima/tela/crear-tela', { timeout: 10000 });

        // ...o por el primer campo del formulario:
        await expect(page.locator('#material')).toBeVisible();

        // 3) Completar el form
        await addTelaPage.crearTela({
            material: 'Algodón',
            anchoRollo: '1.5',
            weight: '100',
            colors: 'Rojo',
            supplier: 'Proveedor X',
            totalPrice: '1000',
            imagenPath: 'qa/fixtures/konfex.png',
        });
    });
});
