import { test, expect, Page } from '@playwright/test';
import { LoginPage } from './Pages/LoginPage'; 

test('Admin Login', async ({ page }: { page: Page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('admin@gvk.com', 'Mewurk@123');

  await expect(page).toHaveURL(/home/); // verifying the redirected URL
});
