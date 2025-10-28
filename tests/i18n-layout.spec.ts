import { test, expect, Page } from '@playwright/test';

// 지원하는 모든 언어
const languages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
  { code: 'tl', name: 'Tagalog', flag: '🇵🇭' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'kk', name: 'Қазақ', flag: '🇰🇿' },
];

// 반응형 테스트를 위한 뷰포트 설정
const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 },
];

// 텍스트 오버플로우 체크 함수
async function checkTextOverflow(page: Page, selector: string) {
  const elements = await page.locator(selector).all();
  const issues: string[] = [];

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const box = await element.boundingBox();

    if (box) {
      const isOverflowing = await element.evaluate((el) => {
        return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
      });

      if (isOverflowing) {
        const text = await element.textContent();
        issues.push(`Text overflow at ${selector}[${i}]: "${text?.substring(0, 50)}..."`);
      }
    }
  }

  return issues;
}

// 메인 테스트 그룹
test.describe('다국어 및 레이아웃 테스트', () => {

  // 각 언어에 대한 테스트
  for (const lang of languages) {
    test.describe(`${lang.name} (${lang.code}) 테스트`, () => {

      // 각 뷰포트에 대한 테스트
      for (const viewport of viewports) {
        test(`${viewport.name} - 페이지 로드 및 번역 확인`, async ({ page }) => {
          // 뷰포트 설정
          await page.setViewportSize({ width: viewport.width, height: viewport.height });

          // 페이지 로드
          await page.goto(`http://localhost:3000?lang=${lang.code}`);

          // 페이지 로드 대기
          await page.waitForLoadState('networkidle');

          // 스크린샷 촬영
          await page.screenshot({
            path: `test-results/screenshots/${lang.code}-${viewport.name}.png`,
            fullPage: true,
          });

          // 페이지 타이틀 확인
          await expect(page).toHaveTitle(/KKU Global Gateway|경국대학교/);

          // Hero 섹션이 표시되는지 확인
          const heroSection = page.locator('section').first();
          await expect(heroSection).toBeVisible();

          // Hero 제목 확인 (언어별로 다르게 표시되어야 함)
          const heroTitle = page.locator('h1').first();
          await expect(heroTitle).toBeVisible();
          const titleText = await heroTitle.textContent();
          expect(titleText).toBeTruthy();
          expect(titleText!.length).toBeGreaterThan(10);

          console.log(`✅ ${lang.name} (${viewport.name}): Hero title - "${titleText?.substring(0, 50)}..."`);
        });

        test(`${viewport.name} - 레이아웃 검증`, async ({ page }) => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await page.goto(`http://localhost:3000?lang=${lang.code}`);
          await page.waitForLoadState('networkidle');

          const issues: string[] = [];

          // 1. 제목 텍스트 오버플로우 체크
          const headingIssues = await checkTextOverflow(page, 'h1, h2, h3');
          issues.push(...headingIssues);

          // 2. 버튼 텍스트 오버플로우 체크
          const buttonIssues = await checkTextOverflow(page, 'button');
          issues.push(...buttonIssues);

          // 3. 카드 제목 체크
          const cardIssues = await checkTextOverflow(page, '[class*="card"] h3, [class*="feature"] h3');
          issues.push(...cardIssues);

          // 4. 전체 레이아웃 높이 체크 (너무 길지 않은지)
          const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
          if (bodyHeight > 10000) {
            issues.push(`Page too long: ${bodyHeight}px`);
          }

          // 5. 수평 스크롤 체크 (모바일에서 발생하지 않아야 함)
          const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
          if (bodyWidth > viewport.width + 20) { // 20px 여유
            issues.push(`Horizontal overflow: ${bodyWidth}px > ${viewport.width}px`);
          }

          // 문제점 출력
          if (issues.length > 0) {
            console.log(`⚠️  ${lang.name} (${viewport.name}) 레이아웃 문제:`);
            issues.forEach(issue => console.log(`   - ${issue}`));
          } else {
            console.log(`✅ ${lang.name} (${viewport.name}): 레이아웃 정상`);
          }

          // 치명적인 문제가 있으면 테스트 실패
          const criticalIssues = issues.filter(i =>
            i.includes('Horizontal overflow') || i.includes('Page too long')
          );
          expect(criticalIssues.length).toBe(0);
        });

        test(`${viewport.name} - 주요 요소 가시성 확인`, async ({ page }) => {
          await page.setViewportSize({ width: viewport.width, height: viewport.height });
          await page.goto(`http://localhost:3000?lang=${lang.code}`);
          await page.waitForLoadState('networkidle');

          // Hero 섹션
          await expect(page.locator('h1').first()).toBeVisible();

          // Stats 섹션 (4개 통계)
          const stats = page.locator('[class*="stat"]');
          const statsCount = await stats.count();
          expect(statsCount).toBeGreaterThanOrEqual(4);

          // Features 섹션 (4개 특징)
          const features = page.locator('[class*="feature"]');
          const featuresCount = await features.count();
          expect(featuresCount).toBeGreaterThanOrEqual(4);

          // CTA 버튼들
          const buttons = page.locator('button, a[class*="button"]');
          const buttonsCount = await buttons.count();
          expect(buttonsCount).toBeGreaterThan(0);

          console.log(`✅ ${lang.name} (${viewport.name}): 모든 주요 요소 표시됨`);
        });
      }

      // 언어별 번역 내용 검증
      test('번역 내용 검증', async ({ page }) => {
        await page.goto(`http://localhost:3000?lang=${lang.code}`);
        await page.waitForLoadState('networkidle');

        // 각 언어별로 특정 키워드가 있는지 확인
        const pageContent = await page.content();

        // 공통 키워드 체크 (모든 언어에서 나타나야 하는 내용)
        const expectedKeywords = {
          ko: ['경국대학교', '글로벌', '리더'],
          en: ['Kyungkook', 'University', 'Global'],
          id: ['Universitas Kyungkook', 'Global', 'Dunia'],
          vi: ['Đại học Kyungkook', 'Toàn cầu'],
          ru: ['Университет', 'Кёнгук'],
          uz: ['Kyungkook universiteti', 'global'],
          tl: ['Kyungkook University', 'Global'],
          th: ['มหาวิทยาลัยคยองกุก', 'โลก'],
          ms: ['Universiti Kyungkook', 'Global'],
          kk: ['Кёнгук университеті', 'жаһандық'],
        };

        const keywords = expectedKeywords[lang.code as keyof typeof expectedKeywords] || [];
        const foundKeywords: string[] = [];
        const missingKeywords: string[] = [];

        for (const keyword of keywords) {
          if (pageContent.includes(keyword)) {
            foundKeywords.push(keyword);
          } else {
            missingKeywords.push(keyword);
          }
        }

        console.log(`✅ ${lang.name}: ${foundKeywords.length}/${keywords.length} 키워드 발견`);
        if (missingKeywords.length > 0) {
          console.log(`⚠️  누락된 키워드: ${missingKeywords.join(', ')}`);
        }

        // 적어도 하나의 키워드는 있어야 함
        expect(foundKeywords.length).toBeGreaterThan(0);
      });
    });
  }

  // 언어 전환 테스트
  test('언어 전환 기능 테스트', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // 한국어로 시작
    await page.goto('http://localhost:3000?lang=ko');
    let title = await page.locator('h1').first().textContent();
    expect(title).toContain('경국대학교');

    // 영어로 전환
    await page.goto('http://localhost:3000?lang=en');
    title = await page.locator('h1').first().textContent();
    expect(title).toContain('Kyungkook');

    // 인도네시아어로 전환
    await page.goto('http://localhost:3000?lang=id');
    title = await page.locator('h1').first().textContent();
    expect(title).toContain('Kyungkook');

    console.log('✅ 언어 전환 기능 정상 작동');
  });

  // 성능 테스트
  test('페이지 로딩 성능 테스트', async ({ page }) => {
    for (const lang of languages) {
      const startTime = Date.now();
      await page.goto(`http://localhost:3000?lang=${lang.code}`);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;

      console.log(`⏱️  ${lang.name}: ${loadTime}ms`);

      // 3초 이내에 로드되어야 함
      expect(loadTime).toBeLessThan(3000);
    }
  });
});
