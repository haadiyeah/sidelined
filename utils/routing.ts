/**
 * URL building and environment detection utilities for Sidelined sidebars
 * Implements the routing solution from todo_routing_solution_20250812.md
 */

import { NavigationConfig } from '../types/navigation';

/**
 * Detects the available navigation strategy based on environment
 * Automatic environment detection with fallbacks
 */
export function detectNavigationStrategy(): NavigationConfig['strategy'] {
  if (typeof window === 'undefined') {
    return 'href'; // SSR fallback
  }

  // Check for Next.js
  if ((window as any).next?.router || (window as any).__NEXT_DATA__) {
    return 'next';
  }

  // Check for React Router
  if ((window as any).__REACT_ROUTER__) {
    return 'react-router';
  }

  // Safe fallback
  return 'href';
}

/**
 * Builds complete URL path with base URL handling
 */
export function buildUrlPath(path: string, baseUrl?: string): string {
  if (!baseUrl) return path;
  
  // Handle absolute URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Handle paths that already include baseUrl
  if (path.startsWith(baseUrl)) {
    return path;
  }
  
  // Normalize baseUrl and path
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${normalizedBaseUrl}${normalizedPath}`;
}

/**
 * Extracts environment-specific base URL
 */
export function getEnvironmentBaseUrl(): string {
  if (typeof window === 'undefined') return '';
  
  // Check for common environment variables patterns
  if (typeof process !== 'undefined' && process.env) {
    // Next.js environment variables
    if (process.env.NEXT_PUBLIC_BASE_PATH) {
      return process.env.NEXT_PUBLIC_BASE_PATH;
    }
    
    // Generic base URL
    if (process.env.PUBLIC_URL) {
      return process.env.PUBLIC_URL;
    }
    
    // Development vs Production detection
    if (process.env.NODE_ENV === 'production') {
      return process.env.REACT_APP_BASE_URL || '';
    }
  }
  
  return '';
}

/**
 * Auto-detects configuration based on environment
 */
export function autoDetectNavigationConfig(): Partial<NavigationConfig> {
  const strategy = detectNavigationStrategy();
  const baseUrl = getEnvironmentBaseUrl();
  
  return {
    strategy,
    baseUrl: baseUrl || undefined,
  };
}

/**
 * Checks if a URL is external
 */
export function isExternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url, window.location.origin);
    return urlObj.origin !== window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Validates navigation path format
 */
export function validateNavigationPath(path: string): boolean {
  if (!path || typeof path !== 'string') return false;
  
  // Allow relative paths, absolute paths, and URLs
  return path.startsWith('/') || path.startsWith('http://') || path.startsWith('https://') || !path.includes('/');
}

/**
 * Normalizes path for comparison (removes trailing slash, baseUrl, etc.)
 */
export function normalizePath(path: string, baseUrl?: string): string {
  let normalized = path;
  
  // Remove baseUrl if present
  if (baseUrl && normalized.startsWith(baseUrl)) {
    normalized = normalized.substring(baseUrl.length);
  }
  
  // Ensure leading slash
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }
  
  // Remove trailing slash (except for root)
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  
  return normalized;
}

/**
 * Checks if current path matches navigation item path
 */
export function isPathActive(currentPath: string, itemPath: string, baseUrl?: string): boolean {
  const normalizedCurrent = normalizePath(currentPath, baseUrl);
  const normalizedItem = normalizePath(itemPath, baseUrl);
  
  // Exact match
  if (normalizedCurrent === normalizedItem) return true;
  
  // Prefix match (for nested routes)
  if (normalizedItem !== '/' && normalizedCurrent.startsWith(normalizedItem + '/')) {
    return true;
  }
  
  return false;
}

/**
 * Development environment detection
 */
export function isDevelopmentEnvironment(): boolean {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NODE_ENV === 'development';
  }
  
  // Fallback check for development indicators
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' ||
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname.includes('dev');
  }
  
  return false;
}

/**
 * Production environment detection
 */
export function isProductionEnvironment(): boolean {
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NODE_ENV === 'production';
  }
  
  return !isDevelopmentEnvironment();
}

/**
 * Routing library detection utilities
 */
export const routingLibraryDetection = {
  /**
   * Check if React Router is available
   */
  hasReactRouter(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Check for React Router indicators
    return !!(
      (window as any).__REACT_ROUTER__ ||
      document.querySelector('[data-reactroot]') ||
      // Check for history API usage patterns typical of React Router
      (window.history && window.history.pushState && (window as any).history.listen)
    );
  },

  /**
   * Check if Next.js router is available
   */
  hasNextRouter(): boolean {
    if (typeof window === 'undefined') return false;
    
    return !!(
      (window as any).next?.router ||
      (window as any).__NEXT_DATA__ ||
      document.querySelector('#__next')
    );
  },

  /**
   * Get router version information if available
   */
  getRouterInfo(): { type: string; version?: string } {
    if (this.hasNextRouter()) {
      return { 
        type: 'next',
        version: (window as any).__NEXT_DATA__?.buildId ? 'app-router' : 'pages-router'
      };
    }
    
    if (this.hasReactRouter()) {
      return { type: 'react-router' };
    }
    
    return { type: 'none' };
  }
};