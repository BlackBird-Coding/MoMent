# Implementation Roadmap: Phase-by-Phase Migration Plan

## Overview

**Total Estimated Duration**: 12 weeks

**Team Composition** (Recommended):
- 1-2 Frontend Developers
- 1 UI/UX Designer (part-time)
- 1 QA Engineer (part-time)

---

## Phase 1: Foundation Setup (Week 1)

### Goals
- Set up Next.js project with TypeScript
- Configure development environment
- Establish project structure
- Set up CI/CD pipeline

### Tasks

#### 1.1 Project Initialization ✅

```bash
# Create Next.js app
npx create-next-app@latest moment \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd moment

# Install core dependencies
npm install @tanstack/react-query zustand next-auth
npm install react-hook-form @hookform/resolvers/zod zod
npm install date-fns class-variance-authority clsx tailwind-merge
npm install lucide-react

# Install dev dependencies
npm install -D prettier eslint-config-prettier
npm install -D @types/node @types/react @types/react-dom
```

#### 1.2 Configure shadcn/ui ✅

```bash
npx shadcn-ui@latest init

# Install essential components
npx shadcn-ui@latest add button card input textarea select
npx shadcn-ui@latest add dialog drawer avatar badge
npx shadcn-ui@latest add form label toast tabs
npx shadcn-ui@latest add calendar popover dropdown-menu
npx shadcn-ui@latest add navigation-menu separator checkbox
npx shadcn-ui@latest add radio-group switch carousel
```

#### 1.3 Project Structure Setup ✅

```bash
mkdir -p src/{components,lib,hooks,store,types,config}
mkdir -p src/components/{ui,layout,features,shared}
mkdir -p src/components/features/{reminders,community,ai,market,profile}
mkdir -p src/app/{api,\(auth\),\(main\)}
```

#### 1.4 Configuration Files ✅

**ESLint Config** (`.eslintrc.json`):
```json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@next/next/no-img-element": "off"
  }
}
```

**Prettier Config** (`.prettierrc`):
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

**TypeScript Config Updates** (`tsconfig.json`):
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

#### 1.5 Git Setup ✅

```bash
git init
git add .
git commit -m "Initial Next.js project setup"

# Create .gitignore additions
echo "
# Environment
.env*.local

# IDE
.vscode/
.idea/
" >> .gitignore
```

#### 1.6 Environment Variables ✅

Create `.env.example`:
```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth (NextAuth.js)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Database (if using)
DATABASE_URL=

# APIs
NEXT_PUBLIC_API_URL=
AI_API_KEY=
```

### Deliverables
- ✅ Working Next.js development server
- ✅ Configured TypeScript and ESLint
- ✅ shadcn/ui installed and configured
- ✅ Project structure established
- ✅ Git repository initialized

### Success Criteria
- `npm run dev` starts without errors
- `npm run build` completes successfully
- ESLint shows no errors

---

## Phase 2: Core Layout & Navigation (Week 1-2)

### Goals
- Create responsive layout system
- Build navigation components
- Implement routing structure

### Tasks

#### 2.1 Root Layout & Providers (2 days)

**Files to Create**:
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/providers.tsx`

**Implementation**:

```typescript
// src/components/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}
```

#### 2.2 Navigation Configuration (1 day)

**File**: `src/config/navigation.ts`

```typescript
import { Home, Users, Sparkles, ShoppingBag, User } from 'lucide-react';

export const mainNavigation = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Community', href: '/community', icon: Users },
  { label: 'Ask AI', href: '/ai', icon: Sparkles, featured: true },
  { label: 'Market', href: '/market', icon: ShoppingBag },
  { label: 'Profile', href: '/profile', icon: User },
];

export const quickActions = [
  { label: 'Add reminder', href: '/?action=add-reminder' },
  { label: 'Book visit', href: '/appointments/new' },
  { label: 'Log vaccine', href: '/vaccines?action=add' },
  { label: 'Write a post', href: '/community?action=compose' },
];
```

#### 2.3 Layout Components (3 days)

**Priority Order**:
1. ✅ **DesktopHeader** - `src/components/layout/desktop-header.tsx`
2. ✅ **MobileHeader** - `src/components/layout/mobile-header.tsx`
3. ✅ **BottomNav** - `src/components/layout/bottom-nav.tsx`
4. ✅ **LeftSidebar** - `src/components/layout/left-sidebar.tsx`
5. ✅ **RightSidebar** - `src/components/layout/right-sidebar.tsx`
6. ✅ **MainLayout** - `src/app/(main)/layout.tsx`

#### 2.4 Shared Components (2 days)

- ✅ Logo component
- ✅ SearchField component
- ✅ NotificationBell component
- ✅ LoadingSpinner component

#### 2.5 Route Structure Setup (1 day)

Create placeholder pages:
```bash
# Main routes
touch src/app/\(main\)/page.tsx
touch src/app/\(main\)/community/page.tsx
touch src/app/\(main\)/ai/page.tsx
touch src/app/\(main\)/market/page.tsx
touch src/app/\(main\)/profile/page.tsx
```

### Deliverables
- ✅ Responsive layout working on mobile and desktop
- ✅ Navigation components functional
- ✅ Route structure established
- ✅ Shared components created

### Success Criteria
- Navigation works across all breakpoints
- Active route highlighting works
- Mobile/desktop layouts switch correctly at md breakpoint

---

## Phase 3: UI Component Library (Week 2-3)

### Goals
- Customize shadcn/ui components
- Create reusable shared components
- Build component documentation

### Tasks

#### 3.1 Customize shadcn/ui Theme (2 days)

**File**: `src/app/globals.css`

- Define CSS variables for MoMent brand colors
- Configure component-specific overrides
- Set up animation keyframes

#### 3.2 Shared Components (5 days)

**Priority List**:

1. **ImageUploader** (1 day)
   - Multiple file selection
   - Preview grid
   - Remove functionality
   - Max file size validation

2. **ImageGallery/Carousel** (1 day)
   - Thumbnail navigation
   - Main image display
   - Keyboard navigation
   - Touch gestures (mobile)

3. **CategoryFilter** (1 day)
   - Multi-select pills
   - Active state styling
   - Clear filters action

4. **Pagination** (0.5 day)
   - Previous/Next buttons
   - Page indicator
   - Disabled states

5. **EmptyState** (0.5 day)
   - Icon
   - Title
   - Description
   - CTA button

6. **ErrorBoundary** (0.5 day)
   - Error display
   - Retry functionality
   - Error logging

7. **ConfirmDialog** (0.5 day)
   - Reusable confirmation modal
   - Async actions support

### Deliverables
- ✅ 20+ reusable UI components
- ✅ Component props properly typed
- ✅ Accessible and keyboard navigable

### Success Criteria
- All components render without errors
- Components work across mobile/desktop
- TypeScript has no type errors

---

## Phase 4: Authentication & User Management (Week 3-4)

### Goals
- Set up NextAuth.js
- Create login/register pages
- Implement session management
- Build profile page

### Tasks

#### 4.1 NextAuth.js Setup (2 days)

**Files**:
- `src/lib/auth.ts`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/middleware.ts`

**Features**:
- Credentials provider
- JWT session strategy
- Protected routes middleware

#### 4.2 Auth Pages (2 days)

- Login page: `src/app/(auth)/login/page.tsx`
- Register page: `src/app/(auth)/register/page.tsx`
- Auth layout: `src/app/(auth)/layout.tsx`

#### 4.3 Profile Feature (3 days)

**Components**:
1. ProfileForm
2. ChildCard (with CRUD)
3. PhotoUploader
4. HospitalConnect
5. NotificationSettings
6. SecuritySection

### Deliverables
- ✅ Working authentication system
- ✅ Login/register flows
- ✅ Protected routes
- ✅ Profile management

### Success Criteria
- Users can register and login
- Session persists across page reloads
- Protected routes redirect to login
- Profile updates save correctly

---

## Phase 5: Core Feature Migration (Week 4-8)

### 5.1 Home/Dashboard + Reminders (Week 4-5)

#### Tasks

**Week 4**: Home Page
- ✅ Today snapshot cards
- ✅ Community preview
- ✅ Benefits CTA
- ✅ Quick actions integration

**Week 5**: Reminders Feature
- ✅ ReminderList component
- ✅ ReminderCard component
- ✅ ReminderForm (Dialog)
- ✅ CRUD operations
- ✅ API routes: `/api/reminders`
  - GET: List reminders
  - POST: Create reminder
  - PATCH: Update reminder
  - DELETE: Delete reminder

#### Deliverables
- ✅ Functional home dashboard
- ✅ Complete reminders management
- ✅ API integration

#### Success Criteria
- Users can view today's summary
- Reminders CRUD works end-to-end
- Data persists correctly

---

### 5.2 Community + Posts (Week 5-6)

#### Tasks

**Week 5-6**: Community Feature
- ✅ PostGrid with filtering
- ✅ PostCard component
- ✅ CategoryFilter with multi-select
- ✅ SearchBar functionality
- ✅ PostComposer (Dialog)
  - Title, content, category, tags
  - Multiple image upload
  - Submit/Cancel actions
- ✅ PostDetail (Dialog)
  - Image gallery/carousel
  - Full content display
  - Like/comment counts
- ✅ API routes: `/api/posts`
  - GET: List posts (with filters)
  - POST: Create post
  - GET /:id: Get single post
  - PATCH /:id: Update post
  - DELETE /:id: Delete post

#### Deliverables
- ✅ Full community forum
- ✅ Post creation workflow
- ✅ Filtering and search

#### Success Criteria
- Users can browse posts
- Filtering works correctly
- Post creation saves with images
- Post detail shows all content

---

### 5.3 AI Chat (Week 6-7)

#### Tasks

**Week 6-7**: AI Assistant
- ✅ ChatContainer layout
- ✅ ChatBubble component (user/AI variants)
- ✅ MessageList with auto-scroll
- ✅ ChatInput with rich features:
  - Text input (auto-resize)
  - File attachment
  - Voice input (optional)
  - Smart chips
  - Send button
- ✅ QuickPrompts sidebar
- ✅ ContextMode selector
- ✅ API routes: `/api/ai`
  - POST /chat: Send message
  - POST /upload: Upload attachment

#### Integration
- Connect to AI/LLM API (OpenAI, Claude, etc.)
- Handle streaming responses (optional)
- Citation parsing and display

#### Deliverables
- ✅ Working AI chat interface
- ✅ Message history
- ✅ Quick prompts functional
- ✅ File attachment working

#### Success Criteria
- Users can send messages
- AI responds correctly
- Chat history persists
- Context mode affects responses

---

### 5.4 Marketplace (Week 7-8)

#### Tasks

**Week 7-8**: Market Feature
- ✅ ProductGrid with pagination
- ✅ ProductCard component
- ✅ FiltersPanel:
  - Search input
  - Category filter
  - Condition checkboxes
  - Price range
  - Sort dropdown
- ✅ ProductForm (Dialog):
  - Title, category, condition
  - Price, location
  - Description
  - Image upload (up to 5)
- ✅ ProductDetail (Dialog):
  - Image gallery
  - Product info
  - Message seller CTA
  - Save/favorite button
- ✅ API routes: `/api/items`
  - GET: List items (with filters)
  - POST: Create item
  - GET /:id: Get single item
  - PATCH /:id: Update item
  - DELETE /:id: Delete item

#### Deliverables
- ✅ Marketplace with search/filter
- ✅ Item listing creation
- ✅ Item detail view

#### Success Criteria
- Users can browse items
- Filters work correctly
- Item creation saves with images
- Pagination works

---

## Phase 6: Additional Features (Week 8-10)

### 6.1 Appointments + Vaccines (Week 8)

#### Appointments
- ✅ AppointmentList page
- ✅ AppointmentCard component
- ✅ AppointmentForm (new page)
- ✅ Calendar integration
- ✅ API routes

#### Vaccines
- ✅ VaccineSchedule component
- ✅ VaccineCard component
- ✅ Mark as complete functionality
- ✅ API routes

### 6.2 Timeline + Insurance (Week 9)

#### Timeline
- ✅ Timeline view component
- ✅ Event cards
- ✅ Filtering by type

#### Insurance
- ✅ Insurance info page
- ✅ Policy cards
- ✅ Claims tracking

### 6.3 Benefits + Settings (Week 10)

#### Benefits
- ✅ Eligibility checker
- ✅ Benefits list
- ✅ Application forms

#### Settings
- ✅ Notification preferences
- ✅ Privacy settings
- ✅ Account management

### Deliverables
- ✅ All remaining pages migrated
- ✅ Full feature parity with HTML version

### Success Criteria
- All pages accessible and functional
- Data flows work end-to-end

---

## Phase 7: Optimization & Testing (Week 10-12)

### 7.1 Performance Optimization (Week 10)

#### Tasks
1. **Image Optimization**
   - Replace `<img>` with Next.js `<Image>`
   - Configure image domains
   - Add blur placeholders

2. **Code Splitting**
   - Lazy load heavy components
   - Dynamic imports for modals
   - Route-based splitting (automatic)

3. **Bundle Analysis**
   ```bash
   npm install -D @next/bundle-analyzer
   npm run build
   npm run analyze
   ```
   - Identify large dependencies
   - Remove unused code
   - Optimize imports

4. **Caching Strategy**
   - Configure React Query stale times
   - Set up HTTP caching headers
   - Implement ISR for static content

#### Deliverables
- Lighthouse score > 90 (Performance)
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

---

### 7.2 SEO Implementation (Week 10-11)

#### Tasks
1. **Metadata**
   - Configure metadata per page
   - Open Graph tags
   - Twitter Card tags
   - Canonical URLs

2. **Structured Data**
   - JSON-LD schema
   - Article schema for posts
   - Product schema for market items

3. **Sitemap & Robots**
   ```typescript
   // src/app/sitemap.ts
   export default function sitemap() {
     return [
       { url: 'https://moment.app/', changeFrequency: 'daily' },
       // ...
     ];
   }
   ```

#### Deliverables
- All pages have proper metadata
- Sitemap generated
- robots.txt configured

---

### 7.3 Accessibility Audit (Week 11)

#### Tasks
1. **ARIA Implementation**
   - Add ARIA labels where missing
   - Implement ARIA live regions
   - Add skip navigation links

2. **Keyboard Navigation**
   - Test all interactive elements
   - Fix focus traps in modals
   - Add keyboard shortcuts

3. **Screen Reader Testing**
   - Test with NVDA/JAWS
   - Fix semantic issues
   - Add visually-hidden text

4. **Color Contrast**
   - Verify WCAG AA compliance
   - Fix low-contrast text

#### Tools
- axe DevTools
- Lighthouse Accessibility
- WAVE

#### Deliverables
- Lighthouse Accessibility score > 95
- Zero critical axe violations

---

### 7.4 Cross-browser & Mobile Testing (Week 11-12)

#### Browsers to Test
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Mobile Chrome (Android)

#### Devices to Test
- iPhone 12/13/14
- iPad
- Android phones (various sizes)
- Android tablets

#### Test Cases
- Navigation flows
- Form submissions
- Image uploads
- Modal interactions
- Touch gestures

#### Tools
- BrowserStack
- Chrome DevTools device mode

---

### 7.5 Load & Stress Testing (Week 12)

#### Tasks
1. **API Load Testing**
   ```bash
   npm install -D artillery
   ```
   - Test concurrent users
   - Identify bottlenecks
   - Optimize slow endpoints

2. **Database Performance**
   - Add indexes
   - Optimize queries
   - Connection pooling

#### Deliverables
- System handles 100 concurrent users
- API response time < 200ms (p95)

---

## Phase 8: Deployment & Launch (Week 12)

### 8.1 Production Build (Day 1-2)

#### Tasks
1. **Environment Configuration**
   - Set production environment variables
   - Configure CDN for images
   - Set up error tracking (Sentry)

2. **Build & Test**
   ```bash
   npm run build
   npm run start
   ```
   - Verify production build
   - Test all critical paths

### 8.2 Deployment (Day 3-4)

#### Platform Options
- **Vercel** (Recommended)
  - Zero-config deployment
  - Automatic HTTPS
  - Global CDN
  - Preview deployments

- **Alternatives**: AWS Amplify, Netlify, Railway

#### Steps
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### 8.3 Monitoring Setup (Day 5)

#### Tools
1. **Analytics**: Vercel Analytics or Google Analytics
2. **Error Tracking**: Sentry
3. **Performance**: Vercel Speed Insights
4. **Uptime**: UptimeRobot

### 8.4 User Acceptance Testing (Week 12)

#### Test Plan
- Recruit 10-20 beta testers
- Provide test scenarios
- Collect feedback
- Fix critical issues

### Deliverables
- ✅ Production deployment live
- ✅ Monitoring configured
- ✅ UAT completed
- ✅ Documentation updated

---

## Risk Mitigation

### Potential Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| API integration delays | High | Mock API responses, build parallel |
| Performance issues | Medium | Profile early, optimize continuously |
| Browser compatibility | Medium | Test frequently, use polyfills |
| Scope creep | High | Strict change control, MVP focus |
| Data migration | High | Plan early, test thoroughly |

---

## Success Metrics

### Technical Metrics
- ✅ Lighthouse Performance: > 90
- ✅ Lighthouse Accessibility: > 95
- ✅ Zero critical bugs
- ✅ < 100ms API response time (p95)
- ✅ 99.9% uptime

### User Metrics
- ✅ Page load time < 2 seconds
- ✅ Zero data loss during migration
- ✅ User satisfaction > 4/5

---

## Next Steps

Proceed to:
- **06-technical-specifications.md** - Dependencies and configuration
- **07-challenges-and-solutions.md** - Risks and mitigation strategies
