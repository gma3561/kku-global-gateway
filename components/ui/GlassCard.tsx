'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { glassmorphism, shadows } from '@/lib/styles/design-tokens';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'light' | 'medium' | 'strong';
  hover?: boolean;
  className?: string;
}

export function GlassCard({
  children,
  variant = 'medium',
  hover = true,
  className = '',
  ...props
}: GlassCardProps) {
  const variants = {
    light: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
    },
    medium: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(15px)',
    },
    strong: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(20px)',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? {
        y: -5,
        boxShadow: shadows.hover,
      } : undefined}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{
        ...variants[variant],
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: shadows.glass,
      }}
      className={`rounded-2xl overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function GlassButton({
  children,
  className = '',
  ...props
}: HTMLMotionProps<'button'>) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: shadows.glass,
      }}
      className={`px-6 py-3 rounded-full font-semibold transition-all ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
