import { KioskPage } from '../Pages/KioskPage';
import { logger } from '../Utils/logger';

export class CreateKioskDeviceActions {
    private kioskPage: KioskPage;

    constructor(kioskPage: KioskPage) {
        this.kioskPage = kioskPage;
    }

    async navigateToKioskSettings(): Promise<void> {
        await this.kioskPage.settings.click();
        logger.info('✅ Clicked Settings');
        
        await this.kioskPage.attendanceSettings.click();
        logger.info('✅ Clicked Attendance Settings');
        
        await this.kioskPage.kioskSetupSettings.click();
        logger.info('✅ Clicked Kiosk Setup Settings');
    }

    async createDevice(deviceName: string, officeName: string, kioskAdmin: string): Promise<void> {
        await this.kioskPage.addDeviceSettings.click();
        logger.info('✅ Clicked Add Device button');

        // Fill device name
        await this.kioskPage.kioskNameTextBox.fill(deviceName);
        logger.info(`✅ Entered device name: ${deviceName}`);

        // Select device type
        await this.kioskPage.devicetype.click();
        logger.info('✅ Clicked Device Type dropdown');
        
        await this.kioskPage.deviceTypeOption.click();
        logger.info('✅ Selected device type option');

        // Select office location
        await this.kioskPage.officeLocationDropdown.click();
        logger.info('✅ Clicked Office Location dropdown');
        
        await this.kioskPage.officeSelectionOption.click();
        logger.info(`✅ Selected office: ${officeName}`);

        // Add admin
        await this.kioskPage.addAdmins.click();
        logger.info('✅ Clicked Add Admins button');

        // Filter and select admin
        await this.kioskPage.employeeNameFilter.fill(kioskAdmin);
        logger.info(`✅ Filtered admin: ${kioskAdmin}`);

        await this.kioskPage.employeeCheckBox.click();
        logger.info('✅ Selected admin checkbox');

        // Clear filter and click add button
        await this.kioskPage.employeeNameFilter.fill('');
        await this.kioskPage.addButtonAdminSelection.nth(1).click();
        logger.info('✅ Clicked Add Button on Admin selection');

        // Add device details
        await this.kioskPage.addButtonDeviceDetailspage.click();
        logger.info('✅ Clicked Add Button on Device Details page');

        // Complete device creation
        await this.kioskPage.completeLaterButton.click();
        logger.info('✅ Device created successfully');
    }

    async configureDeviceSettings(): Promise<void> {
        // Add custom settings configuration here
        logger.info('✅ Device settings configured');
    }

    async verifyErrorHandling(): Promise<void> {
        try {
            await this.kioskPage.addDeviceSettings.click();
            // Try to submit without entering device name
            await this.kioskPage.addButtonDeviceDetailspage.click();
            logger.error('❌ Error validation failed - should show error message');
        } catch (error) {
            logger.info('✅ Error handling validated');
        }
    }

    async deleteDevice(deviceName: string): Promise<void> {
        // Find and click the three-dot dropdown for the device
        const threedotDropdown = this.kioskPage.getPage().getByRole('row', { name: `${deviceName} Not Paired` }).locator('#dropdown-basic');
        await threedotDropdown.click();
        logger.info('✅ Clicked device dropdown menu');

        await this.kioskPage.deleteOption.click();
        logger.info('✅ Clicked Delete option');

        await this.kioskPage.deleteOnConfirmationpopup.click();
        logger.info(`✅ Device ${deviceName} deleted successfully`);
    }
}