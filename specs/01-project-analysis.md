# Project Analysis: MoMent HTML to Next.js Migration

## Executive Summary

MoMent is a comprehensive companion app for moms and families, featuring appointments tracking, vaccine management, community forum, AI Q&A, second-hand marketplace, and benefits information. The current implementation consists of 13 HTML pages using Tailwind CSS (CDN) and Alpine.js for interactivity.

---

## 1. Current Project Structure

### HTML Files Inventory

```
/home/user/MoMent/
├── index.html              (Home/Dashboard)
├── community.html          (Community Forum)
├── profile.html            (User Profile & Settings)
├── ai.html                 (AI Assistant Chat)
├── market.html             (Second-hand Marketplace)
├── appointments.html       (Appointments List)
├── appointments-new.html   (New Appointment Form)
├── vaccines.html           (Vaccine Tracking)
├── reminders.html          (Reminders Management)
├── timelines.html          (Timeline View)
├── insurance.html          (Insurance Information)
├── benefits.html           (Benefits & Eligibility)
├── menu.html               (Mobile Menu)
├── logo.png                (Application Logo)
└── figma_mobileapp/        (React/TypeScript Components - Partial Implementation)
    ├── App.tsx
    ├── components/
    ├── styles/
    └── guidelines/
```

### Technology Stack Analysis

#### Current Technologies
- **HTML5**: Semantic markup with accessibility attributes
- **CSS Framework**: Tailwind CSS (via CDN)
- **JavaScript Library**: Alpine.js 3.x (for reactive state management)
- **Icons**: Inline SVG sprites
- **State Management**: Alpine.js reactive data stores
- **Routing**: Traditional multi-page HTML navigation

#### Dependencies (External)
```html
<!-- Tailwind CSS CDN -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Alpine.js CDN -->
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

---

## 2. Feature Analysis

### Core Features by Page

#### **Home (index.html)**
- **Dashboard Overview**: Pregnancy age, next visit, baby vaccine countdown
- **Reminders Section**: CRUD operations for reminders with categories
- **Community Preview**: Latest posts from community
- **Benefits CTA**: Eligibility information
- **Quick Actions**: Add reminder, book visit, log vaccine, write post
- **Family Switcher**: Toggle between family members
- **Responsive Layout**: Desktop (3-column), Mobile (single column with bottom nav)

**Interactive Elements**:
- Add/edit/delete reminders
- Form validation
- Dynamic reminder list
- Family member switcher
- Toast notifications

#### **Community (community.html)**
- **Post Grid**: Masonry-style post cards with images
- **Filtering**: Category filters (Nutrition, Sleep, Breastfeeding, etc.)
- **Sorting**: Latest/Top posts
- **Search**: Full-text search across posts
- **Post Composer Modal**: Create new posts with images, categories, tags
- **Post Detail Modal**: View full post with image carousel
- **Trending Tags**: Hashtag navigation
- **Top Authors**: Follow/unfollow functionality

**Interactive Elements**:
- Category filtering (multi-select)
- Search functionality
- Modal dialogs (composer, post detail)
- Image carousel
- Like/comment interactions
- Infinite scroll/pagination

#### **AI Assistant (ai.html)**
- **Chat Interface**: Message history with user/AI bubbles
- **Context Mode**: Pregnancy/Postpartum toggle with age input
- **Quick Prompts**: Pre-defined question templates
- **Smart Chips**: Modifier tags (#concise, #checklist, #red-flags)
- **File Upload**: Attach images/documents
- **Voice Input**: Speech-to-text capability
- **Citations**: Source references for AI responses
- **Copy/Regenerate**: Message actions

**Interactive Elements**:
- Real-time chat messages
- File attachment preview
- Voice recording
- Auto-scroll to latest message
- Context-aware prompts

#### **Marketplace (market.html)**
- **Product Grid**: Item cards with images, price, condition
- **Advanced Filtering**: Category, condition, price range
- **Search**: Full-text item search
- **Sorting**: Newest, price low-to-high, high-to-low
- **Post Item Modal**: Multi-step item creation with image upload
- **Item Detail Modal**: Gallery view with thumbnails
- **Pagination**: Client-side pagination

**Interactive Elements**:
- Multi-criteria filtering
- Image upload with preview (up to 5 images)
- Image gallery with navigation
- Save/favorite items
- Dynamic card rendering

#### **Profile (profile.html)**
- **Account Management**: Name, email, phone, hospital
- **Children Management**: Multiple child profiles with CRUD operations
- **Photo Upload**: Profile and child photos
- **Hospital Integration**: Search and link hospital accounts
- **Notifications**: Push/email preferences
- **Family/Caregivers**: Invite system
- **Security**: Password change functionality

**Interactive Elements**:
- Multi-child card management
- Photo upload with preview
- Form validation
- Dynamic card creation/removal
- Hospital search/link

#### **Appointments (appointments.html, appointments-new.html)**
- **Appointment List**: Upcoming/past appointments
- **Calendar View**: Date picker integration
- **Appointment Form**: Create new appointments with details
- **Categories**: Prenatal, pediatric, general checkup

#### **Vaccines (vaccines.html)**
- **Vaccine Schedule**: Age-based vaccine timeline
- **Tracking**: Mark vaccines as completed
- **Reminders**: Upcoming vaccine alerts

#### **Reminders (reminders.html)**
- **Full List**: All reminders with filtering
- **Categories**: Appointment, vaccine, wellness, task
- **CRUD Operations**: Create, read, update, delete

#### **Benefits & Insurance (benefits.html, insurance.html)**
- **Eligibility Checker**: Government benefits
- **Insurance Info**: Policy details and claims
- **Document Deadlines**: Reminder system

---

## 3. Routing Structure

### Current Navigation Pattern

```
Static HTML Navigation:
├── / (index.html)                    → Home
├── /community.html                   → Community
├── /ai.html                          → AI Assistant
├── /market.html                      → Marketplace
├── /profile.html                     → Profile
├── /appointments.html                → Appointments List
├── /appointments-new.html            → New Appointment
├── /vaccines.html                    → Vaccines
├── /reminders.html                   → Reminders
├── /timelines.html                   → Timeline
├── /insurance.html                   → Insurance
├── /benefits.html                    → Benefits
└── /menu.html                        → Mobile Menu
```

**Navigation Components**:
1. **Desktop Top Bar**: Logo, nav links, search, notifications
2. **Mobile Header**: Menu button, user info, notifications
3. **Mobile Bottom Nav**: 5 main sections with centered AI button
4. **Left Sidebar** (Desktop): Profile card, quick actions
5. **Right Sidebar** (Desktop): Upcoming appointments, benefits CTA

---

## 4. UI/UX Patterns

### Design System

#### Color Palette
```css
Primary: violet-600, violet-700
Secondary: fuchsia-500
Neutral: slate-50, slate-100, slate-500, slate-700, slate-800
Success: emerald-500
Warning: amber-500
Error: red-500
```

#### Typography
- Base font size: System default (16px implied)
- Font stack: System font stack (not specified)
- Font weights: normal (400), medium (500), semibold (600)

#### Spacing & Layout
- Max width: 7xl (1280px)
- Breakpoints: md (768px), lg (1024px)
- Grid: 12-column system on desktop
- Padding: 4px increments (Tailwind default)
- Border radius: xl (12px), 2xl (16px) for cards

#### Components
- **Cards**: White background, rounded-2xl, shadow-sm
- **Buttons**:
  - Primary: bg-violet-600, text-white, rounded-xl
  - Secondary: border, rounded-xl
- **Inputs**: border, rounded-xl, focus:ring-2
- **Modals**: Fixed overlay, centered, rounded-2xl
- **Badges**: Small, rounded-full, bg-slate-100

### Responsive Breakpoints

```css
Mobile-first approach:
- Mobile: < 768px (default)
- Tablet/Desktop: md: 768px+
- Large Desktop: lg: 1024px+
```

**Layout Adaptations**:
- **Mobile**: Single column, bottom nav, hamburger menu
- **Desktop**: 3-column grid, top nav, sidebars visible

---

## 5. State Management

### Alpine.js Data Stores

#### Community Page State
```javascript
x-data="communityApp()" {
  posts: [],
  categories: [],
  selectedCats: [],
  sort: 'latest',
  q: '',
  openPostModal: false,
  openComposer: false,
  activePost: null,
  draft: { title, content, category, tags, imagesPreview },
  filteredPosts: computed,
  hasMore: boolean,
  trendingTags: [],
  topAuthors: [],
  followedAuthors: []
}
```

#### AI Chat State
```javascript
x-data="chatApp()" {
  msgs: [],
  draft: '',
  loading: false,
  contextMode: 'preg|post',
  pregWeeks: number,
  babyMonths: number,
  recording: false,
  attachedName: '',
  attachedData: null
}
```

#### Market State
```javascript
// Vanilla JS state object
selected: {
  q: '',
  categories: Set,
  conditions: Set,
  priceMin: number,
  priceMax: number,
  sort: 'newest',
  page: number
}
```

### Form State Management
- Local component state (Alpine.js)
- No global state management
- Form data persisted via localStorage (implied, not implemented)

---

## 6. External Dependencies & Libraries

### CDN Dependencies
```json
{
  "tailwindcss": "^3.x (CDN)",
  "alpinejs": "^3.x (CDN)"
}
```

### Asset Dependencies
- External images (placeholder URLs from various sources)
- Logo.png (local asset)
- SVG icon sprites (inline)

### Third-party Integrations (Implied)
- Hospital API integration (profile.html)
- AI/LLM API (ai.html)
- File upload service (market.html, profile.html)
- Notification service (bell icon, notifications)

---

## 7. Accessibility Audit

### Current Accessibility Features

#### Good Practices ✓
- Semantic HTML5 elements (`<nav>`, `<header>`, `<main>`, `<aside>`, `<article>`)
- ARIA labels (`aria-label`, `aria-labelledby`, `aria-current`)
- Alt text on images
- Keyboard navigation support (implicit)
- Focus states on interactive elements

#### Areas for Improvement ⚠️
- No skip navigation links
- Missing ARIA live regions for dynamic content
- Inconsistent heading hierarchy
- No focus trap in modals
- Missing loading states for async operations
- No keyboard shortcuts documentation

---

## 8. Performance Considerations

### Current Performance Issues

1. **CDN Dependencies**:
   - Tailwind CDN (~3MB uncompressed)
   - Alpine.js CDN (~50KB)
   - Network latency for external scripts

2. **Image Optimization**:
   - No lazy loading
   - No responsive images (srcset)
   - External image URLs (no CDN optimization)

3. **JavaScript**:
   - Inline scripts in HTML (no code splitting)
   - No minification
   - Re-fetching data on page navigation

4. **CSS**:
   - Full Tailwind loaded (not purged)
   - Repeated styles across pages
   - No critical CSS extraction

5. **Caching**:
   - No service worker
   - No asset versioning
   - No client-side data caching

---

## 9. Reusable Component Patterns

### Identified Components

#### Layout Components
1. **DesktopHeader** - Top navigation bar
2. **MobileHeader** - Mobile header with menu
3. **BottomNav** - Mobile bottom navigation
4. **LeftSidebar** - Profile card + quick actions
5. **RightSidebar** - Appointments + benefits CTA
6. **PageLayout** - 3-column grid wrapper

#### UI Components
1. **Card** - White container with shadow
2. **Button** - Primary, secondary, tertiary variants
3. **Input** - Text, number, date, select
4. **Modal** - Dialog overlay with content
5. **Badge** - Small label pill
6. **Avatar** - Circular image with fallback
7. **IconButton** - SVG icon in button
8. **SearchField** - Input with icon
9. **NotificationBell** - Bell icon with badge

#### Feature Components
1. **ReminderCard** - Reminder list item
2. **AppointmentCard** - Appointment list item
3. **PostCard** - Community post card
4. **ProductCard** - Market item card
5. **ChatBubble** - AI chat message
6. **FamilySwitcher** - Family member selector
7. **CategoryFilter** - Multi-select filter pills
8. **ImageUploader** - File input with preview
9. **ImageCarousel** - Gallery with thumbnails

#### Form Components
1. **ReminderForm** - Add/edit reminder
2. **AppointmentForm** - Create appointment
3. **PostComposer** - Create community post
4. **ProductForm** - List marketplace item
5. **ProfileForm** - Edit user profile
6. **ChildForm** - Add/edit child profile

---

## 10. Data Models (Inferred)

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  hospital: string;
  notifications: {
    push: boolean;
    email: boolean;
  };
}
```

### Child
```typescript
interface Child {
  id: string;
  name: string;
  birthDate: string;
  gender: 'Male' | 'Female';
  bloodType: string;
  allergies: string;
  primaryDoctor: string;
  photo: string;
}
```

### Reminder
```typescript
interface Reminder {
  id: string;
  title: string;
  when: string; // ISO datetime
  note: string;
  category: 'appointment' | 'vaccine' | 'wellness' | 'task';
  completed: boolean;
}
```

### Appointment
```typescript
interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'prenatal' | 'pediatric' | 'general';
  notes: string;
}
```

### CommunityPost
```typescript
interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    badge: string;
  };
  title: string;
  content: string;
  category: string;
  tags: string[];
  images: string[];
  likes: number;
  comments: number;
  createdAt: string;
}
```

### MarketItem
```typescript
interface MarketItem {
  id: string;
  title: string;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  price: number;
  location: string;
  description: string;
  images: string[];
  seller: {
    id: string;
    name: string;
  };
  createdAt: number;
}
```

### ChatMessage
```typescript
interface ChatMessage {
  id: string;
  from: 'user' | 'ai';
  text: string;
  attachName?: string;
  attachData?: string;
  citations?: string[];
  createdAt: string;
}
```

---

## 11. Security Considerations

### Current Security Issues

1. **No Authentication**: No login/logout system visible
2. **Client-side Only**: All logic runs in browser
3. **No API Layer**: Direct data manipulation
4. **File Uploads**: No validation/sanitization
5. **XSS Vulnerabilities**: Potential in user-generated content
6. **No HTTPS Enforcement**: Static HTML files
7. **No Rate Limiting**: API calls not throttled

### Data Privacy (PDPA Compliance)
- Mentioned in AI page: "with your consent under the PDPA"
- Hospital integration requires privacy controls
- User data storage/consent mechanisms needed

---

## 12. Internationalization (i18n)

### Current Language Support
- **Primary**: English (en)
- **Secondary**: Thai (th) - mentioned in profile.html `lang="th"`
- **Content**: Mix of English UI and Thai location names

### i18n Requirements
- Multi-language support (EN/TH minimum)
- Date/time localization
- Currency formatting (THB)
- Right-to-left (RTL) not required

---

## 13. Key Insights for Migration

### Strengths to Preserve
1. **Clean, Modern UI**: Consistent design system
2. **Responsive Design**: Well-implemented mobile/desktop views
3. **Accessibility**: Good semantic HTML foundation
4. **Component Patterns**: Clear reusable patterns
5. **User Experience**: Intuitive navigation and interactions

### Areas Requiring Enhancement
1. **Performance**: CDN dependencies, no optimization
2. **State Management**: Local state only, no persistence
3. **Data Fetching**: No API integration pattern
4. **Authentication**: Not implemented
5. **Testing**: No test coverage
6. **SEO**: Limited metadata and structure
7. **Progressive Enhancement**: Requires JavaScript

### Migration Priorities
1. **High**: Core pages (Home, Community, AI, Market, Profile)
2. **Medium**: Appointments, Vaccines, Reminders
3. **Low**: Benefits, Insurance, Timeline, Menu

---

## Next Steps

Proceed to:
- **02-migration-strategy.md** - Next.js configuration and approach
- **03-component-architecture.md** - Component breakdown and hierarchy
- **04-styling-migration.md** - Tailwind CSS setup and customization
