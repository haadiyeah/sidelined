import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { SidebarConfig } from '../types/sidebar-config';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

interface ERPSidebarProps {
  config: SidebarConfig;
  children?: React.ReactNode;
  previewMode?: boolean;
}

const ERPSidebar = ({ config, children, previewMode = false }: ERPSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(config.behavior.defaultExpanded ?? false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleNavigation = (item: any) => {
    if (previewMode) {
      // In preview mode, just update active state without navigating
      setActiveItem(item.id);
      return;
    }

    // Normal navigation logic
    if (config.navigation.strategy === 'custom' && config.navigation.onNavigate) {
      config.navigation.onNavigate(item);
    } else if (config.navigation.strategy === 'react-router') {
      window.location.href = item.path;
    } else {
      window.location.href = item.path;
    }
  };

  useEffect(() => {
    if (!previewMode) {
      const currentUrl = window.location.pathname;
      const item = config.navigation.items.find(item => 
        currentUrl.toLowerCase().includes(item.path.toLowerCase())
      );
      if (item) {
        setActiveItem(item.id);
      }
    }
  }, [config.navigation.items, previewMode]);

  const sidebarContent = (
    <div
      className={`${
        isExpanded ? "w-64" : "w-20"
      } h-full transition-width duration-300 overflow-hidden`}
      style={{ backgroundColor: config.theme.colors.primary, color: 'white' }}
    >
      <nav className="h-full">
        <div
          className={`menu h-full ${
            isExpanded ? "w-64" : "w-20"
          } min-h-full w-60 pt-4 pl-4 pb-4 pr-0 flex flex-col justify-between`}
        >
          {/* Logo */}
          <div>
            <div 
              className="w-12 h-12 mb-3 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <div className="w-8 h-8 bg-white/80 rounded" />
            </div>

            <div className="sidebar-item w-10 mb-4" onClick={() => setIsExpanded(!isExpanded)}>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                {isExpanded ? (
                  <ChevronLeft className="h-6 w-6 text-white" />
                ) : (
                  <ChevronRight className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1">
            {config.navigation.items.map((item) => (
              <motion.div
                key={item.id}
                className={`cursor-pointer transition-all duration-200 mb-2 ${
                  activeItem === item.id
                    ? 'border-l-primary border-l-4 rounded-md bg-base-100 text-primary'
                    : 'text-white hover:bg-white/10'
                }`}
                onClick={() => handleNavigation(item)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center p-3">
                  <div className="w-6 h-6 flex-shrink-0">
                    {item.icon || <div className="w-6 h-6 bg-current opacity-60 rounded" />}
                  </div>
                  {isExpanded && (
                    <span className="ml-4 font-medium">
                      {item.name}
                    </span>
                  )}
                  {config.behavior.allowTooltips && !isExpanded && (
                    <div className="tooltip tooltip-right" data-tip={item.name}>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Logout */}
          {config.user?.showLogout !== false && (
            <div className="mb-4">
              <button
                onClick={() => {
                  if (!previewMode && config.user?.onLogout) {
                    config.user.onLogout();
                  }
                }}
                className="flex items-center p-3 w-full hover:bg-white/10 rounded-lg transition-colors text-white"
                disabled={previewMode}
              >
                <LogOut className="w-6 h-6" />
                {isExpanded && <span className="ml-4">Logout</span>}
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );

  if (!children) {
    // Preview mode
    return (
      <div className="bg-base-100 rounded-xl overflow-hidden border border-base-300 h-[28rem]">
        <div className="flex h-full">
          {sidebarContent}
          
          {/* Demo content area */}
          <div 
            className="flex-1 p-6 overflow-hidden"
            style={{ backgroundColor: config.theme.colors.background }}
          >
            <div 
              className="h-full rounded-lg border p-6"
              style={{ 
                backgroundColor: '#ffffff',
                borderColor: config.theme.colors.secondary + '40'
              }}
            >
              <h2 className="text-2xl font-bold mb-4" style={{ color: config.theme.colors.primary }}>
                ERP System
              </h2>
              <p className="mb-6" style={{ color: config.theme.colors.text + '99' }}>
                Complex role-based management with tooltips
              </p>
              
              {/* Feature cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Role-Based Access', desc: 'Advanced permission management', icon: '🔐' },
                  { title: 'Tooltip Support', desc: 'Rich information on hover', icon: '💡' },
                  { title: 'Fast Navigation', desc: 'Quick access to all modules', icon: '⚡' },
                  { title: 'Complex Systems', desc: 'Built for enterprise workflows', icon: '🏗️' }
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="rounded-lg p-4 border"
                    style={{ 
                      backgroundColor: config.theme.colors.primary + '10',
                      borderColor: config.theme.colors.primary + '30'
                    }}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center text-lg font-bold text-white"
                      style={{ backgroundColor: config.theme.colors.primary }}
                    >
                      {feature.icon}
                    </div>
                    <h4 
                      className="font-semibold mb-1 text-sm"
                      style={{ color: config.theme.colors.primary }}
                    >
                      {feature.title}
                    </h4>
                    <p 
                      className="text-xs"
                      style={{ color: config.theme.colors.text + '99' }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full sidebar with children
  return (
    <div className="min-h-[100vh] bg-base-200 bg-opacity-20">
      <div className="flex h-full">
        {sidebarContent}
        <div className="flex-grow p-16 pt-0 ml-20 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ERPSidebar;