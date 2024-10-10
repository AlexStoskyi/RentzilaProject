import { CreateUnitPage } from '../../pages/createUnitePage';
import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/mainPage';
import { LoginPopUpPage } from '../../pages/loginPopUpPage';
import url from '../../helper/endpoints.json';
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

  await mainPage.loginButton.click();
  await loginPopUpPage.login(login, password);
  await loginPopUpPage.submitButton.click();
  await expect(mainPage.avatarField).toBeVisible();
  await page.goto(url.create_unit);

  const expectText = 'Виробник транспортного засобу *';
  await expect(createUnitePage.manufacturerTransportEquipmentTitle).toHaveText(
    expectText
  );

  const inputBackGroundText =
    await createUnitePage.manufacturerTransportEquipmentInput.getAttribute(
      'placeholder'
    );
  await expect(inputBackGroundText).toBe(
    'Введіть виробника транспортного засобу'
  );

  await createUnitePage.nextButton.click();
  await expect(createUnitePage.manufacturerTransportEquipmentField).toHaveCSS(
    'border',
    '1px solid rgb(247, 56, 89)'
  );
  await expect(createUnitePage.manufacturerTransportEquipmentError).toHaveText(
    'Це поле обов’язкове'
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
  const ochikText =
    'На жаль, виробника “1234567890“ не знайдено в нашій базі. Щоб додати виробника - зв`яжіться із службою підтримки';
  await expect(
    createUnitePage.manufacturerTransportEquipmentDropDownError
  ).toHaveText(ochikText);

  const randomText = await faker.lorem.words(20).substring(0, 101);
  await createUnitePage.manufacturerTransportEquipmentInput.fill(randomText);
  await createUnitePage.nextButton.click();
  const countSymbols =
    await createUnitePage.manufacturerTransportEquipmentInput.inputValue();
  await expect(countSymbols.length).toBe(100);

  await createUnitePage.manufacturerTransportEquipmentInput.fill('ABC');
  await createUnitePage.manufacturerTransportEquipmentDropDown.click();
  await expect(
    createUnitePage.manufacturerTransportEquipmentChosenInput
  ).toHaveText('ABC');

  await createUnitePage.manufacturerTransportEquipmentFieldCloseButton.click();
  await expect(createUnitePage.manufacturerTransportEquipmentInput).toHaveText(
    ''
  );
});
