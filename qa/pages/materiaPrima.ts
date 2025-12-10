import { Page, Locator, expect } from '@playwright/test';

export class MateriaPrimaPage {
    readonly page: Page;

    readonly botonTela: Locator;
    readonly botonBotones: Locator;
    readonly botonHilos: Locator;
    readonly botonAgregarMaterial: Locator;
    readonly botonSubirPDF: Locator;

    constructor(page: Page) {
        this.page = page;

        this.botonTela = page.getByRole('button', { name: 'Tela' });
        this.botonBotones = page.getByRole('button', { name: 'Botones' });
        this.botonHilos = page.getByRole('button', { name: 'Hilos' });
        this.botonAgregarMaterial = page.getByRole('button', { name: 'Agregar material' });
        this.botonSubirPDF = page.getByRole('button', { name: /subir pdf/i });
    }


    async irATela() {
        await this.botonTela.click();
    }

    async irABotones() {
        await this.botonBotones.click();
    }

    async irAHilos() {
        await this.botonHilos.click();
    }

    async agregarMaterial() {
        await this.botonAgregarMaterial.click();
    }

    async subirPDF() {
        await this.botonSubirPDF.click();
    }

    async assertPaginaMateriaPrima() {
        await expect(this.botonTela).toBeVisible();
        await expect(this.botonHilos).toBeVisible();
        await expect(this.botonBotones).toBeVisible();
        await expect(this.botonAgregarMaterial).toBeVisible();
        await expect(this.botonSubirPDF).toBeVisible();
    }
}
