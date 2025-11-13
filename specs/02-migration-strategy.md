# Migration Strategy: Next.js Implementation Plan

## 1. Next.js Configuration

### Recommended Version & Router

**Next.js 15.x with App Router** ✅

#### Rationale
- **App Router Benefits**:
  - React Server Components (RSC) for better performance
  - Built-in layouts and nested routing
  - Streaming and Suspense support
  - Improved data fetching with `async/await`
  - Better SEO with metadata API
  - Middleware support for authentication

- **Why Not Pages Router**:
  - Older pattern, moving towards deprecation
  - Less optimized for modern React features
  - More verbose layout patterns

### Project Initialization

```bash
npx create-next-app@latest moment --typescript --tailwind --app --src-dir --import-alias "@/*"
```

**Configuration Options**:
```
✔ Would you like to use TypeScript? Yes
✔ Would you like to use ESLint? Yes
✔ Would you like to use Tailwind CSS? Yes
✔ Would you like to use `src/` directory? Yes
✔ Would you like to use App Router? Yes
✔ Would you like to customize the default import alias? Yes (@/*)
```

### Next.js Config (`next.config.ts`)

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Performance optimizations
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Configure specific domains in production
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Internationalization
  i18n: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
    localeDetection: true,
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // Experimental features
  experimental: {
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: '5mb', // For file uploads
    },
  },

  // Build optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 2. Project Structure

### Recommended Folder Organization

```
moment/
├── src/
│   ├── app/                          # App Router pages
│   │   ├── (auth)/                   # Auth route group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/                   # Main app route group
│   │   │   ├── layout.tsx            # Main layout (with sidebars, nav)
│   │   │   ├── page.tsx              # Home/Dashboard
│   │   │   ├── community/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # Post detail
│   │   │   ├── ai/
│   │   │   │   └── page.tsx
│   │   │   ├── market/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # Item detail
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── appointments/
│   │   │   │   ├── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   ├── vaccines/
│   │   │   │   └── page.tsx
│   │   │   ├── reminders/
│   │   │   │   └── page.tsx
│   │   │   ├── timeline/
│   │   │   │   └── page.tsx
│   │   │   ├── insurance/
│   │   │   │   └── page.tsx
│   │   │   └── benefits/
│   │   │       └── page.tsx
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── posts/
│   │   │   ├── items/
│   │   │   ├── appointments/
│   │   │   ├── reminders/
│   │   │   ├── ai/
│   │   │   └── upload/
│   │   ├── layout.tsx                # Root layout
│   │   ├── globals.css               # Global styles
│   │   └── error.tsx                 # Error boundary
│   │
│   ├── components/                   # React components
│   │   ├── ui/                       # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   ├── layout/                   # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── mobile-header.tsx
│   │   │   ├── bottom-nav.tsx
│   │   │   ├── left-sidebar.tsx
│   │   │   ├── right-sidebar.tsx
│   │   │   └── page-container.tsx
│   │   ├── features/                 # Feature-specific components
│   │   │   ├── reminders/
│   │   │   │   ├── reminder-card.tsx
│   │   │   │   ├── reminder-form.tsx
│   │   │   │   └── reminder-list.tsx
│   │   │   ├── community/
│   │   │   │   ├── post-card.tsx
│   │   │   │   ├── post-composer.tsx
│   │   │   │   ├── post-detail.tsx
│   │   │   │   └── category-filter.tsx
│   │   │   ├── ai/
│   │   │   │   ├── chat-bubble.tsx
│   │   │   │   ├── chat-input.tsx
│   │   │   │   └── quick-prompts.tsx
│   │   │   ├── market/
│   │   │   │   ├── product-card.tsx
│   │   │   │   ├── product-form.tsx
│   │   │   │   ├── product-detail.tsx
│   │   │   │   └── filters.tsx
│   │   │   └── profile/
│   │   │       ├── profile-form.tsx
│   │   │       ├── child-card.tsx
│   │   │       └── photo-uploader.tsx
│   │   └── shared/                   # Shared components
│   │       ├── image-upload.tsx
│   │       ├── search-field.tsx
│   │       ├── pagination.tsx
│   │       ├── loading-spinner.tsx
│   │       └── toast.tsx
│   │
│   ├── lib/                          # Utilities and libraries
│   │   ├── utils.ts                  # Helper functions
│   │   ├── api.ts                    # API client
│   │   ├── validations.ts            # Zod schemas
│   │   └── constants.ts              # App constants
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-user.ts
│   │   ├── use-reminders.ts
│   │   ├── use-posts.ts
│   │   ├── use-items.ts
│   │   ├── use-toast.ts
│   │   └── use-media-query.ts
│   │
│   ├── store/                        # State management (Zustand)
│   │   ├── auth-store.ts
│   │   ├── user-store.ts
│   │   ├── reminder-store.ts
│   │   └── ui-store.ts
│   │
│   ├── types/                        # TypeScript types
│   │   ├── user.ts
│   │   ├── reminder.ts
│   │   ├── appointment.ts
│   │   ├── post.ts
│   │   ├── item.ts
│   │   └── index.ts
│   │
│   ├── config/                       # Configuration files
│   │   ├── site.ts                   # Site metadata
│   │   ├── navigation.ts             # Navigation config
│   │   └── categories.ts             # Category definitions
│   │
│   └── middleware.ts                 # Next.js middleware
│
├── public/                           # Static assets
│   ├── images/
│   │   └── logo.png
│   ├── icons/
│   └── fonts/
│
├── prisma/                           # Database schema (if using Prisma)
│   └── schema.prisma
│
├── .env.local                        # Environment variables
├── .env.example                      # Example env file
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies
└── README.md                         # Documentation
```

---

## 3. Routing Strategy

### URL Structure Mapping

| HTML File | Next.js Route | Dynamic? |
|-----------|---------------|----------|
| `index.html` | `/` | No |
| `community.html` | `/community` | No |
| `community.html?id=123` | `/community/[id]` | Yes |
| `ai.html` | `/ai` | No |
| `market.html` | `/market` | No |
| `market.html?id=123` | `/market/[id]` | Yes |
| `profile.html` | `/profile` | No |
| `appointments.html` | `/appointments` | No |
| `appointments-new.html` | `/appointments/new` | No |
| `vaccines.html` | `/vaccines` | No |
| `reminders.html` | `/reminders` | No |
| `timeline.html` | `/timeline` | No |
| `insurance.html` | `/insurance` | No |
| `benefits.html` | `/benefits` | No |

### Route Groups for Layout Sharing

```typescript
// (main) route group - shares MainLayout
app/
├── (main)/
│   ├── layout.tsx        // MainLayout with sidebars, nav
│   ├── page.tsx          // Home
│   ├── community/
│   ├── ai/
│   └── ...

// (auth) route group - shares AuthLayout
├── (auth)/
│   ├── layout.tsx        // AuthLayout (centered, no nav)
│   ├── login/
│   └── register/
```

### Navigation Component

```typescript
// src/config/navigation.ts
export const mainNavigation = [
  {
    label: 'Home',
    href: '/',
    icon: 'home',
    mobileOrder: 1,
  },
  {
    label: 'Community',
    href: '/community',
    icon: 'community',
    mobileOrder: 2,
  },
  {
    label: 'Ask AI',
    href: '/ai',
    icon: 'spark',
    mobileOrder: 3,
    featured: true, // Centered in mobile nav
  },
  {
    label: 'Market',
    href: '/market',
    icon: 'bag',
    mobileOrder: 4,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: 'user',
    mobileOrder: 5,
  },
];

export const quickActions = [
  { label: 'Add reminder', href: '/reminders?action=add' },
  { label: 'Book visit', href: '/appointments/new' },
  { label: 'Log vaccine', href: '/vaccines?action=add' },
  { label: 'Write a post', href: '/community?action=compose' },
];
```

---

## 4. State Management Approach

### State Management Strategy

**Hybrid Approach**: Combine multiple state management solutions based on use case.

#### 1. Server State: React Query (TanStack Query)

For data fetching, caching, synchronization:

```typescript
// src/hooks/use-reminders.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useReminders() {
  const queryClient = useQueryClient();

  const { data: reminders, isLoading } = useQuery({
    queryKey: ['reminders'],
    queryFn: async () => {
      const res = await fetch('/api/reminders');
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const addReminderMutation = useMutation({
    mutationFn: async (newReminder) => {
      const res = await fetch('/api/reminders', {
        method: 'POST',
        body: JSON.stringify(newReminder),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reminders'] });
    },
  });

  return {
    reminders,
    isLoading,
    addReminder: addReminderMutation.mutate,
  };
}
```

#### 2. Client State: Zustand

For UI state, modals, filters:

```typescript
// src/store/ui-store.ts
import { create } from 'zustand';

interface UIStore {
  // Modal state
  isReminderModalOpen: boolean;
  isPostComposerOpen: boolean;
  openReminderModal: () => void;
  closeReminderModal: () => void;

  // Filter state
  communityFilters: {
    categories: string[];
    sort: 'latest' | 'top';
    search: string;
  };
  setCommunityFilters: (filters: Partial<UIStore['communityFilters']>) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isReminderModalOpen: false,
  isPostComposerOpen: false,
  openReminderModal: () => set({ isReminderModalOpen: true }),
  closeReminderModal: () => set({ isReminderModalOpen: false }),

  communityFilters: {
    categories: [],
    sort: 'latest',
    search: '',
  },
  setCommunityFilters: (filters) =>
    set((state) => ({
      communityFilters: { ...state.communityFilters, ...filters },
    })),
}));
```

#### 3. Form State: React Hook Form

For complex forms with validation:

```typescript
// src/components/features/reminders/reminder-form.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const reminderSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  when: z.string().datetime(),
  note: z.string().optional(),
  category: z.enum(['appointment', 'vaccine', 'wellness', 'task']),
});

type ReminderFormData = z.infer<typeof reminderSchema>;

export function ReminderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
  });

  const onSubmit = (data: ReminderFormData) => {
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

#### 4. URL State: useSearchParams

For shareable filter/search state:

```typescript
// src/app/(main)/community/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function CommunityPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get('category') || 'all';
  const search = searchParams.get('q') || '';

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/community?${params.toString()}`);
  };

  // ...
}
```

#### 5. Authentication: NextAuth.js (Auth.js)

For user authentication and session management:

```typescript
// src/lib/auth.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Validate credentials
        const user = await validateUser(credentials);
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
});
```

---

## 5. Data Fetching Strategy

### Server Components (Default)

```typescript
// src/app/(main)/page.tsx
import { auth } from '@/lib/auth';
import { getReminders } from '@/lib/api';

export default async function HomePage() {
  const session = await auth();
  const reminders = await getReminders(session.user.id);

  return (
    <div>
      <RemindersSection reminders={reminders} />
    </div>
  );
}
```

### Client Components (Interactive)

```typescript
// src/components/features/reminders/reminder-list.tsx
'use client';

import { useReminders } from '@/hooks/use-reminders';

export function ReminderList() {
  const { reminders, isLoading } = useReminders();

  if (isLoading) return <LoadingSpinner />;

  return (
    <ul>
      {reminders.map((reminder) => (
        <ReminderCard key={reminder.id} reminder={reminder} />
      ))}
    </ul>
  );
}
```

### API Routes

```typescript
// src/app/api/reminders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const reminders = await prisma.reminder.findMany({
    where: { userId: session.user.id },
    orderBy: { when: 'asc' },
  });

  return NextResponse.json(reminders);
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const reminder = await prisma.reminder.create({
    data: {
      ...body,
      userId: session.user.id,
    },
  });

  return NextResponse.json(reminder);
}
```

---

## 6. Migration Path

### Phase-based Approach

#### Phase 1: Foundation Setup (Week 1)
- [ ] Initialize Next.js project
- [ ] Set up TypeScript configuration
- [ ] Configure Tailwind CSS
- [ ] Install shadcn/ui
- [ ] Set up folder structure
- [ ] Configure ESLint and Prettier
- [ ] Set up Git repository and CI/CD

#### Phase 2: Core Layout & Navigation (Week 1-2)
- [ ] Create root layout
- [ ] Build header components (desktop/mobile)
- [ ] Build bottom navigation
- [ ] Build sidebar components
- [ ] Implement responsive grid system
- [ ] Set up route groups

#### Phase 3: UI Component Library (Week 2-3)
- [ ] Install and configure shadcn/ui components
- [ ] Create custom UI components
- [ ] Build icon system
- [ ] Set up theme configuration
- [ ] Create component documentation

#### Phase 4: Authentication & User Management (Week 3-4)
- [ ] Set up NextAuth.js
- [ ] Create login/register pages
- [ ] Implement session management
- [ ] Build profile page
- [ ] User preferences storage

#### Phase 5: Core Feature Migration (Week 4-8)
- **Week 4-5**: Home/Dashboard + Reminders
- **Week 5-6**: Community + Posts
- **Week 6-7**: AI Chat
- **Week 7-8**: Marketplace

#### Phase 6: Additional Features (Week 8-10)
- **Week 8**: Appointments + Vaccines
- **Week 9**: Timeline + Insurance
- **Week 10**: Benefits + Settings

#### Phase 7: Optimization & Testing (Week 10-12)
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Load testing

#### Phase 8: Deployment & Launch (Week 12)
- [ ] Production build
- [ ] Deploy to hosting platform
- [ ] Set up monitoring
- [ ] Configure analytics
- [ ] User acceptance testing

---

## 7. Progressive Migration Strategy

### Hybrid Approach (Optional)

If immediate full migration is not feasible:

1. **Keep existing HTML pages running**
2. **Migrate one page at a time to Next.js**
3. **Use Next.js rewrites to serve new pages**

```typescript
// next.config.ts
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/community',
        destination: '/community', // Next.js page
      },
      {
        source: '/:path*',
        destination: 'http://old-site.com/:path*', // Fallback to old HTML
      },
    ];
  },
};
```

---

## 8. Testing Strategy

### Testing Stack

```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "playwright": "^1.40.0"
  }
}
```

### Testing Pyramid

1. **Unit Tests** (70%): Components, hooks, utilities
2. **Integration Tests** (20%): Feature workflows
3. **E2E Tests** (10%): Critical user journeys

```typescript
// Example unit test
import { render, screen } from '@testing-library/react';
import { ReminderCard } from './reminder-card';

test('renders reminder card', () => {
  const reminder = {
    id: '1',
    title: 'Doctor Appointment',
    when: '2024-01-01T10:00:00Z',
    category: 'appointment',
  };

  render(<ReminderCard reminder={reminder} />);

  expect(screen.getByText('Doctor Appointment')).toBeInTheDocument();
});
```

---

## 9. Performance Goals

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s
- **TTFB (Time to First Byte)**: < 600ms

### Optimization Strategies

1. **Image Optimization**: Next.js Image component
2. **Code Splitting**: Automatic with App Router
3. **Font Optimization**: next/font
4. **Bundle Analysis**: @next/bundle-analyzer
5. **Caching**: React Query + HTTP caching
6. **Static Generation**: Where possible
7. **Incremental Static Regeneration (ISR)**: For dynamic pages

---

## Next Steps

Proceed to:
- **03-component-architecture.md** - Component breakdown and hierarchy
- **04-styling-migration.md** - Tailwind CSS setup and customization
