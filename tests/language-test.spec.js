const { test, expect } = require('@playwright/test');

test.describe('KKU Language Switching Tests', () => {
  const baseURL = 'http://localhost:3001';

  const languages = [
    { code: 'ko', name: '한국어', testText: '긴급 연락처' },
    { code: 'en', name: 'English', testText: 'Emergency Contacts' },
    { code: 'vi', name: 'Tiếng Việt', testText: 'Liên hệ Khẩn cấp' },
    { code: 'th', name: 'ไทย', testText: 'ติดต่อฉุกเฉิน' },
    { code: 'id', name: 'Bahasa Indonesia', testText: 'Kontak Darurat' },
    { code: 'ms', name: 'Bahasa Melayu', testText: 'Hubungi Kecemasan' },
    { code: 'tl', name: 'Filipino', testText: 'Emergency Contacts' },
    { code: 'kk', name: 'Қазақша', testText: 'Жедел байланыстар' },
    { code: 'uz', name: 'Oʻzbekcha', testText: 'Favqulodda aloqalar' },
    { code: 'ru', name: 'Русский', testText: 'Экстренные контакты' }
  ];

  for (const lang of languages) {
    test(`언어 전환 테스트: ${lang.name}`, async ({ page }) => {
      console.log(`\n=== Testing ${lang.name} (${lang.code}) ===`);

      // 1. 홈페이지 로드
      await page.goto(baseURL);
      console.log('✓ Page loaded');

      // 2. 언어 선택기 버튼 찾기 (더 유연한 selector 사용)
      // Navigation의 언어 버튼은 Globe 아이콘 포함, 투명 배경
      const languageButton = page.locator('button').filter({
        has: page.locator('[class*="lucide-globe"]')
      }).first();

      await expect(languageButton).toBeVisible({ timeout: 10000 });
      console.log('✓ Language selector found');

      // 3. 드롭다운 열기
      await languageButton.click();
      await page.waitForTimeout(500);
      console.log('✓ Dropdown opened');

      // 4. 언어 옵션 클릭 및 페이지 리로드 대기
      const languageOption = page.locator('button', { hasText: lang.name });
      await expect(languageOption).toBeVisible({ timeout: 5000 });

      // 페이지 리로드를 기다림 (Navigation.tsx에서 window.location.href를 사용)
      await Promise.all([
        page.waitForLoadState('networkidle'),
        languageOption.click()
      ]);
      console.log(`✓ Clicked ${lang.name}`);

      // 5. URL 파라미터 확인
      expect(page.url()).toContain(`lang=${lang.code}`);
      console.log(`✓ URL contains lang=${lang.code}`);

      // 6. 페이지 완전히 로드될 때까지 대기 (EmergencyBar가 렌더링되도록)
      await page.waitForSelector('.bg-gradient-to-r.from-red-600', { timeout: 10000 });

      // 7. 번역된 텍스트 확인
      const translatedText = page.locator(`text=${lang.testText}`).first();
      await expect(translatedText).toBeVisible({ timeout: 10000 });
      console.log(`✓ Found translated text: "${lang.testText}"`);

      // 8. 스크린샷 캡처
      await page.screenshot({
        path: `/tmp/screenshot-${lang.code}.png`,
        fullPage: false
      });
      console.log(`✓ Screenshot saved: /tmp/screenshot-${lang.code}.png`);

      console.log(`✅ ${lang.name} test completed successfully!\n`);
    });
  }

  test('모든 언어 순차 전환 테스트', async ({ page }) => {
    console.log('\n=== Sequential Language Switching Test ===');

    await page.goto(baseURL);

    for (const lang of languages) {
      console.log(`\nSwitching to ${lang.name}...`);

      // 언어 선택기 열기
      const languageButton = page.locator('button').filter({
        has: page.locator('[class*="lucide-globe"]')
      }).first();
      await languageButton.click();
      await page.waitForTimeout(500);

      // 언어 선택 및 페이지 리로드 대기
      const languageOption = page.locator('button', { hasText: lang.name });
      await Promise.all([
        page.waitForLoadState('networkidle'),
        languageOption.click()
      ]);

      // 확인
      expect(page.url()).toContain(`lang=${lang.code}`);
      const translatedText = page.locator(`text=${lang.testText}`).first();
      await expect(translatedText).toBeVisible({ timeout: 5000 });

      console.log(`✓ ${lang.name} switched successfully`);
    }

    console.log('\n✅ All languages tested successfully!\n');
  });
});
