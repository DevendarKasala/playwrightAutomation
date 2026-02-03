import { test } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { LoginActions } from '../../Actions/LoginActions';
import { EmployeeProfilePage } from '../../Pages/EmployeeProfilePage';
import { UploadKioskPhotoActions } from '../../Actions/UploadKioskPhotoActions';
import { loginTestData } from '../../TestData/loginTestData';
import { kioskTestData } from '../../TestData/kiosktestdata';

test('Upload Kiosk Photo E2E', async ({ page }) => {
    // Initialize pages
    const loginPage = new LoginPage(page);
    const loginActions = new LoginActions(loginPage);

    const employeeProfilePage = new EmployeeProfilePage(page);
    const uploadActions = new UploadKioskPhotoActions(employeeProfilePage);

    // Login
    await loginActions.navigateToLogin(loginTestData.baseUrl);
    await loginActions.login(loginTestData.validUser.email, loginTestData.validUser.password);

    // Upload photo
    await uploadActions.navigateToKioskPhotosMissing();
    // await uploadActions.uploadKioskPhotoComplete(
    //     // kioskTestData.kioskPhotoUpload.filePath,
    //     // kioskTestData.kioskPhotoUpload.cropStartX,
    //     // kioskTestData.kioskPhotoUpload.cropStartY,
    //     // kioskTestData.kioskPhotoUpload.cropEndX,
    //     // kioskTestData.kioskPhotoUpload.cropEndY
    // );
});