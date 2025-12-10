import { Page, Locator, expect } from '@playwright/test';

export class MenuPage {
    readonly page: Page;

    readonly menuHamburguesa: Locator;

    readonly home: Locator;
    readonly inbox: Locator;
    readonly clientes: Locator;
    readonly calculadora: Locator;
    readonly presupuesto: Locator;
    readonly colecciones: Locator;
    readonly materiaPrima: Locator;
    readonly pedidos: Locator;
    readonly gastosDelNegocio: Locator;

    constructor(page: Page) {
        this.page = page;

        // Botón principal del menú
        this.menuHamburguesa = page.getByRole('button', { name: 'Abrir menú' });

        // Opciones del menú (basado en el texto visible)
        this.home = page.getByRole('button', { name: 'Home' });
        this.inbox = page.getByRole('button', { name: 'Inbox' });
        this.clientes = page.getByRole('button', { name: 'Clientes' });
        this.calculadora = page.getByRole('button', { name: 'Calculadora' });
        this.presupuesto = page.getByRole('button', { name: 'Presupuesto' });
        this.colecciones = page.getByRole('button', { name: 'Colecciones' });
        this.materiaPrima = page.getByRole('button', { name: 'Materia Prima' });
        this.pedidos = page.getByRole('button', { name: 'Pedidos' });
        this.gastosDelNegocio = page.getByRole('button', { name: 'Gastos del negocio' });
    }

    // --- Acciones básicas ---

    async abrirMenu() {
        await this.menuHamburguesa.click();
    }

    // --- Navegación ---

    async irAHome() {
        await this.abrirMenu();
        await this.home.click();
    }

    async irAInbox() {
        await this.abrirMenu();
        await this.inbox.click();
    }

    async irAClientes() {
        await this.abrirMenu();
        await this.clientes.click();
    }

    async irACalculadora() {
        await this.abrirMenu();
        await this.calculadora.click();
    }

    async irAPresupuesto() {
        await this.abrirMenu();
        await this.presupuesto.click();
    }

    async irAColecciones() {
        await this.abrirMenu();
        await this.colecciones.click();
    }

    async irAMateriaPrima() {
        await this.abrirMenu();
        await this.materiaPrima.click();
    }

    async irAPedidos() {
        await this.abrirMenu();
        await this.pedidos.click();
    }

    async irAGastosDelNegocio() {
        await this.abrirMenu();
        await this.gastosDelNegocio.click();
    }

    // --- Asserts ---

    // Validar que el menú se abrió y que todas las opciones están visibles
    async assertMenuOptionsVisible() {
        // asumimos que al llamar esto ya hiciste abrirMenu()
        await expect(this.home).toBeVisible();
        await expect(this.inbox).toBeVisible();
        await expect(this.clientes).toBeVisible();
        await expect(this.calculadora).toBeVisible();
        await expect(this.presupuesto).toBeVisible();
        await expect(this.colecciones).toBeVisible();
        await expect(this.materiaPrima).toBeVisible();
        await expect(this.pedidos).toBeVisible();
        await expect(this.gastosDelNegocio).toBeVisible();
    }

    // Helper genérico para navegación + pequeña verificación
    async navegarYOpcionalmenteVerificar(
        accion: () => Promise<void>,
        // podés ajustar estos patterns según tus rutas reales
        expectedUrlRegex?: RegExp,
    ) {
        await accion();

        if (expectedUrlRegex) {
            await expect(this.page).toHaveURL(expectedUrlRegex);
        }

        // En apps protegidas, una verificación genérica útil:
        // asegurarse de que no te pateó al login
        await expect(this.page).not.toHaveURL(/login/i);
    }
}
