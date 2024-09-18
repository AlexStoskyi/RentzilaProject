"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicePage = void 0;
class ServicePage {
    page;
    constructor(page) {
        this.page = page;
    }
    get servicesSection() {
        return this.page.locator('//section[@data-testid="services"]');
    }
    get serviceCard() {
        return this.page.locator('//section[@data-testid="services"]/div[starts-with(@class, "RentzilaProposes_proposes_list")]/div');
    }
    get serviceCardName() {
        return this.page.locator('//section[@data-testid="services"]/div[starts-with(@class, "RentzilaProposes_proposes_list")]/div/div[starts-with(@class,"RentzilaProposes_name")]');
    }
    get serviceTabs() {
        return this.page.locator('//section[@data-testid="services"]/div[starts-with(@class, "RentzilaProposes_categories_list")]/div');
    }
    get serviceMap() {
        return this.page.locator('//div[@id="map"]');
    }
    async scrollToServicesSection() {
        await this.servicesSection.scrollIntoViewIfNeeded();
    }
    async scrollToServiceTabVisible() {
        await this.serviceTabs.scrollIntoViewIfNeeded();
    }
    async isPopularTabVisible() {
        return this.servicesSection.isVisible();
    }
    async mapIsVisible() {
        return this.servicesSection.isVisible();
    }
    async getServiceCount() {
        return this.serviceCard.count();
    }
    async clickFirstService() {
        await this.serviceCard.nth(0).click();
    }
    // async getTextFirstService(): Promise<string> {
    //   return this.serviceCardName.innerText();
    // }
    async clickServiceTabByIndex(index) {
        await this.serviceTabs.nth(index).click();
    }
    async clickServiceByIndex(index) {
        await this.serviceCardName.nth(index).click();
    }
    async getTextServiceByIndex(index) {
        return this.serviceCardName.nth(index).innerText();
    }
    async getTextTabByIndex(index) {
        return this.serviceTabs.nth(index).innerText();
    }
    async getServiceTabsCount() {
        return this.serviceTabs.count();
    }
}
exports.ServicePage = ServicePage;
