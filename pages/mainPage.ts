import { Page } from '@playwright/test';

export class MainPage {
  constructor(private page: Page) {}

  get logo() {
    return this.page.locator('//a/div[@data-testid="logo"]');
  }

  get loginButton() {
    return this.page.locator('div[class*=NavbarAuthBlock_buttonWrapper]');
  }

  get closeTelegramButton() {
    return this.page.locator('//div[@data-testid="crossButton"]');
  }

  async clickLogo(): Promise<void> {
    await this.logo.click();
  }

  get avatarField(){
    return this.page.locator('//div[@data-testid="avatarBlock"]');
  }

  get profileDropdown(){
    return this.page.locator('//div[starts-with(@class, "ProfileDropdownMenu_container")]');
  }
  get LogoutButton(){
    return this.page.locator('//div[@data-testid="logout"]');
  }
}
