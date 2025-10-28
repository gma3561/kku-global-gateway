'use client';

import { Translation } from '@/lib/i18n/translations/ko';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';

interface StatsProps {
  t: Translation;
}

const stats = [
  { icon: Users, value: '2,500+', key: 'internationalStudents' as const },
  { icon: BookOpen, value: '120+', key: 'programs' as const },
  { icon: Award, value: '₩50억', key: 'scholarships' as const },
  { icon: TrendingUp, value: '95%', key: 'employmentRate' as const },
];

export default function Stats({ t }: StatsProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold text-blue-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {t.stats[stat.key]}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
