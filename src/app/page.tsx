import React, { Suspense } from 'react';
import { getCourses } from '@/lib/supabase';
import DashboardLayout from '@/components/DashboardLayout';

// Force dynamic rendering to ensure DB calls are made live on each load
export const dynamic = 'force-dynamic';

async function DashboardContent() {
  const { courses, isFallback } = await getCourses();
  return <DashboardLayout courses={courses} isFallback={isFallback} />;
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}
