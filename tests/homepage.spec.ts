import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/KKU Global Gateway/);
  });

  test('should display hero section', async ({ page }) => {
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    // Check for CTA buttons
    const primaryButton = page.getByRole('button', { name: /입학 상담 신청|Apply for Consultation/i }).first();
    await expect(primaryButton).toBeVisible();
  });

  test('should display stats section', async ({ page }) => {
    // Check for stat numbers
    await expect(page.getByText(/2,500\+|120\+|95%/)).toBeVisible();
  });

  test('should display features section', async ({ page }) => {
    // Check for feature cards
    const features = page.locator('[class*="feature"]').or(page.locator('section').nth(2));
    await expect(features).toBeVisible();
  });

  test('should display testimonials section', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /학생 후기|Student Stories/i })).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check for social media links
    await expect(footer.locator('a[href*="facebook"]')).toBeVisible();
  });

  test('should have working chatbot button', async ({ page }) => {
    const chatButton = page.locator('button').filter({ has: page.locator('svg') }).last();
    await chatButton.click();

    // Chat window should appear
    await expect(page.getByText(/AI 입학 상담|AI Admission Consultation/i)).toBeVisible();
  });
});
