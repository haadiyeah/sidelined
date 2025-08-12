/**
 * Navigation TypeScript interfaces for Sidelined sidebars
 * Implements the routing solution from todo_routing_solution_20250812.md
 */

import { ReactNode } from 'react';

/**
 * Navigation strategies supported by the routing system
 */
export type NavigationStrategy = 'react-router' | 'next' | 'custom' | 'href';

/**
 * Base navigation item interface as specified in the routing solution
 */
export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

/**
 * Extended navigation item with additional sidebar-specific properties
 */
export interface SidebarNavigationItem extends NavigationItem {
  /** Optional tooltip text for the navigation item */
  tooltip?: string;
  /** User roles required to see this navigation item */
  requiresRole?: string[];
  /** Section where this item should be placed */
  section?: 'main' | 'header' | 'footer';
  /** Custom CSS classes for this specific item */
  className?: string;
  /** Target for links (_blank, _self, etc.) */
  target?: string;
  /** Indicates if this item should be highlighted as active */
  forceActive?: boolean;
  /** Custom data attributes */
  data?: Record<string, string>;
}

/**
 * Navigation configuration interface as specified in the routing solution
 */
export interface NavigationConfig {
  /** Navigation strategy to use */
  strategy: NavigationStrategy;
  /** Optional base URL for all navigation paths */
  baseUrl?: string;
  /** List of navigation items */
  items: NavigationItem[];
  /** Custom navigation handler for 'custom' strategy */
  onNavigate?: (item: NavigationItem) => void;
}

/**
 * Extended navigation configuration with sidebar-specific features
 */
export interface SidebarNavigationConfig extends Omit<NavigationConfig, 'items'> {
  /** List of sidebar navigation items */
  items: SidebarNavigationItem[];
  /** Callback fired before navigation */
  onBeforeNavigate?: (item: SidebarNavigationItem) => boolean | Promise<boolean>;
  /** Callback fired after successful navigation */
  onAfterNavigate?: (item: SidebarNavigationItem) => void;
  /** Custom active path detection function */
  isActive?: (item: SidebarNavigationItem, currentPath: string) => boolean;
  /** Auto-detect strategy if not specified */
  autoDetect?: boolean;
}

/**
 * Navigation hook return interface
 */
export interface NavigationHookReturn {
  /** Function to navigate to an item */
  navigate: (item: NavigationItem | SidebarNavigationItem) => void | Promise<void>;
  /** Function to check if an item is currently active */
  isActive: (item: NavigationItem | SidebarNavigationItem) => boolean;
  /** Current navigation strategy being used */
  strategy: NavigationStrategy;
  /** Current base URL */
  baseUrl?: string;
  /** Function to check if navigation is possible */
  canNavigate: (item: NavigationItem | SidebarNavigationItem) => boolean;
}

/**
 * Router detection result interface
 */
export interface RouterDetectionResult {
  /** Detected router type */
  type: 'react-router' | 'next' | 'none';
  /** Router version information if available */
  version?: string;
  /** Whether router is ready for navigation */
  ready: boolean;
  /** Any additional router-specific data */
  metadata?: Record<string, any>;
}

/**
 * Navigation error types
 */
export type NavigationError = 
  | 'INVALID_STRATEGY'
  | 'ROUTER_NOT_FOUND'
  | 'NAVIGATION_BLOCKED'
  | 'INVALID_PATH'
  | 'PERMISSION_DENIED';

/**
 * Navigation error interface
 */
export interface NavigationErrorInfo {
  type: NavigationError;
  message: string;
  item?: NavigationItem | SidebarNavigationItem;
  originalError?: Error;
}

/**
 * Environment detection result
 */
export interface EnvironmentInfo {
  /** Whether running in development */
  isDevelopment: boolean;
  /** Whether running in production */
  isProduction: boolean;
  /** Detected base URL from environment */
  baseUrl?: string;
  /** Available router types */
  availableRouters: RouterDetectionResult[];
  /** Recommended navigation strategy */
  recommendedStrategy: NavigationStrategy;
}

/**
 * Navigation middleware function type
 */
export type NavigationMiddleware = (
  item: NavigationItem | SidebarNavigationItem,
  context: NavigationContext
) => boolean | Promise<boolean>;

/**
 * Navigation context passed to middleware and callbacks
 */
export interface NavigationContext {
  /** Current path */
  currentPath: string;
  /** Navigation configuration */
  config: NavigationConfig | SidebarNavigationConfig;
  /** User roles (if available) */
  userRoles?: string[];
  /** Additional context data */
  data?: Record<string, any>;
}

/**
 * Advanced navigation options
 */
export interface NavigationOptions {
  /** Replace current history entry instead of pushing new one */
  replace?: boolean;
  /** State to pass with navigation */
  state?: any;
  /** Whether to preserve scroll position */
  preserveScroll?: boolean;
  /** Custom query parameters */
  query?: Record<string, string>;
  /** Custom hash fragment */
  hash?: string;
}

/**
 * Path matching options
 */
export interface PathMatchOptions {
  /** Exact match only */
  exact?: boolean;
  /** Case sensitive matching */
  caseSensitive?: boolean;
  /** Include query parameters in matching */
  includeQuery?: boolean;
  /** Include hash in matching */
  includeHash?: boolean;
}

/**
 * Navigation analytics event
 */
export interface NavigationAnalyticsEvent {
  /** Event type */
  type: 'navigation' | 'hover' | 'click';
  /** Navigation item */
  item: NavigationItem | SidebarNavigationItem;
  /** Timestamp */
  timestamp: number;
  /** Additional event data */
  data?: Record<string, any>;
}

/**
 * Type guards for navigation items
 */
export function isNavigationItem(item: any): item is NavigationItem {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.path === 'string'
  );
}

export function isSidebarNavigationItem(item: any): item is SidebarNavigationItem {
  return isNavigationItem(item);
}

/**
 * Type guard for navigation configuration
 */
export function isNavigationConfig(config: any): config is NavigationConfig {
  return (
    typeof config === 'object' &&
    config !== null &&
    typeof config.strategy === 'string' &&
    Array.isArray(config.items) &&
    config.items.every(isNavigationItem)
  );
}

/**
 * Utility type for extracting navigation item from config
 */
export type ConfigNavigationItem<T extends NavigationConfig> = T['items'][number];

/**
 * Utility type for creating partial navigation config
 */
export type PartialNavigationConfig = Partial<NavigationConfig> & {
  items?: Partial<NavigationItem>[];
};