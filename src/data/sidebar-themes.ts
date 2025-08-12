import type { SidebarTheme } from '../types/sidebar-themes';

export const sidebarThemes: SidebarTheme[] = [
  {
    id: 'modelosaurus',
    name: 'Modelosaurus',
    description: 'Gradients, dark, sleek and modern',
    layout: 'classic',
    preview: {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6', 
      backgroundColor: '#111827',
      textColor: '#ffffff'
    },
    component: null // Will be imported dynamically
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Light, modern, simple, role based access',
    layout: 'centered',
    preview: {
      primaryColor: '#2563eb',
      secondaryColor: '#0f172a',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a'
    },
    component: null
  },
  {
    id: 'sakura',
    name: 'Sakura', 
    description: 'Pink, girly',
    layout: 'centered',
    preview: {
      primaryColor: '#ec4899',
      secondaryColor: '#f3e8ff',
      backgroundColor: '#fdf2f8',
      textColor: '#831843'
    },
    component: null
  },
  {
    id: 'erp',
    name: 'ERP',
    description: 'Complex role based systems, tooltips, fast navigation',
    layout: 'centered', 
    preview: {
      primaryColor: '#059669',
      secondaryColor: '#065f46',
      backgroundColor: '#ecfdf5',
      textColor: '#064e3b'
    },
    component: null
  }
];