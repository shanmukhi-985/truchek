/**
 * TruChek — Navigation Types
 * Types for routing, navigation items, and breadcrumbs
 */

import type { UserRole } from "./user";

// ============================================================
// ROUTE TYPES
// ============================================================

export type RouteAccessLevel = "public" | "protected" | "admin" | "guest-only";

export interface AppRoute {
  path:        string;
  label:       string;
  access:      RouteAccessLevel;
  roles?:      UserRole[];
  icon?:       string;
  children?:   AppRoute[];
  exact?:      boolean;
  index?:      boolean;
}

// ============================================================
// NAVIGATION ITEMS
// ============================================================

export interface NavItem {
  id:          string;
  label:       string;
  href?:       string;
  icon?:       string;
  badge?:      string | number;
  isActive?:   boolean;
  isDisabled?: boolean;
  isExternal?: boolean;
  children?:   NavItem[];
  roles?:      UserRole[];
  description?: string;
  shortcut?:   string;
}

export interface NavSection {
  title?:   string;
  items:    NavItem[];
}

// ============================================================
// BREADCRUMB
// ============================================================

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

// ============================================================
// SIDEBAR
// ============================================================

export interface SidebarState {
  isOpen:      boolean;
  isCollapsed: boolean;
  activeItem:  string | null;
}

// ============================================================
// TABS
// ============================================================

export interface TabItem {
  id:        string;
  label:     string;
  icon?:     string;
  badge?:    string | number;
  disabled?: boolean;
  content?:  React.ReactNode;
}

import type React from "react";
