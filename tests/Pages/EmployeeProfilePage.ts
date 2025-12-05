import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class EmployeeProfilePage extends BasePage {
    // Employee Profile specific locators
    peopleInfoLink: Locator;
    kioskPhotosMissingLink: Locator;
    hoverEffectElement: Locator;
    browseFileText: Locator;
    dragDropArea: Locator;
    cropButton: Locator;
    saveButton: Locator;

    constructor(page: Page) {
        super(page);
        this.peopleInfoLink = page.getByRole('link', { name: 'People Info' });
        this.kioskPhotosMissingLink = page.getByText('Kiosk Photos Missing');
        this.hoverEffectElement = page.locator('.hover-effect').first();
        this.browseFileText = page.getByText('orBrowse File');
        this.dragDropArea = page.getByText('Drag and drop your file hereorBrowse File');
        this.cropButton = page.getByRole('button', { name: 'Use the arrow keys to move the north west drag handle to change the crop' });
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }
}