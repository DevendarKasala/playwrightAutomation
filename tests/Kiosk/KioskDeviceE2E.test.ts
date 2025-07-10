import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage'; 
import { KioskPage } from "../Pages/KioskPage";

test('Kiosk Device E2E', async({ page }: { page: Page}) => {
    const kioskPage = new KioskPage(page);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin@gvk.com', 'Mewurk@123');
    await kioskPage.createKioskDevice('playwrightDevice', 'Bangalore Office');


});