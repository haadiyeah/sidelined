/**
 * Core navigation hook implementing the routing solution from todo_routing_solution_20250812.md
 * Abstracts routing logic based on strategy with comprehensive error handling and fallbacks
 */

import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';
import { 
  NavigationConfig, 
  SidebarNavigationConfig,
  NavigationItem, 
  SidebarNavigationItem,
  NavigationHookReturn,
  NavigationStrategy,
  NavigationOptions,
  PathMatchOptions,
  NavigationErrorInfo,
  NavigationContext
} from '../types/navigation';
import { 
  detectNavigationStrategy,
  buildUrlPath,
  isPathActive,
  autoDetectNavigationConfig,
  routingLibraryDetection
} from '../utils/routing';

/**
 * Main navigation hook - abstracts routing logic based on strategy
 * Implements all requirements from the routing solution document
 */
export function useNavigation(
  config: NavigationConfig | SidebarNavigationConfig,
  options: {
    autoDetect?: boolean;
    fallbackStrategy?: NavigationStrategy;
    onError?: (error: NavigationErrorInfo) => void;
  } = {}
): NavigationHookReturn {
  const { autoDetect = true, fallbackStrategy = 'href', onError } = options;
  
  // Auto-detect strategy if enabled and not explicitly set
  const actualStrategy = autoDetect && !config.strategy 
    ? detectNavigationStrategy() 
    : config.strategy || fallbackStrategy;
    
  const actualConfig = {
    ...config,
    strategy: actualStrategy,
    baseUrl: config.baseUrl || autoDetectNavigationConfig().baseUrl,
  };

  // React Router navigation (with error handling)
  const reactNavigate = (() => {
    try {
      return actualStrategy === 'react-router' ? useNavigate() : null;
    } catch {
      return null;
    }
  })();
  
  const reactLocation = (() => {
    try {
      return actualStrategy === 'react-router' ? useLocation() : null;
    } catch {
      return null;
    }
  })();

  // Next.js navigation (with error handling)
  const nextRouter = (() => {
    try {
      return actualStrategy === 'next' ? useRouter() : null;
    } catch {
      return null;
    }
  })();

  // Navigation state
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  // Update current path when location changes
  useEffect(() => {
    const updatePath = () => {
      const newPath = reactLocation?.pathname || nextRouter?.asPath || window.location.pathname;
      if (newPath !== currentPath) {
        setCurrentPath(newPath);
      }
    };

    // Listen for navigation changes
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', updatePath);
      updatePath();
      
      return () => window.removeEventListener('popstate', updatePath);
    }
  }, [reactLocation?.pathname, nextRouter?.asPath, currentPath]);

  // Error handling helper
  const handleError = useCallback((type: NavigationErrorInfo['type'], message: string, item?: NavigationItem | SidebarNavigationItem, originalError?: Error) => {
    const errorInfo: NavigationErrorInfo = {
      type,
      message,
      item,
      originalError,
    };
    
    if (onError) {
      onError(errorInfo);
    } else {
      console.warn(`Navigation Error [${type}]: ${message}`, { item, originalError });
    }
  }, [onError]);

  // Check if navigation is possible for an item
  const canNavigate = useCallback((item: NavigationItem | SidebarNavigationItem): boolean => {
    if (!item || item.disabled) return false;
    
    // Check role requirements for sidebar items
    if ('requiresRole' in item && item.requiresRole && item.requiresRole.length > 0) {
      // This would need to be passed via context or config
      // For now, assume navigation is allowed if no role context is available
      return true;
    }
    
    return true;
  }, []);

  // Main navigation function
  const navigate = useCallback(async (item: NavigationItem | SidebarNavigationItem, navOptions: NavigationOptions = {}) => {
    if (isNavigating) return;
    
    if (!canNavigate(item)) {
      handleError('PERMISSION_DENIED', `Navigation to ${item.name} is not allowed`, item);
      return;
    }

    setIsNavigating(true);
    
    try {
      // Call before navigation hook if available
      if ('onBeforeNavigate' in actualConfig && actualConfig.onBeforeNavigate) {
        const shouldContinue = await actualConfig.onBeforeNavigate(item as SidebarNavigationItem);
        if (!shouldContinue) {
          handleError('NAVIGATION_BLOCKED', `Navigation to ${item.name} was blocked by onBeforeNavigate`, item);
          return;
        }
      }

      const fullPath = buildUrlPath(item.path, actualConfig.baseUrl);
      
      // Add query parameters if specified
      const finalPath = navOptions.query 
        ? `${fullPath}?${new URLSearchParams(navOptions.query).toString()}`
        : fullPath;
      
      // Add hash if specified
      const finalUrl = navOptions.hash ? `${finalPath}#${navOptions.hash}` : finalPath;

      switch (actualConfig.strategy) {
        case 'react-router':
          if (reactNavigate) {
            reactNavigate(finalUrl, {
              replace: navOptions.replace,
              state: navOptions.state,
            });
          } else {
            handleError('ROUTER_NOT_FOUND', 'React Router not available, falling back to href navigation', item);
            window.location.href = finalUrl;
          }
          break;

        case 'next':
          if (nextRouter) {
            const navigateMethod = navOptions.replace ? nextRouter.replace : nextRouter.push;
            await navigateMethod(finalUrl, undefined, {
              scroll: !navOptions.preserveScroll,
            });
          } else {
            handleError('ROUTER_NOT_FOUND', 'Next.js router not available, falling back to href navigation', item);
            window.location.href = finalUrl;
          }
          break;

        case 'custom':
          if (actualConfig.onNavigate) {
            await actualConfig.onNavigate(item);
          } else {
            handleError('INVALID_STRATEGY', 'Custom navigation strategy requires onNavigate callback', item);
          }
          break;

        case 'href':
        default:
          if (navOptions.replace) {
            window.location.replace(finalUrl);
          } else {
            window.location.href = finalUrl;
          }
          break;
      }
      
      // Call after navigation hook if available
      if ('onAfterNavigate' in actualConfig && actualConfig.onAfterNavigate) {
        actualConfig.onAfterNavigate(item as SidebarNavigationItem);
      }
      
    } catch (error) {
      handleError('NAVIGATION_BLOCKED', `Navigation to ${item.name} failed`, item, error as Error);
    } finally {
      setIsNavigating(false);
    }
  }, [actualConfig, reactNavigate, nextRouter, canNavigate, handleError, isNavigating]);

  // Active state detection
  const isActive = useCallback((item: NavigationItem | SidebarNavigationItem, matchOptions: PathMatchOptions = {}): boolean => {
    if ('forceActive' in item && item.forceActive) return true;
    
    // Use custom active detection if provided
    if ('isActive' in actualConfig && actualConfig.isActive) {
      return actualConfig.isActive(item as SidebarNavigationItem, currentPath);
    }
    
    // Default active detection
    const fullPath = buildUrlPath(item.path, actualConfig.baseUrl);
    
    if (matchOptions.exact) {
      return currentPath === fullPath;
    }
    
    return isPathActive(currentPath, fullPath, actualConfig.baseUrl);
  }, [currentPath, actualConfig]);

  return {
    navigate: (item: NavigationItem | SidebarNavigationItem, options?: NavigationOptions) => 
      navigate(item, options),
    isActive,
    strategy: actualConfig.strategy,
    baseUrl: actualConfig.baseUrl,
    canNavigate,
  };
}

/**
 * Simplified navigation hook for basic use cases
 */
export function useSimpleNavigation(strategy?: NavigationStrategy, baseUrl?: string) {
  const config: NavigationConfig = {
    strategy: strategy || detectNavigationStrategy(),
    baseUrl,
    items: [], // Not used in simple mode
  };
  
  return useNavigation(config, { autoDetect: !strategy });
}

/**
 * Hook for environment and router detection
 */
export function useRouterDetection() {
  const [detection, setDetection] = useState(() => ({
    strategy: detectNavigationStrategy(),
    hasReactRouter: routingLibraryDetection.hasReactRouter(),
    hasNextRouter: routingLibraryDetection.hasNextRouter(),
    routerInfo: routingLibraryDetection.getRouterInfo(),
  }));
  
  useEffect(() => {
    // Re-detect on mount in case of SSR
    setDetection({
      strategy: detectNavigationStrategy(),
      hasReactRouter: routingLibraryDetection.hasReactRouter(),
      hasNextRouter: routingLibraryDetection.hasNextRouter(),
      routerInfo: routingLibraryDetection.getRouterInfo(),
    });
  }, []);
  
  return detection;
}

/**
 * Legacy compatibility - maintains the original simple API
 */
export function useNavigationLegacy(config: { strategy: NavigationStrategy; baseUrl?: string; onNavigate?: (item: any) => void }) {
  const { navigate, isActive } = useNavigation({
    strategy: config.strategy,
    baseUrl: config.baseUrl,
    items: [],
    onNavigate: config.onNavigate,
  });
  
  return { navigate, isActive };
}

// Re-export from routing utils for backwards compatibility
export { detectNavigationStrategy, autoDetectNavigationConfig } from '../utils/routing';