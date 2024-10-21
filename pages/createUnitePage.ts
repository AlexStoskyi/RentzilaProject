import { BasePage } from './page';

export class CreateUnitPage extends BasePage {
  get title() {
    return this.page.locator(
      '//div[starts-with(@class,"CreateEditFlowLayout_title")]'
    );
  }

  get mainBoxRootNumber() {
    return this.page.getByTestId('labelNumber');
  }

  get mainBoxRootText() {
    return this.page.locator('[class*=CustomLabel_labelTitle]');
  }

  get mainBoxRoot() {
    return this.page.locator('[class*=MuiTabs-flexContainer]');
  }

  get mainBoxInfo() {
    return this.page.locator(
      '(//span[starts-with(@class,"CustomLabel_labelNumber")])[1]'
    );
  }

  get mainBoxPhoto() {
    return this.page.locator(
      '(//span[starts-with(@class,"CustomLabel_labelNumber")])[2]'
    );
  }

  get photoEquipmentTitle() {
    return this.page.locator('[class*=ImagesUnitFlow_paragraph]');
  }

  get mainBoxServices() {
    return this.page.locator(
      '(//span[starts-with(@class,"CustomLabel_labelNumber")])[3]'
    );
  }

  get mainBoxCost() {
    return this.page.locator(
      '(//span[starts-with(@class,"CustomLabel_labelNumber")])[4]'
    );
  }

  get mainBoxContacts() {
    return this.page.locator(
      '(//span[starts-with(@class,"CustomLabel_labelNumber")])[5]'
    );
  }

  get mainInfoWrapper() {
    return this.page.locator(
      '//div[starts-with(@class,"Characteristics_infoWrapper")]'
    );
  }

  get categoryTittle() {
    return this.page.locator(
      '//div[starts-with(@class,"CategorySelect_title")]'
    );
  }

  get categoryButton() {
    return this.page.locator('[class*=CategorySelect_button]');
  }

  get categoryArrow() {
    return this.page.locator(
      '//div[@class="CategorySelect_wrapper__L7pyB"]/div/div/div/span'
    );
  }

  get categoryErrorMessage() {
    return this.page.locator(
      '//div[starts-with(@class, "CategorySelect_errorTextVisible")]'
    );
  }

  get categoryPopupWrapper() {
    return this.page.locator('//div[@data-testid="categoryPopupWrapper"]');
  }

  get categoryPopupWrapperTop() {
    return this.page.locator('//div[starts-with(@class, "CategoryPopup_top")]');
  }

  get firstCategoryList() {
    return this.page.locator(
      '//div[starts-with(@class, "FirstCategoryList_content")]'
    );
  }

  get secondCategoryListField() {
    return this.page.locator(
      '(//div[starts-with(@class, "LevelCategoryList_wrapper")])[1]'
    );
  }
  get secondCategoryList() {
    return this.page.locator(
      '//div[starts-with(@class, "SecondCategory_wrapper_unit")]'
    );
  }

  get thirdCategoryListField() {
    return this.page.locator(
      '(//div[starts-with(@class, "LevelCategoryList_wrapper")])[2]'
    );
  }

  get thirdCategoryList() {
    return this.page.locator(
      '//div[starts-with(@class, "ThirdCategory_wrapper")]/label'
    );
  }

  get closePopUpButton() {
    return this.page.locator('//div[@data-testid="closeIcon"]');
  }

  get announcementTitleInput() {
    return this.page.getByTestId('custom-input').first();
  }

  get announcementTitle() {
    return this.page.locator(
      '(//div[@data-testid="customInputWrapper"]/div[starts-with(@class, "CustomInput_title")])[1]'
    );
  }

  get announcementTitleError() {
    return this.page.locator(
      '//div[starts-with(@class, "CustomInput_errorDescr")]'
    );
  }

  get manufacturerTransportEquipmentInput() {
    return this.page.locator('[class*=CustomSelectWithSearch_wrapper] input');
  }

  get manufacturerTransportEquipmentFiledText() {
    return this.page.getByTestId('div-wrapper-customSelectWithSearch');
  }

  get manufacturerTransportEquipmentChosenInput() {
    return this.page.getByTestId('div-service-customSelectWithSearch');
  }

  get manufacturerTransportEquipmentField() {
    return this.page.locator('[class*="CustomSelectWithSearch_searchResult"]');
  }

  get manufacturerTransportEquipmentFieldCloseButton() {
    return this.page.getByTestId('closeButton');
  }

  get manufacturerTransportEquipmentTitle() {
    return this.page.locator('[class*="SelectManufacturer_title"]');
  }

  get manufacturerTransportEquipmentDropDown() {
    return this.page.getByTestId('item-customSelectWithSearch');
  }

  get manufacturerTransportEquipmentDropDownError() {
    return this.page.getByTestId('p2-notFound-addNewItem');
  }

  get manufacturerTransportEquipmentError() {
    return this.page.locator(
      '[class*="CustomSelectWithSearch_errorTextVisible"]'
    );
  }

  get modelNameTitle() {
    return this.page.locator(
      '(//div[starts-with(@class,"CustomInput_wrapper")])[2]/div[starts-with(@class,"CustomInput_title")]'
    );
  }

  get modelNameInput() {
    return this.page.locator('(//div/input[@data-testid="custom-input"])[2]');
  }

  get modelNameError() {
    return this.page.locator(
      '(//div[starts-with(@class, "CustomInput_wrapper__zU62a")])[2]/div/div[starts-with(@class,"CustomInput_errorDescr")]'
    );
  }

  get specificationsTitle() {
    return this.page
      .locator('[class*="CustomTextAriaDescription_title"]')
      .first();
  }

  get specificationsInput() {
    return this.page.getByTestId('textarea-customTextAriaDescription').first();
  }

  get descriptionTitle() {
    return this.page.getByText('Детальний опис');
  }

  get descriptionInput() {
    return this.page.locator(
      '(//textarea[starts-with(@data-testid,"textarea-customTextAriaDescription")])[2]'
    );
  }

  get detailedDescriptionTitle() {
    return this.page.locator('[class*=AddressSelectionBlock_title]');
  }

  get mapLabelInput() {
    return this.page.getByTestId('mapLabel');
  }

  get detailedDescriptionError() {
    return this.page.locator(
      '[class*=AddressSelectionBlock_labelWrapper] [class*=AddressSelectionBlock_errorTextVisible]'
    );
  }

  get mapPopUp() {
    return this.page.getByTestId('div-mapPopup');
  }

  get mapPopUpTitle() {
    return this.page.locator('[class*=MapPopup_title]');
  }

  get mapPopUpCloseButton() {
    return this.page.locator('[class*= MapPopup_icon]');
  }

  get mapPopUpCityInput() {
    return this.page.getByTestId('cityInput');
  }

  get mapPopUpMapField() {
    return this.page.locator('#map');
  }

  get mapPopUpAddressTitle() {
    return this.page.getByTestId('address');
  }

  get mapPopUpDropDown() {
    return this.page.locator('[class*=AutocompleteInput_places] li').first();
  }

  get mapPopUpSubmitButton() {
    return this.page.locator('[class*=ItemButtons_darkBlueBtn]');
  }

  get cancelButton() {
    return this.page.getByTestId('prevButton');
  }

  get nextButton() {
    return this.page.locator('//button[@data-testid="nextButton"]');
  }

  async chooseCategory() {
    await this.categoryButton.click();
    await this.firstCategoryList.first().click();
    await this.secondCategoryList.first().click();
    const textBeforeClick = await this.thirdCategoryList.first().innerText();
    await this.thirdCategoryList.first().click();

    return textBeforeClick;
  }

  async clickMapLabelInput() {
    await super.clickElement(this.mapLabelInput);
  }

  async clickManufacturerTransportEquipmentDropDown() {
    await super.clickElement(this.manufacturerTransportEquipmentDropDown);
  }

  async clickMapPopUpSubmitButton() {
    await this.page.waitForTimeout(500);
    await super.clickElement(this.mapPopUpSubmitButton);
  }

  async clickNextButton() {
    await super.clickElement(this.nextButton);
  }

  async getCountMainRootBox(): Promise<number> {
    return await super.getElementCount(this.mainBoxRoot);
  }

  async getMainRootText(i: number) {
    return await super.getElementText(this.mainBoxRootText.nth(i));
  }

  async getMainRootNumber(i: number) {
    return await super.getElementText(this.mainBoxRootNumber.nth(i));
  }
}
