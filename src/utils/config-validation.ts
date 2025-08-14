import type {
  SidebarConfig,
  NavigationConfig,
  ThemeConfig,
  BehaviorConfig,
  SidebarNavigationItem,
  ConfigValidationResult,
  SidebarLayout,
  NavigationStrategy,
} from '../types/sidebar-config';

/**
 * Validates a navigation item configuration
 */
export function validateNavigationItem(item: SidebarNavigationItem): string[] {
  const errors: string[] = [];

  if (!item.id || item.id.trim() === '') {
    errors.push('Navigation item must have a non-empty id');
  }

  if (!item.name || item.name.trim() === '') {
    errors.push('Navigation item must have a non-empty name');
  }

  if (!item.path || item.path.trim() === '') {
    errors.push('Navigation item must have a non-empty path');
  }

  if (item.path && !item.path.startsWith('/') && !item.path.startsWith('http')) {
    errors.push(`Navigation item "${item.name}" path should start with "/" or "http"`);
  }

  return errors;
}

/**
 * Validates navigation configuration
 */
export function validateNavigation(navigation: NavigationConfig): string[] {
  const errors: string[] = [];

  if (!navigation.strategy) {
    errors.push('Navigation strategy is required');
  }

  const validStrategies: NavigationStrategy[] = ['react-router', 'next', 'custom', 'href'];
  if (navigation.strategy && !validStrategies.includes(navigation.strategy)) {
    errors.push(`Invalid navigation strategy: ${navigation.strategy}. Must be one of: ${validStrategies.join(', ')}`);
  }

  if (!navigation.items || navigation.items.length === 0) {
    errors.push('Navigation must have at least one item');
  }

  if (navigation.items) {
    navigation.items.forEach((item, index) => {
      const itemErrors = validateNavigationItem(item);
      errors.push(...itemErrors.map(error => `Navigation item ${index}: ${error}`));
    });

    // Check for duplicate IDs
    const ids = navigation.items.map(item => item.id);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
      errors.push(`Duplicate navigation item IDs found: ${duplicateIds.join(', ')}`);
    }
  }

  if (navigation.strategy === 'custom' && !navigation.onNavigate) {
    errors.push('Custom navigation strategy requires onNavigate callback');
  }

  return errors;
}

/**
 * Validates theme configuration
 */
export function validateTheme(theme: ThemeConfig): string[] {
  const errors: string[] = [];

  if (!theme.name || theme.name.trim() === '') {
    errors.push('Theme must have a non-empty name');
  }

  if (!theme.colors) {
    errors.push('Theme must have colors configuration');
    return errors;
  }

  // Validate required colors
  const requiredColors = ['primary', 'secondary', 'background', 'text'];
  requiredColors.forEach(color => {
    if (!theme.colors[color as keyof typeof theme.colors]) {
      errors.push(`Theme colors must include ${color}`);
    }
  });

  // Validate color format (basic check for CSS color values)
  const colorPattern = /^(#[0-9A-Fa-f]{3,8}|rgb|hsl|var|[a-z-]+).*$/;
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (key !== 'gradient' && typeof value === 'string' && !colorPattern.test(value)) {
      errors.push(`Invalid color format for ${key}: ${value}`);
    }
  });

  // Validate gradient configuration
  if (theme.colors.gradient) {
    if (!theme.colors.gradient.from || !theme.colors.gradient.to) {
      errors.push('Gradient must have both from and to colors');
    }
  }

  return errors;
}

/**
 * Validates behavior configuration
 */
export function validateBehavior(behavior: BehaviorConfig): string[] {
  const errors: string[] = [];

  if (typeof behavior.collapsible !== 'boolean') {
    errors.push('Behavior.collapsible must be a boolean');
  }

  if (behavior.defaultExpanded !== undefined && typeof behavior.defaultExpanded !== 'boolean') {
    errors.push('Behavior.defaultExpanded must be a boolean');
  }

  if (behavior.persistState !== undefined && typeof behavior.persistState !== 'boolean') {
    errors.push('Behavior.persistState must be a boolean');
  }

  return errors;
}

/**
 * Main validation function for sidebar configuration
 */
export function validateSidebarConfig(config: SidebarConfig): ConfigValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate required fields
  if (!config.id || config.id.trim() === '') {
    errors.push('Sidebar config must have a non-empty id');
  }

  if (!config.name || config.name.trim() === '') {
    errors.push('Sidebar config must have a non-empty name');
  }

  if (!config.layout) {
    errors.push('Sidebar config must specify a layout');
  }

  const validLayouts: SidebarLayout[] = ['classic', 'centered', 'mailbox'];
  if (config.layout && !validLayouts.includes(config.layout)) {
    errors.push(`Invalid layout: ${config.layout}. Must be one of: ${validLayouts.join(', ')}`);
  }

  // Validate navigation
  if (!config.navigation) {
    errors.push('Sidebar config must have navigation configuration');
  } else {
    const navigationErrors = validateNavigation(config.navigation);
    errors.push(...navigationErrors);
  }

  // Validate theme
  if (!config.theme) {
    errors.push('Sidebar config must have theme configuration');
  } else {
    const themeErrors = validateTheme(config.theme);
    errors.push(...themeErrors);
  }

  // Validate behavior
  if (!config.behavior) {
    errors.push('Sidebar config must have behavior configuration');
  } else {
    const behaviorErrors = validateBehavior(config.behavior);
    errors.push(...behaviorErrors);
  }

  // Validate icons
  if (!config.icons) {
    errors.push('Sidebar config must have icons configuration');
  } else {
    const validLibraries = ['heroicons', 'lucide', 'custom-images'];
    if (!validLibraries.includes(config.icons.library)) {
      errors.push(`Invalid icon library: ${config.icons.library}. Must be one of: ${validLibraries.join(', ')}`);
    }
  }

  // Warnings for optional but recommended fields
  if (!config.branding) {
    warnings.push('Consider adding branding configuration for better user experience');
  }

  if (!config.animations) {
    warnings.push('Consider adding animation configuration for smoother transitions');
  }

  if (!config.responsive) {
    warnings.push('Consider adding responsive configuration for better mobile experience');
  }

  // Layout-specific validations
  if (config.layout === 'mailbox' && config.navigation.items) {
    const hasSections = config.navigation.items.some(item => item.section);
    if (!hasSections) {
      warnings.push('Mailbox layout works best with sectioned navigation items');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Type guard to check if a config is valid
 */
export function isValidSidebarConfig(config: any): config is SidebarConfig {
  if (!config || typeof config !== 'object') return false;
  
  const result = validateSidebarConfig(config);
  return result.valid;
}

/**
 * Creates a default configuration with required fields
 */
export function createDefaultConfig(id: string, name: string): Partial<SidebarConfig> {
  return {
    id,
    name,
    layout: 'classic',
    navigation: {
      strategy: 'react-router',
      items: [],
    },
    theme: {
      name: 'default',
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        background: 'hsl(var(--background))',
        text: 'hsl(var(--foreground))',
      },
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
  };
}

/**
 * Deep merges configuration objects
 */
export function mergeConfigs(base: Partial<SidebarConfig>, override: Partial<SidebarConfig>): SidebarConfig {
  const merged = { ...base, ...override };
  
  // Deep merge nested objects
  if (base.theme && override.theme) {
    merged.theme = {
      ...base.theme,
      ...override.theme,
      colors: {
        ...base.theme.colors,
        ...override.theme.colors,
      },
    };
  }

  if (base.behavior && override.behavior) {
    merged.behavior = {
      ...base.behavior,
      ...override.behavior,
    };
  }

  if (base.navigation && override.navigation) {
    merged.navigation = {
      ...base.navigation,
      ...override.navigation,
      items: override.navigation.items || base.navigation.items || [],
    };
  }

  return merged as SidebarConfig;
}

/**
 * Configuration builder class for fluent API
 */
export class SidebarConfigBuilder {
  private config: Partial<SidebarConfig>;

  constructor(id: string, name: string) {
    this.config = createDefaultConfig(id, name);
  }

  setLayout(layout: SidebarLayout): SidebarConfigBuilder {
    this.config.layout = layout;
    return this;
  }

  setTheme(theme: ThemeConfig): SidebarConfigBuilder {
    this.config.theme = theme;
    return this;
  }

  setNavigation(navigation: NavigationConfig): SidebarConfigBuilder {
    this.config.navigation = navigation;
    return this;
  }

  setBehavior(behavior: Partial<BehaviorConfig>): SidebarConfigBuilder {
    this.config.behavior = { ...this.config.behavior, ...behavior };
    return this;
  }

  setBranding(branding: any): SidebarConfigBuilder {
    this.config.branding = branding;
    return this;
  }

  setUser(user: any): SidebarConfigBuilder {
    this.config.user = user;
    return this;
  }

  build(): SidebarConfig {
    const result = validateSidebarConfig(this.config as SidebarConfig);
    if (!result.valid) {
      throw new Error(`Invalid sidebar configuration: ${result.errors.join(', ')}`);
    }
    return this.config as SidebarConfig;
  }
}