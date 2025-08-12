# THE PROJECT VISION: "Sidelined"
Configurable, beautiful, responsive React sidebars for developers, suited for any project. 
"Sidebars, sidelined. Focus on the development - leave the sidebars upto us."

# PROJECT OVERVIEW
Configurable, beautiful, responsive React sidebars for developers. 

## Features
An open-source project offering:
- Templates: Ready-to-use sidebar designs
- Customization: Colors, items, icons, URLs via UI
- Integration: Simple npm package OR copy-paste components
- Theming: DaisyUI theme generation for consistent app-wide styling

## Current Project State
```
root/
├── sidebars/          # Raw .tsx files from various projects (not templated)
├── templates/         # Future: templated, configurable versions
├── daisyui-docs/      # DaisyUI configuration references
└── tasks/            # Todo lists and progress tracking
```

## NOTE
The sidebars are not customizable right now, I have picked them up from my various frontend projects, so they are tailored to specific scenarios, But i like their design so thats the basis of selection.

# USER FLOWS 
There are two Integration possibilities with sidelined.

## Option 1 
Provide all the code of the sidebar as a template and have it customized.
For example, in the example sidebar,  the `sidebarItems` array, and the color etc could be considered as variables that can be edited, configured, and then inserted appropriately and safely into the code without breaking anything. An example of the config object structure is given below, but it is only an idea. You may customize it according to the requirements.
In this case the user would have to add the entire sidebar.tsx file to their codebase and use it accordigly import it and use it like a copy paste component. Giving them even more configurablity and flexibility if needed to tweak specific things in the component's react code.
The config would still be a separate object, stored at the beginning of the component, for quick customization e.g. URL changes or item name changes.

## Option 2 (Recommended)
Another option should be for users to install as an npm package. Benefits: Minimal clutter, quick, plug-n-play.
1. users login via supabase
2. users configure via UI (simple webpage, deployed on vercel)
3. users save config
4. json config is saved to supabase (users can access all their created/customized sidebars).
5. users get embeddable chunk of code: 
```javascript
// NPM package that accepts local config
import { TechnoSidebar } from 'sidelined';

const sidebarConfig = {

  items: [
    { id: 1, name: 'Dashboard', icon: 'dashboard', url: '/dashboard' },
    // ... more items
  ],
  theme: {
    primaryColors: ['from-blue-400', 'to-purple-500'],
    bgColor: 'bg-gray-900',
    // ... more theme options
  },
  behavior: {
    collapsible: true,
    defaultOpen: false,
    // ... more behavior options
  }
};

//In component render
<TechnoSidebar config={sidebarConfig} />
```

# TECH STACK
- **Core**: TypeScript, TailwindCSS, DaisyUI
- **Animation**: Framer Motion
- **Icons**: Lucide React (preferred) or Heroicons
- **Backend**: Supabase (for Option 2)
- **Deployment**: Vercel


## Importance of daisyui
Daisyui is an important part of tech stack. it will control all the theming and color control. 
It is important to note that the sidebar - its design, its look and feel, and its colors - will impact the rest of the site.
So we are not only giving the user a sidebar, but also generating a daisyui custom theme that they can integrate, which will allow them to access the colors throughout their app for a consistent look (E.g. base-100, base-200, primary, secondary etc. colors  all defined matching the sidebar.)
Usage of this theme will be optional, incase someeone doesnt want to use daisy, but it will be recommeneded for ease of development.

For this important aspect of the project, please ensure that you analyze the daisyui-docs folder provided.

# Sidebars for Sidelined
This file contains the details for the inteded sidebar themes and possible layouts.

## Sidebars
Sidebars are a distinct base combination of:
- Colors
- A layout (See below)
- Design of list items
- Icon library (either hero or lucide, filled or outlined)
- Font


For each sidebar,  the colors shall be a base/starting which can be customized (incase someone likes everything about the sidebar except the color scheme, or incase they want to adjust it according to company colors.)

### Sidebars BASED OFF EXISTING components in /sidebars:
modelosaurus (gradients, dark, sleek and modern) (CLASSIC LAYOUT),
corporate (light, modern, simple, role based access) (CENTERED LAYOUT), 
sakura (pink, girly) (CENTERED LAYOUT), 
ERP (for complex role based systems, tooltips, fast navigation, role based access support.) (CENTERED LAYOUT),

### NEW sidebars (ideas) TO ADD LATER:
lunara (dark with subtle grid pattern, speckled white, and contrasting bright neon highlights)
dimm (dark, low lights),
zappy (sharp, high contrast), 
veloura (deep, luxury)
beanie (cute, pastel, happy)
ZERO (monochrome, minimal), 
zebrew (stripes  +  beige/coffee),
snowflake (delicate, light/whites).


## Layouts
There will be three distinct layouts. A specific sidebar may only follow exactly one layout.

### ERP layout: (centered list of links)
<LOGO | HEADING>
.
.
.
<icon1> <item1>
<icon2> <item2>
<icon3> <item3>
.
.
.
<Avatar>

### Classic Layout: (Top aligned list of links)
<LOGO | HEADING>
<icon1> <item1>
<icon2> <item2>
<icon3> <item3>
.
.
.
.
.
.
<Avatar>
 
### Mailbox layout: (Horizontal lines create sections) (Applicable with certain simpler themes)
<LOGO | HEADING>
<icon1> <item1>         <number-badge>
<icon2> <item2>         <number-badge>
<icon3> <item3>         <number-badge>
.
.
.
_______________
<colordot1> <labelname1>         <number-badge>
<colordot2> <labelname2>         <number-badge>
[+ Add new]
.
.
.
_______________
<Avatar>

# RULES
1. First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo_[task_brief_name][timestamp].md. 
2. The plan should have a list of todo items that you can check off as you complete them.
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made. 
6. YOU ABSOLUTELY MUST Implement error handling and user feedback throughout the app wherever applicable. YOU MUST add loading states, error messages, and success notifications wherever applicable. YOU MUST ROBUSTLY handle edge cases like network failures and invalid configurations.
7. Focus on incremental development, with small yet focused changes at a time.
8. Finally, add a review section to the [todo.md] file with a summary of the changes you made and any other relevant information.

## Design Principles
- **Simplicity First**: Minimal, focused changes
- **Modularity**: Each component should be self-contained
- **Flexibility**: Support both simple and advanced use cases
- **Consistency**: Standardized configuration patterns

