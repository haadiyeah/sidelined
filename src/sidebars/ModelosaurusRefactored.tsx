import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import type { SidebarConfig } from '../types/sidebar-config';

// Import the icon assets
import build from '../assets/modelosaurus-icons/build.png';
import chip from '../assets/modelosaurus-icons/chip.png';
import cloud from '../assets/modelosaurus-icons/cloud.png';
import dashboard from '../assets/modelosaurus-icons/dashboard.png';
import learn from '../assets/modelosaurus-icons/learn.png';
import robot from '../assets/modelosaurus-icons/robot.png';
import setting from '../assets/modelosaurus-icons/setting.png';
import model from '../assets/modelosaurus-icons/model.png';

interface ModelosaurusSidebarProps {
  config: SidebarConfig;
  children?: React.ReactNode;
  previewMode?: boolean;
}

const ModelosaurusSidebar: React.FC<ModelosaurusSidebarProps> = ({ config, children, previewMode = false }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(config.behavior.defaultExpanded ?? false);

  const handleNavigate = (item: any) => {
    if (previewMode) {
      // In preview mode, just update selected state without navigating
      setSelectedItem(item.id);
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

  const isActive = (item: any) => {
    if (previewMode) {
      return selectedItem === item.id;
    }
    // Check current URL match
    const currentUrl = window.location.pathname;
    return currentUrl.toLowerCase().includes(item.path.toLowerCase());
  };

  useEffect(() => {
    if (selectedItem) {
      const index = config.navigation.items.findIndex((item) => item.id === selectedItem);
      setIndicatorPosition(index * 72 + 57);
    }

    // Check the URL to see if it corresponds to any sidebar item (only in non-preview mode)
    if (!previewMode) {
      const currentUrl = window.location.pathname;
      const item = config.navigation.items.find((item) => 
        currentUrl.toLowerCase().includes(item.path.toLowerCase())
      );
      if (item) {
        setSelectedItem(item.id);
      }
    }
  }, [selectedItem, config.navigation.items, previewMode]);

  const sidebarContent = (
    <motion.div
      className={`${
        isSidebarOpen ? 'w-64' : 'w-20'
      } bg-gray-900 h-full flex flex-col items-center py-4 rounded-xl flex-shrink-0 relative z-30 transition-all duration-300`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Sidebar Toggle Button */}
      <div className="flex items-start w-full ml-10">
        <motion.button
          className="mb-6 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 bg-gray-700 hover:bg-gray-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-6 h-6 bg-primary/60 p-4 rounded-full flex items-center justify-center">
            <span className="text-white text-xl">
              {isSidebarOpen ? (
                <ChevronLeftIcon size={24} />
              ) : (
                <ChevronRightIcon size={24} />
              )}
            </span>
          </div>
        </motion.button>
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-r-lg"></div>
      
      {/* Animated Indicator Line */}
      <motion.div
        className="absolute left-0 w-1 h-12 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full transition-transform duration-300"
        style={{ 
          transform: `translateY(${isSidebarOpen ? indicatorPosition : indicatorPosition + 15}px)` 
        }}
        animate={{ 
          boxShadow: selectedItem ? "0 0 20px rgba(59, 130, 246, 0.5)" : "none"
        }}
      />

      {/* Navigation Items */}
      <div className="flex-1 w-full">
        {config.navigation.items.map((item, index) => {
          const itemIsActive = isActive(item) || selectedItem === item.id;
          
          return (
            <motion.div 
              key={item.id} 
              className="flex items-center gap-3 mb-6 w-full ml-7 cursor-pointer" 
              onClick={() => {
                handleNavigate(item);
                setSelectedItem(item.id);
              }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.4,
                ease: "easeOut"
              }}
            >
              <motion.button
                className={`rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                  (itemIsActive && !isSidebarOpen)
                  ? 'size-20 ml-2 bg-gradient-to-br from-blue-400 to-purple-500 shadow-lg shadow-purple-500/50'
                  : 'size-12 bg-gray-700 hover:bg-gray-600'
                }`}
                whileHover={{ 
                  scale: itemIsActive && !isSidebarOpen ? 1.02 : 1.05,
                  rotate: itemIsActive ? 0 : 5
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`${
                    (itemIsActive && !isSidebarOpen) ? 'size-[4.8rem]' : 'size-[2.8rem]'
                  } bg-gray-800 rounded-full flex items-center justify-center`}
                >
                  <div className={`${
                    (itemIsActive && !isSidebarOpen) ? 'size-[4.6rem]' : 'size-[2.8rem]'
                  } flex items-center justify-center`}>
                    {item.icon ? (
                      typeof item.icon === 'string' ? (
                        // Render image
                        <img 
                          src={item.icon}
                          alt={item.name}
                          className={`${
                            (itemIsActive && !isSidebarOpen) ? 'size-[4.4rem]' : 'size-[2.6rem]'
                          } rounded-full object-cover transition-all duration-300`}
                          style={{
                            filter: itemIsActive 
                              ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.2))' 
                              : 'none'
                          }}
                        />
                      ) : React.isValidElement(item.icon) ? (
                        // Render React icon component
                        <div 
                          className={`${
                            (itemIsActive && !isSidebarOpen) ? 'size-[4.4rem]' : 'size-[2.6rem]'
                          } bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center transition-all duration-300`}
                          style={{
                            background: itemIsActive 
                              ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' 
                              : 'linear-gradient(135deg, #374151, #1f2937)',
                            boxShadow: itemIsActive 
                              ? '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)' 
                              : 'none'
                          }}
                        >
                          <div className={`${
                            (itemIsActive && !isSidebarOpen) ? 'size-[3.8rem]' : 'size-[2.2rem]'
                          } flex items-center justify-center text-white`}>
                            {item.icon}
                          </div>
                        </div>
                      ) : null
                    ) : (
                      // Placeholder for when no icon is provided
                      <div 
                        className={`${
                          (itemIsActive && !isSidebarOpen) ? 'size-[4.4rem]' : 'size-[2.6rem]'
                        } bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-80 transition-all duration-300`}
                        style={{
                          boxShadow: itemIsActive 
                            ? '0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.2)' 
                            : 'none'
                        }}
                      />
                    )}
                  </div>
                </div>
              </motion.button>
              
              {isSidebarOpen && (
                <motion.span 
                  className={`text-white cursor-pointer text-sm mt-2 ${
                    (itemIsActive && isSidebarOpen) 
                    ? "font-bold py-1 px-3 rounded-lg bg-gradient-to-tl from-blue-400 to-purple-500 bg-opacity-60 text-white" 
                    : ""
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.name}
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  if (!children) {
    // Preview mode
    return (
      <div className="bg-base-100 rounded-xl overflow-hidden border border-base-300 h-[28rem]">
        <div className="flex h-full">
          {sidebarContent}
          
          {/* Demo content area */}
          <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 pl-12 pr-6 py-6 overflow-hidden relative">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
            <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500/20 rounded-full blur-xl" />
            
            <div className="relative h-full">
              <h2 className="text-2xl font-bold text-white mb-6">Modelosaurus Dashboard</h2>
              
              {/* Feature cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { title: 'Tech-Focused', desc: 'Built for ML & AI platforms', icon: '🔬' },
                  { title: 'Gradient Effects', desc: 'Beautiful animations & glows', icon: '✨' },
                  { title: 'Image Icons', desc: 'Custom visual elements', icon: '🖼️' },
                  { title: 'Dark Theme', desc: 'Modern professional look', icon: '🌙' }
                ].map((feature, index) => (
                  <div key={index} className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-3 flex items-center justify-center text-lg">
                      {feature.icon}
                    </div>
                    <h4 className="text-white font-semibold mb-1 text-sm">{feature.title}</h4>
                    <p className="text-gray-300 text-xs">{feature.desc}</p>
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
    <div className="relative flex min-h-[100vh] overflow-hidden">
      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {sidebarContent}

      {/* Content Area */}
      <div
        className={`relative flex-grow overflow-y-scroll overflow-x-hidden h-screen p-10 lg:px-28 sm:px-16 transition-all duration-300 ${
          isSidebarOpen ? 'pointer-events-none' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModelosaurusSidebar;