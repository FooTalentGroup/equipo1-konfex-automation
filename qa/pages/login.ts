import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Ajustá estos IDs si no coinciden con el HTML real
        this.emailInput = page.locator('#usuario');
        this.passwordInput = page.locator('#contraseña');
        this.submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });
    }

    // 👉 Navegar a la pantalla de login (NO a /calculator)
    async goto() {
        await this.page.goto('/'); // o '/' si el login está en la home
    }

    // Flujo feliz de login
    async login(email: string, password: string) {
        await this.goto();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();

        // Esperar a que la app redirija correctamente a /calculator
        await this.page.waitForURL('**/calculator');
        // o más estricto:
        // await expect(this.page).toHaveURL(/\/calculator$/);
    }

    async assertOnLoginPage() {
        await expect(this.page).toHaveURL(/login/i);
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
    }
}
