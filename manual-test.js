const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting manual language switching test...\n');

  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    // 1. 홈페이지 로드
    console.log('1️⃣ Loading homepage...');
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    console.log('✅ Page loaded\n');
    await page.screenshot({ path: '/tmp/test-step-1-home.png' });

    // 2. 언어 선택기 찾기
    console.log('2️⃣ Finding language selector...');
    const langButton = page.locator('button').filter({ has: page.locator('[class*="lucide-globe"]') }).first();
    await langButton.waitFor({ state: 'visible', timeout: 10000 });
    console.log('✅ Language selector found\n');

    // 3. 각 언어 테스트
    const languages = [
      { code: 'ko', name: '한국어' },
      { code: 'en', name: 'English' },
      { code: 'vi', name: 'Tiếng Việt' },
      { code: 'th', name: 'ไทย' },
      { code: 'id', name: 'Bahasa Indonesia' }
    ];

    for (const lang of languages) {
      console.log(`\n3️⃣ Testing ${lang.name} (${lang.code})...`);

      // 언어 선택기 클릭
      await langButton.click();
      await page.waitForTimeout(500);
      console.log(`  ↪ Dropdown opened`);

      // 언어 옵션 클릭
      const langOption = page.locator('button', { hasText: lang.name });
      await langOption.waitFor({ state: 'visible', timeout: 5000 });
      await Promise.all([
        page.waitForLoadState('networkidle'),
        langOption.click()
      ]);
      console.log(`  ↪ Clicked ${lang.name}`);

      // URL 확인
      const currentUrl = page.url();
      console.log(`  ↪ Current URL: ${currentUrl}`);

      if (currentUrl.includes(`lang=${lang.code}`)) {
        console.log(`  ✅ URL parameter correct: lang=${lang.code}`);
      } else {
        console.log(`  ❌ URL parameter incorrect! Expected lang=${lang.code}`);
      }

      // 스크린샷
      await page.screenshot({ path: `/tmp/test-${lang.code}.png`, fullPage: true });
      console.log(`  ↪ Screenshot saved: /tmp/test-${lang.code}.png`);

      // 페이지 내용 확인
      const emergencyBar = await page.locator('.bg-gradient-to-r.from-red-600').textContent();
      const previewText = emergencyBar.slice(0, 50);
      console.log(`  ↪ Emergency bar text: ${previewText}...`);

      await page.waitForTimeout(2000);
    }

    console.log('\n\n🎉 All language tests completed!');
    console.log('\n📸 Screenshots saved to /tmp/test-*.png');
    console.log('\nWaiting 30 seconds before closing browser...');

    // 브라우저를 열어둔 채로 대기
    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('\n❌ Error during test:', error.message);
    console.error(error.stack);
    await page.screenshot({ path: '/tmp/test-error.png' });
  } finally {
    await browser.close();
    console.log('\n✅ Browser closed');
  }
})();
