import Navigation from '@/components/shared/Navigation';
import ChatBot from '@/components/shared/ChatBot';
import Calendar from '@/components/dashboard/Calendar';
import { getTranslation } from '@/lib/i18n/translations';
import { locales, type Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const t = getTranslation('ko');

  return {
    title: `${t.dashboard?.title || 'Dashboard'} | KKU Global Gateway`,
    description: t.dashboard?.description || 'Student progress dashboard for KKU international students',
  };
}

export default function DashboardPage({ searchParams }: PageProps) {
  const langParam = searchParams.lang as string | undefined;
  const locale: Locale = (langParam && locales.includes(langParam as Locale))
    ? langParam as Locale
    : 'ko';

  const t = getTranslation(locale);

  return (
    <>
      <Navigation t={t} locale={locale} />
      <main className="min-h-screen pt-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold text-indigo-900 mb-6">
              {t.dashboard?.title || '나의 대시보드'}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {t.dashboard?.description || '유학 준비 및 학교생활 진행 상황'}
            </p>
          </div>
        </section>

        {/* Progress Overview */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Pre-Arrival Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-900">유학 준비</h3>
                <span className="text-3xl">🎯</span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>진행률</span>
                  <span className="font-bold text-blue-900">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-green-600">
                  <span className="mr-2">✓</span> 비자 신청 완료
                </li>
                <li className="flex items-center text-green-600">
                  <span className="mr-2">✓</span> 항공권 예약 완료
                </li>
                <li className="flex items-center text-orange-600">
                  <span className="mr-2">⏳</span> 숙소 예약 진행 중
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-2">○</span> 예방접종 미완료
                </li>
              </ul>
            </div>

            {/* Arrival Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-green-900">도착 후</h3>
                <span className="text-3xl">📍</span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>진행률</span>
                  <span className="font-bold text-green-900">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-green-600">
                  <span className="mr-2">✓</span> 기숙사 체크인
                </li>
                <li className="flex items-center text-green-600">
                  <span className="mr-2">✓</span> 학생증 발급
                </li>
                <li className="flex items-center text-orange-600">
                  <span className="mr-2">⏳</span> 은행 계좌 개설 중
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-2">○</span> 외국인 등록 예정
                </li>
              </ul>
            </div>

            {/* Campus Life Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-purple-900">캠퍼스 라이프</h3>
                <span className="text-3xl">🎓</span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>진행률</span>
                  <span className="font-bold text-purple-900">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-600 h-3 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-green-600">
                  <span className="mr-2">✓</span> 오리엔테이션 참석
                </li>
                <li className="flex items-center text-orange-600">
                  <span className="mr-2">⏳</span> 동아리 가입 검토 중
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-2">○</span> 학습 그룹 참여 예정
                </li>
                <li className="flex items-center text-gray-400">
                  <span className="mr-2">○</span> 멘토 프로그램 신청 예정
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-indigo-900 mb-8">빠른 액션</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <button className="bg-white hover:bg-indigo-50 rounded-xl p-6 shadow hover:shadow-lg transition-all text-center">
                <div className="text-4xl mb-3">📝</div>
                <div className="font-semibold text-gray-800">체크리스트</div>
              </button>
              <button className="bg-white hover:bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition-all text-center">
                <div className="text-4xl mb-3">📅</div>
                <div className="font-semibold text-gray-800">일정 관리</div>
              </button>
              <button className="bg-white hover:bg-green-50 rounded-xl p-6 shadow hover:shadow-lg transition-all text-center">
                <div className="text-4xl mb-3">📄</div>
                <div className="font-semibold text-gray-800">문서 보관</div>
              </button>
              <button className="bg-white hover:bg-purple-50 rounded-xl p-6 shadow hover:shadow-lg transition-all text-center">
                <div className="text-4xl mb-3">💬</div>
                <div className="font-semibold text-gray-800">AI 상담</div>
              </button>
            </div>
          </div>
        </section>

        {/* Calendar */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-indigo-900 mb-8">
              {locale === 'ko' ? '캘린더' : 'Calendar'}
            </h2>
            <Calendar t={t} locale={locale} />
          </div>
        </section>

        {/* Resources */}
        <section className="py-12 px-4 bg-gradient-to-r from-indigo-900 to-blue-900 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">유용한 리소스</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="#" className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors">
                <div className="text-3xl mb-3">📚</div>
                <div className="font-semibold">학생 핸드북</div>
                <div className="text-sm text-gray-300 mt-2">캠퍼스 생활 가이드</div>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors">
                <div className="text-3xl mb-3">🗺️</div>
                <div className="font-semibold">캠퍼스 맵</div>
                <div className="text-sm text-gray-300 mt-2">건물 및 시설 위치</div>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors">
                <div className="text-3xl mb-3">📞</div>
                <div className="font-semibold">연락처</div>
                <div className="text-sm text-gray-300 mt-2">중요 연락처 목록</div>
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors">
                <div className="text-3xl mb-3">❓</div>
                <div className="font-semibold">FAQ</div>
                <div className="text-sm text-gray-300 mt-2">자주 묻는 질문</div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <ChatBot t={t} locale={locale} />
    </>
  );
}
