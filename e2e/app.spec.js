import { test, expect } from '@playwright/test';

test.describe('Professional Portfolio', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Professional Portfolio/i);
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');
    // Basic accessibility check
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toBeTruthy();
  });
});
