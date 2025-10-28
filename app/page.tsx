import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';
import Features from '@/components/landing/Features';
import Testimonials from '@/components/landing/Testimonials';
import ChatBot from '@/components/shared/ChatBot';
import Navigation from '@/components/shared/Navigation';
import Footer from '@/components/shared/Footer';
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
    keywords: 'KKU, Kyung Kook University, International Students, Study in Korea, Scholarships, Southeast Asia, Central Asia, 경국대학교',
    openGraph: {
      title: `${t.hero.title} | KKU Global Gateway`,
      description: t.hero.description,
      url: 'https://kku-global.vercel.app',
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
      title: `${t.hero.title} | KKU Global Gateway`,
      description: t.hero.description,
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
      <Navigation t={t} locale={locale} />
      <main className="min-h-screen">
        <Hero t={t} />
        <Stats t={t} />
        <Features t={t} />
        <Testimonials t={t} />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">{t.cta.ready}</h2>
            <p className="text-xl mb-8">{t.cta.description}</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                {t.cta.startApplication}
              </button>
              <button className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-900 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                {t.cta.scheduleConsultation}
              </button>
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
