import type { ReactNode } from 'react';

// Base navigation strategy from routing solution
export type NavigationStrategy = 'react-router' | 'next' | 'custom' | 'href';

// Base navigation item interface
export interface NavigationItem {
  id: string;
  name: string;
  path: string;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

// Extended navigation item for sidebar-specific features
export interface SidebarNavigationItem extends NavigationItem {
  tooltip?: string;
  requiresRole?: string[];
  section?: 'main' | 'header' | 'footer';
  className?: string;
}

// Navigation configuration from routing solution
export interface NavigationConfig {
  strategy: NavigationStrategy;
  baseUrl?: string;
  items: SidebarNavigationItem[];
  onNavigate?: (item: SidebarNavigationItem) => void;
}

// Icon library configuration
export interface IconConfig {
  library: 'heroicons' | 'lucide' | 'custom-images';
  variant?: 'outline' | 'solid' | 'mini'; // For heroicons
  size?: 'sm' | 'md' | 'lg' | number;
  className?: string;
}

// Color scheme configuration
export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent?: string;
  gradient?: {
    from: string;
    to: string;
    direction?: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-br' | 'to-bl' | 'to-tr' | 'to-tl';
  };
}

// Theme configuration
export interface ThemeConfig {
  name: string;
  colors: ColorScheme;
  daisyUITheme?: string;
  customCSS?: string;
}

// Layout types based on CLAUDE.md specifications
export type SidebarLayout = 'classic' | 'centered' | 'mailbox';

// Behavior configuration
export interface BehaviorConfig {
  collapsible: boolean;
  defaultExpanded?: boolean;
  persistState?: boolean;
  closeOnNavigate?: boolean;
  allowTooltips?: boolean;
  mobileDrawer?: boolean;
  overlayOnExpand?: boolean;
}

// Branding configuration
export interface BrandingConfig {
  logo?: {
    src: string;
    alt: string;
    className?: string;
  };
  title?: string;
  subtitle?: string;
  showInCollapsed?: boolean;
}

// User/Role configuration
export interface UserConfig {
  currentRole?: string;
  availableRoles?: string[];
  avatar?: {
    src?: string;
    initials?: string;
    showName?: boolean;
  };
  showLogout?: boolean;
  onLogout?: () => void | Promise<void>;
}

// Animation configuration
export interface AnimationConfig {
  enabled: boolean;
  duration?: number;
  easing?: string;
  stagger?: boolean;
  customTransitions?: {
    expand?: string;
    collapse?: string;
    itemHover?: string;
  };
}

// Responsive configuration
export interface ResponsiveConfig {
  breakpoints?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  mobileDrawer?: boolean;
  hideOnMobile?: boolean;
  compactOnTablet?: boolean;
}

// Custom styling configuration
export interface StylingConfig {
  customClasses?: {
    container?: string;
    header?: string;
    navigation?: string;
    footer?: string;
    item?: string;
    activeItem?: string;
  };
  customStyles?: {
    container?: React.CSSProperties;
    item?: React.CSSProperties;
  };
}

// Main sidebar configuration interface
export interface SidebarConfig {
  // Core configuration
  id: string;
  name: string;
  layout: SidebarLayout;
  
  // Navigation (integrates routing solution)
  navigation: NavigationConfig;
  
  // Appearance
  theme: ThemeConfig;
  icons: IconConfig;
  branding?: BrandingConfig;
  
  // Behavior
  behavior: BehaviorConfig;
  
  // User/Role management
  user?: UserConfig;
  
  // Advanced features
  animations?: AnimationConfig;
  responsive?: ResponsiveConfig;
  styling?: StylingConfig;
  
  // Custom props
  customProps?: Record<string, any>;
}

// Predefined theme presets
export interface ThemePreset {
  modelosaurus: ThemeConfig;
  corporate: ThemeConfig;
  sakura: ThemeConfig;
  erp: ThemeConfig;
}

// Configuration for specific sidebar types
export interface ModelosaurusConfig extends Omit<SidebarConfig, 'theme' | 'layout'> {
  layout: 'classic';
  theme: ThemePreset['modelosaurus'];
  customImages?: {
    [key: string]: string;
  };
}

export interface CorporateConfig extends Omit<SidebarConfig, 'theme' | 'layout'> {
  layout: 'centered';
  theme: ThemePreset['corporate'];
  roleBasedNavigation?: {
    [role: string]: SidebarNavigationItem[];
  };
}

export interface SakuraConfig extends Omit<SidebarConfig, 'theme' | 'layout'> {
  layout: 'centered';
  theme: ThemePreset['sakura'];
}

export interface ERPConfig extends Omit<SidebarConfig, 'theme' | 'layout'> {
  layout: 'centered';
  theme: ThemePreset['erp'];
  roleBasedNavigation?: {
    [role: string]: SidebarNavigationItem[];
  };
  tooltips?: boolean;
}

// Configuration builder helper types
export interface SidebarConfigBuilder {
  setLayout(layout: SidebarLayout): SidebarConfigBuilder;
  setTheme(theme: ThemeConfig): SidebarConfigBuilder;
  setNavigation(navigation: NavigationConfig): SidebarConfigBuilder;
  setBehavior(behavior: Partial<BehaviorConfig>): SidebarConfigBuilder;
  setBranding(branding: BrandingConfig): SidebarConfigBuilder;
  setUser(user: UserConfig): SidebarConfigBuilder;
  build(): SidebarConfig;
}

// Validation result types
export interface ConfigValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// Default configurations
export interface DefaultConfigs {
  base: Partial<SidebarConfig>;
  modelosaurus: ModelosaurusConfig;
  corporate: CorporateConfig;
  sakura: SakuraConfig;
  erp: ERPConfig;
}