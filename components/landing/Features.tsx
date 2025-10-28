'use client';

import { Translation } from '@/lib/i18n/translations/ko';
import { motion } from 'framer-motion';
import { GraduationCap, DollarSign, HeadphonesIcon, Briefcase } from 'lucide-react';

interface FeaturesProps {
  t: Translation;
}

const features = [
  { icon: GraduationCap, key: 'worldClass' as const, gradient: 'from-blue-500 to-blue-700' },
  { icon: DollarSign, key: 'scholarships' as const, gradient: 'from-green-500 to-green-700' },
  { icon: HeadphonesIcon, key: 'support' as const, gradient: 'from-purple-500 to-purple-700' },
  { icon: Briefcase, key: 'career' as const, gradient: 'from-orange-500 to-orange-700' },
];

export default function Features({ t }: FeaturesProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.features.sectionTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.features.sectionDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const featureData = t.features[feature.key];
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} text-white mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {featureData.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {featureData.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
