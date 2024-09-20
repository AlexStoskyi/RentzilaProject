import { test, expect } from '@playwright/test';
import url from '../../helper/url.json';
import { ApiHelper } from '../../helper/api';

test.beforeEach(async ({ page }) => {
  await page.goto(url.home_page);
});

test('api', async ({ page, request }) => {
  const apiHelper = new ApiHelper(request);

  try {
    const apiResponse = await apiHelper.createAdminToken();
    console.log('API Response:', apiResponse);

    const getResponse = await apiHelper.getFeedbackList();
    console.log('GET Response:', getResponse);

    expect(Array.isArray(getResponse)).toBe(true);

    const reversedItems = [...getResponse].reverse();

    const firstItemAfterReverse = reversedItems[0];

    expect(firstItemAfterReverse).toHaveProperty('name');
    expect(firstItemAfterReverse.name).toBe('expectedName');
  } catch (error) {
    console.error('API request failed:', error);
  }
});
