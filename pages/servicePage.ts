import { Page } from '@playwright/test';

export class ServicePage {
  constructor(private page: Page) {}

  get servicesSection() {
    return this.page.getByTestId('services');
  }

  get serviceCard() {
    return this.page.locator(
      '//section[@data-testid="services"]/div[starts-with(@class, "RentzilaProposes_proposes_list")]/div'
    );
  }

  get serviceCardName() {
    return this.page.locator(
      '//section[@data-testid="services"]/div[starts-with(@class, "RentzilaProposes_proposes_list")]/div/div[starts-with(@class,"RentzilaProposes_name")]'
    );
  }

  get serviceTabs() {
    return this.page.locator(
      '//section[@data-testid="services"]/div[starts-with(@class, "RentzilaProposes_categories_list")]/div'
    );
  }
  get serviceMap() {
    return this.page.locator('#map');
  }

  async scrollToServicesSection(): Promise<void> {
    await this.servicesSection.scrollIntoViewIfNeeded();
  }

  async scrollToServiceTabVisible(): Promise<void> {
    await this.serviceTabs.scrollIntoViewIfNeeded();
  }

  async isPopularTabVisible(): Promise<boolean> {
    return this.servicesSection.isVisible();
  }

  async mapIsVisible(): Promise<boolean> {
    return this.servicesSection.isVisible();
  }

  async getServiceCount(): Promise<number> {
    return this.serviceCard.count();
  }

  async clickFirstService(): Promise<void> {
    await this.serviceCard.nth(0).click();
  }

  async clickServiceTabByIndex(index: number): Promise<void> {
    await this.serviceTabs.nth(index).click();
  }
  
  async clickServiceByIndex(index: number): Promise<void> {
    await this.serviceCardName.nth(index).click();
  }

  async getTextServiceByIndex(index: number): Promise<string> {
    return this.serviceCardName.nth(index).innerText();
  }

  async getTextTabByIndex(index: number): Promise<string> {
    return this.serviceTabs.nth(index).innerText();
  }

  async getServiceTabsCount(): Promise<number> {
    return this.serviceTabs.count();
  }
}
