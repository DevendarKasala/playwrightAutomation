import { test } from '@playwright/test';
import { BasePage } from '../../Pages/LoginPagenew';
import { LoginActions } from '../../Actions/LoginActions';
import { KioskPage } from '../../Pages/KioskPage';
import { CreateKioskDeviceActions } from '../../Actions/CreateKioskDeviceActions';
import { loginTestData } from '../../TestData/loginTestData';
import { kioskTestData } from '../../TestData/kioskTestData';

test.describe('Kiosk Device Creation Tests', () => {

    test('Create Kiosk Device - Smoke Test @smoke @daily @kiosk', async ({ page }) => {
        // Initialize pages and actions
        const loginPage = new LoginPage(page);
        const loginActions = new LoginActions(loginPage);
        
        const kioskPage = new KioskPage(page, kioskTestData.deviceName, kioskTestData.office, kioskTestData.kioskAddAdmin);
        const createDeviceActions = new CreateKioskDeviceActions(kioskPage);

        // Login
        await loginActions.navigateToLogin(loginTestData.baseUrl);
        await loginActions.login(loginTestData.validUser.email, loginTestData.validUser.password);
        console.log('✅ Login successful');

        // Create Kiosk Device
        await createDeviceActions.navigateToKioskSettings();
        await createDeviceActions.createDevice(kioskTestData.deviceName, kioskTestData.office, kioskTestData.kioskAddAdmin);
        console.log('✅ Kiosk device created successfully');
    });

    test('Create Multiple Kiosk Devices @regression @kiosk', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const loginActions = new LoginActions(loginPage);
        
        const kioskPage = new KioskPage(page, kioskTestData.deviceName, kioskTestData.office, kioskTestData.kioskAddAdmin);
        const createDeviceActions = new CreateKioskDeviceActions(kioskPage);

        // Login
        await loginActions.navigateToLogin(loginTestData.baseUrl);
        await loginActions.login(loginTestData.validUser.email, loginTestData.validUser.password);

        // Create multiple devices
        const devices = [
            { name: 'Device-001', office: 'Main Office', admin: 'admin1' },
            { name: 'Device-002', office: 'Branch Office', admin: 'admin2' }
        ];

        for (const device of devices) {
            const kioskPageInstance = new KioskPage(page, device.name, device.office, device.admin);
            const deviceActions = new CreateKioskDeviceActions(kioskPageInstance);
            
            await deviceActions.navigateToKioskSettings();
            await deviceActions.createDevice(device.name, device.office, device.admin);
            console.log(`✅ Device ${device.name} created successfully`);
        }
    });

    test('Create Device with Custom Settings @regression @kiosk', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const loginActions = new LoginActions(loginPage);
        
        const kioskPage = new KioskPage(page, kioskTestData.deviceName, kioskTestData.office, kioskTestData.kioskAddAdmin);
        const createDeviceActions = new CreateKioskDeviceActions(kioskPage);

        // Login
        await loginActions.navigateToLogin(loginTestData.baseUrl);
        await loginActions.login(loginTestData.validUser.email, loginTestData.validUser.password);

        // Create device with custom settings
        await createDeviceActions.navigateToKioskSettings();
        await createDeviceActions.createDevice(kioskTestData.deviceName, kioskTestData.office, kioskTestData.kioskAddAdmin);
        await createDeviceActions.configureDeviceSettings();
        console.log('✅ Device created with custom settings');
    });

    test('Verify Device Creation Error Handling @regression @kiosk', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const loginActions = new LoginActions(loginPage);
        
        const kioskPage = new KioskPage(page, '', kioskTestData.office, kioskTestData.kioskAddAdmin);
        const createDeviceActions = new CreateKioskDeviceActions(kioskPage);

        // Login
        await loginActions.navigateToLogin(loginTestData.baseUrl);
        await loginActions.login(loginTestData.validUser.email, loginTestData.validUser.password);

        // Try to create device with empty name
        await createDeviceActions.navigateToKioskSettings();
        await createDeviceActions.verifyErrorHandling();
        console.log('✅ Error handling test passed');
    });
});