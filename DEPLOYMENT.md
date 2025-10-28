# 🚀 KKU Global Gateway - 배포 가이드

## ✅ 배포 전 체크리스트

### 1. 빌드 성공 확인
```bash
npm run build
```
- ✅ 빌드 성공 (2025-10-29)
- ✅ 정적 페이지 생성 완료 (9/9)
- ✅ TypeScript 컴파일 통과

### 2. 주요 페이지 확인
- ✅ / (홈페이지)
- ✅ /programs (프로그램 목록)
- ✅ /dashboard, /arrival, /campus-life, /preparation

### 3. 주요 기능 확인
- ✅ Navigation (반응형, 언어 선택기)
- ✅ Hero 섹션 (애니메이션)
- ✅ Stats 섹션
- ✅ Features 섹션
- ✅ Testimonials 섹션 (학생 후기)
- ✅ ChatBot (AI 상담)
- ✅ Footer (소셜 미디어 링크)
- ✅ 프로그램 필터링 및 검색

## 🌐 Vercel 배포 방법

### 방법 1: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 방법 2: GitHub 연동 배포

1. GitHub 저장소 생성 및 푸시
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kku-global-gateway.git
git push -u origin main
```

2. Vercel 대시보드에서 Import
   - https://vercel.com/dashboard 접속
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - "Deploy" 클릭

### 방법 3: Vercel 설정 파일 사용

`vercel.json` (이미 생성됨):
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

## 📝 환경 변수 설정 (필요시)

Vercel 대시보드 > Settings > Environment Variables

```
NEXT_PUBLIC_SITE_URL=https://kku-global.vercel.app
```

## 🔗 배포 URL 예상

- **Production**: https://kku-global-gateway.vercel.app
- **Preview**: https://kku-global-gateway-xxx.vercel.app

## 📊 배포 후 체크리스트

### 1. 기능 테스트
- [ ] 홈페이지 로딩 확인
- [ ] 언어 전환 작동 확인 (한국어 ↔ 영어)
- [ ] 프로그램 페이지 필터링 확인
- [ ] 챗봇 열기/닫기 확인
- [ ] 모바일 반응형 확인
- [ ] Footer 링크 확인

### 2. SEO 확인
- [ ] 메타 태그 확인 (View Page Source)
- [ ] OpenGraph 이미지 확인 (SNS 공유 테스트)
- [ ] Google Search Console 등록
- [ ] Sitemap 제출

### 3. 성능 테스트
- [ ] Google PageSpeed Insights
- [ ] Lighthouse 점수 확인
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 90+
  - SEO: 90+

### 4. 다국어 테스트
- [ ] ?lang=ko (한국어)
- [ ] ?lang=en (영어)
- [ ] 언어별 콘텐츠 표시 확인

## 🐛 문제 해결

### 빌드 실패 시
```bash
# 캐시 삭제
rm -rf .next node_modules
npm install
npm run build
```

### 배포 실패 시
1. Vercel 로그 확인
2. Node.js 버전 확인 (>=20.9.0)
3. package.json의 scripts 확인

### 포트 충돌 시
```bash
# 3000번 포트 사용 중인 프로세스 확인
lsof -ti:3000

# 프로세스 종료
kill -9 $(lsof -ti:3000)
```

## 📱 도메인 연결 (선택사항)

1. Vercel 대시보드 > Settings > Domains
2. Custom Domain 추가
3. DNS 설정
   - Type: A
   - Name: @
   - Value: 76.76.21.21

## 🎉 배포 완료!

배포가 완료되면:
1. 배포 URL을 기획서에 추가
2. 데모 영상 제작
3. 프레젠테이션 자료에 실제 URL 포함

---

**최종 빌드 성공**: 2025년 10월 29일
**배포 준비 완료**: ✅
**예상 배포 시간**: 2-5분
