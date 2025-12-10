import { Page, Locator, expect } from '@playwright/test';

export class CalculadoraPage {
    readonly page: Page;
    readonly Titulo: Locator;
    readonly NombreCliente: Locator;
    readonly Email: Locator;
    readonly Telefono: Locator;
    readonly Calendario: Locator;
    readonly Fecha: Locator;
    readonly Ganancia: Locator;
    readonly Detalles: Locator;
    readonly Adicional: Locator;
    readonly Orden: Locator;
    readonly NombrePrenda: Locator;
    readonly addTalla: Locator;
    readonly addPrenda: Locator;
    readonly Tarifa: Locator;
    readonly costoAdicional: Locator;
    readonly MontoAdicional: Locator;
    readonly AgregarExtra: Locator;
    readonly Observaciones: Locator;
    readonly Revisar: Locator;


    constructor(page: Page) {
        this.page = page;

        // Tabs Info
        this.Titulo = page.locator('[name="title"]');
        this.NombreCliente = page.locator('[name="clientName"]');
        this.Email = page.locator('[name="clientEmail"]');
        this.Telefono = page.locator('[name="clientPhone"]');
        this.Orden = page.locator('#laborOrder');

        // Abrir el calendario y rellenarlo
        this.Calendario = page.locator(
            'label:has-text("Fecha entrega") + div input[placeholder="DD/MM/YYYY"]'
        );
        this.Fecha = page.getByRole('button', { name: '24' });
        this.Ganancia = page.locator('input[name="desiredProfit"]');

        // Tabs Info / Detalle / Adicional
        const tabsContainer = page.locator(
            'div.flex.bg-white.rounded-t-3xl.border-b.border-gray-100'
        );
        this.Detalles = tabsContainer.locator('button').nth(1);   // 0 = Info, 1 = Detalle
        this.Adicional = tabsContainer.locator('button').nth(2);  // 2 = Adicional

        // Rellenamos el form.
        this.NombrePrenda = page.getByPlaceholder('Ej.: Blusa manga larga - azul');
        this.addTalla = page.getByRole('button', { name: 'Agregar talla' });
        this.addPrenda = page.getByRole('button', { name: 'Agregar prenda' });

        this.Tarifa = page.getByPlaceholder('Ingresa la tarifa de envío');
        this.costoAdicional = page.getByPlaceholder('Ej.: Estampado, botones adicionales');


        this.MontoAdicional = page.getByPlaceholder('Ingresa el monto');
        this.AgregarExtra = page.getByRole('button', { name: 'Agregar extra' });
        this.Observaciones = page.locator('textarea[name="observations"]');
        this.Revisar = page.getByRole('button', { name: 'Revisar' });


    }

    // Helper para abrir el calendario porque no tiene una caracteristica facil de localizar
    async abrirCalendario() {
        await this.Calendario.evaluate((el) => (el as HTMLElement).click());

        let visible = false;
        try {
            visible = await this.Fecha.isVisible();
        } catch {
            visible = false;
        }

        if (!visible) {
            await this.Calendario.focus();
            await this.page.keyboard.press('Enter');
        }
    }

    // Helper para el tab de 'Detalles'
    async abrirTabDetalle() {
        await this.Detalles.scrollIntoViewIfNeeded();
        await this.Detalles.evaluate((el) => (el as HTMLElement).click());
    }

    // Helper para el tab de 'Adicional'
    async abrirTabAdicional() {
        await this.Adicional.scrollIntoViewIfNeeded();
        await this.Adicional.evaluate((el) => (el as HTMLElement).click());
    }

    // Flujo de Calculadora
    async calculadora() {
        await expect(this.page).toHaveURL(/calculator/i);

        await this.Titulo.fill('Camisa');
        await this.NombreCliente.fill('Nicolás');
        await this.Email.fill('nicolasminicucci@gmail.com');
        await this.Telefono.fill('11123123');

        await this.abrirCalendario();
        await this.Fecha.click();

        await this.Ganancia.fill('10');

        // Tab de Detalle:
        await this.abrirTabDetalle();

        // Rellenamos el form de detalles :
        await this.NombrePrenda.fill('Camisa test');
        await this.addTalla.click();
        await this.addPrenda.click();

        // Tab de Adiccional
        await this.abrirTabAdicional();

        // Rellenamos el form de adiccionales:
        await this.Tarifa.fill('1500');
        await this.costoAdicional.fill('Botones');
        await this.MontoAdicional.fill('1500');
        await this.AgregarExtra.click();
        await this.Observaciones.fill('Cliente quiere botones metálicos y estampado dorado.');
        await this.Revisar.click();

    }

    async assertOnCalculatorPage() {
        await expect(this.page).toHaveURL(/calculator/i); // Que la URL sea la correcta.
        await expect(this.Titulo).toBeVisible();          // Que el input del titulo del presupuesto. 
        await expect(this.NombreCliente).toBeVisible();   // Que el input del nombre del cliente. 
    }
}
