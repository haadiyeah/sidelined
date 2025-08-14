import {
  AcademicCapIcon,
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  BookOpenIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
  CommandLineIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import type { SidebarConfig, SidebarNavigationItem } from '../types/sidebar-config';
import { useNavigation } from '../hooks/useNavigation';
import { sakuraConfig } from '../../presets/sidebar-presets';
import NavigationItem from '../components/NavigationItem';

interface SidebarProps {
  children: React.ReactNode;
  config?: Partial<SidebarConfig>;
}

// Default navigation items for Sakura sidebar
const defaultSakuraItems: SidebarNavigationItem[] = [
  { 
    id: 'home', 
    name: 'CodeQuest', 
    path: '/', 
    icon: <AcademicCapIcon />, 
    section: 'header' 
  },
  { 
    id: 'dashboard', 
    name: 'Dashboard', 
    path: '/dashboard', 
    icon: <ChartBarIcon />, 
    section: 'main' 
  },
  { 
    id: 'courses', 
    name: 'Courses', 
    path: '/courses', 
    icon: <BookOpenIcon />, 
    section: 'main' 
  },
  { 
    id: 'code', 
    name: 'Code Editor', 
    path: '/code', 
    icon: <CommandLineIcon />, 
    section: 'main' 
  },
  { 
    id: 'settings', 
    name: 'Settings', 
    path: '/settings', 
    icon: <CogIcon />, 
    section: 'main' 
  },
  { 
    id: 'profile', 
    name: 'Profile', 
    path: '/profile', 
    icon: <UserCircleIcon />, 
    section: 'footer' 
  },
  { 
    id: 'logout', 
    name: 'Logout', 
    path: '/logout', 
    icon: <ArrowLeftStartOnRectangleIcon />, 
    section: 'footer' 
  },
];

/**
|--------------------------------------------------
| Usage:
| <Sidebar config={customConfig}> 
|   <YourPageContent />
| </Sidebar>
| Ideal for educational platforms.
|--------------------------------------------------
*/
const Sidebar: React.FC<SidebarProps> = ({ children, config: userConfig }) => {
  // Merge user config with sakura preset
  const config: SidebarConfig = {
    ...sakuraConfig,
    ...userConfig,
    navigation: {
      ...sakuraConfig.navigation,
      ...userConfig?.navigation,
      items: userConfig?.navigation?.items || defaultSakuraItems,
    },
  };

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

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
  };

  const closeDrawer = () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  };

  // Filter items by section
  const getItemsBySection = (section: 'header' | 'main' | 'footer') => {
    return config.navigation.items.filter(item => 
      (item.section || 'main') === section
    );
  };

  const headerItems = getItemsBySection('header');
  const mainItems = getItemsBySection('main');
  const footerItems = getItemsBySection('footer');

  return (
    <div className="min-h-[100vh] bg-base-100">
      {/* Sidebar for screens medium and above */}
      <div className="flex h-full max-sm:hidden">
        {/* Overlay */}
        {isExpanded && config.behavior.overlayOnExpand && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-35 z-20"
            onClick={closeDrawer}
          />
        )}
        
        <div
          className={`${
            isExpanded ? "w-64" : "w-20"
          } h-screen bg-neutral transition-width duration-${config.animations?.duration || 300} overflow-hidden fixed top-0 z-30`}
          style={{
            backgroundColor: config.theme.colors.background,
            color: config.theme.colors.text,
          }}
        >
          <nav className="h-full">
            <ul
              className={`menu h-full ${
                isExpanded ? "w-64" : "w-20"
              } bg-base-200 text-base-content min-h-full w-60 p-4 flex flex-col justify-between`}
            >
              {/* Header Section */}
              <div>
                {headerItems.map((item) => (
                  <NavigationItem
                    key={item.id}
                    item={item}
                    config={config}
                    isExpanded={isExpanded}
                    isActive={isActive(item)}
                    className="sidebar-item"
                  />
                ))}
                
                {/* Toggle Button */}
                {config.behavior.collapsible && (
                  <li className="sidebar-item w-10" onClick={toggleDrawer}>
                    <a className="flex items-center">
                      <button className="p-0">
                        {isExpanded ? (
                          <ChevronLeftIcon className="h-6 w-6" />
                        ) : (
                          <ChevronRightIcon className="h-6 w-6" />
                        )}
                      </button>
                    </a>
                  </li>
                )}
              </div>

              {/* Main Navigation */}
              <div>
                {mainItems.map((item) => (
                  <NavigationItem
                    key={item.id}
                    item={item}
                    config={config}
                    isExpanded={isExpanded}
                    isActive={isActive(item)}
                    className="sidebar-item"
                  />
                ))}
              </div>
              
              {/* Footer Section */}
              <div>
                {footerItems.map((item) => (
                  <NavigationItem
                    key={item.id}
                    item={item}
                    config={config}
                    isExpanded={isExpanded}
                    isActive={isActive(item)}
                    className="sidebar-item"
                  />
                ))}
              </div>
            </ul>
          </nav>
        </div>
        
        <div className="flex-grow p-16 pt-0 ml-20 overflow-auto">
          {children}
        </div>
      </div>

      {/* Mobile Drawer */}
      {config.responsive?.mobileDrawer !== false && (
        <div className="drawer sm:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Navbar with drawer for small screens */}
            <div className="navbar bg-base-100 drop-shadow-md mb-2">
              <div className="flex-1">
                <label
                  htmlFor="my-drawer"
                  className="btn btn-ghost drawer-button"
                >
                  <Bars3Icon className="h-6 w-6" />
                </label>
              </div>
              <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Page content */}
            <div className="p-8">{children}</div>
          </div>
          
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            />
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col justify-between">
              {/* Mobile Header */}
              <div>
                {headerItems.map((item) => (
                  <NavigationItem
                    key={item.id}
                    item={item}
                    config={config}
                    isExpanded={true}
                    isActive={isActive(item)}
                    className="sidebar-item"
                  />
                ))}
              </div>

              {/* Mobile Main */}
              <div>
                {mainItems.map((item) => (
                  <NavigationItem
                    key={item.id}
                    item={item}
                    config={config}
                    isExpanded={true}
                    isActive={isActive(item)}
                    className="sidebar-item"
                  />
                ))}
              </div>
              
              {/* Mobile Footer */}
              <div>
                {footerItems.map((item) => (
                  <NavigationItem
                    key={item.id}
                    item={item}
                    config={config}
                    isExpanded={true}
                    isActive={isActive(item)}
                    className="sidebar-item"
                  />
                ))}
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;