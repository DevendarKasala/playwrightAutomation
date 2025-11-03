import { test, Page, Locator, expect } from '@playwright/test';

export class KioskPage {
    private page: Page;
    private officeName: string;
    private kioskAddAdmin: string;
    
    private settings: Locator;
    private attendanceSettings: Locator;
    private kioskSetupSettings: Locator;
    private addDeviceSettings: Locator;
    private kioskNameTextBox: Locator;
    private devicetype: Locator;
    private deviceTypeOption: Locator;
    private officeLocationDropdown: Locator;
    private officeSelectionOption: Locator;
    private addAdmins: Locator;
    private employeeNameFilter: Locator;
    private employeeCheckBox: Locator;
    private addButtonAdminSelection: Locator;
    private addButtonDeviceDetailspage: Locator;
    private completeLaterButton: Locator;
    private deleteOption: Locator;
    private deleteOnConfirmationpopup: Locator;
    private attendanceMarkingType: Locator;
    private proximitySettingsType: Locator;
    private sleepModeRadiobutton: Locator;
    private sleepModedropdown: Locator;
    private appRestartSchedular: Locator;
    private livenessCheckRadiobutton: Locator;
    private livenessPrecision: Locator;
    private faceReEnrollment: Locator;


    constructor(page: Page,devicename: string, office: string, kioskAddAdmin: string) {
        this.page = page;
        this.officeName = office;
        this.kioskAddAdmin = kioskAddAdmin;

        this.settings = page.locator('text="Settings"');
        this.attendanceSettings = page.locator('text="Attendance"');
        this.kioskSetupSettings = page.locator('text="Kiosk Setup"');
        this.addDeviceSettings = page.locator('text="Add Device"');
        this.kioskNameTextBox = page.locator('[name="kioskName"]');
        this.devicetype = page.locator('xpath=//span[text()="Select device type"]');
        this.deviceTypeOption = page.getByRole('button', { name: 'Mace10' })
        this.officeLocationDropdown = page.locator('xpath=//span[text()="Select office"]');
        this.officeSelectionOption = page.getByRole('button', { name: `${office}` })
        this.addAdmins = page.locator('span:has-text("Add Admin")');
        this.employeeNameFilter = page.getByRole('textbox', { name: 'Employee Name Filter Input' });        
        this.employeeCheckBox = page
                .locator('div[role="row"]', { hasText: this.kioskAddAdmin })
                 .locator('input[type="checkbox"]');
        this.addButtonAdminSelection = page.locator('text="Add"');
        this.addButtonDeviceDetailspage = page.getByRole('button', { name: 'Add', exact: true });
        this.completeLaterButton = page.getByRole('button', { name: 'Complete Later' });
        this.deleteOption = page.locator('text="Delete"');
        this.deleteOnConfirmationpopup = page.getByRole('button', { name: 'Delete' });

        this.attendanceMarkingType = page.getByRole('radio', { name: 'Out'});
        this.sleepModeRadiobutton = page.getByRole('checkbox', { name: 'sleepMode'});
        this.sleepModedropdown = page.locator('[name="screenSleepTime"');
        this.proximitySettingsType = page.getByRole('radio', {name: "High"});
        this.appRestartSchedular = page.locator('text="12:00 PM"}');
        this.livenessCheckRadiobutton = page.getByRole('checkbox', {name: "livenessCheckEnabled"});
        this.livenessPrecision = page.locator('name="livenessSensitivity"');
        this.faceReEnrollment = page.getByRole('checkbox', {name: "reEnrollmentEnabled"});

    }

    async goto(): Promise<void> {
        await this.page.goto('https://qa-portal.mewurk.com/login');
    }

    async createKioskDevice(devicename: string, officeName: string): Promise<void>{
        await this.settings.click();
        await this.attendanceSettings.click();
        await this.kioskSetupSettings.click();
        await this.addDeviceSettings.click();
        await this.kioskNameTextBox.fill(devicename);
        console.log(`Entered ${devicename} in the given field`);
        await this.devicetype.click();
        await this.deviceTypeOption.click();
        await this.officeLocationDropdown.click();
        await this.officeSelectionOption.click();
        console.log(`Selected ${officeName} from the dropdown`);
        await this.addAdmins.click();
        await this.employeeNameFilter.fill(this.kioskAddAdmin);
        console.log('entered kiosk admin from the search filter');
        await this.page.screenshot({ path: 'screenshots/my-shot.png', fullPage: true });
        await expect(this.employeeCheckBox).toBeVisible();
        await this.employeeCheckBox.click();
        console.log('Clicked checkbox to select kiosk admin from the list');
        await this.employeeNameFilter.fill('');
        await this.addButtonAdminSelection.nth(1).click();    //nth is used when the same element is used for two elements, based on index we can perform action
        console.log(`✅ 'Add' Button on Kiosk Admin selection slider clicked successfully`);
        await this.addButtonDeviceDetailspage.click();
        console.log(`✅ 'Add' Button on Kiosk Details page clicked successfully`);
        await this.completeLaterButton.click();
        // const threedotDropdown =  this.page.getByRole('row', { name: `${devicename} Not Paired` }).locator('#dropdown-basic');  //to click on row based on the devicename
        // await threedotDropdown.click();
        // await this.deleteOption.click();
        // await this.deleteOnConfirmationpopup.click();
        // console.log(`${devicename} device deleted succesfully...`);
    }

    // async EditKioskDevice(officeLocation: string): Promise<void> {

    //     await this.officeLocationDropdown.selectOption(officeLocation);
    //     await this.attendanceMarkingType.check();
    //     await this.sleepModeRadiobutton.check();
    //     await this.sleepModedropdown.selectOption('20');
    //     await this.proximitySettingsType.check();
    //     await this.livenessCheckRadiobutton.check();
    //     await this.livenessPrecision.selectOption('High');
    //     await this.faceReEnrollment.check();
    
    // }

    // async DeleteKioskDevice(devicename: String): Promise<void> {

    //     const threedotDropdown =  this.page.getByRole('row', { name: `${devicename} Not Paired` }).locator('#dropdown-basic');  //to click on row based on the devicename
    //     await threedotDropdown.click();
    //     await this.deleteOption.click();
    //     await this.deleteOnConfirmationpopup.click();
    //     console.log(`${devicename} device deleted succesfully...`);
    // }        
    

}

// // ======================= Playwright Tests =======================

// test.describe('Kiosk Device Tests', () => {
//     let kioskPage: KioskPage;
//     const devicename = 'TestKiosk001';
//     const officeName = 'Bangalore';
//     const kioskAdmin = 'John Doe';

//     test.beforeEach(async ({ page }) => {
//         kioskPage = new KioskPage(page, devicename, officeName, kioskAdmin);
//         await kioskPage.goto();
//     });

//     test('Create Kiosk Device', async () => {
//         await kioskPage.createKioskDevice(devicename, officeName);
//         // Add a simple assertion to verify creation
//         const row = kioskPage.page.getByRole('row', { name: `${devicename}` });
//         await expect(row).toBeVisible();
//     });

//     test('Edit Kiosk Device', async () => {
//         await kioskPage.EditKioskDevice(officeName);
//         // Optionally, assert that settings are applied
//         await expect(kioskPage.sleepModedropdown).toHaveValue('20');
//     });

//     test('Delete Kiosk Device', async () => {
//         await kioskPage.DeleteKioskDevice(devicename);
//         // Verify deletion
//         const row = kioskPage.page.getByRole('row', { name: `${devicename}` });
//         await expect(row).not.toBeVisible();
//     });
// });