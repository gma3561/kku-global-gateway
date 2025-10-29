const { chromium } = require('playwright');
const fs = require('fs');

// 각 언어별 기대 텍스트
const languages = [
  {
    code: 'ko',
    name: '한국어',
    expected: {
      emergency: '긴급 연락처',
      campus: '캠퍼스 보안',
      home: '홈',
      preparation: '유학 준비'
    }
  },
  {
    code: 'en',
    name: 'English',
    expected: {
      emergency: 'Emergency Contacts',
      campus: 'Campus Security',
      home: 'Home',
      preparation: 'Preparation'
    }
  },
  {
    code: 'vi',
    name: 'Tiếng Việt',
    expected: {
      emergency: 'Liên hệ khẩn cấp',
      campus: 'Bảo vệ trường',
      home: 'Trang chủ',
      preparation: 'Chuẩn bị'
    }
  },
  {
    code: 'th',
    name: 'ไทย',
    expected: {
      emergency: 'ติดต่อฉุกเฉิน',
      campus: 'รักษาความปลอดภัยมหาวิทยาลัย',
      home: 'หน้าแรก',
      preparation: 'การเตรียมตัว'
    }
  },
  {
    code: 'id',
    name: 'Bahasa Indonesia',
    expected: {
      emergency: 'Kontak Darurat',
      campus: 'Keamanan Kampus',
      home: 'Beranda',
      preparation: 'Persiapan'
    }
  },
  {
    code: 'ms',
    name: 'Bahasa Melayu',
    expected: {
      emergency: 'Hubungan Kecemasan',
      campus: 'Keselamatan Kampus',
      home: 'Laman Utama',
      preparation: 'Persediaan'
    }
  },
  {
    code: 'tl',
    name: 'Filipino',
    expected: {
      emergency: 'Emergency Contact',
      campus: 'Campus Security',
      home: 'Tahanan',
      preparation: 'Paghahanda'
    }
  },
  {
    code: 'kk',
    name: 'Қазақ',
    expected: {
      emergency: 'Жедел байланыс',
      campus: 'Кампус қауіпсіздігі',
      home: 'Басты бет',
      preparation: 'Дайындық'
    }
  },
  {
    code: 'uz',
    name: 'Ўзбек',
    expected: {
      emergency: 'Favqulodda aloqalar',
      campus: 'Kampus xavfsizligi',
      home: 'Bosh sahifa',
      preparation: 'Tayyorgarlik'
    }
  },
  {
    code: 'ru',
    name: 'Русский',
    expected: {
      emergency: 'Экстренные контакты',
      campus: 'Безопасность кампуса',
      home: 'Главная',
      preparation: 'Подготовка'
    }
  },
];

async function runUserPerspectiveTest() {
  console.log('🎯 사용자 관점 완전 검수 시작...\n');
  console.log('=' .repeat(80));

  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();

  const results = [];
  const errors = [];

  for (const lang of languages) {
    console.log(`\n📱 ${lang.name} (${lang.code}) 테스트 중...`);
    console.log('-'.repeat(80));

    const testResult = {
      language: lang.name,
      code: lang.code,
      passed: 0,
      failed: 0,
      checks: []
    };

    try {
      // 1. 페이지 로드
      await page.goto('http://localhost:3001');
      await page.waitForTimeout(1000);

      // 2. 언어 선택기 찾기
      const languageButton = page.locator('button').filter({
        has: page.locator('[class*="lucide-globe"]')
      }).first();

      await languageButton.click();
      await page.waitForTimeout(500);

      // 3. 언어 선택
      const languageOption = page.locator(`button:has-text("${lang.name}")`).first();
      await languageOption.click();
      await page.waitForTimeout(1500);

      // 4. URL 파라미터 확인
      const url = page.url();
      const hasCorrectParam = url.includes(`lang=${lang.code}`);
      console.log(`  ✓ URL: ${url}`);
      testResult.checks.push({
        name: 'URL 파라미터',
        passed: hasCorrectParam,
        expected: `?lang=${lang.code}`,
        actual: url
      });

      if (hasCorrectParam) testResult.passed++; else testResult.failed++;

      // 5. 긴급 연락처 바 확인
      const emergencyBar = page.locator('.bg-gradient-to-r.from-red-600').first();
      await emergencyBar.waitFor({ timeout: 5000 });
      const emergencyText = await emergencyBar.textContent();
      const hasEmergency = emergencyText.includes(lang.expected.emergency);

      console.log(`  ${hasEmergency ? '✅' : '❌'} 긴급 연락처: "${emergencyText.substring(0, 30)}..."`);
      testResult.checks.push({
        name: '긴급 연락처 제목',
        passed: hasEmergency,
        expected: lang.expected.emergency,
        actual: emergencyText.substring(0, 50)
      });

      if (hasEmergency) testResult.passed++; else testResult.failed++;

      // 6. 캠퍼스 보안 버튼 확인
      const hasCampus = emergencyText.includes(lang.expected.campus);
      console.log(`  ${hasCampus ? '✅' : '❌'} 캠퍼스 보안: ${hasCampus ? '정상' : '누락'}`);
      testResult.checks.push({
        name: '캠퍼스 보안 버튼',
        passed: hasCampus,
        expected: lang.expected.campus,
        actual: hasCampus ? '있음' : '없음'
      });

      if (hasCampus) testResult.passed++; else testResult.failed++;

      // 7. 네비게이션 확인
      const navLinks = await page.locator('nav a, nav button').allTextContents();
      const navText = navLinks.join(' ');
      const hasHome = navText.includes(lang.expected.home) || navText.includes('Home');
      const hasPrep = navText.includes(lang.expected.preparation);

      console.log(`  ${hasHome ? '✅' : '❌'} 홈 링크: ${hasHome ? '정상' : '누락'}`);
      console.log(`  ${hasPrep ? '✅' : '❌'} 준비 링크: ${hasPrep ? '정상' : '누락'}`);

      testResult.checks.push({
        name: '네비게이션 - 홈',
        passed: hasHome,
        expected: lang.expected.home,
        actual: hasHome ? '있음' : '없음'
      });

      testResult.checks.push({
        name: '네비게이션 - 준비',
        passed: hasPrep,
        expected: lang.expected.preparation,
        actual: hasPrep ? '있음' : '없음'
      });

      if (hasHome) testResult.passed++; else testResult.failed++;
      if (hasPrep) testResult.passed++; else testResult.failed++;

      // 8. 레이아웃 확인 - 모바일
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);

      const mobileMenuButton = page.locator('button').filter({ has: page.locator('[class*="lucide-menu"]') });
      const hasMobileMenu = await mobileMenuButton.count() > 0;

      console.log(`  ${hasMobileMenu ? '✅' : '❌'} 모바일 메뉴: ${hasMobileMenu ? '정상' : '누락'}`);
      testResult.checks.push({
        name: '모바일 반응형',
        passed: hasMobileMenu,
        expected: '모바일 메뉴 버튼',
        actual: hasMobileMenu ? '있음' : '없음'
      });

      if (hasMobileMenu) testResult.passed++; else testResult.failed++;

      // 9. 레이아웃 확인 - 데스크톱
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(500);

      const desktopNav = page.locator('nav .hidden.md\\:flex');
      const hasDesktopNav = await desktopNav.count() > 0;

      console.log(`  ${hasDesktopNav ? '✅' : '❌'} 데스크톱 네비게이션: ${hasDesktopNav ? '정상' : '누락'}`);
      testResult.checks.push({
        name: '데스크톱 반응형',
        passed: hasDesktopNav,
        expected: '데스크톱 메뉴',
        actual: hasDesktopNav ? '있음' : '없음'
      });

      if (hasDesktopNav) testResult.passed++; else testResult.failed++;

      // 10. 스크린샷
      await page.screenshot({
        path: `/tmp/user-test-${lang.code}.png`,
        fullPage: true
      });
      console.log(`  📸 스크린샷: /tmp/user-test-${lang.code}.png`);

      // 전체 성공률 계산
      const totalChecks = testResult.passed + testResult.failed;
      const successRate = ((testResult.passed / totalChecks) * 100).toFixed(0);

      console.log(`\n  📊 성공률: ${testResult.passed}/${totalChecks} (${successRate}%)`);

      if (testResult.failed > 0) {
        console.log(`  ⚠️  실패한 체크: ${testResult.failed}개`);
        errors.push({
          language: lang.name,
          code: lang.code,
          failedChecks: testResult.checks.filter(c => !c.passed)
        });
      }

    } catch (error) {
      console.error(`  ❌ ERROR: ${error.message}`);
      testResult.failed += 10;
      errors.push({
        language: lang.name,
        code: lang.code,
        error: error.message
      });
    }

    results.push(testResult);
  }

  await browser.close();

  // 최종 리포트
  console.log('\n\n');
  console.log('='.repeat(80));
  console.log('📋 최종 검수 리포트');
  console.log('='.repeat(80));

  console.log('\n┌─────────────────────┬────────┬────────┬──────────┐');
  console.log('│ Language            │ Passed │ Failed │ Success  │');
  console.log('├─────────────────────┼────────┼────────┼──────────┤');

  let totalPassed = 0;
  let totalFailed = 0;

  results.forEach(r => {
    const total = r.passed + r.failed;
    const rate = total > 0 ? ((r.passed / total) * 100).toFixed(0) : '0';
    const langPadded = r.language.padEnd(19);
    const passedPadded = String(r.passed).padStart(6);
    const failedPadded = String(r.failed).padStart(6);
    const ratePadded = `${rate}%`.padStart(8);

    totalPassed += r.passed;
    totalFailed += r.failed;

    console.log(`│ ${langPadded} │ ${passedPadded} │ ${failedPadded} │ ${ratePadded} │`);
  });

  console.log('└─────────────────────┴────────┴────────┴──────────┘');

  const overallTotal = totalPassed + totalFailed;
  const overallRate = ((totalPassed / overallTotal) * 100).toFixed(1);

  console.log(`\n📊 전체 통계:`);
  console.log(`   ✅ 총 성공: ${totalPassed}/${overallTotal}`);
  console.log(`   ❌ 총 실패: ${totalFailed}/${overallTotal}`);
  console.log(`   📈 전체 성공률: ${overallRate}%`);

  // 에러 상세 리포트
  if (errors.length > 0) {
    console.log('\n\n⚠️  실패 상세 내역:\n');

    errors.forEach(err => {
      console.log(`${err.language} (${err.code}):`);

      if (err.error) {
        console.log(`  - 오류: ${err.error}`);
      }

      if (err.failedChecks) {
        err.failedChecks.forEach(check => {
          console.log(`  - ${check.name}:`);
          console.log(`    기대값: ${check.expected}`);
          console.log(`    실제값: ${check.actual}`);
        });
      }

      console.log('');
    });
  }

  // JSON 리포트 저장
  fs.writeFileSync('/tmp/user-test-report.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    results,
    errors,
    summary: {
      totalPassed,
      totalFailed,
      overallRate: parseFloat(overallRate)
    }
  }, null, 2));

  console.log('\n💾 상세 리포트 저장: /tmp/user-test-report.json');
  console.log('\n✅ 검수 완료!\n');

  // 성공 기준: 90% 이상
  if (parseFloat(overallRate) >= 90) {
    console.log('🎉 검수 통과! 배포 가능합니다.\n');
    process.exit(0);
  } else {
    console.log('❌ 검수 실패. 번역을 수정해주세요.\n');
    process.exit(1);
  }
}

runUserPerspectiveTest().catch(console.error);
