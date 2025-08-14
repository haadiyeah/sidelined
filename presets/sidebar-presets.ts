import type {
  SidebarConfig,
  ModelosaurusConfig,
  CorporateConfig,
  SakuraConfig,
  ERPConfig,
} from '../src/types/sidebar-config';
import type { SidebarNavigationItem } from '../src/types/navigation';
import { themePresets } from './theme-presets';

/**
 * Default navigation items for different sidebar types
 */

// Modelosaurus sidebar navigation items
export const modelosaurusNavItems: SidebarNavigationItem[] = [
  { id: 'dashboard', name: 'Dashboard', path: '/dashboard', section: 'main' },
  { id: 'finetune', name: 'Fine Tuning', path: '/finetune', section: 'main' },
  { id: 'datasets', name: 'Datasets', path: '/upload-dataset', section: 'main' },
  { id: 'models', name: 'Finetuned Models', path: '/models', section: 'main' },
  { id: 'custom-models', name: 'Custom Models', path: '/custom-models', section: 'main' },
  { id: 'visualization', name: 'Visualization', path: '/visualize-layers', section: 'main' },
  { id: 'settings', name: 'Settings', path: '/settings', section: 'footer' },
];

// Corporate sidebar navigation items with role-based access
export const corporateNavItems: SidebarNavigationItem[] = [
  { id: 'dashboard', name: 'Dashboard', path: '/admin/dashboard', section: 'main', requiresRole: ['admin'] },
  { id: 'statistics', name: 'Statistics', path: '/admin/grafana-dashboard', section: 'main', requiresRole: ['admin'] },
  { id: 'applications', name: 'Applications', path: '/admin/applications', section: 'main', requiresRole: ['admin'] },
  { id: 'users', name: 'Users', path: '/admin/users', section: 'main', requiresRole: ['admin'] },
  { id: 'requests', name: 'Requests', path: '/admin/requests', section: 'main', requiresRole: ['admin'] },
  { id: 'user-dashboard', name: 'Dashboard', path: '/user/grafana-dashboard', section: 'main', requiresRole: ['user'] },
  { id: 'user-applications', name: 'Applications', path: '/user/dashboard', section: 'main', requiresRole: ['user'] },
  { id: 'device-dashboard', name: 'Dashboard', path: '/device/dashboard', section: 'main', requiresRole: ['device'] },
  { id: 'test-dashboard', name: 'Dashboard', path: '/test/home', section: 'main', requiresRole: ['test'] },
  { id: 'profile', name: 'Profile', path: '/profile', section: 'footer' },
];

// Sakura sidebar navigation items
export const sakuraNavItems: SidebarNavigationItem[] = [
  { id: 'home', name: 'CodeQuest', path: '/', section: 'header' },
  { id: 'dashboard', name: 'Dashboard', path: '/dashboard', section: 'main' },
  { id: 'courses', name: 'Courses', path: '/courses', section: 'main' },
  { id: 'code', name: 'Code Editor', path: '/code', section: 'main' },
  { id: 'settings', name: 'Settings', path: '/settings', section: 'main' },
  { id: 'profile', name: 'Profile', path: '/profile', section: 'footer' },
  { id: 'logout', name: 'Logout', path: '/logout', section: 'footer' },
];

// ERP sidebar navigation items with role-based sections
export const erpNavItems: SidebarNavigationItem[] = [
  // Receptionist items
  { id: 'receptionist-home', name: 'Home', path: '/receptionist/home', section: 'main', requiresRole: ['receptionist'] },
  { id: 'receptionist-dashboard', name: 'Dashboard', path: '/receptionist', section: 'main', requiresRole: ['receptionist'] },
  { id: 'bookings', name: 'Bookings', path: '/receptionist/bookings', section: 'main', requiresRole: ['receptionist'] },
  { id: 'complaints', name: 'Complaints', path: '/receptionist/complaints', section: 'main', requiresRole: ['receptionist'] },
  { id: 'gate-passes', name: 'Gate Passes', path: '/receptionist/gate-passes', section: 'main', requiresRole: ['receptionist'] },
  { id: 'work-permits', name: 'Work Permits', path: '/receptionist/work-permits', section: 'main', requiresRole: ['receptionist'] },
  { id: 'lost-found', name: 'Lost & Found', path: '/receptionist/lost-and-found', section: 'main', requiresRole: ['receptionist'] },
  { id: 'occurrences', name: 'Occurrences', path: '/receptionist/occurrences', section: 'main', requiresRole: ['receptionist'] },
  
  // Admin items
  { id: 'admin-home', name: 'Home', path: '/admin/home', section: 'main', requiresRole: ['admin'] },
  { id: 'admin-dashboard', name: 'Dashboard', path: '/admin', section: 'main', requiresRole: ['admin'] },
  { id: 'companies', name: 'Companies', path: '/admin/companies', section: 'main', requiresRole: ['admin'] },
  { id: 'etags', name: 'E-Tags', path: '/admin/etags', section: 'main', requiresRole: ['admin'] },
  { id: 'meeting-rooms', name: 'Meeting Rooms', path: '/admin/meeting-rooms', section: 'main', requiresRole: ['admin'] },
  { id: 'cards', name: 'Cards', path: '/admin/cards', section: 'main', requiresRole: ['admin'] },
  { id: 'services', name: 'Services', path: '/admin/services', section: 'main', requiresRole: ['admin'] },
  { id: 'opportunities', name: 'Opportunities', path: '/admin/opportunities', section: 'main', requiresRole: ['admin'] },
  { id: 'performance', name: 'Performance', path: '/admin/performance', section: 'main', requiresRole: ['admin'] },
  
  // Tenant items
  { id: 'tenant-home', name: 'Home', path: '/tenant/home', section: 'main', requiresRole: ['tenant'] },
  { id: 'tenant-dashboard', name: 'Dashboard', path: '/tenant', section: 'main', requiresRole: ['tenant'] },
  { id: 'employees', name: 'Employees', path: '/tenant/employees', section: 'main', requiresRole: ['tenant'] },
  { id: 'evaluations', name: 'Evaluations', path: '/tenant/evaluations', section: 'main', requiresRole: ['tenant'] },
  { id: 'parking', name: 'Parking', path: '/tenant/parking', section: 'main', requiresRole: ['tenant'] },
  
  // Common footer items
  { id: 'logout', name: 'Logout', path: '/logout', section: 'footer' },
];

/**
 * Predefined sidebar configurations
 */

export const modelosaurusConfig: ModelosaurusConfig = {
  id: 'modelosaurus',
  name: 'Modelosaurus',
  layout: 'classic',
  theme: themePresets.modelosaurus,
  navigation: {
    strategy: 'react-router',
    items: modelosaurusNavItems,
  },
  icons: {
    library: 'custom-images',
    size: 'lg',
  },
  behavior: {
    collapsible: true,
    defaultExpanded: false,
    persistState: true,
    allowTooltips: false,
    mobileDrawer: false,
    overlayOnExpand: true,
  },
  animations: {
    enabled: true,
    duration: 300,
    easing: 'ease-in-out',
    customTransitions: {
      expand: 'transition-all duration-300',
      collapse: 'transition-all duration-300',
      itemHover: 'transition-transform duration-300',
    },
  },
  customImages: {
    dashboard: '/assets/images/sidebar-icons/dashboard.png',
    build: '/assets/images/sidebar-icons/build.png',
    learn: '/assets/images/sidebar-icons/learn.png',
    model: '/assets/images/sidebar-icons/model.png',
    robot: '/assets/images/sidebar-icons/robot.png',
    chip: '/assets/images/sidebar-icons/chip.png',
    setting: '/assets/images/sidebar-icons/setting.png',
  },
};

export const corporateConfig: CorporateConfig = {
  id: 'corporate',
  name: 'Corporate',
  layout: 'centered',
  theme: themePresets.corporate,
  navigation: {
    strategy: 'react-router',
    items: corporateNavItems,
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
    allowTooltips: false,
    mobileDrawer: true,
    overlayOnExpand: false,
  },
  branding: {
    logo: {
      src: '/assets/logo.png',
      alt: 'BlackGate Logo',
      className: 'w-10 h-10',
    },
    title: 'BlackGate',
    showInCollapsed: false,
  },
  user: {
    showLogout: true,
  },
  roleBasedNavigation: {
    admin: corporateNavItems.filter(item => !item.requiresRole || item.requiresRole.includes('admin')),
    user: corporateNavItems.filter(item => !item.requiresRole || item.requiresRole.includes('user')),
    device: corporateNavItems.filter(item => !item.requiresRole || item.requiresRole.includes('device')),
    test: corporateNavItems.filter(item => !item.requiresRole || item.requiresRole.includes('test')),
  },
};

export const sakuraConfig: SakuraConfig = {
  id: 'sakura',
  name: 'Sakura',
  layout: 'centered',
  theme: themePresets.sakura,
  navigation: {
    strategy: 'react-router',
    items: sakuraNavItems,
  },
  icons: {
    library: 'heroicons',
    variant: 'outline',
    size: 'md',
  },
  behavior: {
    collapsible: true,
    defaultExpanded: false,
    persistState: false,
    allowTooltips: false,
    mobileDrawer: true,
    overlayOnExpand: true,
  },
  branding: {
    title: 'CodeQuest',
    showInCollapsed: false,
  },
  responsive: {
    mobileDrawer: true,
    hideOnMobile: false,
    compactOnTablet: true,
  },
};

export const erpConfig: ERPConfig = {
  id: 'erp',
  name: 'ERP',
  layout: 'centered',
  theme: themePresets.erp,
  navigation: {
    strategy: 'react-router',
    items: erpNavItems,
  },
  icons: {
    library: 'heroicons',
    variant: 'outline',
    size: 'md',
  },
  behavior: {
    collapsible: true,
    defaultExpanded: false,
    persistState: false,
    allowTooltips: true,
    mobileDrawer: true,
    overlayOnExpand: true,
  },
  branding: {
    logo: {
      src: '/assets/nstplogowhite.png',
      alt: 'NSTP Logo',
      className: 'w-12 h-auto mb-3',
    },
    showInCollapsed: true,
  },
  user: {
    showLogout: true,
  },
  tooltips: true,
  roleBasedNavigation: {
    receptionist: erpNavItems.filter(item => !item.requiresRole || item.requiresRole.includes('receptionist')),
    admin: erpNavItems.filter(item => !item.requiresRole || item.requiresRole.includes('admin')),
    tenant: erpNavItems.filter(item => !item.requiresRole || item.requiresRole.includes('tenant')),
  },
};

/**
 * Collection of all predefined sidebar configurations
 */
export const sidebarPresets = {
  modelosaurus: modelosaurusConfig,
  corporate: corporateConfig,
  sakura: sakuraConfig,
  erp: erpConfig,
};

/**
 * Get sidebar preset by name
 */
export function getSidebarPreset(name: string): SidebarConfig | undefined {
  return sidebarPresets[name as keyof typeof sidebarPresets];
}

/**
 * Get all available sidebar preset names
 */
export function getAvailableSidebarPresets(): string[] {
  return Object.keys(sidebarPresets);
}

/**
 * Create a custom sidebar configuration based on a preset with overrides
 */
export function createCustomSidebar(
  baseName: string,
  overrides: Partial<SidebarConfig>
): SidebarConfig {
  const baseConfig = getSidebarPreset(baseName);
  if (!baseConfig) {
    throw new Error(`Unknown sidebar preset: ${baseName}`);
  }

  return {
    ...baseConfig,
    ...overrides,
    navigation: {
      ...baseConfig.navigation,
      ...overrides.navigation,
      items: overrides.navigation?.items || baseConfig.navigation.items,
    },
    theme: {
      ...baseConfig.theme,
      ...overrides.theme,
      colors: {
        ...baseConfig.theme.colors,
        ...overrides.theme?.colors,
      },
    },
    behavior: {
      ...baseConfig.behavior,
      ...overrides.behavior,
    },
  };
}