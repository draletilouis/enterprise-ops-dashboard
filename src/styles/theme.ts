export const theme = {
  colors: {
    primary: '#0078D4',
    primaryHover: '#106EBE',
    primaryPressed: '#005A9E',
    primaryLight: '#C7E0F4',
    primaryDark: '#004578',

    accent: {
      blue: '#0078D4',
      purple: '#8764B8',
      pink: '#E3008C',
      red: '#E81123',
      orange: '#FF8C00',
      yellow: '#FFB900',
      green: '#107C10',
      teal: '#00B7C3',
      indigo: '#5558AF',
    },

    gray: {
      10: '#FAFAFA',
      20: '#F3F3F3',
      30: '#EDEDED',
      40: '#E1E1E1',
      50: '#C8C8C8',
      60: '#979797',
      70: '#797979',
      80: '#5E5E5E',
      90: '#3B3B3B',
      100: '#2B2B2B',
      110: '#252525',
      120: '#1F1F1F',
      130: '#1A1A1A',
      140: '#0F0F0F',
      150: '#0A0A0A',
      160: '#050505',
      170: '#000000',
    },

    success: '#107C10',
    successLight: '#DFF6DD',
    error: '#E81123',
    errorLight: '#FDE7E9',
    warning: '#FF8C00',
    warningLight: '#FFF4CE',
    info: '#0078D4',
    infoLight: '#C7E0F4',

    background: {
      primary: '#FFFFFF',
      secondary: '#F3F3F3',
      tertiary: '#FAFAFA',
      elevated: '#FFFFFF',
      sidebar: '#F3F3F3',
      overlay: 'rgba(0, 0, 0, 0.5)',
      acrylic: 'rgba(252, 252, 252, 0.8)',
      acrylicDark: 'rgba(44, 44, 44, 0.8)',
    },

    text: {
      primary: '#000000',
      secondary: '#605E5C',
      tertiary: '#8A8886',
      quaternary: '#C8C6C4',
      inverse: '#FFFFFF',
      link: '#0078D4',
      disabled: '#A19F9D',
    },

    border: {
      light: '#EDEDED',
      medium: '#E1E1E1',
      dark: '#8A8886',
      focus: '#0078D4',
      accent: '#0078D4',
    },

    reveal: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.15)',
      border: 'rgba(255, 255, 255, 0.05)',
    },
  },

  typography: {
    fontFamily: {
      system: '"Segoe UI", "Segoe UI Web", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", sans-serif',
      mono: '"Cascadia Code", "Consolas", "Courier New", monospace',
    },

    fontSize: {
      xs: '0.625rem',
      sm: '0.75rem',
      base: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2rem',
      '5xl': '2.5rem',
      '6xl': '3rem',
    },

    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.2,
      snug: 1.3333,
      normal: 1.4286,
      relaxed: 1.5,
      loose: 1.7143,
    },

    letterSpacing: {
      tighter: '-0.01em',
      tight: '-0.005em',
      normal: '0',
      wide: '0.005em',
      wider: '0.01em',
    },
  },

  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },

  borderRadius: {
    none: '0',
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '20px',
    full: '9999px',
  },

  shadows: {
    none: 'none',
    xs: '0 1px 3px rgba(0, 0, 0, 0.06)',
    sm: '0 2px 4px rgba(0, 0, 0, 0.08)',
    md: '0 4px 8px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.12)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.14)',
    '2xl': '0 24px 48px rgba(0, 0, 0, 0.16)',

    card: '0 2px 4px rgba(0, 0, 0, 0.08)',
    cardHover: '0 4px 8px rgba(0, 0, 0, 0.12)',
    modal: '0 32px 64px rgba(0, 0, 0, 0.18)',

    depth4: '0 1.6px 3.6px rgba(0, 0, 0, 0.132), 0 0.3px 0.9px rgba(0, 0, 0, 0.108)',
    depth8: '0 3.2px 7.2px rgba(0, 0, 0, 0.132), 0 0.6px 1.8px rgba(0, 0, 0, 0.108)',
    depth16: '0 6.4px 14.4px rgba(0, 0, 0, 0.132), 0 1.2px 3.6px rgba(0, 0, 0, 0.108)',
    depth64: '0 25.6px 57.6px rgba(0, 0, 0, 0.22), 0 4.8px 14.4px rgba(0, 0, 0, 0.18)',

    primary: '0 4px 8px rgba(0, 120, 212, 0.2)',
    success: '0 4px 8px rgba(16, 124, 16, 0.2)',
    error: '0 4px 8px rgba(232, 17, 35, 0.2)',
  },

  transitions: {
    duration: {
      instant: '83ms',
      fast: '167ms',
      base: '250ms',
      slow: '367ms',
      slower: '500ms',
    },

    timing: {
      ease: 'cubic-bezier(0.8, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.9, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.1, 1)',
      easeInOut: 'cubic-bezier(0.8, 0, 0.2, 1)',
      linear: 'linear',
      fluentEase: 'cubic-bezier(0.33, 0, 0.67, 1)',
    },
  },

  blur: {
    none: '0',
    sm: '20px',
    md: '30px',
    lg: '40px',
    xl: '50px',
    '2xl': '60px',
  },

  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    toast: 1400,
    tooltip: 1500,
  },

  layout: {
    sidebar: {
      width: '320px',
      widthCompact: '48px',
    },
    topbar: {
      height: '48px',
    },
    commandBar: {
      height: '44px',
    },
    maxWidth: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      full: '100%',
    },
  },

  acrylic: {
    tintOpacity: 0.8,
    luminosityOpacity: 0.85,
    fallbackColor: '#F3F3F3',
    noiseOpacity: 0.02,
  },
};

export type Theme = typeof theme;
