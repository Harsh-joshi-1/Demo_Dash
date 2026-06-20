'use client';

import React, { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Unhandled dashboard boundary error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#08090c] text-zinc-100 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="max-w-md w-full bg-[#111218] border border-[#1d1e26] rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-6">
        {/* Warning Indicator */}
        <div className="size-16 rounded-full bg-red-950/20 border border-red-500/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-zinc-200">Something went wrong</h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {error.message || 'An error occurred while loading the dashboard. Please verify your Supabase configuration and try again.'}
          </p>
        </div>

        <button
          onClick={reset}
          className="w-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white font-medium text-xs rounded-xl py-3 cursor-pointer shadow-[0_4px_20px_rgba(124,58,237,0.3)] transition-all"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
