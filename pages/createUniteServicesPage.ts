import { BasePage } from './page';

export class ServicesPage extends BasePage {
  get servicesBody() {
    return this.page.locator('[class*=ServicesUnitFlow_wrapper]');
  }

  get servicesDescription() {
    return this.page.locator('[class*=ServicesUnitFlow_paragraph]');
  }

  get servicesInputField() {
    return this.page.locator('[class*=ServicesUnitFlow_searchInput] input');
  }

  get inputFieldSearch() {
    return this.page.locator('[class*=ServicesUnitFlow_searchInput] svg');
  }

  get dropDownServicesBody() {
    return this.page.locator(
      '[class*=ServicesUnitFlow_searchedServicesCatWrapper]'
    );
  }

  get dropDownServices() {
    return this.page.locator('[class*=ServicesUnitFlow_searchListItem]');
  }

  get chosenService() {
    return this.page.locator('[class*=ServicesUnitFlow_serviceText]');
  }

  get removeServiceButton() {
    return this.page.getByTestId('remove-servicesUnitFlow');
  }

  async getTextInputField() {
    return await super.getElementAttributeText(
      this.servicesInputField,
      'placeholder'
    );
  }

  async getValueInputField() {
    return await super.getElementAttributeText(
      this.servicesInputField,
      'value'
    );
  }

  async getFlowServicesText() {
    return await super.getElementText(this.servicesDescription);
  }

  async fillSymbols(symbols: string) {
    await super.fillData(this.servicesInputField, symbols);
  }

  async countServices(i: number) {
    return await super.getElementCount(this.dropDownServices.nth(i));
  }

  async getTextDropDownServices(i: number = 0) {
    return await super.getElementText(this.dropDownServices.nth(i));
  }

  async clickOnDropDownServices(i: number = 0) {
    await super.clickElement(this.dropDownServices.nth(i));
  }

  async getTextChosenService() {
    return await super.getElementText(this.chosenService);
  }

  async clickOnRemoveServiceButton() {
    await super.clickElement(this.removeServiceButton);
  }
}
