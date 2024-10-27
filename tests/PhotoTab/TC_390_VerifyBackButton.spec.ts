import { test } from './../../fixtures/fixtures';
import { expect } from '@playwright/test';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';
import expectText from '../../helper/expectText.json'

let choseCategoryText;
let fakeName;
test.beforeEach(async ({ loginPopUpPage, createUnitePage, mainPage }) => {
  const login = process.env.VALID_LOGIN;
  const password = process.env.VALID_PASSWORD;

  await loginPopUpPage.open(url.create_unit);
  await loginPopUpPage.login(login, password);
  await loginPopUpPage.clickSubmitButton();
  await mainPage.clickCloseTelegramButton();
  choseCategoryText = await createUnitePage.chooseCategory();
  fakeName = faker.commerce.productName();
  await createUnitePage.announcementTitleInput.fill(fakeName);
  await createUnitePage.manufacturerTransportEquipmentInput.fill('ABC');
  await createUnitePage.clickManufacturerTransportEquipmentDropDown();
  await createUnitePage.clickMapLabelInput();
  await createUnitePage.clickMapPopUpSubmitButton();
  await createUnitePage.clickNextButton();
});

test('TC_390_Verify ""Назад"" button', async ({ photoPage, createUnitePage }) => {
  await expect(photoPage.titlePage).toBeVisible();

  await expect(await photoPage.prevButton).toBeVisible();
  await expect(await photoPage.prevButton.innerText()).toBe(expectText.prevButtonText);
  await photoPage.clickPrevButton(); 
  await expect(await createUnitePage.categoryButton.innerText()).toContain(choseCategoryText)
  await expect(await createUnitePage.announcementTitleInput).toHaveValue(fakeName);
  await expect(await createUnitePage.manufacturerTransportEquipmentFiledText.innerText()).toContain('ABC')
  await expect(await createUnitePage.mapLabelInput.innerText()).toContain(expectText.address);
});
