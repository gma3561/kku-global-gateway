import { test, expect } from '@playwright/test';

test.describe('Programs Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/programs');
  });

  test('should load programs page', async ({ page }) => {
    await expect(page).toHaveURL(/programs/);
  });

  test('should display program cards', async ({ page }) => {
    // Wait for programs to load
    await page.waitForSelector('text=Business Administration', { timeout: 5000 });

    // Check for at least one program card
    await expect(page.getByText(/Business Administration|Computer Science/i)).toBeVisible();
  });

  test('should have filter controls', async ({ page }) => {
    // Search input
    await expect(page.getByPlaceholder(/Search programs/i)).toBeVisible();

    // Level filter
    await expect(page.getByRole('combobox').first()).toBeVisible();
  });

  test('should filter by search', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search programs/i);
    await searchInput.fill('Computer');

    // Should show Computer Science
    await expect(page.getByText(/Computer Science/i)).toBeVisible();

    // Should not show unrelated programs
    const programCount = await page.locator('text=Business Administration').count();
    expect(programCount).toBe(0);
  });

  test('should filter by degree level', async ({ page }) => {
    // Select Master programs
    const levelSelect = page.getByLabel(/Degree Level/i);
    await levelSelect.selectOption('master');

    // Check that only master programs are shown
    await expect(page.getByText(/MBA|Data Science/i)).toBeVisible();

    // Bachelor programs should not be visible
    const bachelorCount = await page.getByText(/4 years/).count();
    expect(bachelorCount).toBe(0);
  });

  test('should filter by language', async ({ page }) => {
    // Select English programs
    const langSelect = page.getByLabel(/Language/i);
    await langSelect.selectOption('english');

    // Check results
    await expect(page.getByText(/Computer Science|MBA/i)).toBeVisible();
  });

  test('should display program details', async ({ page }) => {
    // Check for program info
    await expect(page.getByText(/₩/)).toBeVisible(); // Tuition
    await expect(page.getByText(/years/i)).toBeVisible(); // Duration
  });

  test('should show no results message when no match', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search programs/i);
    await searchInput.fill('XYZ Nonexistent Program');

    await expect(page.getByText(/No programs found|검색 결과가 없습니다/i)).toBeVisible();
  });

  test('should display results count', async ({ page }) => {
    await expect(page.getByText(/Showing \d+ programs/i)).toBeVisible();
  });

  test('responsive design should work', async ({ page }) => {
    // Desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);

    // Should have multiple columns
    const cards = await page.locator('[class*="grid"]').count();
    expect(cards).toBeGreaterThan(0);

    // Mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // Should still display programs
    await expect(page.getByText(/Business Administration/i)).toBeVisible();
  });
});
