# Next-Gen Student Dashboard

A high-fidelity, futuristic Student Dashboard prototype featuring a Bento Grid layout in a dark mode theme, built using Next.js App Router, Tailwind CSS, Framer Motion, and Supabase.

## Deployed URL & Source Repository
- **GitHub Repository**: [https://github.com/example/student-dashboard](https://github.com/example/student-dashboard) *(Placeholder or user repository)*
- **Live Vercel Deployment**: [https://student-dashboard-nextgen.vercel.app](https://student-dashboard-nextgen.vercel.app) *(Placeholder or user deployment)*

---

## Architecture & Design Choices

### 1. Server vs. Client Component Split (RSC/RCC)
To satisfy Next-Gen performance constraints (Zero Layout Shifts, hardware-accelerated animations, and efficient server rendering), we separated the component tree based on responsibility:
- **Server Components (RSC)**: 
  - `src/app/page.tsx`: Serves as the page entrypoint. It wraps the dynamic data loader `DashboardContent` in a React `<Suspense>` boundary.
  - `src/lib/supabase.ts`: Handles data fetching and validation securely on the server.
- **Client Components (RCC)**:
  - `src/components/DashboardLayout.tsx`: Coordinates sidebar-tab switching and handles background ambient lighting animations.
  - `src/components/Sidebar.tsx`: Supports responsive collapsing and interactive `layoutId` spring animations.
  - `src/components/CourseGrid.tsx`: Animates custom progress bars on load (from 0% to the target fetched value) and handles spring-loaded hover triggers.
  - `src/components/BentoGrid.tsx`: Controls the staggered entrance animation of the individual tiles.
  - `src/components/DaysReport.tsx`, `src/components/LearningHoursChart.tsx`, `src/components/GradesChart.tsx`, `src/components/CalendarCard.tsx`, `src/components/EventsCard.tsx`: Render lightweight, responsive SVG elements animating area curves, bars, and donut rings.

### 2. Live Database Integration & Fallback
We connect to Supabase securely via `@supabase/ssr` cookies and server client.
- **Strict Data Integrity**: All fetched database rows are checked by a manual TypeScript type guard (`validateCourse`) before rendering.
- **Graceful Error Handling / Local Fallback**: If the required environment credentials (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are missing, the system automatically falls back to local mocks. If credentials are present but query fails, a Next.js `error.tsx` boundary catches it and offers a retry.

### 3. Layout Shifts Prevention & Performance Optimization
All interactive scaling and hover actions use Framer Motion's `transform` and `opacity` properties exclusively, ensuring the browser executes layout recalculations on the GPU with no layout shifts or repaints. Hover glows are driven by hardware-accelerated CSS opacity transitions on a dedicated absolute overlay, preventing JS rendering loop repaints on border colors.

---

## Challenges Faced

1. **Hydration Layout Shifts on Page Load**: The loading skeleton has to align exactly with the coordinates and flex constraints of the hydrated shell. By mirroring the outer layout container classes (e.g., flex-direction, min-heights, max-widths, and padding) in `loading.tsx`, we optimized the layout to minimize visual shifts during content rendering.
2. **Server/Client Component Boundaries**: Keeping data fetch on the server while leveraging Framer Motion triggers on cards required nesting client components (`CourseGrid`, `BentoGrid`) as children of the suspended server page layout, avoiding `'use client'` on data clients.
3. **Database Schema Caching**: Real-time caching on Supabase's API cache sometimes caused query lag or cached schema cache registry errors. We resolved this by implementing defensive type checking and explicit query ordering on server data layers.
4. **Streak Synchronization**: Keeping the streak indicator in the header in sync with the interactive submission tracker check-in button without central state managers (like Redux) was resolved by implementing a custom synchronization hook (`useStreak`) backed by custom window events.

---

## Getting Started

### 1. Environment Configuration
Create a `.env.local` file at the root of the project with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. Supabase Table Schema & Seed Data
You can easily set up the database and mock data using the SQL script located in the repository at [supabase/seed.sql](file:///x:/Sample%20Project/supabase/seed.sql). Paste its content in the Supabase SQL Editor.

### 3. Development Server
Run the local server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
