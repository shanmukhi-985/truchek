/**
 * TruChek — Framer Motion Animation Presets
 * Reusable, premium animation variants for consistent UX
 */

import type { Variants, Transition } from "framer-motion";

// ============================================================
// BASE TRANSITIONS
// ============================================================

export const transitions = {
  /** Default smooth easing */
  default: {
    type:     "tween",
    ease:     [0.4, 0, 0.2, 1],
    duration: 0.2,
  } satisfies Transition,

  /** Snappy fast transition */
  fast: {
    type:     "tween",
    ease:     [0.4, 0, 0.2, 1],
    duration: 0.1,
  } satisfies Transition,

  /** Slow elegant transition */
  slow: {
    type:     "tween",
    ease:     [0.4, 0, 0.2, 1],
    duration: 0.35,
  } satisfies Transition,

  /** Smooth spring */
  spring: {
    type:    "spring",
    stiffness: 400,
    damping:   30,
    mass:      0.8,
  } satisfies Transition,

  /** Gentle spring */
  springGentle: {
    type:    "spring",
    stiffness: 200,
    damping:   25,
    mass:      1,
  } satisfies Transition,

  /** Bouncy spring */
  springBouncy: {
    type:    "spring",
    stiffness: 500,
    damping:   20,
    mass:      0.6,
  } satisfies Transition,
} as const;

// ============================================================
// FADE VARIANTS
// ============================================================

export const fadeVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: transitions.default },
  exit:    { opacity: 0, transition: transitions.fast },
};

export const fadeInUpVariants: Variants = {
  hidden: {
    opacity:   0,
    y:         16,
  },
  visible: {
    opacity:   1,
    y:         0,
    transition: { ...transitions.default, duration: 0.3 },
  },
  exit: {
    opacity:   0,
    y:         -8,
    transition: transitions.fast,
  },
};

export const fadeInDownVariants: Variants = {
  hidden: {
    opacity:   0,
    y:         -16,
  },
  visible: {
    opacity:   1,
    y:         0,
    transition: transitions.default,
  },
  exit: {
    opacity:   0,
    y:         16,
    transition: transitions.fast,
  },
};

// ============================================================
// SLIDE VARIANTS
// ============================================================

export const slideInLeftVariants: Variants = {
  hidden:  { x: -24, opacity: 0 },
  visible: { x: 0,   opacity: 1, transition: transitions.springGentle },
  exit:    { x: -16, opacity: 0, transition: transitions.fast },
};

export const slideInRightVariants: Variants = {
  hidden:  { x: 24,  opacity: 0 },
  visible: { x: 0,   opacity: 1, transition: transitions.springGentle },
  exit:    { x: 16,  opacity: 0, transition: transitions.fast },
};

// ============================================================
// SCALE VARIANTS
// ============================================================

export const scaleVariants: Variants = {
  hidden:  { scale: 0.95, opacity: 0 },
  visible: { scale: 1,    opacity: 1, transition: transitions.spring },
  exit:    { scale: 0.97, opacity: 0, transition: transitions.fast },
};

export const scaleInVariants: Variants = {
  hidden:  { scale: 0.8,  opacity: 0 },
  visible: { scale: 1,    opacity: 1, transition: transitions.springBouncy },
  exit:    { scale: 0.9,  opacity: 0, transition: transitions.fast },
};

// ============================================================
// PAGE TRANSITION
// ============================================================

export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y:       8,
  },
  animate: {
    opacity:    1,
    y:          0,
    transition: {
      duration: 0.25,
      ease:     [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity:    0,
    y:          -8,
    transition: {
      duration: 0.15,
      ease:     [0.4, 0, 1, 1],
    },
  },
};

// ============================================================
// CARD HOVER
// ============================================================

export const cardHoverVariants: Variants = {
  idle:  { scale: 1,    y: 0,  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.12)" },
  hover: {
    scale:     1.01,
    y:         -2,
    boxShadow: "0 10px 25px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.2)",
    transition: transitions.spring,
  },
};

// ============================================================
// BUTTON INTERACTIONS
// ============================================================

export const buttonTapVariants = {
  initial: { scale: 1 },
  tap:     { scale: 0.97 },
};

// ============================================================
// MODAL / DIALOG
// ============================================================

export const overlayVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

export const modalVariants: Variants = {
  hidden: {
    opacity:   0,
    scale:     0.96,
    y:         8,
  },
  visible: {
    opacity:   1,
    scale:     1,
    y:         0,
    transition: {
      type:      "spring",
      stiffness: 350,
      damping:   30,
    },
  },
  exit: {
    opacity:   0,
    scale:     0.97,
    y:         4,
    transition: { duration: 0.15 },
  },
};

// ============================================================
// DRAWER
// ============================================================

export const drawerLeftVariants: Variants = {
  hidden:  { x: "-100%" },
  visible: { x: "0%",   transition: transitions.springGentle },
  exit:    { x: "-100%", transition: { duration: 0.2 } },
};

export const drawerRightVariants: Variants = {
  hidden:  { x: "100%" },
  visible: { x: "0%",   transition: transitions.springGentle },
  exit:    { x: "100%", transition: { duration: 0.2 } },
};

// ============================================================
// TOAST
// ============================================================

export const toastVariants: Variants = {
  hidden: {
    opacity:   0,
    y:         -20,
    scale:     0.95,
  },
  visible: {
    opacity:   1,
    y:         0,
    scale:     1,
    transition: {
      type:      "spring",
      stiffness: 500,
      damping:   35,
    },
  },
  exit: {
    opacity:   0,
    scale:     0.95,
    transition: { duration: 0.15 },
  },
};

// ============================================================
// STAGGER CHILDREN
// ============================================================

export const staggerContainerVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren:   0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity:   1,
    y:         0,
    transition: { ...transitions.default, duration: 0.25 },
  },
};

// ============================================================
// LIST ITEMS
// ============================================================

export const listItemVariants: Variants = {
  hidden:  { opacity: 0, x: -8 },
  visible: {
    opacity:   1,
    x:         0,
    transition: transitions.default,
  },
  exit: {
    opacity:   0,
    x:         8,
    height:    0,
    marginBottom: 0,
    transition: { duration: 0.2 },
  },
};

// ============================================================
// SKELETON
// ============================================================

export const skeletonVariants: Variants = {
  loading: {
    opacity:    [0.5, 1, 0.5],
    transition: {
      duration:   1.5,
      repeat:     Infinity,
      ease:       "easeInOut",
    },
  },
};

// ============================================================
// NUMBER COUNTER (for trust scores, metrics)
// ============================================================

export const numberRevealVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.5 },
  visible: {
    opacity:   1,
    scale:     1,
    transition: {
      type:      "spring",
      stiffness: 300,
      damping:   20,
      delay:     0.1,
    },
  },
};

// ============================================================
// PULSE (for status indicators)
// ============================================================

export const pulseVariants: Variants = {
  pulse: {
    scale:   [1, 1.15, 1],
    opacity: [1, 0.7, 1],
    transition: {
      duration:   1.5,
      repeat:     Infinity,
      ease:       "easeInOut",
    },
  },
};
