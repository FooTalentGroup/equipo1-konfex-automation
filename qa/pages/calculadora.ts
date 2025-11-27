import { Page, Locator, expect } from '@playwright/test';

export class CalculadoraPage {
    readonly page: Page;
    readonly Titulo: Locator;
    readonly NombreCliente: Locator;
    readonly Fecha: Locator;
    readonly Rentabilidad: Locator;
    readonly Orden: Locator;
    readonly Tarifa: Locator;
    readonly Horas: Locator;
    readonly NombrePrenda: Locator;
    readonly Tallas: Locator;
    readonly Cantidad: Locator;
    readonly PrecioUnitario: Locator;
    readonly AñadirTallaButton: Locator;
    readonly CostoAdicional: Locator;
    readonly Costos: Locator;
    readonly AñadirCostos: Locator;

    constructor(page: Page) {
        this.page = page;

        this.Titulo = page.locator('#title');
        this.NombreCliente = page.locator('#Nombre\\ cliente'); // OJO: id con espacio es raro, revisalo en el HTML real
        this.Fecha = page.locator('#endDate');
        this.Rentabilidad = page.locator('#profitabilityPercentage');
        this.Orden = page.locator('#laborOrder');
        this.Tarifa = page.locator('#laborRate');

        // ⚠ Cuidado: usás '+' para dos cosas distintas. Idealmente darles IDs o data-testid diferentes.
        this.Horas = page.getByRole('button', { name: '+' });

        this.NombrePrenda = page.locator('#materialName');
        this.Tallas = page.locator('#materialSize');
        this.Cantidad = page.getByRole('button', { name: '+' }); // esto probablemente clickea el mismo + que Horas

        this.PrecioUnitario = page.locator('#materialPrice');
        this.AñadirTallaButton = page.getByRole('button', { name: 'Añadir talla' });

        this.CostoAdicional = page.locator('#additionalCost');
        this.Costos = page.locator('#materialsCost');
        this.AñadirCostos = page.getByRole('button', { name: 'Añadir costo' });

    }

    // 👉 Si ya estás en /calculator después del login, este goto NO es necesario
    // async goto() {
    //   await this.page.goto('/calculator');
    // }

    async calculadora() {
        // Asumimos que YA estás en /calculator
        await expect(this.page).toHaveURL(/calculator/i);

        await this.Titulo.fill('Camisa');
        await this.NombreCliente.fill('Nicolás');
        await this.Fecha.fill('2025-12-01');
        await this.Rentabilidad.fill('10');
        await this.Orden.fill('Camisa roja');
        await this.Tarifa.fill('1000');
        await this.Horas.click();
        await this.NombrePrenda.fill('Prenda');
        await this.Tallas.fill('Talla');
        await this.Cantidad.click();
        await this.PrecioUnitario.fill('100');
        await this.AñadirTallaButton.click();
        await this.CostoAdicional.fill('100');
        await this.Costos.click();
        await this.AñadirCostos.click();
    }

    async assertOnCalculatorPage() {
        await expect(this.page).toHaveURL(/calculator/i);
        await expect(this.Titulo).toBeVisible();
        await expect(this.NombreCliente).toBeVisible();
    }
}
