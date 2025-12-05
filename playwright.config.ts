import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/Specs',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html', { outputFolder: 'reports/html' }],
        ['junit', { outputFile: 'reports/junit.xml' }],
        ['list']
    ],
    use: {
        baseURL: 'https://qa-portal.mewurk.com',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    ],
});