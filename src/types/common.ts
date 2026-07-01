/**
 * TruChek — Common & Shared Types
 * Base types reused across the entire application
 */

// ============================================================
// UTILITY TYPES
// ============================================================

/** Make specified keys optional */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Make specified keys required */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** Deep partial — makes all nested fields optional */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

/** Non-nullable version of a type */
export type NonNullable<T> = T extends null | undefined ? never : T;

/** Extract the value type of a Record */
export type ValueOf<T> = T[keyof T];

/** Readonly deep */
export type DeepReadonly<T> = T extends (infer U)[]
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends object
  ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
  : T;

// ============================================================
// ID & ENTITY BASE
// ============================================================

/** Standard UUID string */
export type ID = string;

/** ISO 8601 date string */
export type ISODateString = string;

/** Base entity with audit fields */
export interface BaseEntity {
  id: ID;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/** Soft-deletable entity */
export interface SoftDeletable {
  deletedAt: ISODateString | null;
  isDeleted: boolean;
}

// ============================================================
// PAGINATION
// ============================================================

export interface PaginationParams {
  page: number;
  limit: number;
  cursor?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  nextCursor?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// ============================================================
// SORTING & FILTERING
// ============================================================

export type SortDirection = "asc" | "desc";

export interface SortParams {
  field: string;
  direction: SortDirection;
}

export interface FilterParams {
  search?: string;
  dateFrom?: ISODateString;
  dateTo?: ISODateString;
  [key: string]: string | number | boolean | undefined;
}

// ============================================================
// STATUS
// ============================================================

export type LoadingState = "idle" | "loading" | "success" | "error";

export type AsyncStatus = {
  status: LoadingState;
  error: string | null;
};

// ============================================================
// SIZE / VARIANT TOKENS
// ============================================================

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type Variant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "ghost"
  | "outline"
  | "link";

export type Intent = "default" | "success" | "warning" | "danger" | "info";

// ============================================================
// FORM
// ============================================================

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isDirty: boolean;
  isValid: boolean;
}

export interface SelectOption<T = string> {
  label: string;
  value: T;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

// ============================================================
// FILE
// ============================================================

export interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  url?: string;
}

export type AcceptedFileType =
  | "image/*"
  | "application/pdf"
  | "text/*"
  | ".doc"
  | ".docx"
  | ".xls"
  | ".xlsx";

// ============================================================
// NOTIFICATION
// ============================================================

export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: ID;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// ============================================================
// REACT COMPONENT HELPERS
// ============================================================

import type React from "react";

export interface WithChildren {
  children: React.ReactNode;
}

export interface WithClassName {
  className?: string;
}

export interface WithStyle {
  style?: React.CSSProperties;
}

export type ComponentBaseProps = WithChildren & WithClassName & WithStyle;
