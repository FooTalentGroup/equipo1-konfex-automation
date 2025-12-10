// qa/pages/tela.ts
import { Page, Locator, expect } from '@playwright/test';

export class TelaPage {
    readonly page: Page;
    readonly botonAgregar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.botonAgregar = page.getByRole('button', { name: 'Agregar', exact: true });
    }

    async agregarTela() {
        await expect(this.botonAgregar).toBeVisible();
        await this.botonAgregar.scrollIntoViewIfNeeded();
        await this.botonAgregar.click();
    }
}
