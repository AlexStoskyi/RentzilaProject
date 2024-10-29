import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
import expectText from '../../helper/expectText.json';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('Verify vehicle manufacturer section', async ({ page }) => {
  const mainPage = new MainPage(page);
  const loginPopUpPage = new LoginPopUpPage(page);
  const createUnitePage = new CreateUnitPage(page);
  const login: string | undefined = process.env.VALID_LOGIN;
  const password: string | undefined = process.env.VALID_PASSWORD;

  await mainPage.clickLoginButton();
  await loginPopUpPage.login(login, password);
  await loginPopUpPage.clickSubmitButton();
  await expect(mainPage.avatarField).toBeVisible();
  await page.goto(url.create_unit);

  await expect(createUnitePage.manufacturerTransportEquipmentTitle).toHaveText(
    expectText.vehicleManufacturer
  );

  const inputBackGroundText =
    await createUnitePage.manufacturerTransportEquipmentInput.getAttribute(
      'placeholder'
    );
  await expect(inputBackGroundText).toBe(expectText.fillVehicleManufacturer);

  await createUnitePage.clickNextButton();
  await expect(createUnitePage.manufacturerTransportEquipmentField).toHaveCSS(
    'border',
    '1px solid rgb(247, 56, 89)'
  );
  await expect(createUnitePage.manufacturerTransportEquipmentError).toHaveText(
    expectText.obligatoryField
  );

  await createUnitePage.manufacturerTransportEquipmentInput.fill('АТЭК');
  await expect(
    createUnitePage.manufacturerTransportEquipmentDropDown
  ).toBeVisible();
  const bigLaterData =
    await createUnitePage.manufacturerTransportEquipmentDropDown.innerText();

  await createUnitePage.manufacturerTransportEquipmentInput.fill('атэк');
  await expect(
    createUnitePage.manufacturerTransportEquipmentDropDown
  ).toBeVisible();
  const smallLaterData =
    await createUnitePage.manufacturerTransportEquipmentDropDown.innerText();
  await expect(bigLaterData).toEqual(smallLaterData);

  await createUnitePage.manufacturerTransportEquipmentInput.fill('<>{};^ ');
  await expect(createUnitePage.manufacturerTransportEquipmentInput).toHaveText(
    ''
  );

  await createUnitePage.manufacturerTransportEquipmentInput.fill('1234567890');
  await expect(
    createUnitePage.manufacturerTransportEquipmentDropDownError
  ).toHaveText(expectText.expectTextTransportEquipment);

  const randomText = await faker.lorem.words(20).substring(0, 101);
  await createUnitePage.manufacturerTransportEquipmentInput.fill(randomText);
  await createUnitePage.clickNextButton();
  const countSymbols =
    await createUnitePage.manufacturerTransportEquipmentInput.inputValue();
  await expect(countSymbols.length).toBe(100);

  await createUnitePage.manufacturerTransportEquipmentInput.fill('ABC');
  await createUnitePage.clickManufacturerTransportEquipmentDropDown();
  await expect(
    createUnitePage.manufacturerTransportEquipmentChosenInput
  ).toHaveText('ABC');

  await createUnitePage.manufacturerTransportEquipmentFieldCloseButton.click();
  await expect(createUnitePage.manufacturerTransportEquipmentInput).toHaveText(
    ''
  );
});
