import { test } from './../../fixtures/fixtures';
import { expect } from '@playwright/test';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';
import expectText from '../../helper/expectText.json'
import { mainRootBoxText, mainRootBoxNumber } from '../../helper/testCreds'

test.beforeEach(async ({ loginPopUpPage, createUnitePage, mainPage }) => {
  const login = process.env.VALID_LOGIN;
  const password = process.env.VALID_PASSWORD;

  await loginPopUpPage.open(url.create_unit);
  await loginPopUpPage.login(login, password);
  await loginPopUpPage.clickSubmitButton();
  await mainPage.clickCloseTelegramButton();
  await createUnitePage.chooseCategory();
  const fakeName = faker.commerce.productName();
  await createUnitePage.announcementTitleInput.fill(fakeName);
  await createUnitePage.manufacturerTransportEquipmentInput.fill('ABC');
  await createUnitePage.clickManufacturerTransportEquipmentDropDown();
  await createUnitePage.clickMapLabelInput();
  await createUnitePage.clickMapPopUpSubmitButton();
  await createUnitePage.clickNextButton();
});

test('TC_393_Verify ""Далі"" button', async ({ photoPage, createUnitePage, createUniteServicesPage }) => {

  await expect(photoPage.titlePage).toBeVisible();

  await expect(await photoPage.prevButton).toBeVisible();
  await expect(await createUnitePage.nextButton.innerText()).toBe(
    expectText.next
  );

  await createUnitePage.clickNextButton();
  await expect(await photoPage.descriptionUploadImage.innerText()).toContain(
    expectText.descriptionText
  );
  await expect(await photoPage.descriptionUploadImage).toHaveCSS(
    'color',
    'rgb(247, 56, 89)'
  );

  await photoPage.fileChooser('images', '1.jpeg');
  await createUnitePage.clickNextButton();
  await expect(await createUniteServicesPage.servicesBody).toBeVisible();
  for (let i = 0; i < (await createUnitePage.getCountMainRootBox()); i++) {
    await expect(await createUnitePage.getMainRootNumber(i)).toBe(
      mainRootBoxNumber[i]
    );
    await expect(await createUnitePage.getMainRootText(i)).toBe(
      mainRootBoxText[i]
    );
  }
});
