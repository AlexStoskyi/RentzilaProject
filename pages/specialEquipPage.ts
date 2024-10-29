import { BasePage } from './page';

export class SpecialEquipPage extends BasePage {
  get specialEquipSection() {
    return this.page.getByTestId('specialEquipment');
  }

  get specialEquipCard() {
    return this.page.locator(
      '//section[@data-testid="specialEquipment"]/div[starts-with(@class, "RentzilaProposes_proposes_list")]/div'
    );
  }

  get specialEquipCardName() {
    return this.page.locator(
      '//section[@data-testid="specialEquipment"]/div[starts-with(@class, "RentzilaProposes_proposes_list")]/div/div[starts-with(@class,"RentzilaProposes_name")]'
    );
  }

  get specialEquipTabs() {
    return this.page.locator(
      '//section[@data-testid="specialEquipment"]/div[starts-with(@class, "RentzilaProposes_categories_list")]/h3'
    );
  }

  async scrollToSpecialEquipSection(): Promise<void> {
    await this.specialEquipSection.scrollIntoViewIfNeeded();
  }

  async scrollToSpecialEquipTabVisible(): Promise<void> {
    await this.specialEquipTabs.scrollIntoViewIfNeeded();
  }

  async isPopularTabVisible(): Promise<boolean> {
    return this.specialEquipSection.isVisible();
  }

  async getSpecialEquipCount(): Promise<number> {
    return this.specialEquipCard.count();
  }

  async clickFirstSpecialEquip(): Promise<void> {
    await this.specialEquipCard.nth(0).click();
  }

  async getTextFirstSpecialEquip(): Promise<string> {
    return this.specialEquipCardName.innerText();
  }

  async clickSpecialEquipTabByIndex(index: number): Promise<void> {
    await this.specialEquipTabs.nth(index).click();
  }

  async getTextTabByIndex(index: number): Promise<string> {
    return this.specialEquipTabs.nth(index).innerText();
  }

  async getSpecialEquipTabsCount(): Promise<number> {
    return this.specialEquipTabs.count();
  }

  async getTextSpecialEquipmentByIndex(index: number): Promise<string> {
    return this.specialEquipCardName.nth(index).innerText();
  }

  async clickSpecialEquipmentByIndex(index: number): Promise<void> {
    await this.specialEquipCardName.nth(index).click();
  }
}
