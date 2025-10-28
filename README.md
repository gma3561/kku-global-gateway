# KKU Global Gateway - 경국대학교 국제 유학생 유치 웹 애플리케이션

동남아시아 및 중앙아시아 지역 학생들을 위한 경국대학교 국제 유학 통합 플랫폼입니다.

## 📋 프로젝트 개요

**KKU Global Gateway**는 국제 학생들의 유학 준비부터 입학, 적응, 졸업까지 모든 단계를 지원하는 통합 웹 애플리케이션입니다.

### 주요 특징

- 🌐 **다국어 지원**: 16개 언어 지원 (한국어, 영어, 인도네시아어, 베트남어, 러시아어, 우즈벡어 등)
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- 🎨 **현대적인 UI/UX**: Tailwind CSS와 Framer Motion을 활용한 인터랙티브 디자인
- ⚡ **고성능**: Next.js 14 기반 SSR 및 최적화
- 🔐 **보안**: 개인정보 보호 및 데이터 암호화

## 🚀 시작하기

### 필수 요구사항

- Node.js 20.9.0 이상 (현재 18.20.8 사용 중 - 업그레이드 권장)
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# Lint 검사
npm run lint
```

## 📁 프로젝트 구조

```
kku-global-gateway/
├── app/                          # Next.js App Router 페이지
│   ├── page.tsx                 # 메인 랜딩 페이지
│   ├── layout.tsx               # 루트 레이아웃
│   └── globals.css              # 전역 스타일
├── components/                   # React 컴포넌트
│   ├── landing/                 # 랜딩 페이지 컴포넌트
│   │   ├── Hero.tsx            # 히어로 섹션
│   │   ├── Stats.tsx           # 통계 섹션
│   │   └── Features.tsx        # 기능 섹션
│   ├── dashboard/               # 학생 대시보드 (Phase 2)
│   ├── admin/                   # 관리자 페이지 (Phase 2)
│   └── shared/                  # 공용 컴포넌트
├── lib/                         # 유틸리티 및 설정
│   ├── i18n/                   # 국제화
│   │   ├── config.ts           # 언어 설정
│   │   └── translations/       # 번역 파일
│   ├── hooks/                  # Custom React Hooks
│   ├── stores/                 # 상태 관리 (Zustand)
│   └── utils/                  # 유틸리티 함수
├── public/                      # 정적 파일
│   ├── images/                 # 이미지
│   └── videos/                 # 비디오
└── PROJECT_PLAN.md              # 상세 기획서
```

## 🎨 기술 스택

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod

## 📖 주요 기능

### Phase 1 (현재 완료) ✅
- 반응형 랜딩 페이지
- 히어로 섹션 with 애니메이션
- 통계 표시 섹션
- 주요 기능 소개 섹션
- 다국어 기본 설정 (한국어/영어)
- 프로젝트 구조 및 아키텍처

### Phase 2 (계획 중) 🔲
- 프로그램 검색 및 필터링
- 비용 계산기
- 학생 대시보드
- 지원서 작성 시스템
- 추가 언어 지원 (베트남어, 러시아어, 우즈벡어 등)
- AI 챗봇 상담

### Phase 3 (계획 중) 🔲
- 관리자 대시보드
- 분석 및 통계
- 마케팅 도구
- 파트너 포털

## 🌐 지원 언어

### Phase 1 (현재)
- 한국어 (ko) ✅
- 영어 (en) ✅

### Phase 2 (계획)
- 인도네시아어 (id)
- 베트남어 (vi)
- 러시아어 (ru)
- 우즈벡어 (uz)
- 타갈로그어 (tl)
- 태국어 (th)
- 말레이어 (ms)
- 카자흐어 (kk)

## 📝 개발 가이드

### 새 컴포넌트 추가

```tsx
// components/landing/NewComponent.tsx
'use client';

import { Translation } from '@/lib/i18n/translations/ko';
import { motion } from 'framer-motion';

interface NewComponentProps {
  t: Translation;
}

export default function NewComponent({ t }: NewComponentProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-20"
    >
      {/* 컴포넌트 내용 */}
    </motion.section>
  );
}
```

### 번역 추가

```typescript
// lib/i18n/translations/ko.ts
export const ko = {
  // ... 기존 번역
  newSection: {
    title: '새로운 섹션',
    description: '설명',
  },
};
```

## 📄 관련 문서

- [상세 기획서](./PROJECT_PLAN.md) - 전체 프로젝트 기획 문서
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 📞 연락처

- 프로젝트 담당: 경국대학교 국제교류팀
- 이메일: global@kku.ac.kr

---

**Made with ❤️ for International Students**
