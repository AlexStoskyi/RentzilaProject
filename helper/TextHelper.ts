import { faker } from '@faker-js/faker';

export class TextHelper {
  generateRandomText(): string {
    return faker.lorem.words(20).substring(0, 101);
  }

  generateLongRandomText(): string {
    let randomText = faker.lorem.text();
    while (randomText.length < 9001) {
      randomText += ' ' + faker.lorem.text();
    }
    return randomText;
  }
}