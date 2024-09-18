"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const url_json_1 = __importDefault(require("../helper/url.json"));
const api_1 = require("../helper/api");
test_1.test.beforeEach(async ({ page }) => {
    await page.goto(url_json_1.default.home_page);
});
(0, test_1.test)('api', async ({ page, request }) => {
    const apiHelper = new api_1.ApiHelper(request);
    try {
        const apiResponse = await apiHelper.createAdminToken();
        console.log('API Response:', apiResponse);
        const getResponse = await apiHelper.getFeedbackList();
        console.log('GET Response:', getResponse);
        (0, test_1.expect)(Array.isArray(getResponse)).toBe(true);
        const reversedItems = [...getResponse].reverse();
        const firstItemAfterReverse = reversedItems[0];
        (0, test_1.expect)(firstItemAfterReverse).toHaveProperty('name');
        (0, test_1.expect)(firstItemAfterReverse.name).toBe('expectedName');
    }
    catch (error) {
        console.error('API request failed:', error);
    }
});
