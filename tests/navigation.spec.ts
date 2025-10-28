import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should have visible navigation bar', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should display logo and brand name', async ({ page }) => {
    await expect(page.getByText(/KKU Global/i)).toBeVisible();
  });

  test('should have language selector', async ({ page }) => {
    const langButton = page.locator('button').filter({ hasText: /🇰🇷|🇺🇸/ }).first();
    await expect(langButton).toBeVisible();
  });

  test('should open language menu on click', async ({ page }) => {
    const langButton = page.locator('button').filter({ hasText: /🇰🇷|🇺🇸/ }).first();
    await langButton.click();

    // Check for language options
    await expect(page.getByText(/한국어|English|Indonesia/i)).toBeVisible();
  });

  test('should switch language', async ({ page }) => {
    const langButton = page.locator('button').filter({ hasText: /🇰🇷|🇺🇸/ }).first();
    await langButton.click();

    // Click English
    await page.getByText('English').click();

    // Wait for navigation
    await page.waitForURL(/lang=en/);

    // Check if content changed
    await expect(page.getByRole('heading', { name: /Global Leader|Your Dream/ })).toBeVisible();
  });

  test('should have navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: /프로그램 찾기|Find Program/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /입학 안내|Admission/i })).toBeVisible();
  });

  test('should navigate to programs page', async ({ page }) => {
    const programsLink = page.getByRole('link', { name: /프로그램 찾기|Find Program/i }).first();
    await programsLink.click();

    await expect(page).toHaveURL(/programs/);
    await expect(page.getByRole('heading', { name: /인기 프로그램|Popular Programs/i })).toBeVisible();
  });

  test('mobile menu should work', async ({ page, viewport }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Find mobile menu button
    const menuButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    await menuButton.click();

    // Check if mobile menu appeared
    await expect(page.getByRole('link', { name: /프로그램 찾기|Find Program/i })).toBeVisible();
  });
});
