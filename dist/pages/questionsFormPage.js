"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsPage = void 0;
class QuestionsPage {
    page;
    constructor(page) {
        this.page = page;
    }
    get questionsForm() {
        return this.page.locator('//section[starts-with(@class, "Layouts_consultation")]');
    }
    get inputName() {
        return this.page.locator('//input[@name]');
    }
    get inputNumber() {
        return this.page.locator('//input[@id="mobile"]');
    }
    get buttonSubmitForm() {
        return this.page.locator('//button[@type="submit"]');
    }
    get inputNameAllure() {
        return this.page.locator('//div[starts-with(@class, "ConsultationForm_name")]/p');
    }
    get inputNumberAllure() {
        return this.page.locator('//div[starts-with(@class, "ConsultationForm_phone")]/p');
    }
    async fillRegistrationUserValue(name, number) {
        await this.inputName.fill(name);
        await this.inputNumber.fill(number);
    }
    async nameBorderColor() {
        return await this.inputName.evaluate(element => {
            const borderColor = window.getComputedStyle(element).borderColor;
            const rgbToHex = (rgb) => {
                const [r, g, b] = rgb.match(/\d+/g).map(Number);
                return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            };
            return rgbToHex(borderColor) === '#f73859';
        });
    }
    async numberBorderColor() {
        return await this.inputNumber.evaluate(element => {
            const borderColor = window.getComputedStyle(element).borderColor;
            const rgbToHex = (rgb) => {
                const [r, g, b] = rgb.match(/\d+/g).map(Number);
                return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            };
            return rgbToHex(borderColor) === '#f73859';
        });
    }
}
exports.QuestionsPage = QuestionsPage;
