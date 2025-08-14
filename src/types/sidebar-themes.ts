import type { SidebarConfig } from './sidebar-config';

export interface SidebarTheme {
  id: string;
  name: string;
  description: string;
  layout: 'classic' | 'centered' | 'mailbox';
  preview: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
  };
  config: SidebarConfig;
  imageUrl?: string; // Promotional image for the sidebar
  component?: React.ComponentType<{ children?: React.ReactNode }> | null;
}

export interface SidebarPreviewData {
  themes: SidebarTheme[];
}