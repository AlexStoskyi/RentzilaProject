"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const productsPage_1 = require("../pages/productsPage");
const mainPage_1 = require("../pages/mainPage");
const unitPage_1 = require("../pages/unitPage");
const servicePage_1 = require("../pages/servicePage");
const url_json_1 = __importDefault(require("../helper/url.json"));
test_1.test.beforeEach(async ({ page }) => {
    await page.goto(url_json_1.default.home_page);
});
(0, test_1.test)('TC_212_Checking ""Послуги"" section on the main page', async ({ page, }) => {
    const productPage = new productsPage_1.ProductPage(page);
    const mainPage = new mainPage_1.MainPage(page);
    const unitPage = new unitPage_1.UnitPage(page);
    const servicePage = new servicePage_1.ServicePage(page);
    await servicePage.scrollToServicesSection();
    (0, test_1.expect)(await servicePage.isPopularTabVisible()).toBe(true);
    const countServiceCategories = await servicePage.getServiceTabsCount();
    (0, test_1.expect)(countServiceCategories).toBeGreaterThan(0);
    for (let i = 0; i < countServiceCategories; i++) {
        await servicePage.clickServiceTabByIndex(i);
        const amountOfServices = await servicePage.getServiceCount();
        (0, test_1.expect)(amountOfServices).toBeGreaterThan(0);
        for (let j = 0; j < amountOfServices; j++) {
            const proposesItemName = await servicePage.getTextServiceByIndex(j);
            await servicePage.clickServiceByIndex(j);
            const takenFilterName = await productPage.getTextSelectedFilters();
            await productPage.clickOnDropDownButtonIfClosed();
            await productPage.scrollToCheckBoxName();
            (0, test_1.expect)(takenFilterName).toBe(proposesItemName);
            (0, test_1.expect)(await productPage.areFilterCheckboxesChecked()).toBe(true);
            const checkboxes = productPage.filterCheckbox;
            const checkBoxName = await productPage.checkBoxName;
            const checkboxCount = await checkboxes.count();
            let activeCheckboxCount = 0;
            let activeCheckboxText = '';
            for (let j = 0; j < checkboxCount; j++) {
                const checkbox = await checkboxes.nth(j);
                const textElement = await checkBoxName.nth(j);
                if (await checkbox.isChecked()) {
                    activeCheckboxCount++;
                    activeCheckboxText = await textElement.innerText();
                    console.log(`Active checkbox text: ${activeCheckboxText}`);
                }
            }
            (0, test_1.expect)(activeCheckboxCount).toBe(1);
            (0, test_1.expect)(activeCheckboxText).toContain(proposesItemName);
            await productPage.clickFirstUnit();
            await unitPage.unitShouldBeVisible();
            const possibleNamesElements = unitPage.unitServices;
            const possibleNames = await possibleNamesElements.evaluateAll(elements => elements
                .map(element => {
                if (element instanceof HTMLElement) {
                    return element.innerText;
                }
                return '';
            })
                .filter(text => text !== ''));
            (0, test_1.expect)(possibleNames).toContain(proposesItemName);
            await mainPage.clickLogo();
            await (0, test_1.expect)(page).toHaveURL(url_json_1.default.home_page);
            await servicePage.scrollToServicesSection();
        }
    }
});
