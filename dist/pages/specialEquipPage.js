"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialEquipPage = void 0;
class SpecialEquipPage {
    page;
    constructor(page) {
        this.page = page;
    }
    get specialEquipSection() {
        return this.page.locator('//section[@data-testid="specialEquipment"]');
    }
    get specialEquipCard() {
        return this.page.locator('//section[@data-testid="specialEquipment"]/div[starts-with(@class, "RentzilaProposes_proposes_list")]/div');
    }
    get specialEquipCardName() {
        return this.page.locator('//section[@data-testid="specialEquipment"]/div[starts-with(@class, "RentzilaProposes_proposes_list")]/div/div[starts-with(@class,"RentzilaProposes_name")]');
    }
    get specialEquipTabs() {
        return this.page.locator('//section[@data-testid="specialEquipment"]/div[starts-with(@class, "RentzilaProposes_categories_list")]/h3');
    }
    async scrollToSpecialEquipSection() {
        await this.specialEquipSection.scrollIntoViewIfNeeded();
    }
    async scrollToSpecialEquipTabVisible() {
        await this.specialEquipTabs.scrollIntoViewIfNeeded();
    }
    async isPopularTabVisible() {
        return this.specialEquipSection.isVisible();
    }
    async getSpecialEquipCount() {
        return this.specialEquipCard.count();
    }
    async clickFirstSpecialEquip() {
        await this.specialEquipCard.nth(0).click();
    }
    async getTextFirstSpecialEquip() {
        return this.specialEquipCardName.innerText();
    }
    async clickSpecialEquipTabByIndex(index) {
        await this.specialEquipTabs.nth(index).click();
    }
    async getTextTabByIndex(index) {
        return this.specialEquipTabs.nth(index).innerText();
    }
    async getSpecialEquipTabsCount() {
        return this.specialEquipTabs.count();
    }
    async getTextSpecialEquipmentByIndex(index) {
        return this.specialEquipCardName.nth(index).innerText();
    }
    async clickSpecialEquipmentByIndex(index) {
        await this.specialEquipCardName.nth(index).click();
    }
}
exports.SpecialEquipPage = SpecialEquipPage;
