import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { SidebarConfig } from '../types/sidebar-config';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

interface CorporateSidebarProps {
  config: SidebarConfig;
  children?: React.ReactNode;
  previewMode?: boolean;
}

const CorporateSidebar = ({ config, children, previewMode = false }: CorporateSidebarProps) => {
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
      // Would use navigate hook in real implementation
      window.location.href = item.path;
    } else {
      window.location.href = item.path;
    }
  };

  const handleLogout = async () => {
    if (previewMode) return; // Prevent logout in preview mode
    
    if (config.user?.onLogout) {
      await config.user.onLogout();
    } else {
      // Default logout logic
      window.location.href = '/';
    }
  };

  useEffect(() => {
    if (!previewMode) {
      // Check current URL to set active item
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
      className={`bg-base-100 ${
        isExpanded ? "w-64" : "w-20"
      } h-full flex flex-col justify-between py-4 shadow-lg transition-all duration-300 ease-in-out`}
      style={{ backgroundColor: config.theme.colors.background, color: config.theme.colors.text }}
    >
      {/* Logo and Toggle Button */}
      <div className={`flex flex-col gap-4 ${!isExpanded && "items-center"} justify-between px-4`}>
        <div className="flex items-center">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: config.theme.colors.primary }}
          >
            <div className="w-6 h-6 bg-white/90 rounded" />
          </div>
          {isExpanded && (
            <span className="ml-2 text-xl font-bold" style={{ color: config.theme.colors.text }}>
              {config.branding?.title || config.name}
            </span>
          )}
        </div>
        <button
          className="btn btn-ghost btn-square hover:bg-base-200"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ color: config.theme.colors.text }}
        >
          {isExpanded ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-3 mt-8">
        {config.navigation.items.map((item) => (
          <motion.div
            key={item.id}
            className={`w-full flex items-center ml-4 ${
              isExpanded ? "px-4" : "pl-5"
            } py-3 rounded-lg cursor-pointer transition-all duration-200 ${
              activeItem === item.id
                ? "shadow-lg"
                : "ring-1 shadow"
            }`}
            style={{
              backgroundColor: activeItem === item.id ? config.theme.colors.primary : config.theme.colors.background,
              color: activeItem === item.id ? 'white' : config.theme.colors.text,
              borderColor: config.theme.colors.primary + '20'
            }}
            onMouseEnter={(e) => {
              if (activeItem !== item.id) {
                e.currentTarget.style.backgroundColor = config.theme.colors.primary + '10';
              }
            }}
            onMouseLeave={(e) => {
              if (activeItem !== item.id) {
                e.currentTarget.style.backgroundColor = config.theme.colors.background;
              }
            }}
            onClick={() => handleNavigation(item)}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-6 h-6 flex-shrink-0">
              {item.icon || <div className="w-6 h-6 bg-current opacity-60 rounded" />}
            </div>
            {isExpanded && <span className="ml-4">{item.name}</span>}
          </motion.div>
        ))}
      </div>

      {/* Logout Button */}
      {config.user?.showLogout !== false && (
        <div className="mb-4">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              isExpanded ? "px-4" : "justify-center"
            } py-2 rounded-lg hover:bg-base-200 transition-colors`}
            style={{ color: config.theme.colors.text }}
            disabled={previewMode}
          >
            <LogOut />
            {isExpanded && <span className="ml-4">Logout</span>}
          </button>
        </div>
      )}
    </div>
  );

  if (!children) {
    // Preview mode
    return (
      <div className="bg-base-100 rounded-xl overflow-hidden border border-base-300 h-[28rem]">
        <div className="flex h-full">
          {sidebarContent}
          
          {/* Demo content area */}
          <div className="flex-1 bg-base-50 p-6 overflow-hidden">
            <div className="h-full bg-white rounded-lg border border-base-200 p-6">
              <h2 className="text-2xl font-bold text-base-content mb-4">Corporate Dashboard</h2>
              <p className="text-base-content/60 mb-6">Professional, clean, role-based interface</p>
              
              {/* Feature cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Role-Based', desc: 'Access control by user roles', icon: '👥' },
                  { title: 'Professional', desc: 'Clean corporate design', icon: '💼' },
                  { title: 'Light Theme', desc: 'Modern bright interface', icon: '☀️' },
                  { title: 'Enterprise', desc: 'Built for business use', icon: '🏢' }
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
                      className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center text-lg font-bold"
                      style={{ backgroundColor: config.theme.colors.primary, color: 'white' }}
                    >
                      {feature.icon}
                    </div>
                    <h4 
                      className="font-semibold mb-1 text-sm"
                      style={{ color: config.theme.colors.text }}
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
    <div className="flex h-screen">
      {sidebarContent}
      <div className="flex-1 bg-base-200 p-6 lg:px-20 lg:pt-16 lg:pb-20 md:px-8 sm:px-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default CorporateSidebar;