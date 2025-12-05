import { EmployeeProfilePage } from '../Pages/EmployeeProfilePage';
import { logger } from '../Utils/logger';

export class UploadKioskPhotoActions {
    private employeeProfilePage: EmployeeProfilePage;

    constructor(employeeProfilePage: EmployeeProfilePage) {
        this.employeeProfilePage = employeeProfilePage;
    }

    async navigateToKioskPhotosMissing(): Promise<void> {
        await this.employeeProfilePage.peopleInfoLink.click();
        logger.info('✅ Clicked People Info link');
        
        await this.employeeProfilePage.kioskPhotosMissingLink.click();
        logger.info('✅ Clicked Kiosk Photos Missing');
    }

    async uploadKioskPhoto(filePath: string): Promise<void> {
        await this.employeeProfilePage.hoverEffectElement.click();
        logger.info('✅ Clicked hover effect element');
        
        await this.employeeProfilePage.browseFileText.click();
        logger.info('✅ Clicked Browse File');
        
        await this.employeeProfilePage.dragDropArea.setInputFiles(filePath);
        logger.info(`✅ Uploaded file: ${filePath}`);
    }

    async cropPhotoWithDrag(startX: number, startY: number, endX: number, endY: number): Promise<void> {
        await this.employeeProfilePage.cropButton.dragTo(this.employeeProfilePage.cropButton, {
            sourcePosition: { x: startX, y: startY },
            targetPosition: { x: endX, y: endY }
        });
        logger.info(`✅ Dragged crop button from (${startX}, ${startY}) to (${endX}, ${endY})`);
    }

    async savePhoto(): Promise<void> {
        await this.employeeProfilePage.saveButton.click();
        logger.info('✅ Clicked Save button');
    }

    async uploadKioskPhotoComplete(filePath: string, startX: number, startY: number, endX: number, endY: number): Promise<void> {
        await this.uploadKioskPhoto(filePath);
        await this.cropPhotoWithDrag(startX, startY, endX, endY);
        await this.savePhoto();
    }
}