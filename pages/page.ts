import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickElement(element: Locator): Promise<void> {
        await element.click();
    }
}