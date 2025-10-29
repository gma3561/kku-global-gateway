const { chromium } = require('playwright');

async function checkTranslations() {
  console.log('🌐 Starting comprehensive translation check...\n');

  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();

  const languages = [
    { code: 'ko', name: '한국어', expectedText: '긴급 연락처' },
    { code: 'en', name: 'English', expectedText: 'Emergency Contacts' },
    { code: 'vi', name: 'Tiếng Việt', expectedText: 'Liên hệ Khẩn cấp' },
    { code: 'th', name: 'ไทย', expectedText: 'ติดต่อฉุกเฉิน' },
    { code: 'id', name: 'Bahasa Indonesia', expectedText: 'Kontak Darurat' },
    { code: 'ms', name: 'Bahasa Melayu', expectedText: 'Hubungan Kecemasan' },
    { code: 'tl', name: 'Filipino', expectedText: 'Emergency Contacts' },
    { code: 'kk', name: 'Қазақ', expectedText: 'Шұғыл байланыстар' },
    { code: 'uz', name: 'Ўзбек', expectedText: 'Favqulodda aloqalar' },
    { code: 'ru', name: 'Русский', expectedText: 'Экстренные контакты' },
  ];

  const results = [];

  for (const lang of languages) {
    console.log(`\n📍 Testing ${lang.name} (${lang.code})...`);

    await page.goto('http://localhost:3001');

    // Find and click language selector
    const languageButton = page.locator('button').filter({
      has: page.locator('[class*="lucide-globe"]')
    }).first();

    await languageButton.click();
    await page.waitForTimeout(500);

    // Click language option
    const languageOption = page.locator(`button:has-text("${lang.name}")`).first();
    await languageOption.click();
    await page.waitForTimeout(1000);

    // Check URL
    const url = page.url();
    const hasCorrectParam = url.includes(`lang=${lang.code}`);

    // Get Emergency Bar text
    const emergencyBarLocator = page.locator('.bg-gradient-to-r.from-red-600').first();
    await emergencyBarLocator.waitFor({ timeout: 5000 }).catch(() => null);
    const emergencyText = await emergencyBarLocator.textContent().catch(() => 'NOT FOUND');

    // Get Progress Tracker title
    const progressTitleLocator = page.locator('h2').filter({ hasText: /Progress|진행|Tiến độ|ความคืบหน้า|Kemajuan/ }).first();
    const progressTitle = await progressTitleLocator.textContent().catch(() => 'NOT FOUND');

    // Get Cost Calculator title
    const costTitleLocator = page.locator('h2').filter({ hasText: /Cost|비용|Chi phí|ค่าใช้จ่าย|Biaya/ }).first();
    const costTitle = await costTitleLocator.textContent().catch(() => 'NOT FOUND');

    // Check if translation matches expected
    const isTranslated = emergencyText.includes(lang.expectedText);

    results.push({
      language: lang.name,
      code: lang.code,
      urlCorrect: hasCorrectParam,
      emergencyBar: emergencyText.substring(0, 50),
      progressTitle: progressTitle.substring(0, 50),
      costTitle: costTitle.substring(0, 50),
      isTranslated: isTranslated,
      status: isTranslated ? '✅ TRANSLATED' : '❌ NOT TRANSLATED',
    });

    console.log(`  URL: ${hasCorrectParam ? '✅' : '❌'} ${url}`);
    console.log(`  Emergency: ${emergencyText.substring(0, 30)}...`);
    console.log(`  Status: ${isTranslated ? '✅ TRANSLATED' : '❌ USING FALLBACK'}`);
  }

  await browser.close();

  // Print summary
  console.log('\n\n📊 TRANSLATION STATUS SUMMARY\n');
  console.log('┌─────────────────────┬──────┬────────────┬──────────────────────────────────────┐');
  console.log('│ Language            │ Code │ URL Param  │ Translation Status                    │');
  console.log('├─────────────────────┼──────┼────────────┼──────────────────────────────────────┤');

  results.forEach(r => {
    const langPadded = r.language.padEnd(19);
    const codePadded = r.code.padEnd(4);
    const urlStatus = r.urlCorrect ? '✅ Yes' : '❌ No ';
    const urlPadded = urlStatus.padEnd(10);

    console.log(`│ ${langPadded} │ ${codePadded} │ ${urlPadded} │ ${r.status.padEnd(36)} │`);
  });

  console.log('└─────────────────────┴──────┴────────────┴──────────────────────────────────────┘');

  // Count results
  const translated = results.filter(r => r.isTranslated).length;
  const notTranslated = results.filter(r => !r.isTranslated).length;

  console.log(`\n📈 RESULTS:`);
  console.log(`   ✅ Translated: ${translated}/10 (${(translated/10*100).toFixed(0)}%)`);
  console.log(`   ❌ Not Translated: ${notTranslated}/10 (${(notTranslated/10*100).toFixed(0)}%)`);

  if (notTranslated > 0) {
    console.log(`\n⚠️  ATTENTION NEEDED:`);
    console.log(`   ${notTranslated} languages need translation files updated`);
    console.log(`   Currently using English fallback text\n`);

    const needsTranslation = results.filter(r => !r.isTranslated);
    console.log('   Languages needing translation:');
    needsTranslation.forEach(r => {
      console.log(`   - ${r.language} (${r.code})`);
    });
  } else {
    console.log(`\n✅ All languages fully translated!\n`);
  }
}

checkTranslations().catch(console.error);
