/**
 * Single-source design tokens for 1%Habit.
 *
 * Palette derived from the warm biophilic / nature-inspired mockups:
 * terracotta (primary CTA), sage green (growth/success), creamy beige (surface).
 */

// ── Primitive palette ────────────────────────────────────────────────
export const palette = {
  // Terracotta – warm primary / CTA
  terracotta: {
    50: '#FDF5F0',
    100: '#FAEADE',
    200: '#F2CEAF',
    300: '#E8B08A',
    400: '#D9885C',
    500: '#C2714A',
    600: '#A65A38',
    700: '#87462B',
    800: '#6B3622',
    900: '#4E271A',
  },
  // Sage green – growth / success
  sage: {
    50: '#F4F7F4',
    100: '#E5ECE5',
    200: '#C8D8C7',
    300: '#A3BEA2',
    400: '#7EA37D',
    500: '#5E8A5D',
    600: '#4A6F49',
    700: '#3B573A',
    800: '#2F452F',
    900: '#233524',
  },
  // Sand / beige – surfaces & backgrounds
  sand: {
    50: '#FEFCF9',
    100: '#FBF7F1',
    200: '#F5EDE0',
    300: '#EDE0CC',
    400: '#DFD0B5',
    500: '#C9B89A',
    600: '#A89778',
    700: '#867759',
    800: '#665A42',
    900: '#473E2E',
  },
  // Charcoal – text
  charcoal: {
    50: '#F5F5F5',
    100: '#E8E8E8',
    200: '#D1D1D1',
    300: '#ABABAB',
    400: '#7F7F7F',
    500: '#5C5C5C',
    600: '#454545',
    700: '#363636',
    800: '#2A2A2A',
    900: '#1A1A1A',
  },
  // Pure
  white: '#FFFFFF',
  black: '#000000',
} as const;

// ── Semantic tokens (light-mode focused for MVP) ─────────────────────
export const semantic = {
  bg: {
    primary: palette.sand[50],
    surface: palette.sand[100],
    card: palette.white,
    muted: palette.sand[200],
  },
  text: {
    primary: palette.charcoal[900],
    secondary: palette.charcoal[500],
    muted: palette.charcoal[400],
    inverse: palette.white,
  },
  accent: {
    primary: palette.terracotta[500],
    primaryPressed: palette.terracotta[600],
    success: palette.sage[500],
    successLight: palette.sage[100],
    warm: palette.terracotta[100],
  },
  border: {
    soft: palette.sand[200],
    medium: palette.sand[300],
  },
} as const;

// ── Spacing scale (used as reference; Tailwind classes preferred) ────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

// ── Border radius ────────────────────────────────────────────────────
export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
