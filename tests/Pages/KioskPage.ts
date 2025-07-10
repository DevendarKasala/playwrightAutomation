import { Page, Locator, expect } from '@playwright/test';

export class KioskPage {
    private page: Page;
    private settings: Locator;
    private attendanceSettings: Locator;
    private kioskSetupSettings: Locator;
    private addDeviceSettings: Locator;
    private kioskNameTextBox: Locator;
    private officeLocationDropdown: Locator;
    private addAdmins: Locator;
    private employeeNameFilter: Locator;
    private employeeCheckBox: Locator;
    private addButtonAdminSelection: Locator;
    private addButtonDeviceDetailspage: Locator;
    private completeLaterButton: Locator;
    // private threedotDropdown: Locator;
    private deleteOption: Locator;
    private deleteOnConfirmationpopup: Locator;


     kioskAddEmployee = 'Doctor';

    constructor(page: Page) {
        this.page = page;
        this.settings = page.locator('text="Settings"');
        this.attendanceSettings = page.locator('text="Attendance"');
        this.kioskSetupSettings = page.locator('text="Kiosk Setup"');
        this.addDeviceSettings = page.locator('text="Add Device"');
        this.kioskNameTextBox = page.locator('[name="kioskName"]');
        this.officeLocationDropdown = page.locator('[name="officeId"]');
        this.addAdmins = page.locator('span:has-text("Add Admin")');
        this.employeeNameFilter = page.getByRole('textbox', { name: 'Employee Name Filter Input' });        
        this.employeeCheckBox = page
                .locator('div[role="row"]', { hasText: this.kioskAddEmployee })
                 .locator('input[type="checkbox"]');
        this.addButtonAdminSelection = page.locator('text="Add"');
        this.addButtonDeviceDetailspage = page.getByRole('button', { name: 'Add', exact: true });
        this.completeLaterButton = page.getByRole('button', { name: 'Complete Later' });
        this.deleteOption = page.locator('text="Delete"');
        this.deleteOnConfirmationpopup = page.getByRole('button', { name: 'Delete' });

    }

    async goto(): Promise<void> {
        await this.page.goto('https://qa-portal.mewurk.com/login');
    }

    async createKioskDevice(devicename: string, officeLocation: string): Promise<void>{
        await this.settings.click();
        await this.attendanceSettings.click();
        await this.kioskSetupSettings.click();
        await this.addDeviceSettings.click();
        await this.kioskNameTextBox.fill(devicename);
        console.log(`Entered ${devicename} in the given field`);
        await this.officeLocationDropdown.selectOption(officeLocation);
        await this.addAdmins.click();
        await this.employeeNameFilter.fill(this.kioskAddEmployee);
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
        const threedotDropdown =  this.page.getByRole('row', { name: `${devicename} Not Paired` }).locator('#dropdown-basic');  //to click on row based on the devicename
        await threedotDropdown.click();
        await this.deleteOption.click();
        // const deleteOnConfirmationpopup  = this.page.getByText(`${devicename} deleted`);
        // console.log(`click on the delete option for the ${devicename} device`);
        await this.deleteOnConfirmationpopup.click();
        console.log(`${devicename} device deleted succesfully...`);
    }

}
