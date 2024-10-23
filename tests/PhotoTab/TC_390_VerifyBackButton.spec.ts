import { test, expect } from '@playwright/test';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import { CreateUnitPage } from '../../pages/createUnitePage';
import { PhotoPage } from '../../pages/createUnitePhotoPage';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';
import expectText from '../../helper/expectText.json';
import { MainPage } from '../../pages/mainPage';

test.beforeEach(async ({ page}) => {
  await page.goto(url.create_unit);
});

test('TC_390_Verify ""Назад"" button', async ({ page }) => {
  const loginPopUpPage = new LoginPopUpPage(page);
  const createUnitePage = new CreateUnitPage(page);
  const photoPage = new PhotoPage(page);
  const mainPage = new MainPage(page);
  const login = process.env.VALID_LOGIN;
  const password = process.env.VALID_PASSWORD;

  await loginPopUpPage.login(login, password);
  await loginPopUpPage.clickSubmitButton();
  await mainPage.clickCloseTelegramButton();
  await createUnitePage.chooseCategory();
  const choseCategoryText = await createUnitePage.chooseCategory()
  const fakeName = faker.commerce.productName();
  await createUnitePage.announcementTitleInput.fill(fakeName);
  await createUnitePage.manufacturerTransportEquipmentInput.fill('ABC');
  await createUnitePage.clickManufacturerTransportEquipmentDropDown();
  await createUnitePage.clickMapLabelInput()
  await createUnitePage.clickMapPopUpSubmitButton();
  await createUnitePage.clickNextButton();

  await expect(photoPage.titlePage).toBeVisible();

  await expect(await photoPage.prevButton).toBeVisible();
  await expect(await photoPage.prevButton.innerText()).toBe(expectText.prevButtonText);
  await photoPage.clickPrevButton(); 
  await expect(await createUnitePage.categoryButton.innerText()).toContain(choseCategoryText)
  await expect(await createUnitePage.announcementTitleInput).toHaveValue(fakeName);
  await expect(await createUnitePage.manufacturerTransportEquipmentFiledText.innerText()).toContain('ABC')
  await expect(await createUnitePage.mapLabelInput.innerText()).toContain(expectText.address);
});
