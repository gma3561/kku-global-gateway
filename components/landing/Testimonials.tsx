'use client';

import { Translation } from '@/lib/i18n/translations/ko';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

interface TestimonialsProps {
  t: Translation;
}

const testimonials = [
  {
    id: 1,
    name: 'Nguyen Thi Mai',
    country: 'Vietnam',
    flag: '🇻🇳',
    program: 'Business Administration',
    year: '2023',
    rating: 5,
    image: '👩',
    quote: 'Studying at KKU has been a life-changing experience. The professors are supportive, the campus is beautiful, and I\'ve made friends from all over the world.',
  },
  {
    id: 2,
    name: 'Ahmad Fauzi',
    country: 'Indonesia',
    flag: '🇮🇩',
    program: 'Computer Science',
    year: '2022',
    rating: 5,
    image: '👨',
    quote: 'The scholarship opportunities here are incredible. I received a 50% tuition scholarship, which made my dream of studying in Korea possible.',
  },
  {
    id: 3,
    name: 'Aizada Sultanova',
    country: 'Kazakhstan',
    flag: '🇰🇿',
    program: 'International Relations',
    year: '2023',
    rating: 5,
    image: '👩',
    quote: 'KKU provided me with excellent career support. I secured an internship at a Korean company and now have a job offer after graduation.',
  },
];

export default function Testimonials({ t }: TestimonialsProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {t.testimonials.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t.testimonials.subtitle}
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-blue-200">
                <Quote className="w-12 h-12" />
              </div>

              {/* Profile */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
                  {testimonial.image}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-sm flex items-center space-x-1">
                    <span>{testimonial.flag}</span>
                    <span>{testimonial.country}</span>
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-4">
                "{testimonial.quote}"
              </p>

              {/* Program Info */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  {testimonial.program}
                </p>
                <p className="text-xs text-gray-500">
                  Class of {testimonial.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg transition-all">
            {t.testimonials.readMore}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
