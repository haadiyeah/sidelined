import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Palette, Settings, Code, Check, AlertCircle } from 'lucide-react';
import { sidebarThemes } from '../data/sidebar-themes';
import type { SidebarTheme } from '../types/sidebar-themes';
import SidebarPreviewCard from '../components/SidebarPreviewCard';
import SidebarLivePreview from '../components/SidebarLivePreview';
import { useNavigate } from 'react-router-dom';

const ConfiguratorStepOne = () => {
  const [selectedTheme, setSelectedTheme] = useState<SidebarTheme | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [themesLoaded, setThemesLoaded] = useState(false);
  const navigate = useNavigate();

  // Initialize themes loading
  useEffect(() => {
    const loadThemes = async () => {
      try {
        // Simulate loading themes (in real app, this might be an API call)
        await new Promise(resolve => setTimeout(resolve, 500));
        setThemesLoaded(true);
      } catch {
        setError('Failed to load sidebar themes. Please refresh the page.');
      }
    };
    
    loadThemes();
  }, []);

  const handleThemeSelect = (theme: SidebarTheme) => {
    try {
      setSelectedTheme(theme);
      setError(null);
      
      // Scroll to preview section
      setTimeout(() => {
        const previewElement = document.querySelector('[data-preview-section]');
        if (previewElement) {
          previewElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center'
          });
        }
      }, 100);
      
      // Announce selection to screen readers
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Selected ${theme.name} sidebar theme`;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    } catch {
      setError('Failed to select theme. Please try again.');
    }
  };

  const handleContinue = useCallback(async () => {
    if (!selectedTheme) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate('/configurator/step-two', { 
        state: { selectedTheme } 
      });
    } catch {
      setError('Failed to proceed to next step. Please try again.');
      setIsLoading(false);
    }
  }, [selectedTheme, navigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && selectedTheme && !isLoading) {
        handleContinue();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedTheme, isLoading, handleContinue]);

  // Show loading state while themes are loading
  if (!themesLoaded && !error) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/60">Loading sidebar themes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 flex">
      {/* Error Alert */}
      {error && (
        <motion.div 
          className="fixed top-4 right-4 z-50 alert alert-error max-w-sm"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
          <button 
            className="btn btn-sm btn-ghost"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* Steps Sidebar */}
      <div className="w-80 bg-base-200 p-8 flex flex-col">
        <div className="mb-12">
          <h1 className="text-2xl font-bold text-base-content mb-2">Sidelined</h1>
          <p className="text-base-content/60 text-sm">Create your perfect sidebar in 3 simple steps</p>
        </div>

        {/* Steps */}
        <div className="flex-1">
          <div className="space-y-6">
            {/* Step 1 - Active */}
            <motion.div 
              className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-primary">Select Base Sidebar</h3>
                <p className="text-sm text-base-content/60">Choose your preferred style</p>
              </div>
              <Palette className="w-5 h-5 text-primary ml-auto" />
            </motion.div>

            {/* Step 2 - Inactive */}
            <motion.div 
              className="flex items-center gap-4 p-4 rounded-xl bg-base-300/50"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-base-content/50 font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-base-content/50">Customize Sidebar</h3>
                <p className="text-sm text-base-content/40">Adjust colors and items</p>
              </div>
              <Settings className="w-5 h-5 text-base-content/50 ml-auto" />
            </motion.div>

            {/* Step 3 - Inactive */}
            <motion.div 
              className="flex items-center gap-4 p-4 rounded-xl bg-base-300/50"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center text-base-content/50 font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-base-content/50">Get Integration Code</h3>
                <p className="text-sm text-base-content/40">Copy and integrate</p>
              </div>
              <Code className="w-5 h-5 text-base-content/50 ml-auto" />
            </motion.div>
          </div>
        </div>

        {/* Continue Button */}
        <motion.button
          className={`btn w-full mt-8 ${
            selectedTheme 
              ? 'btn-primary' 
              : 'btn-disabled'
          }`}
          onClick={handleContinue}
          disabled={!selectedTheme || isLoading}
          whileHover={selectedTheme ? { scale: 1.02 } : {}}
          whileTap={selectedTheme ? { scale: 0.98 } : {}}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <>
              Continue to Customization
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-base-content mb-2">Choose Your Base Sidebar</h2>
            <p className="text-base-content/60">Select a sidebar style that matches your application's design. You'll customize it in the next step.</p>
          </div>

          {/* Theme Selection Grid */}
          <div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            role="radiogroup"
            aria-label="Select sidebar theme"
          >
            {sidebarThemes.map((theme, index) => (
              <SidebarPreviewCard
                key={theme.id}
                theme={theme}
                isSelected={selectedTheme?.id === theme.id}
                onClick={() => handleThemeSelect(theme)}
                index={index}
              />
            ))}
          </div>

          {/* Live Preview */}
          {selectedTheme && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-base-200 rounded-2xl p-6"
              data-preview-section
            >
              <div className="flex items-center gap-3 mb-4">
                <Check className="w-5 h-5 text-success" />
                <h3 className="text-xl font-semibold text-base-content">
                  {selectedTheme.name} Preview
                </h3>
                <span className="badge badge-primary badge-sm">{selectedTheme.layout} layout</span>
              </div>
              <p className="text-base-content/60 mb-6">{selectedTheme.description}</p>
              
              <SidebarLivePreview theme={selectedTheme} />
            </motion.div>
          )}

          {!selectedTheme && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-base-200 rounded-2xl p-12 text-center"
            >
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-base-content mb-2">Select a sidebar to preview</h3>
              <p className="text-base-content/60">Choose one of the sidebar styles above to see a live preview</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorStepOne;
