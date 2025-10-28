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
    title: `${t.preparation?.title || 'Preparation'} | KKU Global Gateway`,
    description: t.preparation?.description || 'Pre-arrival preparation guide for KKU international students',
  };
}

export default function PreparationPage({ searchParams }: PageProps) {
  const langParam = searchParams.lang as string | undefined;
  const locale: Locale = (langParam && locales.includes(langParam as Locale))
    ? langParam as Locale
    : 'ko';

  const t = getTranslation(locale);

  return (
    <>
      <Navigation t={t} locale={locale} />
      <main className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold text-blue-900 mb-6">
              {t.preparation?.title || '유학 준비'}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {t.preparation?.description || 'KKU 유학을 위한 단계별 준비 가이드'}
            </p>
          </div>
        </section>

        {/* Checklist Categories */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Visa */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🛂</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                {t.preparation?.visa?.title || '비자 신청'}
              </h3>
              <p className="text-gray-600 mb-4">
                {t.preparation?.visa?.description || '학생 비자 신청 절차 및 필요 서류'}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ 입학 허가서 확인</li>
                <li>✓ 비자 신청서 작성</li>
                <li>✓ 필수 서류 준비</li>
                <li>✓ 대사관 방문 예약</li>
              </ul>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                {t.preparation?.documents?.title || '필수 서류'}
              </h3>
              <p className="text-gray-600 mb-4">
                {t.preparation?.documents?.description || '입학 및 비자를 위한 필수 서류'}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ 여권 사본</li>
                <li>✓ 증명사진</li>
                <li>✓ 학업 관련 서류</li>
                <li>✓ 재정 증명서</li>
              </ul>
            </div>

            {/* Accommodation */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                {t.preparation?.accommodation?.title || '숙소 예약'}
              </h3>
              <p className="text-gray-600 mb-4">
                {t.preparation?.accommodation?.description || '기숙사 및 주거 옵션'}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ 기숙사 신청</li>
                <li>✓ 오프캠퍼스 숙소</li>
                <li>✓ 계약 및 보증금</li>
                <li>✓ 생활용품 준비</li>
              </ul>
            </div>

            {/* Travel */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">
                {t.preparation?.travel?.title || '항공권 및 여행'}
              </h3>
              <p className="text-gray-600 mb-4">
                {t.preparation?.travel?.description || '항공권 예약 및 여행 준비'}
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ 항공권 예약</li>
                <li>✓ 여행자 보험</li>
                <li>✓ 짐 준비</li>
                <li>✓ 공항 픽업 서비스</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Complete Checklist */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              {t.preparation?.checklist?.title || '출국 전 체크리스트'}
            </h2>
            <div className="space-y-4">
              {[
                '비자 신청 완료',
                '입학 허가서 확인',
                '항공권 예약',
                '여행자 보험 가입',
                '숙소 예약 완료',
                '예방접종 완료',
                '필수 서류 준비',
                '은행 계좌 개설 (선택)',
                '짐 준비 완료',
                '긴급 연락처 저장'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-blue-600" />
                  <label className="text-gray-800">{item}</label>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              {t.cta?.needHelp || '도움이 필요하신가요?'}
            </h2>
            <p className="text-xl mb-8">
              AI 챗봇에게 문의하시거나 상담을 예약하세요
            </p>
            <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-lg transition-colors">
              {t.cta?.scheduleConsultation || '상담 예약하기'}
            </button>
          </div>
        </section>
      </main>

      <ChatBot t={t} locale={locale} />
    </>
  );
}
