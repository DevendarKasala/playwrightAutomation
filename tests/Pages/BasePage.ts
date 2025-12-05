import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;

    // Common Locators
    emailInput: Locator;
    nextButton: Locator;
    passwordInput: Locator;
    loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize common locators
        this.emailInput = page.getByRole('textbox', { name: 'Email ID / Mobile Number' });
        this.nextButton = page.locator('button').filter({ hasText: 'Next' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    }

    getPage(): Page {
        return this.page;
    }

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }
}