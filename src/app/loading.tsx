import React from 'react';

export default function Loading() {
  return (
    <div className="dashboard-shell min-h-screen text-[#f7f4f8] relative overflow-hidden flex justify-center items-start py-5 px-4 md:py-8 md:px-6">
      {/* Glow effects */}
      <div className="glow-spot-1" />
      <div className="glow-spot-2" />
      <div className="noise-overlay" />

      {/* Centered App Wrapper */}
      <div className="max-w-[1440px] w-full flex flex-col md:flex-row gap-4 items-stretch">
        {/* Sidebar Skeleton (hidden on mobile, collapses to md:w-20, lg:w-64) */}
        <div className="hidden md:flex flex-col bg-[#0b0c10]/95 border border-[#1d1e26] rounded-[24px] w-20 lg:w-64 p-5 shrink-0 h-[640px] animate-pulse">
          <div className="h-12 bg-[#1d1e26] rounded-xl mb-6 mx-2" />
          <div className="flex-1 flex flex-col gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-[#1d1e26] rounded-xl mx-1" />
            ))}
          </div>
        </div>

        {/* Main Content Area Skeleton */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Header Skeleton */}
          <div className="h-20 bg-[#111218] border border-[#1d1e26] rounded-2xl animate-pulse" />

          {/* Bento Grid Skeleton */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 flex-1">
            {/* COLUMN 1 SKELETON */}
            <div className="xl:col-span-6 flex flex-col gap-4">
              {/* Courses skeleton */}
              <div className="h-96 bg-[#111218] border border-[#1d1e26] rounded-3xl p-5 flex flex-col justify-between animate-pulse">
                <div className="h-4 w-28 bg-[#1c1d26] rounded mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  <div className="bg-[#181922] border border-[#242633] rounded-2xl p-5 h-56" />
                  <div className="bg-[#181922] border border-[#242633] rounded-2xl p-5 h-56" />
                </div>
              </div>
              {/* Stats skeleton */}
              <div className="h-24 bg-[#111218] border border-[#1d1e26] rounded-3xl animate-pulse" />
              {/* Days Report & Learning Hours side-by-side skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-56 bg-[#111218] border border-[#1d1e26] rounded-3xl animate-pulse" />
                <div className="h-56 bg-[#111218] border border-[#1d1e26] rounded-3xl animate-pulse" />
              </div>
            </div>

            {/* COLUMN 2 SKELETON */}
            <div className="xl:col-span-6 flex flex-col gap-4">
              {/* Events & Calendar side-by-side skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-72 bg-[#111218] border border-[#1d1e26] rounded-3xl animate-pulse" />
                <div className="h-72 bg-[#111218] border border-[#1d1e26] rounded-3xl animate-pulse" />
              </div>
              {/* Grades Chart skeleton */}
              <div className="h-56 bg-[#111218] border border-[#1d1e26] rounded-3xl animate-pulse" />
            </div>

            {/* Submission Tracker skeleton */}
            <div className="xl:col-span-12 h-64 bg-[#111218] border border-[#1d1e26] rounded-3xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

