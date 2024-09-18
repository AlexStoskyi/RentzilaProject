"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const mainPage_1 = require("../pages/mainPage");
const footerPage_1 = require("../pages/footerPage");
const questionsFormPage_1 = require("../pages/questionsFormPage");
const url_json_1 = __importDefault(require("../helper/url.json"));
const invalidNumber_json_1 = __importDefault(require("../helper/invalidNumber.json"));
const faker_1 = require("@faker-js/faker");
const api_1 = require("../helper/api");
test_1.test.beforeEach(async ({ page }) => {
    await page.goto(url_json_1.default.home_page);
});
(0, test_1.test)('TC_226_Verify ""У Вас залишилися питання?"" form', async ({ page, request, }) => {
    const mainPage = new mainPage_1.MainPage(page);
    const footerPage = new footerPage_1.FooterPage(page);
    const questionsPage = new questionsFormPage_1.QuestionsPage(page);
    const apiHelper = new api_1.ApiHelper(request);
    await mainPage.closeTelegramButton.click();
    await footerPage.scrollIntoViewFooter();
    await questionsPage.fillRegistrationUserValue('', '');
    await questionsPage.buttonSubmitForm.click();
    (0, test_1.expect)(await questionsPage.nameBorderColor()).toBe(true);
    (0, test_1.expect)(await questionsPage.numberBorderColor()).toBe(true);
    (0, test_1.expect)(questionsPage.inputNameAllure).toBeVisible();
    (0, test_1.expect)(questionsPage.inputNumberAllure).toBeVisible();
    await footerPage.scrollIntoViewFooter();
    await questionsPage.fillRegistrationUserValue('Test', '');
    await questionsPage.buttonSubmitForm.click();
    (0, test_1.expect)(await questionsPage.numberBorderColor()).toBe(true);
    (0, test_1.expect)(questionsPage.inputNumberAllure).toBeVisible();
    await questionsPage.inputNumber.click();
    const numberValue = await questionsPage.inputNumber.inputValue();
    (0, test_1.expect)(numberValue).toContain('+380');
    await questionsPage.fillRegistrationUserValue('', '+380506743060');
    await questionsPage.inputName.clear();
    await questionsPage.buttonSubmitForm.click();
    (0, test_1.expect)(await questionsPage.nameBorderColor()).toBe(true);
    (0, test_1.expect)(questionsPage.inputNameAllure).toBeVisible();
    (0, test_1.expect)(await questionsPage.numberBorderColor()).toBe(false);
    await questionsPage.fillRegistrationUserValue('Test', '');
    const invalidPhoneNumbers = [invalidNumber_json_1.default[1], invalidNumber_json_1.default[2]];
    for (const phoneNumber of invalidPhoneNumbers) {
        await questionsPage.inputNumber.fill(phoneNumber);
        await questionsPage.buttonSubmitForm.click();
        const errorMessageNumber = await questionsPage.inputNumberAllure.innerText();
        (0, test_1.expect)(errorMessageNumber).toContain('Телефон не пройшов валідацію');
    }
    let alertShown = false;
    page.on('dialog', async (dialog) => {
        if (dialog.type() === 'alert') {
            alertShown = true;
            await dialog.accept();
        }
    });
    const name = faker_1.faker.person.firstName();
    await questionsPage.fillRegistrationUserValue(name, '+380506743060');
    await questionsPage.buttonSubmitForm.click();
    await page.waitForTimeout(5000);
    (0, test_1.expect)(alertShown).toBe(true);
    try {
        const apiResponse = await apiHelper.createAdminToken();
        const getResponse = await apiHelper.getFeedbackList();
        (0, test_1.expect)(Array.isArray(getResponse)).toBe(true);
        const reversedItems = [...getResponse].reverse();
        const firstItemAfterReverse = reversedItems[0];
        (0, test_1.expect)(firstItemAfterReverse).toHaveProperty('name');
        (0, test_1.expect)(firstItemAfterReverse.name).toBe(name);
    }
    catch (error) {
        console.error('API request failed:', error);
    }
});
