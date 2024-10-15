import { Page } from '@playwright/test';

export class PhotoPage {
  constructor(private page: Page) {}

  get firstAddImageField() {
    return this.page.locator('[data-testid=imageBlock]:nth-child(1)');
  }

  get secondAddImageField() {
    return this.page.locator('[data-testid=imageBlock]:nth-child(2)');
  }

  get popUpError(){
    return this.page.locator('[class*=PopupLayout_content]');
  }
}
