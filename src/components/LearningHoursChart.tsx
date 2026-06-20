'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function LearningHoursChart() {
  const days = [
    { name: 'Mo', hours: 4 },
    { name: 'Tu', hours: 6 },
    { name: 'We', hours: 3 },
    { name: 'Th', hours: 8 },
    { name: 'Fr', hours: 5 },
    { name: 'Sa', hours: 5 },
    { name: 'Su', hours: 2 }
  ];

  const maxHours = 8;

  return (
    <motion.section
      whileHover={{
        scale: 1.015,
        y: -3,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-[#111218] border border-[#1d1e26] rounded-3xl p-5 flex flex-col justify-between h-56 relative overflow-hidden group"
      aria-labelledby="learning-hours-title"
    >
      {/* Glow Overlay */}
      <div className="absolute inset-0 rounded-[inherit] border border-[#a78bfa]/40 shadow-[0_0_25px_rgba(167, 139, 250, 0.12)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="flex justify-between items-center mb-4">
        <h3 id="learning-hours-title" className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">Learning hours</h3>
        <span className="text-[10px] text-zinc-500 font-semibold bg-[#181922] px-2.5 py-1 rounded-lg border border-[#242633] cursor-pointer">
          Last week
        </span>
      </div>

      {/* Bar Chart Container */}
      <div className="flex-1 flex items-end justify-between gap-2 px-1">
        {days.map((day, idx) => {
          const heightPercent = (day.hours / maxHours) * 100;
          return (
            <div key={day.name} className="flex flex-col items-center flex-1 group">
              {/* Tooltip on Hover */}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-zinc-200 text-[8px] font-bold py-0.5 px-1.5 rounded mb-1 absolute -translate-y-9 shadow-md pointer-events-none">
                {day.hours} hrs
              </span>

              {/* Bar */}
              <div className="w-full bg-[#1c1d26] h-24 rounded-full flex items-end overflow-hidden">
                <motion.div
                  style={{ height: `${heightPercent}%`, transformOrigin: 'bottom' }}
                  className="w-full rounded-full bg-gradient-to-t from-indigo-500 to-violet-400"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.08, ease: 'easeOut' }}
                />
              </div>

              {/* Label */}
              <span className="text-[9px] font-bold text-zinc-500 mt-2">{day.name}</span>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
