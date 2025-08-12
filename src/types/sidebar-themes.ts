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
  component: React.ComponentType<{ children?: React.ReactNode }> | null;
}

export interface SidebarPreviewData {
  themes: SidebarTheme[];
}