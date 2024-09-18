"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const productsPage_1 = require("../pages/productsPage");
const mainPage_1 = require("../pages/mainPage");
const specialEquipPage_1 = require("../pages/specialEquipPage");
const url_json_1 = __importDefault(require("../helper/url.json"));
const checkOutUrl_1 = require("../helper/checkOutUrl");
test_1.test.beforeEach(async ({ page }) => {
    await page.goto(url_json_1.default.home_page);
});
(0, test_1.test)('TC_213_Checking ""Спецтехніка"" section on the main page', async ({ page, }) => {
    const productPage = new productsPage_1.ProductPage(page);
    const mainPage = new mainPage_1.MainPage(page);
    const specialEquipPage = new specialEquipPage_1.SpecialEquipPage(page);
    await specialEquipPage.scrollToSpecialEquipSection();
    (0, test_1.expect)(await specialEquipPage.isPopularTabVisible()).toBe(true);
    const countServiceCategories = await specialEquipPage.getSpecialEquipTabsCount();
    (0, test_1.expect)(countServiceCategories).toBeGreaterThan(0);
    for (let i = 0; i < countServiceCategories; i++) {
        await specialEquipPage.clickSpecialEquipTabByIndex(i);
        (0, test_1.expect)(await productPage.mapIsVisible());
        const amountOfServices = await specialEquipPage.getSpecialEquipCount();
        (0, test_1.expect)(amountOfServices).toBeGreaterThan(0);
        for (let j = 0; j < amountOfServices; j++) {
            await specialEquipPage.clickSpecialEquipmentByIndex(j);
            await page.waitForTimeout(1000);
            const currentUrl = await page.url();
            const relevantUnits = checkOutUrl_1.expectUrl;
            (0, test_1.expect)(relevantUnits).toContain(currentUrl?.trim());
            const activeCheckboxCount = await productPage.getFiltersCount();
            (0, test_1.expect)(activeCheckboxCount).toBe(1);
            await mainPage.clickLogo();
            await (0, test_1.expect)(page).toHaveURL(url_json_1.default.home_page);
            await specialEquipPage.scrollToSpecialEquipSection();
        }
    }
});
