import Navigation from '@/components/shared/Navigation';
import ChatBot from '@/components/shared/ChatBot';
import Calendar from '@/components/dashboard/Calendar';
import Checklist from '@/components/dashboard/Checklist';
import EmergencyContacts from '@/components/dashboard/EmergencyContacts';
import UsefulTools from '@/components/dashboard/UsefulTools';
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
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
              {t.dashboard?.title || locale === 'ko' ? '나의 대시보드' : 'My Dashboard'}
            </h1>
            <p className="text-lg md:text-xl text-gray-700">
              {t.dashboard?.description || locale === 'ko' ? '유학생활에 필요한 모든 것' : 'Everything you need for student life'}
            </p>
          </div>
        </section>

        {/* Checklist Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Checklist t={t} locale={locale} />
          </div>
        </section>

        {/* Emergency Contacts Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <EmergencyContacts locale={locale} />
          </div>
        </section>

        {/* Useful Tools Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-indigo-900 mb-8">
              {locale === 'ko' ? '유용한 도구' : 'Useful Tools'}
            </h2>
            <UsefulTools locale={locale} />
          </div>
        </section>

        {/* Calendar Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-indigo-900 mb-8">
              {locale === 'ko' ? '학사 캘린더' : 'Academic Calendar'}
            </h2>
            <Calendar t={t} locale={locale} />
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-12 px-4 bg-gradient-to-r from-indigo-900 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              {locale === 'ko' ? '추가 리소스' : 'Additional Resources'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a
                href="https://www.study.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors"
              >
                <div className="text-3xl mb-3">📚</div>
                <div className="font-semibold">{locale === 'ko' ? '학생 핸드북' : 'Student Handbook'}</div>
                <div className="text-sm text-gray-300 mt-2">
                  {locale === 'ko' ? '캠퍼스 생활 가이드' : 'Campus Life Guide'}
                </div>
              </a>
              <a
                href="https://www.gukje.ac.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors"
              >
                <div className="text-3xl mb-3">🗺️</div>
                <div className="font-semibold">{locale === 'ko' ? '캠퍼스 맵' : 'Campus Map'}</div>
                <div className="text-sm text-gray-300 mt-2">
                  {locale === 'ko' ? '건물 및 시설 위치' : 'Buildings & Facilities'}
                </div>
              </a>
              <a
                href="/dashboard#emergency"
                className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors"
              >
                <div className="text-3xl mb-3">📞</div>
                <div className="font-semibold">{locale === 'ko' ? '긴급 연락처' : 'Emergency Contacts'}</div>
                <div className="text-sm text-gray-300 mt-2">
                  {locale === 'ko' ? '중요 연락처 목록' : 'Important Numbers'}
                </div>
              </a>
              <a
                href="https://www.hikorea.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 rounded-xl p-6 transition-colors"
              >
                <div className="text-3xl mb-3">❓</div>
                <div className="font-semibold">FAQ</div>
                <div className="text-sm text-gray-300 mt-2">
                  {locale === 'ko' ? '자주 묻는 질문' : 'Frequently Asked Questions'}
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      <ChatBot t={t} locale={locale} />
    </>
  );
}
