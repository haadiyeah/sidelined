import { motion } from 'framer-motion';
import type { SidebarTheme } from '../types/sidebar-themes';
import { Check } from 'lucide-react';

interface SidebarPreviewCardProps {
  theme: SidebarTheme;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

const SidebarPreviewCard = ({ theme, isSelected, onClick, index }: SidebarPreviewCardProps) => {
  return (
    <motion.div
      className={`cursor-pointer group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl ${
        isSelected 
          ? 'transform scale-105' 
          : 'hover:scale-102'
      }`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      role="radio"
      aria-checked={isSelected}
      aria-label={`${theme.name} sidebar theme - ${theme.description}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className={`relative bg-base-200 rounded-2xl p-6 border-2 transition-all duration-300 ${
        isSelected 
          ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
          : 'border-transparent hover:border-primary/30'
      }`}>
        {/* Selection Indicator */}
        {isSelected && (
          <motion.div 
            className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <Check className="w-4 h-4 text-primary-content" />
          </motion.div>
        )}

        {/* Mini Sidebar Preview */}
        <div className="h-32 mb-4 rounded-lg overflow-hidden relative" aria-hidden="true">
          <div 
            className="h-full w-12 rounded-lg flex flex-col gap-2 p-2"
            style={{ backgroundColor: theme.preview.backgroundColor }}
          >
            {/* Logo area */}
            <div className="w-8 h-6 bg-current opacity-20 rounded" style={{ color: theme.preview.textColor }} />
            
            {/* Menu items */}
            <div className="flex-1 space-y-1.5">
              {[1, 2, 3, 4].map((item) => (
                <div 
                  key={item}
                  className={`w-full h-2 rounded-sm transition-colors ${
                    item === 1 
                      ? 'bg-current opacity-90' 
                      : 'bg-current opacity-40'
                  }`}
                  style={{ 
                    color: item === 1 ? theme.preview.primaryColor : theme.preview.textColor 
                  }}
                />
              ))}
            </div>
            
            {/* User area */}
            <div className="w-6 h-6 bg-current opacity-30 rounded-full mx-auto" style={{ color: theme.preview.textColor }} />
          </div>
          
          {/* Gradient overlay for depth */}
          <div 
            className="absolute inset-0 rounded-lg opacity-10"
            style={{ 
              background: `linear-gradient(135deg, ${theme.preview.primaryColor}, ${theme.preview.secondaryColor})` 
            }}
          />
        </div>

        {/* Theme Info */}
        <div>
          <h3 className={`font-semibold text-base mb-1 transition-colors ${
            isSelected ? 'text-primary' : 'text-base-content'
          }`}>
            {theme.name}
          </h3>
          <p className="text-sm text-base-content/60 leading-relaxed">
            {theme.description}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="badge badge-sm badge-outline">{theme.layout}</span>
            <div className="flex gap-1">
              <div 
                className="w-3 h-3 rounded-full border border-base-300" 
                style={{ backgroundColor: theme.preview.primaryColor }}
                aria-label={`Primary color`}
              />
              <div 
                className="w-3 h-3 rounded-full border border-base-300" 
                style={{ backgroundColor: theme.preview.secondaryColor }}
                aria-label={`Secondary color`}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SidebarPreviewCard;