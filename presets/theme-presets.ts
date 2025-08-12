import { ThemeConfig } from '../types/sidebar-config';

/**
 * Predefined theme presets based on existing sidebar designs
 */

export const modelosaurusTheme: ThemeConfig = {
  name: 'modelosaurus',
  colors: {
    primary: 'rgb(59, 130, 246)', // blue-500
    secondary: 'rgb(147, 51, 234)', // purple-500
    background: 'rgb(17, 24, 39)', // gray-900
    text: 'rgb(255, 255, 255)',
    accent: 'rgb(75, 85, 99)', // gray-600
    gradient: {
      from: 'rgb(59, 130, 246)', // from-blue-400
      to: 'rgb(147, 51, 234)', // to-purple-500
      direction: 'to-b',
    },
  },
  daisyUITheme: 'dark',
  customCSS: `
    .blob {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3));
      border-radius: 50%;
      width: 100px;
      height: 100px;
      position: absolute;
      filter: blur(20px);
    }
  `,
};

export const corporateTheme: ThemeConfig = {
  name: 'corporate',
  colors: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    background: 'hsl(var(--base-100))',
    text: 'hsl(var(--base-content))',
    accent: 'hsl(var(--base-200))',
    gradient: {
      from: 'hsl(var(--primary))',
      to: 'hsl(var(--secondary))',
      direction: 'to-br',
    },
  },
  daisyUITheme: 'light',
};

export const sakuraTheme: ThemeConfig = {
  name: 'sakura',
  colors: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    background: 'hsl(var(--base-200))',
    text: 'hsl(var(--base-content))',
    accent: 'hsl(var(--accent))',
  },
  daisyUITheme: 'pastel',
};

export const erpTheme: ThemeConfig = {
  name: 'erp',
  colors: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    background: 'hsl(var(--primary))',
    text: 'rgb(255, 255, 255)',
    accent: 'hsl(var(--base-100))',
  },
  daisyUITheme: 'business',
};

// Additional theme presets for future sidebars mentioned in CLAUDE.md
export const lunaraTheme: ThemeConfig = {
  name: 'lunara',
  colors: {
    primary: 'rgb(34, 197, 94)', // green-500 (neon highlight)
    secondary: 'rgb(20, 184, 166)', // teal-500
    background: 'rgb(15, 23, 42)', // slate-900
    text: 'rgb(248, 250, 252)', // slate-50
    accent: 'rgb(51, 65, 85)', // slate-600
  },
  daisyUITheme: 'night',
  customCSS: `
    .grid-pattern::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(rgba(248, 250, 252, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(248, 250, 252, 0.05) 1px, transparent 1px);
      background-size: 20px 20px;
    }
  `,
};

export const dimmTheme: ThemeConfig = {
  name: 'dimm',
  colors: {
    primary: 'rgb(75, 85, 99)', // gray-600
    secondary: 'rgb(107, 114, 128)', // gray-500
    background: 'rgb(31, 41, 55)', // gray-800
    text: 'rgb(209, 213, 219)', // gray-300
    accent: 'rgb(55, 65, 81)', // gray-700
  },
  daisyUITheme: 'dim',
};

export const zappyTheme: ThemeConfig = {
  name: 'zappy',
  colors: {
    primary: 'rgb(255, 255, 255)',
    secondary: 'rgb(0, 0, 0)',
    background: 'rgb(0, 0, 0)',
    text: 'rgb(255, 255, 255)',
    accent: 'rgb(34, 197, 94)', // bright green accent
  },
  daisyUITheme: 'black',
};

export const velouraTheme: ThemeConfig = {
  name: 'veloura',
  colors: {
    primary: 'rgb(168, 85, 247)', // purple-500
    secondary: 'rgb(236, 72, 153)', // pink-500
    background: 'rgb(24, 24, 27)', // zinc-900
    text: 'rgb(244, 244, 245)', // zinc-100
    accent: 'rgb(161, 161, 170)', // zinc-400
    gradient: {
      from: 'rgb(168, 85, 247)',
      to: 'rgb(236, 72, 153)',
      direction: 'to-br',
    },
  },
  daisyUITheme: 'luxury',
};

export const beanieTheme: ThemeConfig = {
  name: 'beanie',
  colors: {
    primary: 'rgb(251, 146, 60)', // orange-400
    secondary: 'rgb(252, 165, 165)', // red-300
    background: 'rgb(254, 249, 195)', // yellow-100
    text: 'rgb(120, 113, 108)', // stone-500
    accent: 'rgb(254, 215, 170)', // orange-200
  },
  daisyUITheme: 'cupcake',
};

export const zeroTheme: ThemeConfig = {
  name: 'zero',
  colors: {
    primary: 'rgb(0, 0, 0)',
    secondary: 'rgb(64, 64, 64)', // neutral-600
    background: 'rgb(255, 255, 255)',
    text: 'rgb(0, 0, 0)',
    accent: 'rgb(229, 229, 229)', // gray-200
  },
  daisyUITheme: 'winter',
};

export const zebrewTheme: ThemeConfig = {
  name: 'zebrew',
  colors: {
    primary: 'rgb(120, 113, 108)', // stone-500
    secondary: 'rgb(168, 162, 158)', // stone-400
    background: 'rgb(245, 245, 244)', // stone-100
    text: 'rgb(41, 37, 36)', // stone-800
    accent: 'rgb(214, 211, 209)', // stone-300
  },
  daisyUITheme: 'coffee',
  customCSS: `
    .zebra-stripe {
      background: repeating-linear-gradient(
        90deg,
        rgb(245, 245, 244),
        rgb(245, 245, 244) 10px,
        rgb(214, 211, 209) 10px,
        rgb(214, 211, 209) 20px
      );
    }
  `,
};

export const snowflakeTheme: ThemeConfig = {
  name: 'snowflake',
  colors: {
    primary: 'rgb(219, 234, 254)', // blue-100
    secondary: 'rgb(243, 244, 246)', // gray-100
    background: 'rgb(255, 255, 255)',
    text: 'rgb(75, 85, 99)', // gray-600
    accent: 'rgb(229, 231, 235)', // gray-200
  },
  daisyUITheme: 'winter',
};

/**
 * Collection of all available theme presets
 */
export const themePresets = {
  // Existing themes from current sidebars
  modelosaurus: modelosaurusTheme,
  corporate: corporateTheme,
  sakura: sakuraTheme,
  erp: erpTheme,
  
  // Future themes
  lunara: lunaraTheme,
  dimm: dimmTheme,
  zappy: zappyTheme,
  veloura: velouraTheme,
  beanie: beanieTheme,
  zero: zeroTheme,
  zebrew: zebrewTheme,
  snowflake: snowflakeTheme,
};

/**
 * Get theme preset by name
 */
export function getThemePreset(name: string): ThemeConfig | undefined {
  return themePresets[name as keyof typeof themePresets];
}

/**
 * Get all available theme names
 */
export function getAvailableThemes(): string[] {
  return Object.keys(themePresets);
}

/**
 * Create a custom theme based on a preset with overrides
 */
export function createCustomTheme(
  baseName: string,
  overrides: Partial<ThemeConfig>
): ThemeConfig {
  const baseTheme = getThemePreset(baseName);
  if (!baseTheme) {
    throw new Error(`Unknown theme preset: ${baseName}`);
  }

  return {
    ...baseTheme,
    ...overrides,
    colors: {
      ...baseTheme.colors,
      ...overrides.colors,
    },
  };
}