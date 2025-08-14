/**
 * Reusable navigation component implementing the routing solution from todo_routing_solution_20250812.md
 * Renders links with proper routing based on strategy
 */

import React, { useState, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import type { 
  NavigationItem as BaseNavigationItem,
  SidebarNavigationItem,
  NavigationConfig,
  SidebarNavigationConfig,
  NavigationOptions 
} from '../types/navigation';
import { useNavigation } from '../hooks/useNavigation';

interface NavigationItemProps {
  /** Navigation item data */
  item: BaseNavigationItem | SidebarNavigationItem;
  /** Navigation configuration */
  config: NavigationConfig | SidebarNavigationConfig;
  /** Whether the sidebar is expanded */
  isExpanded?: boolean;
  /** Whether this item is currently active */
  isActive?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Click handler */
  onClick?: (item: BaseNavigationItem | SidebarNavigationItem) => void;
  /** Whether to show tooltips */
  showTooltips?: boolean;
  /** Custom navigation options */
  navigationOptions?: NavigationOptions;
  /** Render as different element types */
  as?: 'div' | 'li' | 'span';
  /** Custom icon size */
  iconSize?: 'sm' | 'md' | 'lg';
  /** Whether to prevent default navigation */
  preventDefaultNavigation?: boolean;
}

const TooltipPortal: React.FC<{ 
  children: React.ReactNode; 
  target: HTMLElement;
  position?: 'right' | 'left' | 'top' | 'bottom';
}> = ({ children, target, position = 'right' }) => {
  return ReactDOM.createPortal(children, target);
};

/**
 * Reusable navigation item component with proper routing
 */
export const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  config,
  isExpanded = true,
  isActive: forcedActive,
  className = '',
  onClick,
  showTooltips = true,
  navigationOptions = {},
  as: Component = 'div',
  iconSize = 'md',
  preventDefaultNavigation = false,
}) => {
  const { navigate, isActive: checkIsActive, canNavigate } = useNavigation(config);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Determine if item is active
  const itemIsActive = forcedActive !== undefined ? forcedActive : checkIsActive(item);
  
  // Check if navigation is possible
  const navigationAllowed = canNavigate(item);

  const handleClick = useCallback(async (event: React.MouseEvent) => {
    // Prevent default if specified or if item is disabled
    if (preventDefaultNavigation || item.disabled || !navigationAllowed) {
      event.preventDefault();
    }

    // Call custom onClick handler first
    if (onClick) {
      onClick(item);
    }

    // Navigate if not prevented and item is not disabled
    if (!preventDefaultNavigation && !item.disabled && navigationAllowed) {
      await navigate(item, navigationOptions);
    }
  }, [navigate, item, navigationOptions, onClick, preventDefaultNavigation, navigationAllowed]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsPressed(true);
      handleClick(event as any);
    }
  }, [handleClick]);

  const handleKeyUp = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsPressed(false);
    }
  }, []);

  // Icon size classes
  const getIconSizeClass = () => {
    switch (iconSize) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-6 h-6';
      case 'lg': return 'w-8 h-8';
      default: return 'w-6 h-6';
    }
  };

  // Show tooltip conditions
  const shouldShowTooltip = showTooltips && 
                          !isExpanded && 
                          isHovered && 
                          tooltipRef.current &&
                          (item.tooltip || item.name);

  // Base classes
  const baseClasses = `
    navigation-item
    ${className}
    ${itemIsActive ? 'navigation-item--active' : ''}
    ${item.disabled ? 'navigation-item--disabled cursor-not-allowed opacity-50' : 'cursor-pointer'}
    ${isPressed ? 'navigation-item--pressed' : ''}
    ${isHovered ? 'navigation-item--hovered' : ''}
    ${!navigationAllowed ? 'navigation-item--forbidden' : ''}
  `.trim().replace(/\s+/g, ' ');

  // Enhanced sidebar item for better compatibility
  const isSidebarItem = 'section' in item || 'requiresRole' in item;

  return (
    <>
      <Component
        className={baseClasses}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        tabIndex={item.disabled ? -1 : 0}
        role="button"
        aria-label={item.name}
        aria-disabled={item.disabled}
        aria-current={itemIsActive ? 'page' : undefined}
        {...(isSidebarItem && { 'data-section': (item as SidebarNavigationItem).section })}
        {...(item.data && Object.fromEntries(
          Object.entries(item.data).map(([key, value]) => [`data-${key}`, value])
        ))}
      >
        <div
          ref={tooltipRef}
          className="navigation-item__content flex items-center relative"
        >
          {/* Icon */}
          {item.icon && (
            <div className={`navigation-item__icon ${getIconSizeClass()}`}>
              {React.isValidElement(item.icon) 
                ? React.cloneElement(item.icon as React.ReactElement, {
                    className: `${getIconSizeClass()} ${itemIsActive ? 'text-primary' : 'text-current'}`,
                    'aria-hidden': true,
                  })
                : item.icon
              }
            </div>
          )}
          
          {/* Text */}
          {isExpanded && (
            <span className={`navigation-item__text ml-3 ${itemIsActive ? 'font-semibold text-primary' : ''}`}>
              {item.name}
            </span>
          )}
          
          {/* Badge */}
          {isExpanded && item.badge && (
            <span className="navigation-item__badge ml-auto">
              {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
            </span>
          )}

          {/* External link indicator */}
          {item.path.startsWith('http') && isExpanded && (
            <span className="navigation-item__external ml-1" aria-label="External link">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </div>
      </Component>

      {/* Tooltip Portal */}
      {shouldShowTooltip && (
        <TooltipPortal target={document.body}>
          <div
            className="navigation-item__tooltip fixed z-50 px-2 py-1 text-sm bg-gray-900 text-white rounded shadow-lg pointer-events-none"
            style={{
              top: tooltipRef.current.getBoundingClientRect().top + 
                   tooltipRef.current.getBoundingClientRect().height / 2,
              left: tooltipRef.current.getBoundingClientRect().right + 8,
              transform: 'translateY(-50%)',
            }}
          >
            <div className="relative">
              {item.tooltip || item.name}
              {/* Arrow */}
              <div 
                className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: '4px solid transparent',
                  borderBottom: '4px solid transparent', 
                  borderRight: '4px solid #1f2937',
                }}
              />
            </div>
          </div>
        </TooltipPortal>
      )}
    </>
  );
};

/**
 * Specialized sidebar navigation item with additional features
 */
export const SidebarNavigationItemComponent: React.FC<NavigationItemProps & {
  /** Show role requirements in tooltip */
  showRoleInfo?: boolean;
  /** Current user role for permission checking */
  userRole?: string;
}> = ({ 
  item, 
  showRoleInfo = false, 
  userRole,
  ...props 
}) => {
  const sidebarItem = item as SidebarNavigationItem;
  
  // Check role requirements
  const hasRequiredRole = !sidebarItem.requiresRole || 
                         sidebarItem.requiresRole.length === 0 ||
                         (userRole && sidebarItem.requiresRole.includes(userRole));

  // Enhanced tooltip with role information
  const enhancedTooltip = showRoleInfo && sidebarItem.requiresRole 
    ? `${sidebarItem.tooltip || sidebarItem.name}\nRequires: ${sidebarItem.requiresRole.join(', ')}`
    : sidebarItem.tooltip || sidebarItem.name;

  const enhancedItem: SidebarNavigationItem = {
    ...sidebarItem,
    tooltip: enhancedTooltip,
    disabled: sidebarItem.disabled || !hasRequiredRole,
  };

  return <NavigationItem item={enhancedItem} {...props} />;
};

/**
 * Navigation item list renderer
 */
export const NavigationItemList: React.FC<{
  items: (BaseNavigationItem | SidebarNavigationItem)[];
  config: NavigationConfig | SidebarNavigationConfig;
  isExpanded?: boolean;
  showTooltips?: boolean;
  className?: string;
  itemClassName?: string;
  onItemClick?: (item: BaseNavigationItem | SidebarNavigationItem) => void;
  renderItem?: (item: BaseNavigationItem | SidebarNavigationItem, index: number) => React.ReactNode;
}> = ({
  items,
  config,
  isExpanded = true,
  showTooltips = true,
  className = '',
  itemClassName = '',
  onItemClick,
  renderItem,
}) => {
  const { isActive } = useNavigation(config);

  return (
    <div className={`navigation-item-list ${className}`}>
      {items.map((item, index) => {
        if (renderItem) {
          return renderItem(item, index);
        }

        return (
          <NavigationItem
            key={item.id}
            item={item}
            config={config}
            isExpanded={isExpanded}
            isActive={isActive(item)}
            className={itemClassName}
            onClick={onItemClick}
            showTooltips={showTooltips}
            as="div"
          />
        );
      })}
    </div>
  );
};

export default NavigationItem;