import { test, expect, Page} from '@playwright/test';
import { AttendanceCorrection } from '../Pages/AttendanceCorrection';
import { LoginPage } from "../Pages/LoginPage";

test('Attendance Correction in People Info/Attendance', async({ page }: { page: Page } ) => {
    const attendanceCorrection = new AttendanceCorrection(page);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin@gvk.com', 'Mewurk@123');
    await attendanceCorrection.employeeAttendanceCorrection();
});