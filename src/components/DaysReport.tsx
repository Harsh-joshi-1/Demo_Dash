'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function DaysReport() {
  const percentage = 72;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <motion.section
      whileHover={{
        scale: 1.015,
        y: -3,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-[#111218] border border-[#1d1e26] rounded-3xl p-5 flex flex-col justify-between h-56 relative overflow-hidden group"
      aria-labelledby="days-report-title"
    >
      {/* Glow Overlay */}
      <div className="absolute inset-0 rounded-[inherit] border border-[#a78bfa]/40 shadow-[0_0_25px_rgba(167, 139, 250, 0.12)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="flex justify-between items-center mb-2">
        <h3 id="days-report-title" className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">Days report</h3>
        <span className="text-[10px] text-zinc-500 font-semibold bg-[#181922] px-2.5 py-1 rounded-lg border border-[#242633] cursor-pointer">
          20.02.2023
        </span>
      </div>

      {/* SVG Semi-circle Arc Gauge */}
      <div className="flex-1 flex items-center justify-center relative mt-2">
        <svg viewBox="0 0 100 60" className="w-32 h-20 overflow-visible">
          {/* Background arc */}
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            className="stroke-[#1d1e26]"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Animated Foreground arc */}
          <motion.path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            className="stroke-violet-500"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="125.66"
            initial={{ strokeDashoffset: 125.66 }}
            animate={{ strokeDashoffset: 125.66 - (percentage / 100) * 125.66 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-3">
          <span className="text-2xl font-black text-zinc-100">{percentage}%</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-violet-500" />
          <span className="text-[9px] text-zinc-400 font-medium">Done</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#1d1e26]" />
          <span className="text-[9px] text-zinc-400 font-medium">Progress</span>
        </div>
      </div>
    </motion.section>
  );
}
