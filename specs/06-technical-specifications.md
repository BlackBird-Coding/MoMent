# Technical Specifications

## 1. Technology Stack

### Core Framework
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.3.0"
}
```

### Styling
```json
{
  "tailwindcss": "^3.4.0",
  "tailwindcss-animate": "^1.0.7",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.1.0"
}
```

### UI Components
```json
{
  "@radix-ui/react-avatar": "^1.0.4",
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-label": "^2.0.2",
  "@radix-ui/react-popover": "^1.0.7",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-separator": "^1.0.3",
  "@radix-ui/react-slot": "^1.0.2",
  "@radix-ui/react-tabs": "^1.0.4",
  "@radix-ui/react-toast": "^1.1.5",
  "@radix-ui/react-navigation-menu": "^1.1.4",
  "@radix-ui/react-checkbox": "^1.0.4",
  "@radix-ui/react-radio-group": "^1.1.3",
  "@radix-ui/react-switch": "^1.0.3",
  "lucide-react": "^0.294.0",
  "sonner": "^1.2.0"
}
```

### State Management
```json
{
  "@tanstack/react-query": "^5.17.0",
  "zustand": "^4.4.7"
}
```

### Forms & Validation
```json
{
  "react-hook-form": "^7.49.0",
  "@hookform/resolvers": "^3.3.3",
  "zod": "^3.22.4"
}
```

### Authentication
```json
{
  "next-auth": "^5.0.0-beta"
}
```

### Database (Optional - Choose One)

#### Option 1: Prisma + PostgreSQL
```json
{
  "@prisma/client": "^5.7.0",
  "prisma": "^5.7.0"
}
```

#### Option 2: Drizzle + PostgreSQL
```json
{
  "drizzle-orm": "^0.29.1",
  "drizzle-kit": "^0.20.6",
  "pg": "^8.11.3"
}
```

#### Option 3: Supabase
```json
{
  "@supabase/supabase-js": "^2.39.0"
}
```

### Utilities
```json
{
  "date-fns": "^3.0.0",
  "nanoid": "^5.0.4",
  "sharp": "^0.33.0"
}
```

### Dev Dependencies
```json
{
  "@types/node": "^20",
  "@types/react": "^18",
  "@types/react-dom": "^18",
  "eslint": "^8",
  "eslint-config-next": "^15.0.0",
  "eslint-config-prettier": "^9.1.0",
  "prettier": "^3.1.1",
  "@next/bundle-analyzer": "^15.0.0"
}
```

---

## 2. Package Installation Commands

### Initial Setup

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
npm install date-fns nanoid
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react

# Install UI dependencies (Radix UI)
npm install @radix-ui/react-avatar
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu
npm install @radix-ui/react-label
npm install @radix-ui/react-popover
npm install @radix-ui/react-select
npm install @radix-ui/react-separator
npm install @radix-ui/react-slot
npm install @radix-ui/react-tabs
npm install @radix-ui/react-checkbox
npm install @radix-ui/react-radio-group
npm install @radix-ui/react-switch
npm install @radix-ui/react-navigation-menu
npm install sonner

# Install shadcn/ui CLI
npx shadcn-ui@latest init

# Install shadcn/ui components
npx shadcn-ui@latest add button card input textarea select
npx shadcn-ui@latest add dialog drawer avatar badge
npx shadcn-ui@latest add form label toast tabs
npx shadcn-ui@latest add calendar popover dropdown-menu
npx shadcn-ui@latest add navigation-menu separator
npx shadcn-ui@latest add checkbox radio-group switch carousel

# Install dev dependencies
npm install -D prettier eslint-config-prettier
npm install -D @next/bundle-analyzer

# Database (choose one)
# For Prisma:
npm install @prisma/client
npm install -D prisma

# For Supabase:
npm install @supabase/supabase-js

# For file uploads
npm install sharp
```

---

## 3. Environment Variables

### `.env.local`

```bash
# ============================================
# Application
# ============================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MoMent

# ============================================
# Authentication (NextAuth.js)
# ============================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here # Generate: openssl rand -base64 32

# ============================================
# Database
# ============================================
# For Prisma + PostgreSQL:
DATABASE_URL="postgresql://user:password@localhost:5432/moment?schema=public"

# For Supabase:
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ============================================
# File Upload
# ============================================
# For AWS S3:
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=ap-southeast-1
AWS_S3_BUCKET=moment-uploads

# For Cloudinary:
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# For Vercel Blob:
BLOB_READ_WRITE_TOKEN=your-token

# ============================================
# AI Integration
# ============================================
# For OpenAI:
OPENAI_API_KEY=your-openai-key

# For Anthropic Claude:
ANTHROPIC_API_KEY=your-anthropic-key

# ============================================
# Email Service
# ============================================
# For SendGrid:
SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@moment.app

# For Resend:
RESEND_API_KEY=your-resend-key

# ============================================
# Analytics & Monitoring
# ============================================
# Google Analytics:
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Sentry:
SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project

# ============================================
# Feature Flags
# ============================================
NEXT_PUBLIC_ENABLE_AI_CHAT=true
NEXT_PUBLIC_ENABLE_MARKETPLACE=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

### `.env.example`

```bash
# Copy this file to .env.local and fill in the values

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Auth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Database
DATABASE_URL=

# File Upload (choose one)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=

# AI
OPENAI_API_KEY=

# Email
SENDGRID_API_KEY=
```

---

## 4. Database Schema (Prisma Example)

### `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// User & Authentication
// ============================================

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  phone         String?
  hospital      String?

  // Preferences
  notifications Json?

  // Relations
  accounts      Account[]
  sessions      Session[]
  children      Child[]
  reminders     Reminder[]
  posts         Post[]
  items         Item[]
  appointments  Appointment[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// ============================================
// Children
// ============================================

model Child {
  id            String   @id @default(cuid())
  userId        String
  name          String
  birthDate     DateTime
  gender        String
  bloodType     String?
  allergies     String?
  primaryDoctor String?
  photo         String?

  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// ============================================
// Reminders
// ============================================

model Reminder {
  id        String   @id @default(cuid())
  userId    String
  title     String
  when      DateTime
  note      String?
  category  String   // appointment, vaccine, wellness, task
  completed Boolean  @default(false)

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId, when])
}

// ============================================
// Appointments
// ============================================

model Appointment {
  id       String   @id @default(cuid())
  userId   String
  title    String
  date     DateTime
  time     String
  location String?
  type     String   // prenatal, pediatric, general
  notes    String?

  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId, date])
}

// ============================================
// Community Posts
// ============================================

model Post {
  id        String   @id @default(cuid())
  userId    String
  title     String
  content   String
  category  String
  tags      String[]
  images    String[]
  likes     Int      @default(0)
  comments  Int      @default(0)

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([category])
  @@index([createdAt])
}

// ============================================
// Marketplace Items
// ============================================

model Item {
  id          String   @id @default(cuid())
  userId      String
  title       String
  category    String
  condition   String   // New, Like New, Good, Fair
  price       Float
  location    String
  description String
  images      String[]
  sold        Boolean  @default(false)

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId])
  @@index([category])
  @@index([price])
  @@index([createdAt])
}
```

### Prisma Commands

```bash
# Initialize Prisma
npx prisma init

# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name init

# Push schema to database (no migration)
npx prisma db push

# Open Prisma Studio
npx prisma studio

# Seed database (optional)
npx prisma db seed
```

---

## 5. API Routes Structure

### API Endpoints

```
/api
├── /auth
│   └── /[...nextauth]     # NextAuth.js handler
│
├── /users
│   ├── /me                # GET: Current user
│   └── /[id]              # GET, PATCH, DELETE: User by ID
│
├── /children
│   ├── /                  # GET: List, POST: Create
│   └── /[id]              # GET, PATCH, DELETE: Child by ID
│
├── /reminders
│   ├── /                  # GET: List, POST: Create
│   └── /[id]              # GET, PATCH, DELETE: Reminder by ID
│
├── /appointments
│   ├── /                  # GET: List, POST: Create
│   └── /[id]              # GET, PATCH, DELETE: Appointment by ID
│
├── /posts
│   ├── /                  # GET: List, POST: Create
│   └── /[id]              # GET, PATCH, DELETE: Post by ID
│
├── /items
│   ├── /                  # GET: List, POST: Create
│   └── /[id]              # GET, PATCH, DELETE: Item by ID
│
├── /ai
│   ├── /chat              # POST: Send message
│   └── /upload            # POST: Upload file
│
└── /upload
    └── /                  # POST: Upload file (general)
```

### Example API Route

```typescript
// src/app/api/reminders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createReminderSchema = z.object({
  title: z.string().min(1),
  when: z.string().datetime(),
  note: z.string().optional(),
  category: z.enum(['appointment', 'vaccine', 'wellness', 'task']),
});

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
  const validation = createReminderSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: validation.error.issues },
      { status: 400 }
    );
  }

  const reminder = await prisma.reminder.create({
    data: {
      ...validation.data,
      userId: session.user.id,
    },
  });

  return NextResponse.json(reminder, { status: 201 });
}
```

---

## 6. Deployment Configuration

### Vercel Deployment

**`vercel.json`** (optional):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sin1"],
  "env": {
    "NEXTAUTH_URL": "https://moment.app",
    "DATABASE_URL": "@database-url"
  }
}
```

### Docker (Alternative)

**`Dockerfile`**:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**`docker-compose.yml`**:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/moment
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=moment
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## 7. CI/CD Pipeline (GitHub Actions)

**`.github/workflows/ci.yml`**:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run type-check

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test
```

---

## 8. Monitoring & Analytics

### Sentry Configuration

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  integrations: [new Sentry.BrowserTracing()],
});
```

### Vercel Analytics

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## Next Steps

Proceed to:
- **07-challenges-and-solutions.md** - Risks and mitigation strategies
