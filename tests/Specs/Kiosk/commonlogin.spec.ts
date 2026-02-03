import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPagenew';
import { LoginActions } from '../Actions/LoginActions';
import { loginTestData } from '../TestData/loginTestData';

export const test = baseTest.extend<{ authenticatedPage: void }>({
    authenticatedPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const loginActions = new LoginActions(loginPage);

        await loginActions.navigateToLogin(loginTestData.baseUrl);
        await loginActions.login(loginTestData.validUser.email, loginTestData.validUser.password);
        console.log('✅ Login successful');

        await use(page);
    }
});