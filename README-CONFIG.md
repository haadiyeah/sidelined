# Sidelined Sidebar Configuration

A comprehensive configuration system for customizable, beautiful, responsive React sidebars. This documentation covers the complete TypeScript configuration object that powers all Sidelined sidebars.

## Table of Contents

- [Quick Start](#quick-start)
- [Core Configuration](#core-configuration)
- [Navigation System](#navigation-system)
- [Theme Configuration](#theme-configuration)
- [Behavior Configuration](#behavior-configuration)
- [Layout Types](#layout-types)
- [Predefined Presets](#predefined-presets)
- [Advanced Features](#advanced-features)
- [Validation](#validation)
- [Migration Guide](#migration-guide)

## Quick Start

```typescript
import { SidebarConfig } from './types/sidebar-config';
import { modelosaurusConfig } from './presets/sidebar-presets';

// Use a preset
const config = modelosaurusConfig;

// Or create custom configuration
const customConfig: SidebarConfig = {
  id: 'my-sidebar',
  name: 'My Custom Sidebar',
  layout: 'classic',
  navigation: {
    strategy: 'react-router',
    items: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon />,
        section: 'main',
      },
      {
        id: 'settings',
        name: 'Settings',
        path: '/settings',
        icon: <SettingsIcon />,
        section: 'footer',
      },
    ],
  },
  theme: {
    name: 'custom',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      background: '#1f2937',
      text: '#ffffff',
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
  },
};
```

## Core Configuration

### `SidebarConfig` Interface

The main configuration object that defines all sidebar properties:

```typescript
interface SidebarConfig {
  // Required fields
  id: string;                    // Unique identifier
  name: string;                  // Display name
  layout: SidebarLayout;         // Layout type
  navigation: NavigationConfig;   // Navigation setup
  theme: ThemeConfig;            // Visual theme
  icons: IconConfig;             // Icon configuration
  behavior: BehaviorConfig;      // Behavior settings
  
  // Optional fields
  branding?: BrandingConfig;     // Logo and branding
  user?: UserConfig;             // User/role management
  animations?: AnimationConfig;  // Animation settings
  responsive?: ResponsiveConfig; // Responsive behavior
  styling?: StylingConfig;       // Custom styling
  customProps?: Record<string, any>; // Custom properties
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier for the sidebar instance |
| `name` | `string` | Human-readable name for the sidebar |
| `layout` | `SidebarLayout` | Layout type: `'classic'` \| `'centered'` \| `'mailbox'` |
| `navigation` | `NavigationConfig` | Navigation configuration object |
| `theme` | `ThemeConfig` | Theme and color configuration |
| `icons` | `IconConfig` | Icon library and settings |
| `behavior` | `BehaviorConfig` | Sidebar behavior settings |

## Navigation System

The navigation system supports multiple routing strategies and is designed to work across different React frameworks.

### `NavigationConfig` Interface

```typescript
interface NavigationConfig {
  strategy: 'react-router' | 'next' | 'custom' | 'href';
  baseUrl?: string;
  items: SidebarNavigationItem[];
  onNavigate?: (item: SidebarNavigationItem) => void;
}
```

### Navigation Strategies

1. **React Router** (`'react-router'`): Uses React Router's `useNavigate` hook
2. **Next.js** (`'next'`): Uses Next.js router
3. **Custom** (`'custom'`): Uses provided `onNavigate` callback
4. **Href** (`'href'`): Uses standard `window.location.href`

### `SidebarNavigationItem` Interface

```typescript
interface SidebarNavigationItem {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  path: string;                  // Navigation path
  icon?: ReactNode;              // Optional icon component
  badge?: string | number;       // Optional badge/counter
  disabled?: boolean;            // Disable the item
  tooltip?: string;              // Custom tooltip text
  requiresRole?: string[];       // Required user roles
  section?: 'main' | 'header' | 'footer'; // Section placement
  className?: string;            // Custom CSS classes
}
```

### Navigation Examples

#### Basic React Router Setup
```typescript
const navigation: NavigationConfig = {
  strategy: 'react-router',
  items: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon />,
      section: 'main',
    },
  ],
};
```

#### Next.js with Base URL
```typescript
const navigation: NavigationConfig = {
  strategy: 'next',
  baseUrl: process.env.NODE_ENV === 'production' ? '/myapp' : '',
  items: [
    {
      id: 'home',
      name: 'Home',
      path: '/home',
      icon: <HomeIcon />,
    },
  ],
};
```

#### Custom Navigation Handler
```typescript
const navigation: NavigationConfig = {
  strategy: 'custom',
  onNavigate: (item) => {
    // Custom navigation logic
    console.log(`Navigating to ${item.path}`);
    window.location.href = item.path;
  },
  items: [...],
};
```

#### Role-Based Navigation
```typescript
const navigation: NavigationConfig = {
  strategy: 'react-router',
  items: [
    {
      id: 'admin-panel',
      name: 'Admin Panel',
      path: '/admin',
      icon: <AdminIcon />,
      requiresRole: ['admin', 'superuser'],
    },
    {
      id: 'user-profile',
      name: 'Profile',
      path: '/profile',
      icon: <UserIcon />,
      // No role requirements - available to all users
    },
  ],
};
```

## Theme Configuration

### `ThemeConfig` Interface

```typescript
interface ThemeConfig {
  name: string;
  colors: ColorScheme;
  daisyUITheme?: string;
  customCSS?: string;
}

interface ColorScheme {
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
```

### Theme Examples

#### Basic Theme
```typescript
const theme: ThemeConfig = {
  name: 'corporate-blue',
  colors: {
    primary: '#3b82f6',
    secondary: '#1e40af',
    background: '#ffffff',
    text: '#1f2937',
    accent: '#f3f4f6',
  },
  daisyUITheme: 'corporate',
};
```

#### Theme with Gradient
```typescript
const theme: ThemeConfig = {
  name: 'gradient-dark',
  colors: {
    primary: '#8b5cf6',
    secondary: '#06b6d4',
    background: '#1f2937',
    text: '#ffffff',
    gradient: {
      from: '#8b5cf6',
      to: '#06b6d4',
      direction: 'to-br',
    },
  },
};
```

#### Theme with Custom CSS
```typescript
const theme: ThemeConfig = {
  name: 'custom-styled',
  colors: { /* ... */ },
  customCSS: `
    .sidebar-container {
      backdrop-filter: blur(10px);
    }
    .navigation-item:hover {
      transform: translateX(4px);
    }
  `,
};
```

## Behavior Configuration

### `BehaviorConfig` Interface

```typescript
interface BehaviorConfig {
  collapsible: boolean;          // Can sidebar be collapsed
  defaultExpanded?: boolean;     // Initial expansion state
  persistState?: boolean;        // Save state to localStorage
  closeOnNavigate?: boolean;     // Close on navigation (mobile)
  allowTooltips?: boolean;       // Show tooltips when collapsed
  mobileDrawer?: boolean;        // Use drawer on mobile
  overlayOnExpand?: boolean;     // Show overlay when expanded
}
```

### Behavior Examples

#### Auto-Collapsing Sidebar
```typescript
const behavior: BehaviorConfig = {
  collapsible: true,
  defaultExpanded: false,
  persistState: true,
  closeOnNavigate: false,
  allowTooltips: true,
  mobileDrawer: true,
  overlayOnExpand: false,
};
```

#### Always Expanded Sidebar
```typescript
const behavior: BehaviorConfig = {
  collapsible: false,
  defaultExpanded: true,
  persistState: false,
  mobileDrawer: true,
  allowTooltips: false,
};
```

## Layout Types

Sidelined supports three distinct layout types as specified in the project vision:

### 1. Classic Layout
- Top-aligned list of navigation items
- Logo/heading at the top
- Avatar/user info at the bottom
- Best for: General applications, dashboards

```typescript
const config: SidebarConfig = {
  layout: 'classic',
  // ... other config
};
```

### 2. Centered Layout  
- Centered list of navigation items
- Balanced vertical spacing
- Logo and user info evenly spaced
- Best for: Corporate applications, professional tools

```typescript
const config: SidebarConfig = {
  layout: 'centered',
  // ... other config
};
```

### 3. Mailbox Layout
- Horizontal sections with dividers
- Number badges for counts
- Categorized navigation groups
- Best for: Communication apps, content management

```typescript
const config: SidebarConfig = {
  layout: 'mailbox',
  navigation: {
    strategy: 'react-router',
    items: [
      {
        id: 'inbox',
        name: 'Inbox',
        path: '/inbox',
        badge: 12,
        section: 'main',
      },
      {
        id: 'sent',
        name: 'Sent',
        path: '/sent',
        badge: 5,
        section: 'main',
      },
    ],
  },
  // ... other config
};
```

## Icon Configuration

### `IconConfig` Interface

```typescript
interface IconConfig {
  library: 'heroicons' | 'lucide' | 'custom-images';
  variant?: 'outline' | 'solid' | 'mini';
  size?: 'sm' | 'md' | 'lg' | number;
  className?: string;
}
```

### Icon Examples

#### Heroicons Setup
```typescript
const icons: IconConfig = {
  library: 'heroicons',
  variant: 'outline',
  size: 'md',
  className: 'text-current',
};
```

#### Lucide Icons
```typescript
const icons: IconConfig = {
  library: 'lucide',
  size: 'lg',
};
```

#### Custom Images (like Modelosaurus)
```typescript
const icons: IconConfig = {
  library: 'custom-images',
  size: 48,
  className: 'mask mask-circle',
};
```

## Predefined Presets

Sidelined includes several predefined configurations based on existing sidebar designs:

### Available Presets

1. **Modelosaurus**: Dark, gradient-based, modern tech sidebar
2. **Corporate**: Professional, role-based corporate sidebar  
3. **Sakura**: Educational platform sidebar with pastel theme
4. **ERP**: Complex role-based system with tooltips

### Using Presets

```typescript
import { 
  modelosaurusConfig, 
  corporateConfig, 
  sakuraConfig, 
  erpConfig 
} from './presets/sidebar-presets';

// Use preset as-is
const config = modelosaurusConfig;

// Customize preset
const customConfig = {
  ...corporateConfig,
  theme: {
    ...corporateConfig.theme,
    colors: {
      ...corporateConfig.theme.colors,
      primary: '#ff6b6b', // Custom primary color
    },
  },
};
```

### Creating Custom Presets

```typescript
import { createCustomSidebar } from './presets/sidebar-presets';

const myConfig = createCustomSidebar('corporate', {
  name: 'My Corporate Sidebar',
  navigation: {
    strategy: 'next',
    items: myNavigationItems,
  },
});
```

## Advanced Features

### Branding Configuration

```typescript
interface BrandingConfig {
  logo?: {
    src: string;
    alt: string;
    className?: string;
  };
  title?: string;
  subtitle?: string;
  showInCollapsed?: boolean;
}
```

#### Example
```typescript
const branding: BrandingConfig = {
  logo: {
    src: '/assets/company-logo.png',
    alt: 'Company Logo',
    className: 'w-10 h-10',
  },
  title: 'Company Name',
  subtitle: 'Dashboard',
  showInCollapsed: false,
};
```

### User Configuration

```typescript
interface UserConfig {
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
```

#### Example
```typescript
const user: UserConfig = {
  currentRole: 'admin',
  availableRoles: ['admin', 'user'],
  avatar: {
    src: '/assets/user-avatar.jpg',
    showName: true,
  },
  showLogout: true,
  onLogout: async () => {
    await logoutUser();
    window.location.href = '/login';
  },
};
```

### Animation Configuration

```typescript
interface AnimationConfig {
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
```

#### Example
```typescript
const animations: AnimationConfig = {
  enabled: true,
  duration: 300,
  easing: 'ease-in-out',
  stagger: true,
  customTransitions: {
    expand: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    collapse: 'transform 0.2s ease-out',
    itemHover: 'all 0.15s ease-in-out',
  },
};
```

### Responsive Configuration

```typescript
interface ResponsiveConfig {
  breakpoints?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  mobileDrawer?: boolean;
  hideOnMobile?: boolean;
  compactOnTablet?: boolean;
}
```

## Validation

The configuration system includes comprehensive validation to catch errors early.

### Using Validation

```typescript
import { validateSidebarConfig, isValidSidebarConfig } from './utils/config-validation';

// Validate configuration
const result = validateSidebarConfig(myConfig);

if (!result.valid) {
  console.error('Configuration errors:', result.errors);
  console.warn('Configuration warnings:', result.warnings);
}

// Type guard
if (isValidSidebarConfig(myConfig)) {
  // TypeScript knows myConfig is valid here
}
```

### Configuration Builder

For complex configurations, use the builder pattern:

```typescript
import { SidebarConfigBuilder } from './utils/config-validation';

const config = new SidebarConfigBuilder('my-sidebar', 'My Sidebar')
  .setLayout('classic')
  .setTheme(myTheme)
  .setNavigation(myNavigation)
  .setBehavior({ collapsible: true, defaultExpanded: false })
  .setBranding(myBranding)
  .build(); // Throws error if invalid
```

## Migration Guide

### From Hardcoded Sidebars

If you're migrating from the original hardcoded sidebars:

1. **Identify your current sidebar type** (Modelosaurus, Corporate, Sakura, or ERP)
2. **Start with the corresponding preset**
3. **Customize navigation items** to match your current setup
4. **Adjust theme colors** if needed
5. **Update imports and component usage**

#### Example Migration

**Before (Modelosaurus):**
```typescript
import Sidebar from './sidebars/Modelosaurus';

const sidebarItems = [
  { id: 1, name: 'Dashboard', icon: dashboard, url: '/dashboard' },
  // ...
];

<Sidebar>{children}</Sidebar>
```

**After:**
```typescript
import Sidebar from './sidebars/ModelosaurusRefactored';
import { modelosaurusConfig } from './presets/sidebar-presets';

const customConfig = {
  ...modelosaurusConfig,
  navigation: {
    ...modelosaurusConfig.navigation,
    items: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        path: '/dashboard',
        icon: <img src={dashboard} className="w-full h-full mask mask-circle" />,
      },
      // ...
    ],
  },
};

<Sidebar config={customConfig}>{children}</Sidebar>
```

### From Other Sidebar Libraries

1. **Map your current configuration** to the Sidelined format
2. **Choose appropriate navigation strategy** based on your routing setup
3. **Migrate theme/styling** using the theme configuration
4. **Test responsive behavior** and adjust settings

## Best Practices

### 1. Configuration Organization
- Keep configurations in separate files
- Use TypeScript for type safety
- Validate configurations in development

### 2. Navigation Structure
- Use clear, descriptive IDs and names
- Group related items using sections
- Implement role-based access thoughtfully

### 3. Theme Consistency
- Use DaisyUI themes for consistent styling
- Define custom CSS variables for reusability
- Test themes in different screen sizes

### 4. Performance
- Enable state persistence for better UX
- Use appropriate animation durations
- Optimize icon sizes for your use case

### 5. Accessibility
- Provide meaningful tooltips
- Ensure adequate color contrast
- Test keyboard navigation

## Troubleshooting

### Common Issues

1. **Navigation not working**: Check that the correct strategy is set and required dependencies are installed
2. **Icons not displaying**: Verify icon library imports and configuration
3. **Theme not applying**: Ensure CSS classes are available and theme is properly structured
4. **State not persisting**: Check that `persistState` is enabled and localStorage is available
5. **Mobile drawer not working**: Verify `mobileDrawer` is enabled and screen size breakpoints are correct

### Debug Mode

Enable debug logging for development:

```typescript
const config = {
  // ... your config
  customProps: {
    debug: true,
  },
};
```

This documentation covers the complete Sidelined configuration system. For specific implementation details, refer to the TypeScript interfaces and example configurations in the codebase.