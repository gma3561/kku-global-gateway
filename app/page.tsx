import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
import ChatBot from '@/components/shared/ChatBot';
import EmergencyBar from '@/components/functional/EmergencyBar';
import QuickActions from '@/components/functional/QuickActions';
import CostCalculator from '@/components/functional/CostCalculator';
import ProgressTracker from '@/components/functional/ProgressTracker';
import { getTranslation } from '@/lib/i18n/translations';
import { locales, type Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

// Force static export
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const t = getTranslation('ko');

  return {
    title: `${t.hero.title} | KKU Global Gateway`,
    description: 'Practical tools and resources for international students - visa guides, cost calculators, progress trackers, and more',
    keywords: 'KKU, Study Abroad, International Students, Korea, Visa Guide, Cost Calculator, Student Dashboard',
    openGraph: {
      title: `KKU Global Gateway - Student Tools & Resources`,
      description: 'Everything international students need in one place',
      url: 'https://gma3561.github.io/kku-global-gateway',
      siteName: 'KKU Global Gateway',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'KKU Global Gateway',
        },
      ],
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `KKU Global Gateway - Student Tools`,
      description: 'Practical tools for international students',
      images: ['/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function Home({ searchParams }: PageProps) {
  // Get language from URL parameter, default to Korean
  const langParam = searchParams.lang as string | undefined;
  const locale: Locale = (langParam && locales.includes(langParam as Locale))
    ? langParam as Locale
    : 'ko';

  const t = getTranslation(locale);

  return (
    <>
      {/* Emergency Contact Bar - Sticky at top */}
      <EmergencyBar t={t} />

      <Navigation t={t} locale={locale} />

      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 pt-20">
        {/* Hero Section - Simplified and Functional */}
        <section className="relative py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full mb-4 font-semibold">
              🎓 {locale === 'ko' ? 'MVP 플랫폼' : 'MVP Platform'} • {locale === 'ko' ? '실제 작동하는 기능' : 'Real Working Features'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {locale === 'ko' ? '국제 학생을 위한 실용 도구' : 'Practical Tools for International Students'}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {locale === 'ko'
                ? '비자 신청부터 캠퍼스 생활까지, 필요한 모든 것을 한 곳에서 관리하세요'
                : 'From visa application to campus life, manage everything you need in one place'}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {[
                { number: '10+', label: locale === 'ko' ? '실용 도구' : 'Practical Tools' },
                { number: '4', label: locale === 'ko' ? '진행 추적' : 'Progress Tracking' },
                { number: '100%', label: locale === 'ko' ? '무료 사용' : 'Free to Use' },
                { number: '24/7', label: locale === 'ko' ? '긴급 지원' : 'Emergency Support' },
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access Tools */}
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <QuickActions t={t} locale={locale} />
        </section>

        {/* Main Functional Tools */}
        <section className="max-w-7xl mx-auto px-4 space-y-12 pb-12">
          {/* Cost Calculator */}
          <div id="calculator">
            <CostCalculator t={t} />
          </div>

          {/* Progress Tracker */}
          <div id="progress">
            <ProgressTracker t={t} />
          </div>
        </section>

        {/* Coming Soon - Proposal Features */}
        <section className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full mb-4 font-bold">
                🚀 {locale === 'ko' ? '곧 출시 예정' : 'Coming Soon'}
              </div>
              <h2 className="text-4xl font-bold mb-4">
                {locale === 'ko' ? '더 많은 기능이 준비되고 있습니다' : 'More Features Coming Soon'}
              </h2>
              <p className="text-xl text-blue-200">
                {locale === 'ko'
                  ? '학생들의 편의를 위해 지속적으로 새로운 기능을 개발하고 있습니다'
                  : 'We are continuously developing new features for student convenience'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🏠',
                  title: locale === 'ko' ? '숙소 검색 플랫폼' : 'Housing Search Platform',
                  desc: locale === 'ko' ? '실시간 기숙사 및 원룸 정보' : 'Real-time dormitory and apartment listings',
                  status: 'Q1 2025',
                },
                {
                  icon: '👥',
                  title: locale === 'ko' ? '학생 커뮤니티' : 'Student Community',
                  desc: locale === 'ko' ? '국가별 학생회 및 멘토링' : 'Country-based student groups and mentoring',
                  status: 'Q2 2025',
                },
                {
                  icon: '📅',
                  title: locale === 'ko' ? '이벤트 캘린더' : 'Event Calendar',
                  desc: locale === 'ko' ? '문화 행사 및 오리엔테이션' : 'Cultural events and orientations',
                  status: 'Q2 2025',
                },
                {
                  icon: '🤝',
                  title: locale === 'ko' ? '버디 프로그램' : 'Buddy Program',
                  desc: locale === 'ko' ? '한국 학생 멘토 매칭' : 'Match with Korean student mentors',
                  status: 'Q3 2025',
                },
                {
                  icon: '💼',
                  title: locale === 'ko' ? '취업 지원 센터' : 'Career Center',
                  desc: locale === 'ko' ? '인턴십 및 채용 정보' : 'Internship and job opportunities',
                  status: 'Q3 2025',
                },
                {
                  icon: '📱',
                  title: locale === 'ko' ? '모바일 앱' : 'Mobile App',
                  desc: locale === 'ko' ? 'iOS 및 Android 앱' : 'iOS and Android applications',
                  status: 'Q4 2025',
                },
              ].map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-blue-200 mb-4 text-sm">{feature.desc}</p>
                  <div className="inline-block px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                    {feature.status}
                  </div>
                </div>
              ))}
            </div>

            {/* Feedback CTA */}
            <div className="mt-12 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 inline-block">
                <h3 className="text-2xl font-bold mb-4">
                  {locale === 'ko' ? '원하는 기능이 있으신가요?' : 'Have a Feature Request?'}
                </h3>
                <p className="text-blue-200 mb-6">
                  {locale === 'ko'
                    ? '여러분의 의견을 들려주세요. 가장 많이 요청된 기능을 우선적으로 개발합니다.'
                    : 'We want to hear from you. Most requested features will be prioritized.'}
                </p>
                <button className="px-8 py-4 bg-white text-blue-900 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                  {locale === 'ko' ? '피드백 보내기' : 'Send Feedback'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Chatbot */}
        <ChatBot t={t} locale={locale} />
      </main>

      <Footer t={t} locale={locale} />
    </>
  );
}
