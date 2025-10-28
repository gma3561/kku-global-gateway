import Navigation from '@/components/shared/Navigation';
import ChatBot from '@/components/shared/ChatBot';
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
    title: `${t.arrival?.title || 'Arrival'} | KKU Global Gateway`,
    description: t.arrival?.description || 'Post-arrival guide for KKU international students',
  };
}

export default function ArrivalPage({ searchParams }: PageProps) {
  const langParam = searchParams.lang as string | undefined;
  const locale: Locale = (langParam && locales.includes(langParam as Locale))
    ? langParam as Locale
    : 'ko';

  const t = getTranslation(locale);

  return (
    <>
      <Navigation t={t} locale={locale} />
      <main className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold text-green-900 mb-6">
              {t.arrival?.title || '도착 후 안내'}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {t.arrival?.description || '태국 도착 후 첫 주와 첫 달 체크리스트'}
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* First Week */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">📅</div>
                  <h2 className="text-3xl font-bold text-green-900">
                    {t.arrival?.firstWeek?.title || '첫 주 (1-7일)'}
                  </h2>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: '✈️', text: '공항 픽업 서비스 이용' },
                    { icon: '🏠', text: '기숙사/숙소 체크인' },
                    { icon: '🏫', text: '학교 등록 사무실 방문' },
                    { icon: '🎓', text: '학생증 발급' },
                    { icon: '🏦', text: '은행 계좌 개설' },
                    { icon: '📱', text: '휴대폰/SIM 카드 구매' },
                    { icon: '👥', text: '오리엔테이션 참석' },
                    { icon: '🗺️', text: '캠퍼스 투어' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 hover:bg-green-50 rounded-lg transition-colors">
                      <input type="checkbox" className="w-5 h-5 text-green-600" />
                      <span className="text-2xl">{item.icon}</span>
                      <label className="text-gray-800">{item.text}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* First Month */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">📆</div>
                  <h2 className="text-3xl font-bold text-blue-900">
                    {t.arrival?.firstMonth?.title || '첫 달 (1-30일)'}
                  </h2>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: '🆔', text: '외국인 등록' },
                    { icon: '🏥', text: '건강 검진' },
                    { icon: '📚', text: '도서관 카드 발급' },
                    { icon: '🚇', text: '교통 카드 구매' },
                    { icon: '🗺️', text: '주변 시설 파악' },
                    { icon: '💼', text: '학생 서비스 센터 방문' },
                    { icon: '👨‍👩‍👧‍👦', text: '학생 동아리 가입' },
                    { icon: '🎯', text: '학업 계획 수립' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                      <input type="checkbox" className="w-5 h-5 text-blue-600" />
                      <span className="text-2xl">{item.icon}</span>
                      <label className="text-gray-800">{item.text}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🚨</div>
              <h3 className="text-xl font-bold text-red-600 mb-2">
                긴급 연락처
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 긴급전화: 191 (경찰), 1669 (응급)</li>
                <li>• 대학 보안: 043-009-700</li>
                <li>• 유학생 사무실: 043-009-800</li>
                <li>• 한국 대사관: 02-319-8600</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                의료 서비스
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 캠퍼스 보건소 운영 시간</li>
                <li>• 주변 병원 정보</li>
                <li>• 건강보험 가입 절차</li>
                <li>• 약국 위치 및 운영시간</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-4">🚌</div>
              <h3 className="text-xl font-bold text-green-900 mb-2">
                교통 정보
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 캠퍼스 셔틀버스 시간표</li>
                <li>• 시내버스 노선 안내</li>
                <li>• 교통 카드 사용법</li>
                <li>• 택시 및 그랩 이용</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-green-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              적응에 도움이 필요하신가요?
            </h2>
            <p className="text-xl mb-8">
              유학생 멘토 프로그램에 참여하세요
            </p>
            <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-lg transition-colors">
              멘토 프로그램 신청
            </button>
          </div>
        </section>
      </main>

      <ChatBot t={t} locale={locale} />
    </>
  );
}
