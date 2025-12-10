import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly tituloLogin: Locator;
    readonly BuscadorChat: Locator;



    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.locator('#usuario');
        this.passwordInput = page.locator('#contraseña');
        this.submitButton = page.getByRole('button', { name: 'Iniciar Sesión' });
        this.tituloLogin = page.getByRole('heading', { name: 'Iniciar sesión' });
        this.BuscadorChat = page.locator('div:has(input[placeholder="Buscar chat por nombre"])');
    }

    // Pantalla Login
    async goto() {
        await this.page.goto('https://konfex-web-app.vercel.app/');
    }

    // Flujo feliz de login
    async login(email: string, password: string) {
        await this.goto();

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();

        await this.page.waitForURL('**/inbox');

    }

    // Los asserts en este caso verificamos :
    async assertOnLoginPage() {
        await expect(this.page).toHaveURL(/login/i);    // Que la URL sea la de '/login'
        await expect(this.emailInput).toBeVisible();    // Que sea visible el input del email.
        await expect(this.passwordInput).toBeVisible(); // Que sea visible el input de la password.
        await expect(this.tituloLogin).toHaveText('Iniciar sesión'); // Que sea visible el titulo 'Iniciar sesión'.
        await expect(this.BuscadorChat).toBeVisible();  // Que sea visible el buscador del chat.

    }
}
