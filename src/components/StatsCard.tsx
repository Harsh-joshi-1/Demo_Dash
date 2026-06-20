'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StatItem } from '@/types';

export default function StatsCard() {
  const stats: StatItem[] = [
    { label: 'Homeworks', value: 8, total: 12, color: 'text-violet-400' },
    { label: 'Rewards', value: 9, total: 10, color: 'text-emerald-400' },
    { label: 'Conspectuses', value: 19, total: 24, color: 'text-indigo-400' },
    { label: 'English lessons', value: 16, total: 32, color: 'text-cyan-400' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
      {stats.map((stat) => (
        <motion.article
          key={stat.label}
          whileHover={{
            scale: 1.03,
            y: -2,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="bg-[#29282a] border border-white/[.04] rounded-[16px] px-3 sm:px-4 py-3 flex flex-col justify-center h-[76px] relative overflow-hidden cursor-pointer group"
        >
          {/* Glow Overlay */}
          <div className="absolute inset-0 rounded-[inherit] border border-[#a78bfa]/40 shadow-[0_0_15px_rgba(167, 139, 250, 0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <h4 className="text-[10px] sm:text-[11px] font-normal text-zinc-200 tracking-tight relative z-10">{stat.label}</h4>
          <div className="flex items-baseline gap-1.5 mt-1 relative z-10">
            <span className="text-2xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#ef9bf1] to-[#a192ff]">
              {stat.value}
            </span>
            <span className="text-zinc-300 text-sm font-light">
              / {stat.total}
            </span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
