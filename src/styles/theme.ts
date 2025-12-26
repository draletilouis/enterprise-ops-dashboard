export const theme = {
  colors: {
    // Primary
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    
    // Neutrals
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
    
    // Semantic
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    
    // Backgrounds
    bgPrimary: '#ffffff',
    bgSecondary: '#f9fafb',
    bgSidebar: '#1f2937',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
};

export type Theme = typeof theme;