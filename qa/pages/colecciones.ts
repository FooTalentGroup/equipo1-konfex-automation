import { Page, Locator, expect } from '@playwright/test';

export class TusColeccionesPage {
    readonly page: Page;
    readonly Verano: Locator;
    readonly Primavera: Locator;
    readonly Casual: Locator;
    readonly Agregar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.Verano = page.getByRole('button', { name: 'Verano', exact: true });
        this.Primavera = page.getByRole('button', { name: 'Primavera', exact: true });
        this.Casual = page.getByRole('button', { name: 'Casual', exact: true });
        this.Agregar = page.getByRole('button', { name: 'Agregar', exact: true });
    }

    async goVerano() {
        await this.Verano.click();
    }
    async goPrimavera() {
        await this.Primavera.click();
    }
    async goCasual() {
        await this.Casual.click();
    }
    async AddColeccion() {
        await this.Agregar.click();
    }
}
