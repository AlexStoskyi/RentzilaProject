import { Page } from '@playwright/test';

export class MainPage {
  constructor(private page: Page) {}

  get logo() {
    return this.page.locator('//a/div[@data-testid="logo"]');
  }

  get closeTelegramButton() {
    return this.page.locator('//div[@data-testid="crossButton"]');
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
  }
}
