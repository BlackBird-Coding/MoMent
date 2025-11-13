# Styling Migration: CSS to Tailwind CSS

## 1. Tailwind CSS Configuration

### Installation

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Tailwind Config (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // MoMent custom colors
        violet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed', // Primary brand color
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        fuchsia: {
          500: '#d946ef', // Secondary brand color
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
```

---

## 2. Global Styles (`src/app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 262 83% 58%; /* violet-600 */
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 262 83% 58%;
    --radius: 0.75rem; /* 12px - matches rounded-xl */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 262 83% 58%;
    --primary-foreground: 210 40% 98%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 262 83% 58%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
}

@layer utilities {
  /* Custom scrollbar hiding (from original HTML) */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Line clamp utilities */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

---

## 3. Design Token System

### Color Tokens

| Token Name | Tailwind Class | Hex Value | Usage |
|------------|----------------|-----------|-------|
| Primary | `bg-violet-600` | `#7c3aed` | Main buttons, active states, brand elements |
| Primary Hover | `bg-violet-700` | `#6d28d9` | Button hover states |
| Secondary | `bg-fuchsia-500` | `#d946ef` | Gradient accents, secondary CTAs |
| Success | `bg-emerald-500` | `#10b981` | Success messages, vaccine status |
| Warning | `bg-amber-500` | `#f59e0b` | Warning badges, pending status |
| Error | `bg-red-500` | `#ef4444` | Error messages, notifications |
| Neutral 50 | `bg-slate-50` | `#f8fafc` | Page background |
| Neutral 100 | `bg-slate-100` | `#f1f5f9` | Card backgrounds, input backgrounds |
| Neutral 500 | `text-slate-500` | `#64748b` | Secondary text |
| Neutral 700 | `text-slate-700` | `#334155` | Body text |
| Neutral 800 | `text-slate-800` | `#1e293b` | Headings |

### Typography Scale

| Element | Tailwind Class | Size | Line Height |
|---------|----------------|------|-------------|
| Heading 1 | `text-2xl font-semibold` | 24px | 32px |
| Heading 2 | `text-xl font-semibold` | 20px | 28px |
| Heading 3 | `text-lg font-semibold` | 18px | 28px |
| Body | `text-sm` | 14px | 20px |
| Small | `text-xs` | 12px | 16px |
| Tiny | `text-[11px]` | 11px | 16px |

### Spacing Scale

```typescript
// Consistent spacing values
export const spacing = {
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
};
```

### Border Radius

| Token | Tailwind Class | Value | Usage |
|-------|----------------|-------|-------|
| Small | `rounded-lg` | 8px | Small elements, badges |
| Medium | `rounded-xl` | 12px | Buttons, inputs, small cards |
| Large | `rounded-2xl` | 16px | Cards, modals, sections |
| Full | `rounded-full` | 9999px | Avatars, pills, dots |

### Shadow Scale

| Token | Tailwind Class | Usage |
|-------|----------------|-------|
| Small | `shadow-sm` | Cards, subtle elevation |
| Medium | `shadow` | Dropdowns, popovers |
| Large | `shadow-lg` | Modals, prominent cards |
| XL | `shadow-xl` | Featured elements |
| 2XL | `shadow-2xl` | Maximum elevation |

---

## 4. Component Class Patterns

### Card Component

```css
/* Base card pattern */
.card-base {
  @apply bg-white rounded-2xl p-4 shadow-sm;
}

/* Usage in components */
<div className="bg-white rounded-2xl p-4 shadow-sm">
  {/* Card content */}
</div>
```

### Button Variants

```typescript
// src/lib/button-variants.ts (using class-variance-authority)
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-violet-600 text-white hover:bg-violet-700',
        secondary: 'border border-slate-300 hover:bg-slate-100',
        ghost: 'hover:bg-slate-100',
        link: 'underline-offset-4 hover:underline text-violet-700',
      },
      size: {
        default: 'px-4 py-2 text-sm',
        sm: 'px-3 py-1.5 text-sm',
        lg: 'px-6 py-3 text-base',
        icon: 'w-9 h-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### Input Pattern

```css
/* Consistent input styling */
.input-base {
  @apply w-full rounded-xl border border-slate-300 px-3 py-2 text-sm
         focus:ring-2 focus:ring-violet-300 focus:border-violet-600
         disabled:opacity-50 disabled:pointer-events-none;
}
```

---

## 5. Responsive Design Patterns

### Breakpoint Strategy

```typescript
// Tailwind breakpoints (mobile-first)
const breakpoints = {
  sm: '640px',   // Small devices
  md: '768px',   // Tablets (main breakpoint for desktop nav)
  lg: '1024px',  // Large desktops (3-column layout)
  xl: '1280px',  // Extra large
  '2xl': '1536px', // Ultra wide
};
```

### Layout Patterns

#### Mobile (< 768px)
```jsx
<div className="px-4 py-4">
  {/* Single column */}
  {/* Bottom navigation */}
</div>
```

#### Desktop (≥ 768px)
```jsx
<div className="hidden md:block">
  {/* Desktop header */}
</div>

<div className="md:grid md:grid-cols-12 md:gap-6">
  <aside className="md:col-span-3 lg:col-span-2">
    {/* Left sidebar */}
  </aside>
  <main className="md:col-span-9 lg:col-span-7">
    {/* Main content */}
  </main>
  <aside className="hidden lg:block lg:col-span-3">
    {/* Right sidebar */}
  </aside>
</div>
```

---

## 6. Custom CSS Requirements

### Backdrop Blur Navigation

```css
/* Already available in Tailwind */
.backdrop-blur {
  @apply backdrop-blur-sm bg-white/80;
}

/* Usage */
<header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
```

### Gradient Backgrounds

```jsx
// Benefits CTA gradient
<div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-2xl p-4">
```

### Custom Animations

```css
/* Loading dots animation (for AI chat) */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-25%);
  }
}

/* Usage in Tailwind */
.animate-bounce {
  animation: bounce 1s infinite;
}

/* Stagger animation delays */
[data-delay="1"] {
  animation-delay: 120ms;
}
[data-delay="2"] {
  animation-delay: 240ms;
}
```

---

## 7. Icon System Migration

### From SVG Sprites to Lucide React

#### Current Approach (HTML)
```html
<svg aria-hidden="true" class="hidden">
  <symbol id="home" viewBox="0 0 24 24">
    <path d="M3 10.5 12 3l9 7.5..."/>
  </symbol>
</svg>

<svg class="w-5 h-5"><use href="#home"></use></svg>
```

#### New Approach (React)
```typescript
import { Home, Users, Sparkles, ShoppingBag, User, Bell } from 'lucide-react';

// Usage
<Home className="w-5 h-5" />
<Users className="w-5 h-5" />
<Sparkles className="w-5 h-5" />
```

### Icon Mapping

| HTML Symbol ID | Lucide Icon | Import Name |
|----------------|-------------|-------------|
| `#home` | Home | `Home` |
| `#community` | Users | `Users` |
| `#spark` | Sparkles | `Sparkles` |
| `#bag` | ShoppingBag | `ShoppingBag` |
| `#user` | User | `User` |
| `#bell` | Bell | `Bell` |
| `#menu` | Menu | `Menu` |
| `#search` | Search | `Search` |
| `#mic` | Mic | `Mic` |
| `#paperclip` | Paperclip | `Paperclip` |
| `#add` | Plus | `Plus` |

### Icon Component Wrapper (Optional)

```typescript
// src/components/shared/icon.tsx
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  name: keyof typeof Icons;
  className?: string;
  size?: number;
}

export function Icon({ name, className, size = 24 }: IconProps) {
  const LucideIcon = Icons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <LucideIcon className={cn('', className)} size={size} />;
}

// Usage
<Icon name="Home" className="w-5 h-5" />
```

---

## 8. Dark Mode Implementation (Optional)

### Setup

```typescript
// src/components/theme-provider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
```

### Dark Mode Toggle

```typescript
'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
```

---

## 9. CSS Migration Checklist

### Phase 1: Setup
- [ ] Install Tailwind CSS and dependencies
- [ ] Configure `tailwind.config.ts`
- [ ] Set up `globals.css` with design tokens
- [ ] Install `tailwindcss-animate` plugin
- [ ] Configure PostCSS

### Phase 2: Design System
- [ ] Define color palette (violet, slate, etc.)
- [ ] Set up typography scale
- [ ] Configure spacing system
- [ ] Define border radius tokens
- [ ] Set up shadow scale

### Phase 3: Component Styling
- [ ] Convert card styles
- [ ] Convert button variants
- [ ] Convert input styles
- [ ] Convert badge/pill styles
- [ ] Convert modal/dialog styles

### Phase 4: Layout Styling
- [ ] Convert responsive grid
- [ ] Convert header styles
- [ ] Convert sidebar styles
- [ ] Convert bottom navigation styles

### Phase 5: Custom Utilities
- [ ] Add `.no-scrollbar` utility
- [ ] Add line-clamp utilities
- [ ] Add custom animations
- [ ] Add gradient utilities

### Phase 6: Icons
- [ ] Install `lucide-react`
- [ ] Replace all SVG sprites with Lucide icons
- [ ] Create icon wrapper component (optional)

---

## 10. CSS Best Practices

### Do's ✅

1. **Use Tailwind utilities first**: `className="bg-white p-4 rounded-xl"`
2. **Group related classes**: `className="flex items-center gap-3"`
3. **Use conditional classes with `cn()`**:
   ```typescript
   className={cn(
     'base-classes',
     isActive && 'active-classes',
     variant === 'primary' && 'primary-classes'
   )}
   ```
4. **Extract repeated patterns**:
   ```typescript
   const cardClasses = 'bg-white rounded-2xl p-4 shadow-sm';
   ```
5. **Use responsive prefixes**: `className="px-4 md:px-6 lg:px-8"`

### Don'ts ❌

1. **Don't write custom CSS unless absolutely necessary**
2. **Don't use inline styles**: ~~`style={{ color: 'red' }}`~~ → `className="text-red-500"`
3. **Don't create unnecessary CSS modules**
4. **Don't duplicate Tailwind utilities**
5. **Don't use arbitrary values excessively**: Prefer defined tokens

---

## 11. Performance Optimization

### Purge CSS Configuration

```typescript
// tailwind.config.ts
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Tailwind will automatically purge unused classes in production
};
```

### Bundle Size Impact

- **Before (HTML + CDN)**: ~3MB Tailwind CDN
- **After (Next.js + Purged)**: ~10-20KB Tailwind CSS

---

## Next Steps

Proceed to:
- **05-implementation-roadmap.md** - Phase-by-phase implementation plan
- **06-technical-specifications.md** - Dependencies and configuration
