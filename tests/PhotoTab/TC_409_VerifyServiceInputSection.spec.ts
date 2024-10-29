import { test } from './../../fixtures/fixtures';
import { expect } from '@playwright/test';
import url from '../../helper/endpoints.json';
import { faker } from '@faker-js/faker';
import expectText from '../../helper/expectText.json';
import { TextHelper } from '../../helper/textHelper';

test.beforeEach(async ({ loginPopUpPage, createUnitePage, mainPage, photoPage }) => {
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
  await photoPage.fileChooser('images', '1.jpeg');
  await createUnitePage.clickNextButton();
});

test('TC_409_Verify input section and choosing of existing sevice', async ({
  createUniteServicesPage,
}) => {
  const textHelper = new TextHelper()

  await expect(await createUniteServicesPage.getFlowServicesText()).toBe(
    expectText.servicesFlowText
  );
  await expect(await createUniteServicesPage.servicesInputField).toBeVisible();
  await expect(await createUniteServicesPage.inputFieldSearch).toBeVisible();
  await expect(await createUniteServicesPage.getTextInputField()).toContain(
    expectText.servicesSearchPlaceHolderText
  );

  await createUniteServicesPage.fillSymbols(expectText.invalidSymbols);
  await expect(await createUniteServicesPage.getValueInputField()).toContain('');

  const randomText = await textHelper.generateRandomText();
  await createUniteServicesPage.fillSymbols(randomText + 1);
  await expect((await createUniteServicesPage.getValueInputField()).length).toEqual(100);

  await createUniteServicesPage.fillSymbols('Б');
  await expect(await createUniteServicesPage.dropDownServicesBody).toBeVisible();

  await createUniteServicesPage.fillSymbols('буріння');
  const smallSymbols = await createUniteServicesPage.getTextDropDownServices(0);
  await createUniteServicesPage.fillSymbols('БУРІННЯ');
  const bigSymbols = await createUniteServicesPage.getTextDropDownServices(0);
  await expect(smallSymbols).toEqual(bigSymbols);

  const firstVariant = await createUniteServicesPage.getTextDropDownServices(0);
  await createUniteServicesPage.clickOnDropDownServices(0);
  const chosenVariant = await createUniteServicesPage.getTextChosenService();
  await expect(firstVariant).toContain(chosenVariant);
  await expect(await createUniteServicesPage.removeServiceButton).toBeVisible();
  await createUniteServicesPage.clickOnRemoveServiceButton();
  await expect(await createUniteServicesPage.removeServiceButton).not.toBeVisible();
});
