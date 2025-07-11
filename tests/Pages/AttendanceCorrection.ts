
import { expect, Page, Locator } from "playwright/test";

export class AttendanceCorrection {

    private page: Page;
    private peopleInfo: Locator;
    private attendancePeopleInfo: Locator;
    private searchEmployee: Locator;
    private searchBar: Locator;
    private employeeListCheckBox: Locator;
    private emploeyeeDropdownChip: Locator;
    private selectPresentDropdown: Locator;
    private selectAbesentDropdown: Locator;

    constructor(page: Page) {
        this.page = page;
        this.peopleInfo = page.locator('text="People Info"');
        this.attendancePeopleInfo = page.locator('text="Attendance"');
        this.searchEmployee = page.locator('text="Search Employee(s)"');
        this.searchBar = page.getByPlaceholder('Search here');
        this.employeeListCheckBox = page.getByLabel('', { exact: true });
        this.emploeyeeDropdownChip = page.locator('text="1 Employee(s)"');
        this.selectPresentDropdown = page.getByRole('option', {name: 'Present (P)'});
        this.selectAbesentDropdown = page.getByRole('option', {name: 'Absent (A)'});
        

    }

    async goto(): Promise<void> {
        await this.page.goto('https://qa-portal.mewurk.com/login');
    }

    async employeeAttendanceCorrection(): Promise<void> {
        await this.peopleInfo.click();
        await this.attendancePeopleInfo.click();
        await this.searchEmployee.click();
        await this.searchBar.fill('Natash');
        await this.employeeListCheckBox.check();
        await this.emploeyeeDropdownChip.click();

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      const year = yesterday.getFullYear();
      const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // month is 0-indexed
      const day = String(yesterday.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate); // Output: e.g., "2025-07-10"
      const selectYesterdayCell =  this.page.locator(`[col-id="${formattedDate}"]`).nth(1).click();
      console.log(`${selectYesterdayCell}`);
      await this.selectPresentDropdown.click();  //if absent is present there
};

}