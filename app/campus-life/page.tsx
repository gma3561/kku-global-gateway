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
    title: `${t.campusLife?.title || 'Campus Life'} | KKU Global Gateway`,
    description: t.campusLife?.description || 'Campus life guide for KKU international students',
  };
}

export default function CampusLifePage({ searchParams }: PageProps) {
  const langParam = searchParams.lang as string | undefined;
  const locale: Locale = (langParam && locales.includes(langParam as Locale))
    ? langParam as Locale
    : 'ko';

  const t = getTranslation(locale);

  return (
    <>
      <Navigation t={t} locale={locale} />
      <main className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold text-purple-900 mb-6">
              {t.campusLife?.title || '캠퍼스 라이프'}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {t.campusLife?.description || 'KKU에서의 학업, 활동, 그리고 성장'}
            </p>
          </div>
        </section>

        {/* Main Categories */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Academics */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-purple-900 mb-4">
                {t.campusLife?.academics?.title || '학업 관리'}
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>수업 시간표 및 강의실</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>과제 제출 시스템</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>시험 일정 및 준비</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>성적 확인 및 관리</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span>학습 자료 및 리소스</span>
                </li>
              </ul>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🏛️</div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {t.campusLife?.facilities?.title || '캠퍼스 시설'}
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>도서관 및 학습 공간</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>스포츠 센터 및 체육관</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>학생 식당 및 카페</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>보건소 및 의료 서비스</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>컴퓨터실 및 프린트</span>
                </li>
              </ul>
            </div>

            {/* Activities */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-pink-900 mb-4">
                {t.campusLife?.activities?.title || '학생 활동'}
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span>동아리 및 동호회</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span>문화 행사 및 축제</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span>봉사 활동 프로그램</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span>취업 지원 서비스</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-600 mr-2">•</span>
                  <span>네트워킹 이벤트</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Student Services */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
              학생 지원 서비스
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">💼</div>
                <h3 className="font-bold text-purple-900 mb-2">진로 상담</h3>
                <p className="text-sm text-gray-600">취업 및 진로 설계 지원</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🧠</div>
                <h3 className="font-bold text-blue-900 mb-2">학습 지원</h3>
                <p className="text-sm text-gray-600">튜터링 및 학습 워크샵</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">❤️</div>
                <h3 className="font-bold text-green-900 mb-2">심리 상담</h3>
                <p className="text-sm text-gray-600">멘탈 헬스 케어</p>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🌍</div>
                <h3 className="font-bold text-pink-900 mb-2">유학생 지원</h3>
                <p className="text-sm text-gray-600">비자 및 생활 지원</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Clubs */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
              인기 동아리
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: '국제학생회', icon: '🌏', members: '200+' },
                { name: '봉사 동아리', icon: '🤝', members: '150+' },
                { name: '스포츠 클럽', icon: '⚽', members: '180+' },
                { name: '문화 교류회', icon: '🎭', members: '120+' },
                { name: '음악 동아리', icon: '🎵', members: '90+' },
                { name: '창업 동아리', icon: '💡', members: '110+' }
              ].map((club, index) => (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-3">{club.icon}</div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">{club.name}</h3>
                  <p className="text-gray-600">회원 {club.members}명</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              캠퍼스 생활을 시작할 준비가 되셨나요?
            </h2>
            <p className="text-xl mb-8">
              다양한 활동과 프로그램에 참여하세요
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-lg transition-colors">
                동아리 둘러보기
              </button>
              <button className="px-8 py-4 bg-white hover:bg-gray-100 text-purple-900 rounded-lg font-semibold text-lg transition-colors">
                이벤트 캘린더
              </button>
            </div>
          </div>
        </section>
      </main>

      <ChatBot t={t} locale={locale} />
    </>
  );
}
