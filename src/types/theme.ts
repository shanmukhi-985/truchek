/**
 * TruChek — Theme Types
 * Type definitions for the design system and theming
 */

// ============================================================
// THEME MODE
// ============================================================

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeConfig {
  mode: ThemeMode;
  resolvedMode: "light" | "dark";
}

// ============================================================
// COLOR TOKENS
// ============================================================

export interface ColorScale {
  50:  string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SemanticColors {
  background:      string;
  surface:         string;
  surfaceRaised:   string;
  surfaceOverlay:  string;
  surfaceSunken:   string;
  border:          string;
  borderStrong:    string;
  borderFocus:     string;
  text:            string;
  textSecondary:   string;
  textMuted:       string;
  textDisabled:    string;
  textOnPrimary:   string;
  hover:           string;
  active:          string;
  focusRing:       string;
  disabled:        string;
  accent:          string;
  accentHover:     string;
  accentSubtle:    string;
}

export interface DesignTokens {
  colors: {
    primary:   ColorScale;
    secondary: ColorScale;
    success:   ColorScale;
    warning:   ColorScale;
    danger:    ColorScale;
    info:      ColorScale;
    neutral:   ColorScale;
    semantic:  SemanticColors;
  };
  typography: TypographyTokens;
  spacing: SpacingTokens;
  radius: RadiusTokens;
  shadow: ShadowTokens;
  animation: AnimationTokens;
}

// ============================================================
// TYPOGRAPHY TOKENS
// ============================================================

export interface FontFamily {
  sans:    string;
  display: string;
  mono:    string;
}

export interface FontSize {
  "2xs": string;
  xs:    string;
  sm:    string;
  base:  string;
  lg:    string;
  xl:    string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
}

export interface TypographyTokens {
  fontFamily: FontFamily;
  fontSize:   FontSize;
  fontWeight: {
    thin:       number;
    extralight: number;
    light:      number;
    normal:     number;
    medium:     number;
    semibold:   number;
    bold:       number;
    extrabold:  number;
    black:      number;
  };
  lineHeight: {
    none:    number;
    tight:   number;
    snug:    number;
    normal:  number;
    relaxed: number;
    loose:   number;
  };
  letterSpacing: {
    tighter: string;
    tight:   string;
    normal:  string;
    wide:    string;
    wider:   string;
    widest:  string;
  };
}

// ============================================================
// SPACING TOKENS
// ============================================================

export type SpacingKey =
  | "px" | 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5
  | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 40
  | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96;

export type SpacingTokens = Record<string, string>;

// ============================================================
// RADIUS TOKENS
// ============================================================

export interface RadiusTokens {
  none: string;
  sm:   string;
  md:   string;
  lg:   string;
  xl:   string;
  "2xl": string;
  "3xl": string;
  full: string;
}

// ============================================================
// SHADOW TOKENS
// ============================================================

export interface ShadowTokens {
  xs:           string;
  sm:           string;
  md:           string;
  lg:           string;
  xl:           string;
  "2xl":        string;
  inner:        string;
  glowPrimary:  string;
  glowSuccess:  string;
  glowDanger:   string;
}

// ============================================================
// ANIMATION TOKENS
// ============================================================

export interface AnimationTokens {
  duration: {
    instant: string;
    fast:    string;
    normal:  string;
    slow:    string;
    slower:  string;
  };
  easing: {
    default: string;
    in:      string;
    out:     string;
    spring:  string;
  };
}
