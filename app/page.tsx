import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';
import Features from '@/components/landing/Features';
import ChatBot from '@/components/shared/ChatBot';
import Navigation from '@/components/shared/Navigation';
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
    description: t.hero.description,
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
      <Navigation t={t} locale={locale} />
      <main className="min-h-screen">
        <Hero t={t} />
        <Stats t={t} />
        <Features t={t} />

      {/* More sections will be added in next phase */}
      <section className="py-20 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">{t.cta.ready}</h2>
          <p className="text-xl mb-8">{t.cta.description}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-lg transition-colors">
              {t.cta.startApplication}
            </button>
            <button className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-900 rounded-lg font-semibold text-lg transition-colors">
              {t.cta.scheduleConsultation}
            </button>
          </div>
        </div>
      </section>

      {/* AI Chatbot */}
      <ChatBot t={t} locale={locale} />
    </main>
    </>
  );
}
