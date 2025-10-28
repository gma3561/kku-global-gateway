// Design Tokens for KKU Global Gateway
// 2024-2025 Trendy Design System

export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#E6F0FF',
    100: '#CCE0FF',
    200: '#99C2FF',
    300: '#66A3FF',
    400: '#3385FF',
    500: '#0066FF', // Main brand color
    600: '#0052CC',
    700: '#003D99',
    800: '#002966',
    900: '#001433',
  },

  // Gradient Meshes
  gradients: {
    mesh1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    mesh2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    mesh3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    mesh4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    hero: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(252, 70, 107, 0.3), transparent 50%), radial-gradient(circle at 40% 80%, rgba(99, 102, 241, 0.3), transparent 50%)',
  },

  // Glass Effects
  glass: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.2)',
    strong: 'rgba(255, 255, 255, 0.3)',
  },

  // Semantic Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export const shadows = {
  // Modern Shadows
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  glow: '0 0 20px rgba(99, 102, 241, 0.5)',
  card: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  hover: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  float: '0 30px 60px rgba(0, 0, 0, 0.12)',
} as const;

export const animations = {
  // Smooth Transitions
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',

  // Bounce Effects
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Spring Effects
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

export const glassmorphism = {
  // Glass Card Styles
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: shadows.glass,
  },

  // Strong Glass
  strong: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: shadows.glass,
  },
} as const;

export const spacing = {
  // Modern Spacing Scale
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
  '4xl': '6rem', // 96px
} as const;

export const typography = {
  // Modern Typography Scale
  heading: {
    h1: {
      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
      fontWeight: 600,
      lineHeight: 1.3,
    },
  },

  body: {
    large: {
      fontSize: '1.25rem',
      lineHeight: 1.6,
    },
    regular: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    small: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;
