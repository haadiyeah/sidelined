import { useState } from 'react';
import { motion } from 'framer-motion';
import type { SidebarConfig } from '../types/sidebar-config';
import { 
  Home, 
  BarChart3, 
  Settings, 
  Users, 
  FileText, 
  Bell, 
  Search,
  Menu,
  ChevronRight,
  User
} from 'lucide-react';

interface DynamoSidebarProps {
  config: SidebarConfig;
  children?: React.ReactNode;
  previewMode?: boolean;
}

const DynamoSidebar = ({ config, children, previewMode = false }: DynamoSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(config.behavior.defaultExpanded ?? false);
  const [activeItem, setActiveItem] = useState(0);

  const menuItems = config.navigation.items.length > 0 
    ? config.navigation.items 
    : [
        { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
        { id: 'analytics', name: 'Analytics', path: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
        { id: 'users', name: 'Users', path: '/users', icon: <Users className="w-5 h-5" /> },
        { id: 'documents', name: 'Documents', path: '/documents', icon: <FileText className="w-5 h-5" /> },
        { id: 'settings', name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
      ];

  const handleNavigate = (item: any, index: number) => {
    setActiveItem(index);
    
    if (previewMode) {
      // In preview mode, only update active state without navigating
      return;
    }
    
    if (config.navigation.strategy === 'custom' && config.navigation.onNavigate) {
      config.navigation.onNavigate(item);
    } else if (config.navigation.strategy === 'react-router') {
      // Would use navigate hook in real implementation
      window.location.href = item.path;
    } else {
      window.location.href = item.path;
    }
  };

  const getItemStyle = (isActive: boolean) => {
    const baseStyle = "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer";
    
    if (config.layout === 'classic') {
      return `${baseStyle} ${
        isActive 
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-l-4 border-blue-400'
          : 'hover:bg-white/10 text-gray-300'
      }`;
    }
    
    if (config.layout === 'centered') {
      return `${baseStyle} ${
        isActive 
          ? 'bg-primary/20 text-primary border border-primary/30'
          : 'hover:bg-base-300/50 text-base-content/70'
      }`;
    }
    
    return baseStyle;
  };

  const getSidebarStyle = () => {
    if (config.theme.colors.gradient) {
      return {
        background: `linear-gradient(135deg, ${config.theme.colors.gradient.from} 0%, ${config.theme.colors.gradient.to} 100%)`,
        backdropFilter: 'blur(10px)',
      };
    }
    
    return { 
      backgroundColor: config.theme.colors.background,
      color: config.theme.colors.text
    };
  };

  const sidebarContent = (
    <motion.div 
      className={`flex flex-col transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
      style={getSidebarStyle()}
      animate={{ width: isExpanded ? 256 : 80 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: config.theme.colors.primary }}
          >
            <div className="w-4 h-4 bg-white/90 rounded" />
          </div>
          {isExpanded && (
            <motion.span 
              className="font-semibold"
              style={{ color: config.theme.colors.text }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {config.branding?.title || config.name}
            </motion.span>
          )}
          <motion.button
            className="ml-auto p-1 rounded-lg hover:bg-white/10"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu 
              className="w-4 h-4" 
              style={{ color: config.theme.colors.text }}
            />
          </motion.button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = activeItem === index;
          
          return (
            <motion.div
              key={item.id}
              className={getItemStyle(isActive)}
              onClick={() => handleNavigate(item, index)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-5 h-5 flex-shrink-0">
                {item.icon || <div className="w-5 h-5 bg-current opacity-60 rounded" />}
              </div>
              {isExpanded && (
                <motion.span
                  className="font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {item.name}
                </motion.span>
              )}
              {isActive && isExpanded && (
                <motion.div
                  className="ml-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* User Profile */}
      {config.user?.showLogout !== false && (
        <div className="p-4 border-t border-white/10">
          <div className={`flex items-center gap-3 p-2 rounded-xl ${
            'hover:bg-white/10'
          }`}>
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: config.theme.colors.secondary }}
            >
              <User className="w-4 h-4 text-white" />
            </div>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div 
                  className="text-sm font-medium"
                  style={{ color: config.theme.colors.text }}
                >
                  {config.user?.avatar?.showName ? 'John Doe' : 'User'}
                </div>
                <div 
                  className="text-xs opacity-60"
                  style={{ color: config.theme.colors.text }}
                >
                  {config.user?.currentRole || 'Developer'}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );

  if (!children) {
    // Preview mode - return just the sidebar
    return (
      <div className="bg-base-100 rounded-xl overflow-hidden border border-base-300 h-[28rem]">
        <div className="flex h-full">
          {sidebarContent}
          
          {/* Demo content area */}
          <div className="flex-1 bg-base-50 p-6 overflow-hidden">
            <div className="h-full bg-white rounded-lg border border-base-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-base-content">Dashboard</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" />
                    <input 
                      type="text" 
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 bg-base-100 rounded-lg border border-base-300 text-sm"
                    />
                  </div>
                  <button className="p-2 bg-base-100 rounded-lg border border-base-300 hover:bg-base-200 transition-colors">
                    <Bell className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Demo Content */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-base-50 rounded-lg p-4 border border-base-200">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg mb-2" />
                    <div className="h-4 bg-base-300 rounded mb-2" />
                    <div className="h-3 bg-base-200 rounded w-2/3" />
                  </div>
                ))}
              </div>
              
              <div className="bg-base-50 rounded-lg h-32 border border-base-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-base-300 rounded-lg mx-auto mb-2" />
                  <div className="h-4 bg-base-200 rounded w-24 mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full sidebar with children
  return (
    <div className="flex min-h-screen">
      {sidebarContent}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DynamoSidebar;