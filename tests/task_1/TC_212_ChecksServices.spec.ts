import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/productsPage';
import { MainPage } from '../../pages/mainPage';
import { UnitPage } from '../../pages/unitPage';
import { ServicePage } from '../../pages/servicePage';
import url from '../../helper/url.json';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('TC_212_Checking ""Послуги"" section on the main page', async ({
  page,
}) => {
  const productPage = new ProductPage(page);
  const mainPage = new MainPage(page);
  const unitPage = new UnitPage(page);
  const servicePage = new ServicePage(page);

  await servicePage.scrollToServicesSection();

  expect(await servicePage.isPopularTabVisible()).toBe(true);
  const countServiceCategories = await servicePage.getServiceTabsCount();
  expect(countServiceCategories).toBeGreaterThan(0);
  for (let i = 0; i < countServiceCategories; i++) {
    await servicePage.clickServiceTabByIndex(i);
    const amountOfServices = await servicePage.getServiceCount();
    expect(amountOfServices).toBeGreaterThan(0);

    for (let j = 0; j < amountOfServices; j++) {
      const proposesItemName = await servicePage.getTextServiceByIndex(j);
      await servicePage.clickServiceByIndex(j);

      const takenFilterName = await productPage.getTextSelectedFilters();
      await productPage.clickOnDropDownButtonIfClosed();
      await productPage.scrollToCheckBoxName();
      expect(takenFilterName).toBe(proposesItemName);
      expect(await productPage.areFilterCheckboxesChecked()).toBe(true);

      const checkboxes = productPage.filterCheckbox;
      const checkBoxName = await productPage.checkBoxName;
      const checkboxCount = await checkboxes.count();
      let activeCheckboxCount = 0;
      let activeCheckboxText = '';

      for (let j = 0; j < checkboxCount; j++) {
        const checkbox = await checkboxes.nth(j);
        const textElement = await checkBoxName.nth(j);

        if (await checkbox.isChecked()) {
          activeCheckboxCount++;
          activeCheckboxText = await textElement.innerText();
          console.log(`Active checkbox text: ${activeCheckboxText}`);
        }
      }

      expect(activeCheckboxCount).toBe(1);
      expect(activeCheckboxText).toContain(proposesItemName);

      await productPage.clickFirstUnit();
      await unitPage.unitShouldBeVisible();

      const possibleNamesElements = unitPage.unitServices;

      const possibleNames = await possibleNamesElements.evaluateAll(elements =>
        elements
          .map(element => {
            if (element instanceof HTMLElement) {
              return element.innerText;
            }
            return '';
          })
          .filter(text => text !== '')
      );

      expect(possibleNames).toContain(proposesItemName);

      await mainPage.clickLogo();
      await expect(page).toHaveURL(url.home_page);

      await servicePage.scrollToServicesSection();
    }
  }
});
