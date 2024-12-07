import { FileChooser } from 'playwright/test';
import { BasePage } from './page';
import path from 'path';

export class PhotoPage extends BasePage {
  get titlePage() {
    return this.page.getByTestId('ImagesUnitFlow');
  }
  get addImageField() {
    return this.page.getByTestId('imageBlock');
  }

  get popUpContent() {
    return this.page.locator('[class*=PopupLayout_content]');
  }

  get popUpContentError() {
    return this.page.getByTestId('errorPopup');
  }

  get popUpContentCloseButton() {
    return this.page.getByTestId('closeIcon');
  }

  get popUpContentSaveButton() {
    return this.page.locator(
      '[class*=PopupLayout_content] [class*=ItemButtons_wrapper]'
    );
  }

  get prevButton() {
    return this.page.getByTestId('prevButton');
  }

  get descriptionUploadImage() {
    return this.page.getByTestId('description');
  }

  get mainImageLabel(){
    return this.page.getByTestId('mainImageLabel')
  }

  get deleteImageButton(){
    return this.page.getByTestId('deleteImage')
  }

  async setElementFilesInPhotoSection(
    fileChooser: FileChooser,
    filePath: string
  ) {
    await super.setElementFiles(fileChooser, filePath);
  }

  async clickAddImageField(index: number = 0) {
    const imageField = this.addImageField.nth(index);
    await super.clickElement(imageField);
  }

  async fileChooser(folder: string, fileName: string, index: number = 0) {
    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.clickAddImageField(index);
    const fileChooser = await fileChooserPromise;
    await this.setElementFilesInPhotoSection(
      fileChooser,
      path.join(__dirname, '..', 'data', folder, fileName)
    );
  }

  async addMultipleImages(folder: string, images: string[]) {
    for (let index = 0; index < images.length; index++) {
        await this.fileChooser(folder, images[index], index);
    }
}

  async clickClosePopUpContent() {
    await super.clickElement(this.popUpContentCloseButton);
  }

  async clickSavePopUpContent() {
    await this.page.waitForTimeout(300);
    await super.clickElement(this.popUpContentSaveButton);
  }

  async clickOutsidePopUpContent(x: number, y: number) {
    await super.clickElementAtCoordinates(this.page, x, y);
  }

  async getUploadFieldByIndex(index: number = 0) {
    return this.addImageField.nth(index);
  }

  async clickPrevButton() {
    await super.clickElement(this.prevButton);
  }

  async getAllImageField(){
    return await super.getAllElements(this.addImageField)
  }

  async getAllImageFieldAttributeDraggable(){
    const draggableElements = await this.getAllImageField();

    const getDraggable = await Promise.all(
      draggableElements.map(async (element) => {
          const draggable = await element.getAttribute('draggable');
          return draggable === 'true';
      })
  )
  const trueDraggableElements = getDraggable.filter(isDraggable => isDraggable);
  return trueDraggableElements;
  };

  async getMainImageText(){
   return  this.mainImageLabel.innerText()
  }

  async performDragEndDrop() {
    const source = await this.getUploadFieldByIndex(1); 
    const target = await this.getUploadFieldByIndex(0); 
    await this.dragEndDrop(source, target);
  } 

  async getSrcAttributeImage(i: number){
    await super.getElementAttributeText(await this.getUploadFieldByIndex(i),'src')
  }

  async clickDeleteImageButton(i: number = 0){
    await super.hoverElement(this.addImageField.nth(i))
    await super.clickElement(this.deleteImageButton.nth(i))
  }

  async getCountOfImage(){
    return super.getElementCount(this.addImageField)
  }
}
