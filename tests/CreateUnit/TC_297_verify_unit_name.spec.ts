import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Verify unit name section', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const createUnitePage = new CreateUnitPage(page);
  const login: string | undefined = process.env.VALID_LOGIN;
  const password: string | undefined = process.env.VALID_PASSWORD;

  await mainPage.loginButton.click();
  await loginPopUpPage.login(login, password);
  await loginPopUpPage.submitButton.click();
  await expect(mainPage.avatarField).toBeVisible();
  await page.goto(url.create_unit);

  const expectText = 'Назва оголошення *';
  await expect(createUnitePage.announcementTitle).toHaveText(expectText);

  const inputBackGroundText =
    await createUnitePage.announcementTitleInput.getAttribute('placeholder');
  await expect(inputBackGroundText).toBe('Введіть назву оголошення');

  await createUnitePage.nextButton.click();
  await expect(createUnitePage.announcementTitleError).toHaveText(
    'Це поле обов’язкове'
  );

  await createUnitePage.announcementTitleInput.fill('123456789');
  await createUnitePage.nextButton.click();
  await expect(createUnitePage.announcementTitleInput).toHaveCSS(
    'border-color',
    'rgb(247, 56, 89)'
  );
  await expect(createUnitePage.announcementTitleError).toHaveText(
    'У назві оголошення повинно бути не менше 10 символів'
  );

  const randomText = await faker.lorem.words(20).substring(0, 101);
  await createUnitePage.announcementTitleInput.fill(randomText + '1');
  await createUnitePage.announcementTitleInput.scrollIntoViewIfNeeded();
  await createUnitePage.nextButton.click();
  await expect(createUnitePage.announcementTitleInput).toHaveCSS(
    'border-color',
    'rgb(247, 56, 89)'
  );
  await expect(createUnitePage.announcementTitleError).toHaveText(
    'У назві оголошення може бути не більше 100 символів'
  );

  await createUnitePage.announcementTitleInput.clear();
  await createUnitePage.announcementTitleInput.fill('<>{};^');
  await expect(createUnitePage.announcementTitleInput).toHaveText('');

  await createUnitePage.announcementTitleInput.fill('abcdefghij');
  await createUnitePage.nextButton.click();
  await expect(createUnitePage.announcementTitleInput).not.toHaveCSS(
    'border-color',
    'rgb(247, 56, 89)'
  );
});
