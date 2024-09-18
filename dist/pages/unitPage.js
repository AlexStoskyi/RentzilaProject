"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitPage = void 0;
class UnitPage {
    page;
    constructor(page) {
        this.page = page;
    }
    get unitServices() {
        return this.page.locator('//div[@itemprop="services"]/div');
    }
    get serviceInUnit() {
        return this.page.locator('//div[@class="ImageWithDescription_main__faISH"]');
    }
    async unitShouldBeVisible() {
        await this.serviceInUnit.waitFor({ state: 'visible' });
    }
}
exports.UnitPage = UnitPage;
