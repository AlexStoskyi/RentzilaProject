import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import { TextHelper } from '../../helper/textHelper';
import expectText from '../../helper/expectText.json';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Verify unit name section', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const createUnitePage = new CreateUnitPage(page);
  const textHelper = new TextHelper();
  const login: string | undefined = process.env.VALID_LOGIN;
  const password: string | undefined = process.env.VALID_PASSWORD;

  await mainPage.clickLoginButton();
  await loginPopUpPage.login(login, password);
  await loginPopUpPage.clickSubmitButton();
  await expect(mainPage.avatarField).toBeVisible();
  await page.goto(url.create_unit);


  await expect(createUnitePage.announcementTitle).toHaveText(expectText.announcementName);

  const inputBackGroundText =
    await createUnitePage.announcementTitleInput.getAttribute('placeholder');
  await expect(inputBackGroundText).toBe(expectText.announcementName);

  await createUnitePage.nextButton.click();
  await expect(createUnitePage.announcementTitleError).toHaveText(expectText.obligatoryField);

  await createUnitePage.announcementTitleInput.fill('123456789');
  await createUnitePage.nextButton.click();
  await expect(createUnitePage.announcementTitleInput).toHaveCSS(
    'border-color',
    'rgb(247, 56, 89)'
  );
  await expect(createUnitePage.announcementTitleError).toHaveText(expectText.notLessTen);
  const randomText = await textHelper.generateRandomText()
  await createUnitePage.announcementTitleInput.fill(randomText + '1');
  await createUnitePage.announcementTitleInput.scrollIntoViewIfNeeded();
  await createUnitePage.nextButton.click();
  await expect(createUnitePage.announcementTitleInput).toHaveCSS(
    'border-color',
    'rgb(247, 56, 89)'
  );
  await expect(createUnitePage.announcementTitleError).toHaveText(expectText.hundredSymbols);

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
