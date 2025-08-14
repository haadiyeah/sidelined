import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { SidebarConfig } from '../types/sidebar-config';
import { ChevronLeft, ChevronRight, Flower2 } from 'lucide-react';

interface SakuraSidebarProps {
  config: SidebarConfig;
  children?: React.ReactNode;
  previewMode?: boolean;
}

const SakuraSidebar = ({ config, children, previewMode = false }: SakuraSidebarProps) => {
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

  const toggleDrawer = () => {
    setIsExpanded(!isExpanded);
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
      style={{ backgroundColor: config.theme.colors.background }}
    >
      <nav className="h-full">
        <div
          className={`menu h-full ${
            isExpanded ? "w-64" : "w-20"
          } min-h-full w-60 p-4 flex flex-col justify-between`}
          style={{ backgroundColor: config.theme.colors.background, color: config.theme.colors.text }}
        >
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: config.theme.colors.primary }}
              >
                <Flower2 className="w-6 h-6 text-white" />
              </div>
              {isExpanded && (
                <span className="text-xl font-bold" style={{ color: config.theme.colors.text }}>
                  {config.branding?.title || config.name}
                </span>
              )}
            </div>

            <div className="sidebar-item w-10 mb-6" onClick={toggleDrawer}>
              <button className="p-2 rounded-lg hover:bg-pink-100 transition-colors">
                {isExpanded ? (
                  <ChevronLeft className="h-6 w-6" style={{ color: config.theme.colors.text }} />
                ) : (
                  <ChevronRight className="h-6 w-6" style={{ color: config.theme.colors.text }} />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1">
            {config.navigation.items.map((item) => (
              <motion.div
                key={item.id}
                className={`flex items-center gap-3 p-3 mb-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  activeItem === item.id
                    ? 'shadow-lg'
                    : 'hover:bg-pink-50'
                }`}
                style={{
                  backgroundColor: activeItem === item.id ? config.theme.colors.primary : undefined,
                  color: activeItem === item.id ? 'white' : config.theme.colors.text,
                }}
                onClick={() => handleNavigation(item)}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-6 h-6 flex-shrink-0">
                  {item.icon || <div className="w-6 h-6 bg-current opacity-60 rounded" />}
                </div>
                {isExpanded && (
                  <span className="font-medium">
                    {item.name}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          {config.user?.showLogout !== false && (
            <div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-pink-50 cursor-pointer transition-colors">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: config.theme.colors.secondary }}
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
                {isExpanded && (
                  <div>
                    <div className="text-sm font-medium" style={{ color: config.theme.colors.text }}>
                      Student
                    </div>
                    <div className="text-xs opacity-60" style={{ color: config.theme.colors.text }}>
                      Learning
                    </div>
                  </div>
                )}
              </div>
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
          <div className="flex-1 p-6 overflow-hidden" style={{ backgroundColor: config.theme.colors.background }}>
            <div className="h-full bg-white rounded-lg border border-pink-200 p-6">
              <h2 className="text-2xl font-bold text-pink-800 mb-4">Sakura Learning</h2>
              <p className="text-pink-600 mb-6">Educational platform with gentle, pastel design</p>
              
              {/* Feature cards */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Educational', desc: 'Perfect for learning platforms', icon: '📚' },
                  { title: 'Gentle Design', desc: 'Soft, welcoming interface', icon: '🌸' },
                  { title: 'Student-Friendly', desc: 'Easy navigation for learners', icon: '🎓' },
                  { title: 'Pastel Theme', desc: 'Beautiful pink color palette', icon: '🎨' }
                ].map((feature, index) => (
                  <div key={index} className="bg-pink-50 rounded-lg p-4 border border-pink-100">
                    <div 
                      className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center text-lg font-bold text-white"
                      style={{ backgroundColor: config.theme.colors.primary }}
                    >
                      {feature.icon}
                    </div>
                    <h4 className="font-semibold mb-1 text-sm text-pink-800">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-pink-600">
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
    <div className="min-h-[100vh]" style={{ backgroundColor: config.theme.colors.background }}>
      <div className="flex h-full">
        {sidebarContent}
        <div className="flex-grow p-16 pt-0 ml-20 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SakuraSidebar;