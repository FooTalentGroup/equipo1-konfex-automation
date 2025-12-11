// qa/pages/addTela.ts
import { Page, Locator, expect } from '@playwright/test';
import path from 'path';

export interface DatosTela {
    material: string;
    anchoRollo: string;
    weight: string;
    colors: string;
    supplier: string;
    totalPrice: string;
    imagenPath?: string; // solo el nombre del archivo, ej: "konfex.png"
}

export class AddTelaPage {
    readonly page: Page;
    readonly material: Locator;
    readonly anchoRollo: Locator;
    readonly weight: Locator;
    readonly colors: Locator;
    readonly supplier: Locator;
    readonly totalPrice: Locator;
    readonly inputFile: Locator;
    readonly guardar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.material = page.locator('#material');
        this.anchoRollo = page.locator('#rollWidth');
        this.weight = page.locator('#weight');
        this.colors = page.locator('#colors');
        this.supplier = page.locator('#supplier');
        this.totalPrice = page.locator('#totalPrice');

        // 👉 input real de subida de archivo
        this.inputFile = page.locator('input[type="file"]');

        this.guardar = page.getByRole('button', { name: 'Guardar' });
    }

    async assertOnPage() {
        await expect(this.material).toBeVisible();
        await expect(this.anchoRollo).toBeVisible();
    }

    async subirImagen(imagenPath?: string) {
        // Carpeta fixtures real: ...\qa\fixtures
        const fixturesDir = path.resolve(__dirname, '..', 'fixtures');

        // Si me pasás 'konfex.png', 'fixtures/konfex.png' o 'qa/fixtures/konfex.png',
        // me quedo SOLO con el nombre del archivo: 'konfex.png'
        const filename = imagenPath ? path.basename(imagenPath) : 'konfex.png';

        const finalPath = path.resolve(fixturesDir, filename);

        console.log('📌 Cargando archivo desde:', finalPath);

        await this.inputFile.setInputFiles(finalPath);
    }

    async completarFormulario(datos: DatosTela) {
        await this.material.fill(datos.material);
        await this.anchoRollo.fill(datos.anchoRollo);
        await this.weight.fill(datos.weight);
        await this.colors.fill(datos.colors);
        await this.supplier.fill(datos.supplier);
        await this.totalPrice.fill(datos.totalPrice);
    }

    async crearTela(datos: DatosTela) {
        await this.assertOnPage();
        await this.subirImagen(datos.imagenPath);
        await this.completarFormulario(datos);
        await this.guardar.click();
    }
}
