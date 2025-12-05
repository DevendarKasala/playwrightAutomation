import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage'; 
import { KioskPage } from "../Pages/KioskPage";
import { kioskTestData } from "../TestData/kiosktestdata";
// const { kioskdeviceName, officeName, kioskAddAdmin } = kioskTestData[0];
const  kioskdeviceName = kioskTestData[0].kioskdeviceName;
const   officeName = kioskTestData[0].officeName;
const   kioskAddAdmin  = kioskTestData[0].kioskAddAdmin;

test('Kiosk Device E2E', async({ page }: { page: Page}) => {
    // Import test data
    

    const kioskPage = new KioskPage(page, kioskdeviceName, officeName, kioskAddAdmin);
    const loginPage = new LoginPage(page);

    //Navigation to Mewurk HRMS portal
    await loginPage.goto();

    // Login to the portal as admin
    await loginPage.login('admin@gvk.com', 'Mewurk@1234');

    //First test case as create device
    await kioskPage.createKioskDevice(kioskdeviceName, officeName);

    // //Second testcase as Edit Device
    // await kioskPage.EditKioskDevice('Goa');

    // //Delete the Created Device
    // await kioskPage.DeleteKioskDevice(kioskdeviceName);


});

// test('Edit the Device', async({ page }: { page: Page})) => {
//     const kioskPage = new KioskPage(page);
//     const loginPage = new LoginPage(page);

//     await loginPage.goto();
//     await loginPage.login('admin@gvk.com', 'Mewurk@123');
//     await kioskPage.EditKioskDevice('Goa');
// }