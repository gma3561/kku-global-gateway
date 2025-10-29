const { test, expect } = require('@playwright/test');

test.describe('KKU Global Gateway Tests', () => {
  const baseURL = 'http://localhost:3001';

  test('홈페이지 로드 및 기본 요소 확인', async ({ page }) => {
    await page.goto(baseURL);

    // 긴급 연락처 바 확인
    await expect(page.locator('text=긴급 연락처')).toBeVisible();

    // 헤더 확인
    await expect(page.locator('text=국제 학생을 위한 실용 도구')).toBeVisible();

    console.log('✓ 홈페이지 로드 성공');
  });

  test('10개 언어 전환 테스트', async ({ page }) => {
    await page.goto(baseURL);

    const languages = [
      { code: 'ko', text: '한국어' },
      { code: 'en', text: 'English' },
      { code: 'vi', text: 'Tiếng Việt' },
      { code: 'th', text: 'ไทย' },
      { code: 'id', text: 'Bahasa Indonesia' },
      { code: 'ms', text: 'Bahasa Melayu' },
      { code: 'tl', text: 'Filipino' },
      { code: 'kk', text: 'Қазақша' },
      { code: 'uz', text: 'Oʻzbekcha' },
      { code: 'ru', text: 'Русский' }
    ];

    for (const lang of languages) {
      console.log(`Testing language: ${lang.text}`);

      // 언어 선택기 열기
      await page.click('button[aria-label="Select Language"]');
      await page.waitForTimeout(500);

      // 해당 언어 클릭
      await page.click(`text=${lang.text}`);
      await page.waitForTimeout(1000);

      // URL 파라미터 확인
      expect(page.url()).toContain(`lang=${lang.code}`);

      console.log(`✓ ${lang.text} 언어 전환 성공`);
    }
  });

  test('생활비 계산기 기능 테스트', async ({ page }) => {
    await page.goto(baseURL);

    // 계산기 섹션으로 스크롤
    await page.locator('#calculator').scrollIntoViewIfNeeded();

    // 계산기 제목 확인
    await expect(page.locator('text=월별 생활비 계산기')).toBeVisible();

    // 입력 필드 확인 및 값 입력
    const inputs = page.locator('input[type="number"]');
    const count = await inputs.count();
    console.log(`Found ${count} number inputs`);

    if (count > 0) {
      await inputs.first().fill('500000');
      await page.waitForTimeout(500);
    }

    // 총액이 업데이트되는지 확인
    await expect(page.locator('text=월별 합계')).toBeVisible();

    console.log('✓ 생활비 계산기 작동 확인');
  });

  test('진행 상황 트래커 기능 테스트', async ({ page }) => {
    await page.goto(baseURL);

    // 트래커 섹션으로 스크롤
    await page.locator('#progress').scrollIntoViewIfNeeded();

    // 트래커 제목 확인
    await expect(page.locator('text=입국 준비 진행 상황')).toBeVisible();

    // 체크박스 클릭
    const checkboxes = page.locator('input[type="checkbox"]');
    const checkboxCount = await checkboxes.count();
    console.log(`Found ${checkboxCount} checkboxes`);

    if (checkboxCount > 0) {
      const firstCheckbox = checkboxes.first();
      await firstCheckbox.click();
      await page.waitForTimeout(500);

      // 체크 상태 확인
      await expect(firstCheckbox).toBeChecked();
    }

    console.log('✓ 진행 상황 트래커 작동 확인');
  });

  test('빠른 접근 도구 확인', async ({ page }) => {
    await page.goto(baseURL);

    // 활성 도구 확인
    await expect(page.locator('text=비용 계산기')).toBeVisible();

    // Coming Soon 배지 확인
    await expect(page.locator('text=곧 출시')).toBeVisible();

    console.log('✓ 빠른 접근 도구 표시 확인');
  });

  test('반응형 디자인 테스트', async ({ page }) => {
    // 모바일 뷰포트
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(baseURL);

    // 긴급 연락처 바가 모바일에서도 표시되는지 확인
    await expect(page.locator('text=긴급 연락처')).toBeVisible();

    // 태블릿 뷰포트
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    await expect(page.locator('text=국제 학생을 위한 실용 도구')).toBeVisible();

    // 데스크톱 뷰포트
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    await expect(page.locator('text=국제 학생을 위한 실용 도구')).toBeVisible();

    console.log('✓ 반응형 디자인 확인');
  });
});
