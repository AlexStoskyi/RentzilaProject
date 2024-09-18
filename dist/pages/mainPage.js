"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainPage = void 0;
class MainPage {
    page;
    constructor(page) {
        this.page = page;
    }
    get logo() {
        return this.page.locator('//a/div[@data-testid="logo"]');
    }
    get closeTelegramButton() {
        return this.page.locator('//div[@data-testid="crossButton"]');
    }
    async clickLogo() {
        await this.logo.click();
    }
}
exports.MainPage = MainPage;
