import { LoginPage } from '../Pages/LoginPage';
import { logger } from '../Utils/logger';

export class LoginActions {
    private loginPage: LoginPage;

    constructor(loginPage: LoginPage) {
        this.loginPage = loginPage;
    }

    async navigateToLogin(url: string): Promise<void> {
        await this.loginPage.goto(url);
        logger.info('✅ Navigated to login page');
    }

    async enterEmail(email: string): Promise<void> {
        await this.loginPage.emailInput.click();
        await this.loginPage.emailInput.fill(email);
        logger.info(`✅ Entered email: ${email}`);
    }

    async clickNextButton(): Promise<void> {
        await this.loginPage.nextButton.click();
        logger.info('✅ Clicked Next button');
    }

    async enterPassword(password: string): Promise<void> {
        await this.loginPage.passwordInput.click();
        await this.loginPage.passwordInput.fill(password);
        logger.info('✅ Entered password');
    }

    async clickLoginButton(): Promise<void> {
        await this.loginPage.loginButton.click();
        logger.info('✅ Clicked Login button');
    }

    async login(email: string, password: string): Promise<void> {
        await this.enterEmail(email);
        await this.clickNextButton();
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async loginAndWait(email: string, password: string, waitSelector: string): Promise<void> {
        await this.login(email, password);
        await this.loginPage.getPage().waitForSelector(waitSelector);
        logger.info('✅ Login completed successfully');
    }
}