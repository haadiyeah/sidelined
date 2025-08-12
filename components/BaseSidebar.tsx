import React, { useState, useEffect } from 'react';
import { SidebarConfig, SidebarNavigationItem } from '../types/sidebar-config';
import { useNavigation } from '../hooks/useNavigation';
import NavigationItem from './NavigationItem';

interface BaseSidebarProps {
  config: SidebarConfig;
  children: React.ReactNode;
  currentRole?: string;
}

export const BaseSidebar: React.FC<BaseSidebarProps> = ({
  config,
  children,
  currentRole,
}) => {
  const [isExpanded, setIsExpanded] = useState(() => {
    if (config.behavior.persistState && typeof window !== 'undefined') {
      const saved = localStorage.getItem(`sidebar-${config.id}-expanded`);
      return saved !== null ? JSON.parse(saved) : config.behavior.defaultExpanded || false;
    }
    return config.behavior.defaultExpanded || false;
  });

  const { navigate, isActive } = useNavigation(config.navigation);

  useEffect(() => {
    if (config.behavior.persistState && typeof window !== 'undefined') {
      localStorage.setItem(`sidebar-${config.id}-expanded`, JSON.stringify(isExpanded));
    }
  }, [isExpanded, config.id, config.behavior.persistState]);

  // Filter navigation items based on current role and section
  const getItemsBySection = (section: 'header' | 'main' | 'footer') => {
    return config.navigation.items.filter(item => {
      // Check section
      const itemSection = item.section || 'main';
      if (itemSection !== section) return false;
      
      // Check role requirements
      if (item.requiresRole && item.requiresRole.length > 0) {
        return currentRole && item.requiresRole.includes(currentRole);
      }
      
      return true;
    });
  };

  const headerItems = getItemsBySection('header');
  const mainItems = getItemsBySection('main');
  const footerItems = getItemsBySection('footer');

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const closeSidebar = () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  };

  // Apply layout-specific classes
  const getLayoutClasses = () => {
    const baseClasses = 'sidebar-container';
    switch (config.layout) {
      case 'classic':
        return `${baseClasses} sidebar-classic`;
      case 'centered':
        return `${baseClasses} sidebar-centered`;
      case 'mailbox':
        return `${baseClasses} sidebar-mailbox`;
      default:
        return baseClasses;
    }
  };

  // Render navigation section
  const renderNavigationSection = (items: SidebarNavigationItem[], sectionClass?: string) => (
    <div className={`navigation-section ${sectionClass || ''}`}>
      {items.map((item) => (
        <NavigationItem
          key={item.id}
          item={item}
          config={config}
          isExpanded={isExpanded}
          isActive={isActive(item)}
          className={item.className || ''}
        />
      ))}
    </div>
  );

  // Desktop sidebar
  const renderDesktopSidebar = () => (
    <div className="flex h-screen max-sm:hidden">
      {/* Overlay */}
      {isExpanded && config.behavior.overlayOnExpand && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${getLayoutClasses()}
          ${isExpanded ? 'w-64' : 'w-20'}
          h-screen flex flex-col justify-between py-4 shadow-lg
          transition-all duration-${config.animations?.duration || 300} ease-in-out
          fixed top-0 z-30
        `}
        style={{
          backgroundColor: config.theme.colors.background,
          color: config.theme.colors.text,
        }}
      >
        {/* Header Section */}
        <div className="sidebar-header">
          {/* Branding */}
          {config.branding && (
            <div className={`branding flex items-center ${!isExpanded && !config.branding.showInCollapsed ? 'justify-center' : ''} px-4 mb-6`}>
              {config.branding.logo && (
                <img
                  src={config.branding.logo.src}
                  alt={config.branding.logo.alt}
                  className={config.branding.logo.className || 'w-10 h-10'}
                />
              )}
              {isExpanded && config.branding.title && (
                <div className="ml-2">
                  <h1 className="text-xl font-bold">{config.branding.title}</h1>
                  {config.branding.subtitle && (
                    <p className="text-sm opacity-75">{config.branding.subtitle}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Toggle Button */}
          {config.behavior.collapsible && (
            <button
              className="toggle-button btn btn-ghost btn-square mb-4 mx-4"
              onClick={toggleSidebar}
            >
              {isExpanded ? '←' : '→'}
            </button>
          )}

          {/* Header Navigation Items */}
          {headerItems.length > 0 && renderNavigationSection(headerItems, 'header-items')}
        </div>

        {/* Main Navigation */}
        <div className="sidebar-main flex-grow">
          {renderNavigationSection(mainItems, 'main-items')}
        </div>

        {/* Footer Section */}
        <div className="sidebar-footer">
          {footerItems.length > 0 && renderNavigationSection(footerItems, 'footer-items')}
          
          {/* User section */}
          {config.user?.avatar && (
            <div className="user-section px-4 mt-4">
              <div className="flex items-center">
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full">
                    {config.user.avatar.src ? (
                      <img src={config.user.avatar.src} alt="User Avatar" />
                    ) : (
                      <div className="bg-primary text-primary-content flex items-center justify-center">
                        {config.user.avatar.initials}
                      </div>
                    )}
                  </div>
                </div>
                {isExpanded && config.user.avatar.showName && (
                  <span className="ml-2">User Name</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div 
        className={`
          flex-grow overflow-y-auto
          ${isExpanded ? 'ml-64' : 'ml-20'}
          transition-all duration-${config.animations?.duration || 300}
        `}
        style={{ backgroundColor: config.theme.colors.accent || '#f5f5f5' }}
      >
        {children}
      </div>
    </div>
  );

  // Mobile drawer
  const renderMobileDrawer = () => (
    <div className="drawer drawer-mobile h-screen sm:hidden">
      <input id={`drawer-${config.id}`} type="checkbox" className="drawer-toggle" />
      
      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar" style={{ backgroundColor: config.theme.colors.background }}>
          <div className="flex-none">
            <label htmlFor={`drawer-${config.id}`} className="btn btn-square btn-ghost">
              ☰
            </label>
          </div>
          <div className="flex-1">
            {config.branding && (
              <div className="flex items-center">
                {config.branding.logo && (
                  <img
                    src={config.branding.logo.src}
                    alt={config.branding.logo.alt}
                    className="w-6 h-6 mr-2"
                  />
                )}
                {config.branding.title}
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
      
      {/* Mobile Sidebar */}
      <div className="drawer-side">
        <label htmlFor={`drawer-${config.id}`} className="drawer-overlay" />
        <div 
          className="w-80 h-full flex flex-col justify-between p-4"
          style={{
            backgroundColor: config.theme.colors.background,
            color: config.theme.colors.text,
          }}
        >
          {/* Mobile Header */}
          <div>
            {config.branding && (
              <div className="branding mb-6">
                {config.branding.logo && (
                  <img
                    src={config.branding.logo.src}
                    alt={config.branding.logo.alt}
                    className={config.branding.logo.className || 'w-16 h-16 mb-2'}
                  />
                )}
                {config.branding.title && (
                  <h1 className="text-xl font-bold">{config.branding.title}</h1>
                )}
              </div>
            )}
            {headerItems.length > 0 && renderNavigationSection(headerItems)}
          </div>

          {/* Mobile Main Navigation */}
          <div className="flex-grow">
            {renderNavigationSection(mainItems)}
          </div>

          {/* Mobile Footer */}
          <div>
            {footerItems.length > 0 && renderNavigationSection(footerItems)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`sidebar-wrapper theme-${config.theme.name}`}>
      {/* Apply custom CSS if provided */}
      {config.theme.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: config.theme.customCSS }} />
      )}
      
      {config.responsive?.mobileDrawer !== false ? renderMobileDrawer() : renderDesktopSidebar()}
    </div>
  );
};

export default BaseSidebar;