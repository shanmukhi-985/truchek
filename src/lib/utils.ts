/**
 * TruChek — Core Utility Functions
 * Reusable helpers across the entire application
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ============================================================
// CLASSNAME MERGER
// ============================================================

/** Merge Tailwind classes with proper override resolution */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

// ============================================================
// STRING UTILITIES
// ============================================================

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const titleCase = (str: string): string =>
  str.replace(/\b\w/g, (c) => c.toUpperCase());

export const camelToKebab = (str: string): string =>
  str.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

export const kebabToCamel = (str: string): string =>
  str.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());

export const truncate = (str: string, max: number, ellipsis = "..."): string =>
  str.length > max ? str.slice(0, max - ellipsis.length) + ellipsis : str;

export const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const maskEmail = (email: string): string => {
  const [user, domain] = email.split("@");
  if (!user || !domain) return email;
  return `${user.slice(0, 2)}${"*".repeat(Math.max(user.length - 2, 2))}@${domain}`;
};

export const maskPhone = (phone: string): string =>
  phone.replace(/(\+?\d{1,3})\d+(\d{4})/, "$1****$2");

// ============================================================
// NUMBER UTILITIES
// ============================================================

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t;

export const formatNumber = (n: number): string =>
  new Intl.NumberFormat("en-US").format(n);

export const formatCompact = (n: number): string =>
  new Intl.NumberFormat("en-US", { notation: "compact" }).format(n);

export const formatPercent = (value: number, decimals = 0): string =>
  `${value.toFixed(decimals)}%`;

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = Math.max(0, decimals);
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// ============================================================
// DATE UTILITIES
// ============================================================

export const formatDate = (
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year:  "numeric",
    month: "short",
    day:   "numeric",
  }
): string => new Intl.DateTimeFormat("en-US", options).format(new Date(date));

export const formatDateTime = (date: string | Date): string =>
  new Intl.DateTimeFormat("en-US", {
    year:   "numeric",
    month:  "short",
    day:    "numeric",
    hour:   "2-digit",
    minute: "2-digit",
  }).format(new Date(date));

export const timeAgo = (date: string | Date): string => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  const intervals: [number, string][] = [
    [31_536_000, "year"],
    [2_592_000,  "month"],
    [86_400,     "day"],
    [3_600,      "hour"],
    [60,         "minute"],
    [1,          "second"],
  ];

  for (const [interval, label] of intervals) {
    const count = Math.floor(seconds / interval);
    if (count >= 1) {
      return `${count} ${label}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

export const isExpired = (date: string | Date): boolean =>
  new Date(date).getTime() < Date.now();

// ============================================================
// OBJECT UTILITIES
// ============================================================

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
};

export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) result[key] = obj[key];
  });
  return result;
};

export const deepEqual = (a: unknown, b: unknown): boolean =>
  JSON.stringify(a) === JSON.stringify(b);

// ============================================================
// ARRAY UTILITIES
// ============================================================

export const unique = <T>(arr: T[]): T[] => [...new Set(arr)];

export const groupBy = <T, K extends string | number>(
  arr: T[],
  key: (item: T) => K
): Record<K, T[]> => {
  return arr.reduce<Record<K, T[]>>(
    (acc, item) => {
      const group = key(item);
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    },
    {} as Record<K, T[]>
  );
};

export const chunk = <T>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

// ============================================================
// ASYNC UTILITIES
// ============================================================

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => { inThrottle = false; }, limit);
    }
  };
};

// ============================================================
// URL UTILITIES
// ============================================================

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
};

export const buildQueryString = (params: Record<string, string | number | boolean | undefined>): string => {
  const filtered = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  return filtered.length ? `?${filtered.join("&")}` : "";
};

// ============================================================
// VALIDATION UTILITIES
// ============================================================

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone: string): boolean =>
  /^\+?[1-9]\d{6,14}$/.test(phone.replace(/\s/g, ""));

export const isValidUUID = (uuid: string): boolean =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid);

// ============================================================
// CRYPTO / ID
// ============================================================

export const generateId = (): string => crypto.randomUUID();

export const generateToken = (length = 32): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
};

// ============================================================
// CLIPBOARD
// ============================================================

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  }
};

// ============================================================
// STORAGE UTILITIES
// ============================================================

export const storage = {
  get: <T>(key: string, fallback?: T): T | undefined => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : fallback;
    } catch {
      return fallback;
    }
  },

  set: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.warn(`[Storage] Failed to set key: ${key}`);
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};
