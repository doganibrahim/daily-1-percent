import { palette, semantic } from './tokens';

export default {
  light: {
    text: semantic.text.primary,
    background: semantic.bg.primary,
    tint: semantic.accent.primary,
    tabIconDefault: palette.charcoal[300],
    tabIconSelected: semantic.accent.primary,
  },
  dark: {
    text: palette.white,
    background: palette.charcoal[900],
    tint: palette.white,
    tabIconDefault: palette.charcoal[400],
    tabIconSelected: palette.white,
  },
};
