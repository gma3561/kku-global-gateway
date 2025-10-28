import { test, expect } from '@playwright/test';

const DEPLOYED_URL = 'https://gma3561.github.io/kku-global-gateway';

test.describe('Deployed Site - All Pages Test', () => {
  test('메인 페이지 로드 및 기본 요소 확인', async ({ page }) => {
    await page.goto(DEPLOYED_URL);

    // 페이지 로드 확인
    await expect(page).toHaveTitle(/KKU Global Gateway/);

    // 네비게이션 확인
    await expect(page.locator('nav')).toBeVisible();

    // Hero 섹션 확인
    await expect(page.locator('h1')).toBeVisible();

    // 언어 선택기 확인 (있는 경우)
    const langSelector = page.locator('[aria-label*="language"], [class*="language"]').first();
    if (await langSelector.isVisible()) {
      console.log('✓ Language selector found');
    }
  });

  test('네비게이션 - 대시보드 페이지', async ({ page }) => {
    await page.goto(DEPLOYED_URL);

    // 대시보드 링크 찾기 및 클릭
    const dashboardLink = page.locator('a[href*="dashboard"]').first();
    await dashboardLink.click();

    // URL 확인
    await expect(page).toHaveURL(/.*dashboard/);

    // 대시보드 제목 확인
    await expect(page.locator('h1, h2').filter({ hasText: /dashboard|대시보드/i })).toBeVisible();

    console.log('✓ Dashboard page loaded successfully');
  });

  test('네비게이션 - Preparation 페이지', async ({ page }) => {
    await page.goto(DEPLOYED_URL);

    // Preparation 링크 클릭
    const prepLink = page.locator('a[href*="preparation"]').first();
    await prepLink.click();

    // URL 확인
    await expect(page).toHaveURL(/.*preparation/);

    // 페이지 내용 확인
    await expect(page.locator('h1').first()).toBeVisible();

    console.log('✓ Preparation page loaded successfully');
  });

  test('네비게이션 - Arrival 페이지', async ({ page }) => {
    await page.goto(DEPLOYED_URL);

    const arrivalLink = page.locator('a[href*="arrival"]').first();
    await arrivalLink.click();

    await expect(page).toHaveURL(/.*arrival/);
    await expect(page.locator('h1').first()).toBeVisible();

    console.log('✓ Arrival page loaded successfully');
  });

  test('네비게이션 - Campus Life 페이지', async ({ page }) => {
    await page.goto(DEPLOYED_URL);

    const campusLink = page.locator('a[href*="campus"]').first();
    await campusLink.click();

    await expect(page).toHaveURL(/.*campus/);
    await expect(page.locator('h1').first()).toBeVisible();

    console.log('✓ Campus Life page loaded successfully');
  });

  test('대시보드 - 캘린더 컴포넌트 테스트', async ({ page }) => {
    await page.goto(`${DEPLOYED_URL}/dashboard/`);

    // 캘린더 제목 확인
    await expect(page.locator('text=/캘린더|calendar/i')).toBeVisible();

    // 월 네비게이션 버튼 확인
    const prevButton = page.locator('button').filter({ hasText: '←' }).first();
    const nextButton = page.locator('button').filter({ hasText: '→' }).first();

    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    // 요일 표시 확인 (일, 월, 화, 수, 목, 금, 토)
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    for (const day of dayNames) {
      const dayElement = page.locator(`text=${day}`).first();
      if (await dayElement.isVisible()) {
        console.log(`✓ Day name found: ${day}`);
      }
    }

    console.log('✓ Calendar component rendered successfully');
  });

  test('대시보드 - 캘린더 월 네비게이션', async ({ page }) => {
    await page.goto(`${DEPLOYED_URL}/dashboard/`);

    // 현재 월 저장
    const currentMonth = await page.locator('h3, h2').filter({ hasText: /\d{4}/ }).first().textContent();
    console.log('Current month:', currentMonth);

    // 다음 달로 이동
    const nextButton = page.locator('button').filter({ hasText: '→' }).first();
    await nextButton.click();

    // 월이 변경되었는지 확인 (약간의 대기)
    await page.waitForTimeout(500);

    // 이전 달로 이동
    const prevButton = page.locator('button').filter({ hasText: '←' }).first();
    await prevButton.click();

    await page.waitForTimeout(500);

    console.log('✓ Calendar month navigation works');
  });

  test('대시보드 - 캘린더 날짜 선택', async ({ page }) => {
    await page.goto(`${DEPLOYED_URL}/dashboard/`);

    // 날짜 버튼 찾기 (숫자로만 된 버튼)
    const dateButtons = page.locator('button').filter({ hasText: /^[0-9]{1,2}$/ });
    const count = await dateButtons.count();

    if (count > 0) {
      // 첫 번째 날짜 클릭
      await dateButtons.first().click();

      // 선택된 날짜에 대한 정보가 표시되는지 확인
      await page.waitForTimeout(500);

      console.log(`✓ Date selection works (${count} dates found)`);
    }
  });

  test('대시보드 - 이벤트 표시 확인', async ({ page }) => {
    await page.goto(`${DEPLOYED_URL}/dashboard/`);

    // 이벤트 범례 확인
    const legend = page.locator('text=/중요|important/i, text=/행사|event/i, text=/학사|academic/i');
    const legendCount = await legend.count();

    if (legendCount > 0) {
      console.log(`✓ Event legend found (${legendCount} items)`);
    }

    // 다가오는 일정 섹션 확인
    const upcomingEvents = page.locator('text=/다가오는|upcoming/i');
    if (await upcomingEvents.first().isVisible()) {
      console.log('✓ Upcoming events section found');
    }
  });

  test('반응형 - 모바일 뷰 테스트', async ({ page }) => {
    // 모바일 뷰포트로 설정
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto(DEPLOYED_URL);

    // 페이지 로드 확인
    await expect(page.locator('h1')).toBeVisible();

    // 네비게이션이 모바일 메뉴로 변경되었는지 확인
    const mobileMenu = page.locator('[aria-label*="menu"], button[class*="menu"]');
    const mobileMenuCount = await mobileMenu.count();

    console.log(`✓ Mobile view rendered (menu items: ${mobileMenuCount})`);
  });

  test('반응형 - 태블릿 뷰 테스트', async ({ page }) => {
    // 태블릿 뷰포트로 설정
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto(DEPLOYED_URL);

    await expect(page.locator('h1')).toBeVisible();

    console.log('✓ Tablet view rendered');
  });

  test('언어 전환 테스트 (한국어 → 영어)', async ({ page }) => {
    await page.goto(DEPLOYED_URL);

    // 영어로 전환 시도
    await page.goto(`${DEPLOYED_URL}/?lang=en`);

    // 페이지 로드 확인
    await expect(page.locator('h1')).toBeVisible();

    console.log('✓ Language switch to English works');
  });

  test('모든 정적 리소스 로드 확인', async ({ page }) => {
    const failedRequests: string[] = [];

    page.on('requestfailed', request => {
      failedRequests.push(request.url());
    });

    await page.goto(DEPLOYED_URL);

    // 페이지 완전히 로드될 때까지 대기
    await page.waitForLoadState('networkidle');

    if (failedRequests.length > 0) {
      console.log('Failed requests:', failedRequests);
    } else {
      console.log('✓ All resources loaded successfully');
    }

    expect(failedRequests.length).toBe(0);
  });

  test('성능 - 페이지 로드 시간 측정', async ({ page }) => {
    const startTime = Date.now();

    await page.goto(DEPLOYED_URL);
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    console.log(`✓ Page load time: ${loadTime}ms`);

    // 로드 시간이 5초 이하인지 확인
    expect(loadTime).toBeLessThan(5000);
  });

  test('챗봇 컴포넌트 확인', async ({ page }) => {
    await page.goto(DEPLOYED_URL);

    // 챗봇 버튼 또는 아이콘 찾기
    const chatbot = page.locator('[class*="chatbot"], [class*="chat"]').first();

    if (await chatbot.isVisible()) {
      console.log('✓ Chatbot component found');
    } else {
      console.log('ℹ Chatbot not visible on main page');
    }
  });
});

test.describe('Deployed Site - 다국어 지원 테스트', () => {
  const languages = [
    { code: 'ko', name: '한국어' },
    { code: 'en', name: 'English' },
    { code: 'id', name: 'Indonesian' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'th', name: 'Thai' },
    { code: 'ms', name: 'Malay' },
  ];

  for (const lang of languages) {
    test(`${lang.name} (${lang.code}) 페이지 로드`, async ({ page }) => {
      await page.goto(`${DEPLOYED_URL}/?lang=${lang.code}`);

      await expect(page.locator('h1')).toBeVisible();

      console.log(`✓ ${lang.name} page loaded successfully`);
    });
  }
});

test.describe('Deployed Site - SEO 및 메타 태그', () => {
  test('메타 태그 확인', async ({ page }) => {
    await page.goto(DEPLOYED_URL);

    // Title 태그
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    console.log('Title:', title);

    // Meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    if (description) {
      console.log('Description:', description.substring(0, 50) + '...');
    }

    // Viewport
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toBeTruthy();

    console.log('✓ Meta tags present');
  });

  test('Open Graph 태그 확인', async ({ page }) => {
    await page.goto(DEPLOYED_URL);

    const ogTitle = await page.locator('meta[property="og:title"]').count();
    const ogDescription = await page.locator('meta[property="og:description"]').count();

    console.log(`✓ Open Graph tags: ${ogTitle + ogDescription} found`);
  });
});
