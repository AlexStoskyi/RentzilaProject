import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { FooterPage } from '../../pages/footerPage';
import { QuestionsPage } from '../../pages/questionsFormPage';
import url from '../../helper/url.json';
import invalidNumber from '../../helper/invalidNumber.json';
import { faker } from '@faker-js/faker';
import { ApiHelper } from '../../helper/api';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('TC_226_Verify ""У Вас залишилися питання?"" form', async ({
  page,
  request,
}) => {
  const mainPage = new MainPage(page);
  const footerPage = new FooterPage(page);
  const questionsPage = new QuestionsPage(page);
  const apiHelper = new ApiHelper(request);

  await mainPage.closeTelegramButton.click();

  await footerPage.scrollIntoViewFooter();
  await questionsPage.fillRegistrationUserValue('', '');
  await questionsPage.buttonSubmitForm.click();
  expect(await questionsPage.nameBorderColor()).toBe(true);
  expect(await questionsPage.numberBorderColor()).toBe(true);
  expect(questionsPage.inputNameAllure).toBeVisible();
  expect(questionsPage.inputNumberAllure).toBeVisible();

  await footerPage.scrollIntoViewFooter();
  await questionsPage.fillRegistrationUserValue('Test', '');
  await questionsPage.buttonSubmitForm.click();
  expect(await questionsPage.numberBorderColor()).toBe(true);
  expect(questionsPage.inputNumberAllure).toBeVisible();

  await questionsPage.inputNumber.click();
  const numberValue = await questionsPage.inputNumber.inputValue();
  expect(numberValue).toContain('+380');
  await questionsPage.fillRegistrationUserValue('', '+380506743060');
  await questionsPage.inputName.clear();
  await questionsPage.buttonSubmitForm.click();
  expect(await questionsPage.nameBorderColor()).toBe(true);
  expect(questionsPage.inputNameAllure).toBeVisible();
  expect(await questionsPage.numberBorderColor()).toBe(false);

  await questionsPage.fillRegistrationUserValue('Test', '');
  const invalidPhoneNumbers = [invalidNumber[1], invalidNumber[2]];

  for (const phoneNumber of invalidPhoneNumbers) {
    await questionsPage.inputNumber.fill(phoneNumber);
    await questionsPage.buttonSubmitForm.click();
    const errorMessageNumber =
      await questionsPage.inputNumberAllure.innerText();
    expect(errorMessageNumber).toContain('Телефон не пройшов валідацію');
  }

  let alertShown = false;
  page.on('dialog', async dialog => {
    if (dialog.type() === 'alert') {
      alertShown = true;
      await dialog.accept();
    }
  });

  const name = faker.person.firstName();
  await questionsPage.fillRegistrationUserValue(name, '+380506743060');
  await questionsPage.buttonSubmitForm.click();
  await page.waitForTimeout(5000);
  expect(alertShown).toBe(true);

  try {
    const apiResponse = await apiHelper.createAdminToken();

    const getResponse = await apiHelper.getFeedbackList();

    expect(Array.isArray(getResponse)).toBe(true);

    const reversedItems = [...getResponse].reverse();

    const firstItemAfterReverse = reversedItems[0];

    expect(firstItemAfterReverse).toHaveProperty('name');
    expect(firstItemAfterReverse.name).toBe(name);
  } catch (error) {
    console.error('API request failed:', error);
  }
});
