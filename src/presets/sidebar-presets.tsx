import type { SidebarConfig } from '../types/sidebar-config';
import { 
  Home, 
  BarChart3, 
  Settings, 
  Users, 
  FileText,
  User,
  Wrench,
  Calendar,
  Building,
  Shield
} from 'lucide-react';

// Import Modelosaurus images
import dashboard from '../assets/modelosaurus-icons/dashboard.png';
import build from '../assets/modelosaurus-icons/build.png';
import learn from '../assets/modelosaurus-icons/learn.png';
import model from '../assets/modelosaurus-icons/model.png';
import robot from '../assets/modelosaurus-icons/robot.png';
import chip from '../assets/modelosaurus-icons/chip.png';
import setting from '../assets/modelosaurus-icons/setting.png';

// Modelosaurus Config (Classic Layout, Dark Gradients, Tech-focused)
export const modelosaurusConfig: SidebarConfig = {
  id: 'modelosaurus',
  name: 'Modelosaurus',
  description: 'Gradients, dark, sleek and modern',
  layout: 'classic',
  navigation: {
    strategy: 'react-router',
    items: [
      { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: dashboard, section: 'main' },
      { id: 'fine-tuning', name: 'Fine Tuning', path: '/finetune', icon: build, section: 'main' },
      { id: 'datasets', name: 'Datasets', path: '/upload-dataset', icon: learn, section: 'main' },
      { id: 'models', name: 'Finetuned Models', path: '/models', icon: model, section: 'main' },
      { id: 'custom-models', name: 'Custom Models', path: '/custom-models', icon: robot, section: 'main' },
      { id: 'visualization', name: 'Visualization', path: '/visualize-layers', icon: chip, section: 'main' },
      { id: 'settings', name: 'Settings', path: '/settings', icon: setting, section: 'footer' },
    ],
  },
  theme: {
    name: 'modelosaurus',
    colors: {
      primary: '#683895',
      secondary: '#07ABBD',
      background: '#1D203E',
      text: '#ffffff',
      accent: '#393D5E',
      gradient: {
        from: '#3b82f6',
        to: '#8b5cf6',
        direction: 'to-br',
      },
    },
    daisyUITheme: 'modelosaurus',
  },
  icons: {
    library: 'custom-images',
    size: 32,
    className: 'w-full h-full',
  },
  behavior: {
    collapsible: true,
    defaultExpanded: false,
    persistState: true,
    allowTooltips: true,
    mobileDrawer: true,
    overlayOnExpand: true,
  },
  branding: {
    title: 'Modelosaurus',
    showInCollapsed: false,
  },
  animations: {
    enabled: true,
    duration: 300,
    stagger: true,
    customTransitions: {
      expand: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      itemHover: 'all 0.15s ease-in-out',
    },
  },
};

// Corporate Config (Centered Layout, Professional, Role-based)
export const corporateConfig: SidebarConfig = {
  id: 'corporate',
  name: 'Corporate',
  description: 'Light, modern, simple, role based access',
  layout: 'centered',
  navigation: {
    strategy: 'react-router',
    items: [
      { id: 'home', name: 'Home', path: '/home', icon: <Home className="w-6 h-6" />, section: 'main' },
      { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: <BarChart3 className="w-6 h-6" />, section: 'main' },
      { id: 'statistics', name: 'Statistics', path: '/grafana-dashboard', icon: <BarChart3 className="w-6 h-6" />, section: 'main' },
      { id: 'applications', name: 'Applications', path: '/applications', icon: <Building className="w-6 h-6" />, section: 'main' },
      { id: 'users', name: 'Users', path: '/users', icon: <Users className="w-6 h-6" />, section: 'main' },
      { id: 'profile', name: 'Profile', path: '/profile', icon: <User className="w-6 h-6" />, section: 'footer' },
    ],
  },
  theme: {
    name: 'corporate',
    colors: {
      primary: '#0068ff',
      secondary: '#0040ff',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#AE4AFF',
    },
    daisyUITheme: 'blackgate',
  },
  icons: {
    library: 'lucide',
    variant: 'outline',
    size: 'md',
  },
  behavior: {
    collapsible: true,
    defaultExpanded: false,
    persistState: true,
    mobileDrawer: true,
  },
  branding: {
    title: 'BlackGate',
    showInCollapsed: false,
  },
  user: {
    showLogout: true,
    avatar: {
      showName: true,
    },
  },
};

// Sakura Config (Centered Layout, Educational, Pastel Pink Theme)
export const sakuraConfig: SidebarConfig = {
  id: 'sakura',
  name: 'Sakura',
  description: 'Pink, girly',
  layout: 'centered',
  navigation: {
    strategy: 'react-router',
    items: [
      { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: <BarChart3 className="w-6 h-6" />, section: 'main' },
      { id: 'courses', name: 'Courses', path: '/courses', icon: <FileText className="w-6 h-6" />, section: 'main' },
      { id: 'code-editor', name: 'Code Editor', path: '/code', icon: <Settings className="w-6 h-6" />, section: 'main' },
      { id: 'settings', name: 'Settings', path: '/settings', icon: <Settings className="w-6 h-6" />, section: 'main' },
      { id: 'profile', name: 'Profile', path: '/profile', icon: <User className="w-6 h-6" />, section: 'footer' },
    ],
  },
  theme: {
    name: 'sakura',
    colors: {
      primary: '#ec4899',
      secondary: '#f3e8ff',
      background: '#fdf2f8',
      text: '#831843',
      accent: '#f9a8d4',
    },
    daisyUITheme: 'sakura',
  },
  icons: {
    library: 'heroicons',
    variant: 'outline',
    size: 'md',
  },
  behavior: {
    collapsible: true,
    defaultExpanded: false,
    persistState: true,
    mobileDrawer: true,
    overlayOnExpand: true,
  },
  branding: {
    title: 'CodeQuest',
    showInCollapsed: false,
  },
  user: {
    showLogout: true,
    avatar: {
      showName: true,
    },
  },
};

// ERP Config (Centered Layout, Complex Role-based, Tooltips)
export const erpConfig: SidebarConfig = {
  id: 'erp',
  name: 'ERP',
  description: 'Complex role based systems, tooltips, fast navigation',
  layout: 'centered',
  navigation: {
    strategy: 'react-router',
    items: [
      { id: 'home', name: 'Home', path: '/home', icon: <Home className="w-6 h-6" />, section: 'main' },
      { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: <BarChart3 className="w-6 h-6" />, section: 'main' },
      { id: 'companies', name: 'Companies', path: '/companies', icon: <Building className="w-6 h-6" />, section: 'main' },
      { id: 'bookings', name: 'Bookings', path: '/bookings', icon: <Calendar className="w-6 h-6" />, section: 'main' },
      { id: 'work-permits', name: 'Work Permits', path: '/work-permits', icon: <FileText className="w-6 h-6" />, section: 'main' },
      { id: 'services', name: 'Services', path: '/services', icon: <Wrench className="w-6 h-6" />, section: 'main' },
    ],
  },
  theme: {
    name: 'erp',
    colors: {
      primary: '#87b37a',
      secondary: '#4c6663',
      background: '#ffffff',
      text: '#064e3b',
      accent: '#2a1e5c',
    },
    daisyUITheme: 'nstp',
  },
  icons: {
    library: 'heroicons',
    variant: 'outline',
    size: 'md',
  },
  behavior: {
    collapsible: true,
    defaultExpanded: false,
    persistState: true,
    allowTooltips: true,
    mobileDrawer: true,
  },
  branding: {
    title: 'NSTP',
    showInCollapsed: false,
  },
  user: {
    showLogout: true,
    avatar: {
      showName: true,
    },
    currentRole: 'admin',
    availableRoles: ['admin', 'receptionist', 'tenant'],
  },
};

// Dynamo Config (Modern, Balanced, Flexible)
export const dynamoConfig: SidebarConfig = {
  id: 'dynamo',
  name: 'Dynamo',
  description: 'Modern, dynamic, balanced design for general use',
  layout: 'classic',
  navigation: {
    strategy: 'react-router',
    items: [
      { id: 'dashboard', name: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" />, section: 'main' },
      { id: 'analytics', name: 'Analytics', path: '/analytics', icon: <BarChart3 className="w-5 h-5" />, section: 'main' },
      { id: 'users', name: 'Users', path: '/users', icon: <Users className="w-5 h-5" />, section: 'main' },
      { id: 'documents', name: 'Documents', path: '/documents', icon: <FileText className="w-5 h-5" />, section: 'main' },
      { id: 'settings', name: 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" />, section: 'footer' },
    ],
  },
  theme: {
    name: 'dynamo',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      background: '#1f2937',
      text: '#ffffff',
      gradient: {
        from: '#3b82f6',
        to: '#8b5cf6',
        direction: 'to-br',
      },
    },
  },
  icons: {
    library: 'lucide',
    size: 'md',
  },
  behavior: {
    collapsible: true,
    defaultExpanded: false,
    persistState: true,
    allowTooltips: true,
    mobileDrawer: true,
  },
  branding: {
    title: 'Sidelined',
    showInCollapsed: false,
  },
  user: {
    showLogout: true,
    avatar: {
      showName: true,
    },
  },
  animations: {
    enabled: true,
    duration: 300,
    easing: 'ease-in-out',
  },
};

// Export all configs
export const sidebarPresets = {
  modelosaurus: modelosaurusConfig,
  corporate: corporateConfig,
  sakura: sakuraConfig,
  erp: erpConfig,
  dynamo: dynamoConfig,
};

// Helper function to create custom sidebar based on preset
export const createCustomSidebar = (
  basePreset: keyof typeof sidebarPresets,
  customConfig: Partial<SidebarConfig>
): SidebarConfig => {
  const base = sidebarPresets[basePreset];
  return {
    ...base,
    ...customConfig,
    id: customConfig.id || `${base.id}-custom`,
    navigation: {
      ...base.navigation,
      ...customConfig.navigation,
      items: customConfig.navigation?.items || base.navigation.items,
    },
    theme: {
      ...base.theme,
      ...customConfig.theme,
      colors: {
        ...base.theme.colors,
        ...customConfig.theme?.colors,
      },
    },
    behavior: {
      ...base.behavior,
      ...customConfig.behavior,
    },
  };
};