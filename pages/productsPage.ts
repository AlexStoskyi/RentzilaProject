import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  get searchField() {
    return this.page.locator('//div[@data-testid="searchForm"]');
  }
  get searchPlaceholder() {
    return this.page.locator('//div[@data-testid="searchForm"]/input');
  }
  get searchTenderField() {
    return this.page.locator(
      '//div[starts-with(@class, "Navbar_searchWrapper")]'
    );
  }
  get searchTenderPlaceholder() {
    return this.page.locator(
      '//div[starts-with(@class, "ItemSearch_search")]/input'
    );
  }
  get fieldMap() {
    return this.page.locator('//div[@id="map"]');
  }

  get unitItem() {
    return this.page.locator(
      '//div[starts-with(@class, "UnitCard_cardWrapper__JIPt3")][1]'
    );
  }

  get filterCheckbox() {
    return this.page.locator(
      '//div[starts-with(@class, "CheckboxService_radio")]/input'
    );
  }

  get serviceInUnit() {
    return this.page.locator(
      '//div[starts-with(@class, "ImageWithDescription_main")]'
    );
  }

  get selectedFiltersField() {
    return this.page.locator(
      '//div[starts-with(@class, "ResetFilters_selectedCategory")]'
    );
  }

  get buildFilterField() {
    return this.page.locator('//input[@id="serviceCategory-3"]');
  }

  get checkBoxName() {
    return this.page.locator(
      '//div[starts-with(@class, "CheckboxService_radio")]/label'
    );
  }

  get dropDownButtonOfAgricultural() {
    return this.page.locator(
      '//div[starts-with(@class, "ServiceCategory_category_container")][1]/div[@data-testid="rightArrow"]'
    );
  }

  get dropDownAgriculturalContent() {
    return this.page.locator('//div/label[@for="radio-3-0"]');
  }

  get dropDownButtonOfBuilding() {
    return this.page.locator(
      '//div[starts-with(@class, "ServiceCategory_category_container")][2]/div[@data-testid="rightArrow"]'
    );
  }

  get dropDownBuildingContent() {
    return this.page.locator('//div/label[@for="radio-3-0"]');
  }

  async scrollToCheckBoxName() {
    await this.buildFilterField.scrollIntoViewIfNeeded();
  }

  async clickFirstUnit() {
    await this.unitItem.click();
  }

  async getFilterCheckBoxField() {
    return this.filterCheckbox;
  }

  async clickOnDropDownButtonIfClosed() {
    const isExpanded = await this.dropDownAgriculturalContent.isVisible();
    if (!isExpanded) {
      await this.dropDownButtonOfAgricultural.click();
    }
  }

  async unitShouldBeVisible() {
    await this.serviceInUnit.waitFor({ state: 'visible' });
  }

  async isServiceInUnitVisible(): Promise<boolean> {
    return this.serviceInUnit.isVisible();
  }

  async getFiltersCount(): Promise<number> {
    return this.selectedFiltersField.count();
  }

  async getTextSelectedFilters(): Promise<string> {
    return this.selectedFiltersField.innerText();
  }

  async areFilterCheckboxesChecked(): Promise<boolean> {
    const selectedFilters = await this.selectedFiltersField.count();
    return selectedFilters > 0;
  }

  async mapIsVisible(): Promise<boolean> {
    return this.fieldMap.isVisible();
  }

  async searchFieldIsVisible(): Promise<boolean> {
    return this.searchField.isVisible();
  }

  async getTextSearchPlaceholder(): Promise<string> {
    const placeholder =
      await this.searchPlaceholder.getAttribute('placeholder');
    return placeholder!;
  }

  async searchTenderFieldIsVisible(): Promise<boolean> {
    return this.searchTenderField.isVisible();
  }
  
  async getTextSearchTenderPlaceholder(): Promise<string> {
    const placeholder =
      await this.searchTenderPlaceholder.getAttribute('placeholder');
    return placeholder!;
  }
}
