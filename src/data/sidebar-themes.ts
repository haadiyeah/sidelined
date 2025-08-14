import type { SidebarTheme } from '../types/sidebar-themes';
import { sidebarPresets } from '../presets/sidebar-presets';

export const sidebarThemes: SidebarTheme[] = [
  {
    id: 'modelosaurus',
    name: 'Modelosaurus',
    description: 'Gradients, dark, sleek and modern',
    layout: 'classic',
    preview: {
      primaryColor: '#683895',
      secondaryColor: '#8b5cf6', 
      backgroundColor: '#1D203E',
      textColor: '#ffffff'
    },
    config: sidebarPresets.modelosaurus,
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDMyMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJiZyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzFEMjAzRTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2ODM4OTU7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImFjY2VudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzNiODJmNjtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4YjVjZjY7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxMjgiIGZpbGw9InVybCgjYmcpIiByeD0iOCIvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIxMjgiIGZpbGw9InJnYmEoMTcsIDI0LCAzOSwgMC44KSIgcng9IjgiLz48cmVjdCB4PSIwIiB5PSI0MCIgd2lkdGg9IjQiIGhlaWdodD0iMTYiIGZpbGw9InVybCgjYWNjZW50KSIgcng9IjIiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjI0IiByPSIxMiIgZmlsbD0icmdiYSgxMDcsIDExNCwgMTI4LCAwLjYpIi8+PGNpcmNsZSBjeD0iNDAiIGN5PSI0OCIgcj0iMTYiIGZpbGw9InVybCgjYWNjZW50KSIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iNzIiIHI9IjEyIiBmaWxsPSJyZ2JhKDEwNywgMTE0LCAxMjgsIDAuNikiLz48Y2lyY2xlIGN4PSI0MCIgY3k9Ijk2IiByPSIxMiIgZmlsbD0icmdiYSgxMDcsIDExNCwgMTI4LCAwLjYpIi8+PHJlY3QgeD0iOTAiIHk9IjE2IiB3aWR0aD0iMjIwIiBoZWlnaHQ9Ijk2IiBmaWxsPSJyZ2JhKDMxLCA0MSwgNTUsIDAuNCkiIHJ4PSI0Ii8+PHRleHQgeD0iMTA1IiB5PSIzNSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIj5Nb2RlbG9zYXVydXM8L3RleHQ+PHRleHQgeD0iMTA1IiB5PSI1NSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjcpIiBmb250LXNpemU9IjEwIj5UZWNoLWZvY3VzZWQsIGdyYWRpZW50cywgbW9kZXJuPC90ZXh0PjxyZWN0IHg9IjEwNSIgeT0iNjUiIHdpZHRoPSI0MCIgaGVpZ2h0PSIyMCIgZmlsbD0idXJsKCNhY2NlbnQpIiByeD0iMiIgb3BhY2l0eT0iMC4zIi8+PHJlY3QgeD0iMTU1IiB5PSI2NSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjIwIiBmaWxsPSJ1cmwoI2FjY2VudCkiIHJ4PSIyIiBvcGFjaXR5PSIwLjIiLz48cmVjdCB4PSIyMDUiIHk9IjY1IiB3aWR0aD0iNDAiIGhlaWdodD0iMjAiIGZpbGw9InVybCgjYWNjZW50KSIgcng9IjIiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==' // Embedded SVG for Modelosaurus
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Light, modern, simple, role based access',
    layout: 'centered',
    preview: {
      primaryColor: '#0068ff',
      secondaryColor: '#0040ff',
      backgroundColor: '#ffffff',
      textColor: '#1f2937'
    },
    config: sidebarPresets.corporate,
    imageUrl: undefined // Promotional image will be added later
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
    config: sidebarPresets.sakura,
    imageUrl: undefined // Promotional image will be added later
  },
  {
    id: 'erp',
    name: 'ERP',
    description: 'Complex role based systems, tooltips, fast navigation',
    layout: 'centered', 
    preview: {
      primaryColor: '#87b37a',
      secondaryColor: '#4c6663',
      backgroundColor: '#ffffff',
      textColor: '#064e3b'
    },
    config: sidebarPresets.erp,
    imageUrl: undefined // Promotional image will be added later
  },
  {
    id: 'dynamo',
    name: 'Dynamo',
    description: 'Modern, dynamic, balanced design for general use',
    layout: 'classic',
    preview: {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      backgroundColor: '#1f2937',
      textColor: '#ffffff'
    },
    config: sidebarPresets.dynamo,
    imageUrl: undefined // Promotional image will be added later
  }
];