# KKU Global Gateway - 프로젝트 기획서

## 📋 프로젝트 개요

### 프로젝트 명
**KKU Global Gateway** - 건국대학교 외국인 유학생 종합 지원 플랫폼

### 프로젝트 목적
건국대학교에 입학하는 외국인 유학생들이 입학 전 준비부터 캠퍼스 생활까지 필요한 모든 정보를 한 곳에서 확인하고 관리할 수 있는 원스톱 디지털 플랫폼 제공

### 타겟 사용자
- **주 타겟**: 건국대학교 입학 예정 및 재학 중인 외국인 유학생
- **지원 언어**: 10개국 언어
  - 한국어 (ko)
  - English (en)
  - Tiếng Việt (vi) - 베트남어
  - ไทย (th) - 태국어
  - Bahasa Indonesia (id) - 인도네시아어
  - Bahasa Melayu (ms) - 말레이시아어
  - Filipino (tl) - 필리핀어
  - Қазақ (kk) - 카자흐스탄어
  - Ўзбек (uz) - 우즈베키스탄어
  - Русский (ru) - 러시아어

### 프로젝트 기간
- **개발 기간**: 2024년 10월
- **배포 목표**: 2024년 11월
- **운영**: 지속적 업데이트

---

## 🎯 핵심 가치 제안 (Value Proposition)

### 1. 언어 장벽 해소
10개국 언어를 지원하여 모국어로 정보를 확인하고 준비할 수 있음

### 2. 정보 접근성 향상
분산된 정보를 한 곳에 모아 쉽고 빠르게 필요한 정보에 접근

### 3. 준비 과정 가시화
체크리스트와 진행 상황 추적으로 입학 준비 과정을 체계적으로 관리

### 4. 실시간 지원
긴급 연락처와 24시간 지원 시스템으로 안전망 제공

### 5. 비용 투명성
학비, 생활비 등 예상 비용을 미리 계산하여 재정 계획 수립 지원

---

## 🏗️ 시스템 아키텍처

### 기술 스택

#### Frontend
- **Framework**: Next.js 16.0.0 (React 19.2.0)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: Zustand (with persist middleware)
- **Icons**: Lucide React

#### Deployment
- **Platform**: GitHub Pages
- **Build**: Static Site Generation (SSG)
- **CI/CD**: GitHub Actions

#### Testing
- **E2E Testing**: Playwright
- **Browser Support**: Chromium, Firefox, Safari, Edge

### 프로젝트 구조
```
kku-global-gateway/
├── app/
│   ├── page.tsx                 # 메인 홈페이지
│   ├── layout.tsx               # 전역 레이아웃
│   └── globals.css              # 전역 스타일
├── components/
│   ├── shared/
│   │   └── Navigation.tsx       # 네비게이션 + 언어 선택
│   └── functional/
│       ├── EmergencyBar.tsx     # 긴급 연락처
│       ├── ProgressTracker.tsx  # 진행 상황 추적
│       ├── CostCalculator.tsx   # 비용 계산기
│       └── QuickActions.tsx     # 빠른 실행 도구
├── lib/
│   ├── i18n/
│   │   ├── config.ts            # 언어 설정
│   │   └── translations/        # 10개국 번역 파일
│   │       ├── ko.ts
│   │       ├── en.ts
│   │       ├── vi.ts
│   │       ├── th.ts
│   │       ├── id.ts
│   │       ├── ms.ts
│   │       ├── tl.ts
│   │       ├── kk.ts
│   │       ├── uz.ts
│   │       └── ru.ts
│   └── store/
│       └── languageStore.ts     # 언어 상태 관리
├── tests/
│   └── language-test.spec.js    # Playwright E2E 테스트
└── public/
    └── images/                  # 이미지 리소스
```

---

## 🎨 주요 기능 명세

### 1. 다국어 지원 시스템

#### 1.1 언어 선택 기능
**위치**: 상단 네비게이션 바 우측

**UI/UX**:
- 🌐 Globe 아이콘 버튼
- 드롭다운 메뉴로 10개 언어 선택
- 각 언어별 국기 이모지 표시
- 현재 선택된 언어 체크마크(✓) 표시

**기술 구현**:
- Zustand store를 통한 언어 상태 관리
- localStorage에 사용자 선택 언어 저장
- URL parameter (`?lang=xx`)를 통한 언어 전달
- 클라이언트 사이드 라우팅 (`router.push()`)
- 페이지 새로고침 없이 실시간 언어 전환

**사용자 플로우**:
1. 사용자가 언어 버튼 클릭
2. 드롭다운 메뉴 오픈
3. 원하는 언어 선택
4. 즉시 모든 컴포넌트의 텍스트가 선택한 언어로 변경
5. localStorage에 저장되어 다음 방문 시 자동 적용
6. URL에 언어 파라미터 반영 (`?lang=ko`)

#### 1.2 번역 시스템
**구조**: 타입 안전 번역 시스템

**Translation 타입 구조**:
```typescript
interface Translation {
  nav: {
    home: string;
    preparation: string;
    arrival: string;
    campusLife: string;
    dashboard: string;
    applyNow: string;
  };
  emergency: {
    title: string;
    contacts: {
      campus: string;
      international: string;
      support: string;
    };
  };
  progress: {
    title: string;
    subtitle: string;
    categories: {
      visa: string;
      documents: string;
      arrival: string;
      settlement: string;
    };
    tasks: {
      visaApplication: string;
      admissionLetter: string;
      // ... 20+ tasks
    };
  };
  cost: {
    title: string;
    // ... 비용 계산기 관련
  };
  quickActions: {
    title: string;
    // ... 빠른 실행 도구 관련
  };
}
```

**폴백 전략**:
- 번역이 없는 경우 영어로 자동 폴백
- 각 텍스트에 기본값 제공 (`|| 'Default Text'`)

---

### 2. 긴급 연락처 바 (Emergency Bar)

#### 2.1 기능 개요
페이지 상단에 고정되어 언제든지 긴급 상황 시 연락 가능

#### 2.2 UI/UX
**디자인**:
- 배경: 빨강-주황 그라데이션 (`from-red-600 via-red-500 to-orange-500`)
- 위치: Sticky header (스크롤 시에도 상단 고정)
- 애니메이션: AlertCircle 아이콘 pulse 효과

**연락처 표시**:
1. **캠퍼스 보안** (Campus Security)
   - 전화번호: 02-2600-2000
   - 스타일: 흰색 배경, 빨간색 텍스트
   - 아이콘: AlertCircle

2. **국제교류처** (International Office)
   - 전화번호: 02-2600-2100
   - 스타일: 진한 빨강 배경
   - 아이콘: Phone

3. **24시간 학생 지원** (24/7 Student Support)
   - 전화번호: 02-2600-2200
   - 스타일: 주황 배경
   - 아이콘: MessageCircle

#### 2.3 인터랙션
- 각 연락처 버튼 클릭 시 전화 걸기 (`tel:` 링크)
- Hover 시 scale-up 애니메이션 (1.05배)
- 모바일 친화적인 터치 영역

#### 2.4 반응형 디자인
- 데스크톱: 가로 배치, 한 줄에 모든 연락처 표시
- 모바일: Flex-wrap으로 자동 줄바꿈

---

### 3. 진행 상황 추적기 (Progress Tracker)

#### 3.1 기능 개요
유학 준비 과정을 단계별로 체크하고 전체 진행률을 시각화

#### 3.2 카테고리 구성

**1. 비자 (Visa)** 🛂
- D-2 비자 신청서 제출
- 입학 허가서 수령
- 재정 증명서 준비
- 비자 인터뷰 완료
- 비자 발급 확인

**2. 서류 (Documents)** 📄
- 여권 확인 (유효기간 6개월 이상)
- 학력 증명서 아포스티유
- 건강검진 완료
- 범죄경력증명서 발급
- 추천서 준비

**3. 도착 준비 (Arrival)** ✈️
- 항공권 예약
- 공항 픽업 신청
- 기숙사/숙소 예약
- 여행자 보험 가입
- 한국 SIM 카드 준비

**4. 정착 (Settlement)** 🏠
- 외국인 등록 완료
- 은행 계좌 개설
- 한국 전화번호 개통
- 오리엔테이션 참석
- 버디 프로그램 신청

#### 3.3 UI/UX

**진행률 표시**:
- 상단: 원형 프로그레스 바 (전체 진행률 %)
- 각 카테고리별 진행률 바
- 색상 코딩:
  - 비자: 파란색 (`blue-500`)
  - 서류: 녹색 (`green-500`)
  - 도착: 주황색 (`orange-500`)
  - 정착: 보라색 (`purple-500`)

**체크리스트**:
- ✅ 완료된 항목: CheckCircle2 아이콘, 연한 배경
- ⭕ 미완료 항목: Circle 아이콘, 투명 배경
- Hover 시 scale 효과

**데이터 저장**:
- localStorage에 진행 상황 자동 저장
- 브라우저 종료 후에도 데이터 유지
- "Save Progress" 버튼으로 명시적 저장 가능

#### 3.4 통계 표시
- 전체 작업 수
- 완료된 작업 수
- 완료율 (%)
- Trophy 아이콘으로 완료 시 축하 효과

---

### 4. 비용 계산기 (Cost Calculator)

#### 4.1 기능 개요
한국 유학 생활에 필요한 예상 비용을 항목별로 계산하고 통화 변환 제공

#### 4.2 비용 항목

**1. 등록금 (Tuition)** 🎓
- 기본값: 3,000,000원 / 학기
- 조절 범위: 0 ~ 10,000,000원
- 설명: 학과별로 상이

**2. 주거비 (Housing)** 🏠
- 기본값: 400,000원 / 월
- 조절 범위: 0 ~ 2,000,000원
- 설명: 기숙사 or 자취

**3. 식비 (Food)** 🍜
- 기본값: 300,000원 / 월
- 조절 범위: 0 ~ 1,000,000원
- 설명: 학식 + 외식

**4. 교통비 (Transportation)** 🚇
- 기본값: 100,000원 / 월
- 조절 범위: 0 ~ 500,000원
- 설명: 지하철, 버스

**5. 교재비 (Books)** 📚
- 기본값: 150,000원 / 학기
- 조절 범위: 0 ~ 1,000,000원
- 설명: 전공 서적

**6. 기타 (Miscellaneous)** 🎉
- 기본값: 200,000원 / 월
- 조절 범위: 0 ~ 1,000,000원
- 설명: 여가, 통신비 등

#### 4.3 UI/UX

**입력 방식**:
- Range slider로 금액 조절
- 실시간으로 총액 계산
- 각 항목별 아이콘 표시

**금액 표시**:
- 한국 원화(KRW): 3,450,000원
- 미국 달러(USD): $2,587.50 (환율: 1,333.33 KRW/USD)

**통화 전환 버튼**:
- 클릭으로 KRW ↔ USD 전환
- 애니메이션 효과
- 색상 변경으로 현재 통화 표시

**총액 표시**:
- 큰 폰트 크기
- 그라데이션 텍스트
- 실시간 업데이트

#### 4.4 계산 로직
```typescript
총액 = 등록금 + (주거비 + 식비 + 교통비 + 기타) × 4개월 + 교재비
USD 환율 = 1333.33 (고정)
```

---

### 5. 빠른 실행 도구 (Quick Actions)

#### 5.1 기능 개요
자주 사용하는 기능들에 빠르게 접근할 수 있는 단축 메뉴

#### 5.2 도구 목록

**1. 비자 신청 가이드** 📄
- 링크: `/arrival?lang={locale}`
- 색상: 파란색 그라데이션
- 설명: D-2 비자 신청 절차

**2. 캠퍼스 지도** 🗺️
- 링크: `/campus-life?lang={locale}`
- 색상: 녹색 그라데이션
- 설명: 건물 위치 및 시설 안내

**3. 생활비 가이드** 💰
- 링크: `/?lang={locale}#cost`
- 색상: 주황색 그라데이션
- 설명: 월별 예상 생활비

**4. 장학금 정보** 🎓
- 링크: `/preparation?lang={locale}`
- 색상: 보라색 그라데이션
- 설명: 외국인 유학생 장학금

**5. 기숙사 신청** 🏠
- 링크: `/arrival?lang={locale}#housing`
- 색상: 파란색 그라데이션
- 설명: 기숙사 신청 방법

**6. 건강보험** 🏥
- 링크: `/arrival?lang={locale}#insurance`
- 색상: 빨강-분홍 그라데이션
- 설명: 국민건강보험 가입

**7. 통신사 안내** 📱
- 링크: `/campus-life?lang={locale}#phone`
- 색상: 청록색 그라데이션
- 설명: SIM 카드 및 통신 요금제

**8. 학사 일정** 📅
- 링크: `/campus-life?lang={locale}#calendar`
- 색상: 남색 그라데이션
- 설명: 학기 일정 및 휴일

**9. 동아리 활동** 👥
- 링크: `/campus-life?lang={locale}#clubs`
- 색상: 분홍색 그라데이션
- 설명: 학생 동아리 가입

**10. 언어 교환** 🌐
- 링크: `/campus-life?lang={locale}#language`
- 색상: 초록-파랑 그라데이션
- 설명: 한국어-모국어 교환

#### 5.3 UI/UX

**카드 디자인**:
- 그라데이션 배경
- 흰색 텍스트
- 아이콘 + 제목 + 설명
- 그림자 효과

**인터랙션**:
- Hover 시 scale-up (1.02배) + 그림자 강화
- 부드러운 transition
- 클릭 시 해당 페이지로 이동

**레이아웃**:
- 데스크톱: 5개 열 그리드
- 태블릿: 3개 열 그리드
- 모바일: 2개 열 그리드

---

## 📱 반응형 디자인

### 브레이크포인트
- **Mobile**: < 640px
- **Tablet**: 640px ~ 1024px
- **Desktop**: > 1024px

### 모바일 최적화
- 터치 친화적인 버튼 크기 (최소 44×44px)
- 스와이프 제스처 지원
- 모바일 메뉴 햄버거 아이콘
- 세로 스크롤 최적화

### 태블릿 최적화
- 2단 또는 3단 레이아웃
- 가로/세로 모드 지원
- 적절한 여백과 간격

### 데스크톱 최적화
- 최대 너비: 1280px (max-w-7xl)
- 넓은 화면 활용
- 마우스 호버 효과

---

## 🎨 디자인 시스템

### 색상 팔레트

**Primary Colors**:
- Blue: `#3B82F6` (blue-500)
- Purple: `#8B5CF6` (purple-600)

**Status Colors**:
- Success: `#10B981` (green-500)
- Warning: `#F59E0B` (orange-500)
- Error: `#EF4444` (red-500)
- Info: `#3B82F6` (blue-500)

**Neutral Colors**:
- White: `#FFFFFF`
- Gray 100: `#F3F4F6`
- Gray 900: `#111827`
- Black: `#000000`

### 타이포그래피

**Font Family**:
- 시스템 폰트 스택
- `-apple-system, BlinkMacSystemFont, 'Segoe UI', ...`

**Font Sizes**:
- Heading 1: 3rem (48px)
- Heading 2: 2rem (32px)
- Heading 3: 1.5rem (24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)

**Font Weights**:
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### 간격 시스템 (Spacing)
- 기본 단위: 4px (0.25rem)
- 사용: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

### 그림자 (Shadows)
```css
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1)
```

### 애니메이션

**Duration**:
- Fast: 150ms
- Normal: 300ms
- Slow: 500ms

**Easing**:
- ease-in-out
- cubic-bezier(0.4, 0, 0.2, 1)

**Common Animations**:
- Fade in/out
- Slide in/out
- Scale up/down
- Pulse (긴급 연락처)

---

## 🔧 기술 구현 상세

### 1. 언어 전환 시스템

#### 문제와 해결 과정

**문제 1: 정적 사이트에서 URL 파라미터 읽기**
- **원인**: `app/page.tsx`가 서버 컴포넌트로 `searchParams`를 읽으려 했으나 정적 빌드(`output: 'export'`)에서는 빌드 타임에만 가능
- **증상**: 모든 언어가 항상 한국어(기본값)로 표시됨
- **해결**: 클라이언트 컴포넌트에서 `useSearchParams()` 또는 `window.location.search` 사용

**문제 2: 전체 페이지 리로드**
- **원인**: `window.location.href = newUrl` 사용으로 인한 전체 페이지 새로고침
- **증상**: 언어 변경 시 깜빡임, 스크롤 위치 초기화
- **해결**: Next.js `router.push()` 사용하여 클라이언트 사이드 라우팅

**문제 3: Props를 통한 번역 전달**
- **원인**: 서버에서 생성된 번역 props가 클라이언트 언어 변경에 반응하지 않음
- **증상**: 언어 선택 후에도 컴포넌트의 텍스트가 변경되지 않음
- **해결**: 모든 functional 컴포넌트에서 `useLanguageStore()` 훅 사용

**문제 4: 언어 스토어 동기화**
- **원인**: Navigation 컴포넌트가 props의 locale을 store에 계속 덮어씌움
- **증상**: 사용자가 언어를 변경해도 즉시 기본 언어로 되돌아감
- **해결**: 마운트 시 URL 파라미터를 한 번만 읽어 초기화

#### 최종 구현

**Navigation.tsx**:
```typescript
// URL에서 언어 파라미터 읽어 store 초기화 (마운트 시 한 번만)
useEffect(() => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang') as Locale;
    if (langParam && locales.includes(langParam)) {
      setLocale(langParam);
    }
  }
}, []);

// 언어 변경 시 클라이언트 사이드 라우팅 사용
const handleLanguageChange = (langCode: Locale) => {
  setLocale(langCode);
  localStorage.setItem('preferred-language', langCode);

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('lang', langCode);
  router.push(`${pathname}?${searchParams.toString()}`);
};
```

**Functional Components**:
```typescript
export default function EmergencyBar({ t: _t }: EmergencyBarProps) {
  // Props 무시하고 store에서 직접 읽기
  const { currentLocale } = useLanguageStore();
  const t = getTranslation(currentLocale);

  // 컴포넌트는 store 변경에 자동으로 리렌더링
}
```

### 2. 상태 관리 (Zustand)

**언어 스토어**:
```typescript
interface LanguageState {
  currentLocale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      currentLocale: 'ko' as Locale,
      setLocale: (locale: Locale) => set({ currentLocale: locale }),
    }),
    {
      name: 'kku-language-storage', // localStorage key
    }
  )
);
```

**장점**:
- 간단한 API
- TypeScript 지원
- localStorage 자동 동기화
- 리액트 리렌더링 최적화

### 3. 정적 사이트 생성 (SSG)

**next.config.js**:
```javascript
const nextConfig = {
  output: 'export',  // 정적 HTML 생성
  basePath: '/kku-global-gateway',  // GitHub Pages용
  images: {
    unoptimized: true,  // 정적 export는 이미지 최적화 불가
  },
};
```

**장점**:
- 빠른 로딩 속도
- 서버 불필요
- GitHub Pages 무료 호스팅
- SEO 친화적

**제약사항**:
- 서버 사이드 렌더링 불가
- API Routes 불가
- 동적 라우팅 제한
- 빌드 타임에 모든 페이지 생성

### 4. 애니메이션 (Framer Motion)

**예시**:
```typescript
// 페이드 인 애니메이션
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {content}
</motion.div>

// 호버 애니메이션
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>

// 스태거 애니메이션 (순차적 표시)
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item, i) => (
    <motion.div key={i} variants={itemVariants}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## 🧪 테스트 전략

### Playwright E2E 테스트

#### 테스트 범위
1. **언어 전환 테스트**
   - 10개 언어 모두 테스트
   - URL 파라미터 확인
   - 번역 텍스트 표시 확인
   - 스크린샷 저장

2. **기능 테스트**
   - 진행 상황 추적기 체크/언체크
   - 비용 계산기 슬라이더 조작
   - 통화 전환 버튼
   - localStorage 저장 확인

3. **네비게이션 테스트**
   - 페이지 간 이동
   - 언어 파라미터 유지
   - 빠른 실행 도구 링크

4. **반응형 테스트**
   - 모바일 뷰포트
   - 태블릿 뷰포트
   - 데스크톱 뷰포트

#### 테스트 코드 예시
```javascript
test('Korean language test', async ({ page }) => {
  await page.goto('http://localhost:3001');

  // 언어 선택 버튼 찾기
  const languageButton = page.locator('button').filter({
    has: page.locator('[class*="lucide-globe"]')
  }).first();

  await languageButton.click();

  // 한국어 선택
  await page.locator('button:has-text("한국어")').click();

  // URL 확인
  await page.waitForURL('**/lang=ko');

  // 번역된 텍스트 확인
  await expect(page.locator('text=긴급 연락처').first()).toBeVisible();

  // 스크린샷
  await page.screenshot({ path: 'test-ko.png', fullPage: true });
});
```

#### 테스트 실행
```bash
# 모든 브라우저에서 테스트
npx playwright test

# 특정 브라우저
npx playwright test --project=chromium

# UI 모드
npx playwright test --ui

# 디버그 모드
npx playwright test --debug
```

---

## 🚀 배포 전략

### GitHub Pages 배포

#### 1. 저장소 설정
- Repository: `github.com/gma3561/kku-global-gateway`
- Branch: `gh-pages` (자동 생성)
- URL: `https://gma3561.github.io/kku-global-gateway/`

#### 2. 배포 스크립트
**package.json**:
```json
{
  "scripts": {
    "build": "next build",
    "export": "next export",
    "deploy": "npm run build && npm run export && gh-pages -d out"
  }
}
```

#### 3. GitHub Actions (자동 배포)
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - run: npm run export
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

#### 4. 배포 프로세스
1. 코드 변경 후 `main` 브랜치에 push
2. GitHub Actions 자동 실행
3. Next.js 빌드 및 export
4. `gh-pages` 브랜치에 배포
5. 1~2분 후 사이트 업데이트 완료

---

## 📊 성능 최적화

### 1. 이미지 최적화
- WebP 포맷 사용
- Lazy loading
- Responsive images

### 2. 코드 스플리팅
- Next.js 자동 코드 스플리팅
- 동적 import 사용
- 번들 크기 최소화

### 3. 캐싱 전략
- 정적 리소스 브라우저 캐싱
- localStorage 활용
- Service Worker (PWA 전환 시)

### 4. 렌더링 최적화
- React.memo 사용
- useMemo, useCallback 활용
- 불필요한 리렌더링 방지

---

## 🔒 보안 고려사항

### 1. XSS 방지
- React의 자동 이스케이핑
- dangerouslySetInnerHTML 사용 금지
- 사용자 입력 검증

### 2. HTTPS
- GitHub Pages 기본 HTTPS 제공
- Mixed content 방지

### 3. 개인정보 보호
- 최소한의 데이터 수집
- localStorage만 사용 (서버 저장 없음)
- 쿠키 미사용

### 4. 접근성 (A11y)
- WCAG 2.1 AA 준수
- 시맨틱 HTML
- ARIA 라벨 사용
- 키보드 네비게이션 지원

---

## 📈 향후 개선 계획

### Phase 2: 커뮤니티 기능
- [ ] 학생 간 Q&A 게시판
- [ ] 선배 유학생 멘토링 매칭
- [ ] 실시간 채팅 지원

### Phase 3: 개인화 기능
- [ ] 사용자 계정 시스템
- [ ] 개인별 맞춤 체크리스트
- [ ] 알림 및 리마인더

### Phase 4: 확장 기능
- [ ] 모바일 앱 (React Native)
- [ ] AI 챗봇 상담
- [ ] AR 캠퍼스 투어

### Phase 5: 통합 서비스
- [ ] 학교 시스템 연동
- [ ] 기숙사 신청 통합
- [ ] 수강 신청 가이드

---

## 📞 지원 및 문의

### 개발팀
- **프로젝트 관리자**: [이름]
- **Frontend 개발**: [이름]
- **UI/UX 디자인**: [이름]
- **QA/테스트**: [이름]

### 연락처
- **이메일**: support@kku-global.com
- **GitHub**: https://github.com/gma3561/kku-global-gateway
- **이슈 트래킹**: GitHub Issues

### 기여 방법
1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

## 🙏 감사의 말

이 프로젝트는 건국대학교 국제교류처와 외국인 유학생들의 피드백을 바탕으로 개발되었습니다.

---

**마지막 업데이트**: 2024년 10월 29일
**버전**: 1.0.0
**상태**: ✅ 개발 완료, 테스트 중
