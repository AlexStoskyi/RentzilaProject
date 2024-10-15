import { Page } from '@playwright/test';

export class UnitPage {
  constructor(private page: Page) {}

  get unitServices() {
    return this.page.locator('//div[@itemprop="services"]/div');
  }

  get serviceInUnit() {
    return this.page.locator('[class*=ImageWithDescription_main]');
  }

  async unitShouldBeVisible(): Promise<void> {
    await this.serviceInUnit.waitFor({ state: 'visible' });
  }
}
