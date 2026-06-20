'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useStreak } from '@/hooks/useStreak';

const WEEKS_COUNT = 53;
const MONTHS_LABELS = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

interface DaySquare {
  id: string;
  level: number; // 0: none, 1: low, 2: medium, 3: high, 4: highest
  col: number;
  row: number;
}

const getMonthForWeek = (weekIdx: number) => {
  const monthIndex = Math.min(Math.floor((weekIdx / WEEKS_COUNT) * 12), 12);
  return MONTHS_LABELS[monthIndex];
};

export default function SubmissionTracker() {
  const { streak, hasCheckedIn, checkIn } = useStreak();
  const [totalSubmissions, setTotalSubmissions] = useState(423);
  const [activeDays, setActiveDays] = useState(104);
  const [gridData, setGridData] = useState<DaySquare[]>([]);
  const prevCheckedIn = useRef(hasCheckedIn);
  
  // Interactive tooltip state
  const [tooltip, setTooltip] = useState<{
    submissions: number;
    date: string;
    top: number;
    left: number;
  } | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasCheckedIn && !prevCheckedIn.current) {
      setTotalSubmissions(prev => prev + 1);
      setActiveDays(prev => prev + 1);
    }
    prevCheckedIn.current = hasCheckedIn;
  }, [hasCheckedIn]);

  useEffect(() => {
    const generated: DaySquare[] = Array.from({ length: WEEKS_COUNT * 7 }, (_, idx) => {
      const col = Math.floor(idx / 7);
      const row = idx % 7;
      const seed = (col * 17 + row * 9) * 3;
      
      let level = 0;
      if (seed % 8 === 0) level = 1;
      else if (seed % 13 === 0) level = 2;
      else if (seed % 21 === 0) level = 3;
      else if (seed % 35 === 0) level = 4;

      if (col > 15 && col < 35) {
        level = seed % 29 === 0 ? 2 : (seed % 19 === 0 ? 1 : 0);
      }

      return {
        id: `day-${idx}`,
        level,
        col,
        row,
      };
    });

    if (hasCheckedIn && generated.length > 0) {
      generated[generated.length - 1].level = 4;
    }

    setGridData(generated);
  }, [hasCheckedIn]);

  const handleCheckIn = () => {
    checkIn();
  };

  const handleCellHover = (e: React.MouseEvent<HTMLDivElement>, day: DaySquare) => {
    if (!containerRef.current) return;
    
    const cellRect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Estimate submission counts based on level
    const counts = [0, 1, 3, 6, 12];
    const subs = counts[day.level];
    
    // Generate date label based on week column
    const monthStr = getMonthForWeek(day.col);
    const dayVal = ((day.col * 7 + day.row) % 28) + 1;
    
    setTooltip({
      submissions: subs,
      date: `${monthStr} ${dayVal}, 2023`,
      top: cellRect.top - containerRect.top - 42,
      left: cellRect.left - containerRect.left - 50 + (cellRect.width / 2),
    });
  };

  return (
    <motion.section 
      ref={containerRef}
      whileHover={{
        scale: 1.015,
        y: -3,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-gradient-to-b from-[#13141a] to-[#0c0d11] border border-white/[0.04] rounded-3xl p-5 w-full flex flex-col justify-between relative overflow-visible shadow-[0_20px_50px_rgba(0,0,0,0.4)] group"
      aria-labelledby="tracker-title"
    >
      {/* Glow Overlay */}
      <div className="absolute inset-0 rounded-[inherit] border border-[#a78bfa]/40 shadow-[0_0_25px_rgba(167, 139, 250, 0.12)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      {/* Dynamic Floating Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.15 }}
            style={{ 
              top: tooltip.top, 
              left: tooltip.left,
              transform: 'translateX(-50%)'
            }}
            className="absolute z-30 pointer-events-none bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 shadow-xl text-center flex flex-col items-center justify-center min-w-[100px]"
          >
            <span className="text-[10px] font-bold text-white whitespace-nowrap">
              {tooltip.submissions === 0 ? 'No' : tooltip.submissions} submissions
            </span>
            <span className="text-[8px] text-zinc-500 font-semibold whitespace-nowrap mt-0.5">
              {tooltip.date}
            </span>
            <div className="w-1.5 h-1.5 bg-zinc-950 border-r border-b border-white/10 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 select-none">
        <h3 id="tracker-title" className="text-sm font-semibold text-zinc-200">Tracker</h3>
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
          <div>
            Total active days: <span className="font-semibold text-zinc-100">{activeDays}</span>
          </div>
          <div>
            Max streak: <span className="font-semibold text-zinc-100">66</span>
          </div>
          
          <div className="flex items-center gap-1 bg-[#16171d] border border-white/[.04] px-2.5 py-1.5 rounded-lg text-zinc-300 cursor-pointer hover:bg-zinc-800/40 transition-colors">
            <span>Current</span>
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800">
        <div className="flex gap-3 min-w-[760px] items-start px-1">
          {/* Day of Week Labels */}
          <div className="grid grid-rows-7 gap-[3px] h-[88px] text-[9px] font-semibold text-zinc-500 select-none pt-[1px] w-6 pr-1">
            <span className="invisible">Sun</span>
            <span className="flex items-center">Mon</span>
            <span className="invisible">Tue</span>
            <span className="flex items-center">Wed</span>
            <span className="invisible">Thu</span>
            <span className="flex items-center">Fri</span>
            <span className="invisible">Sat</span>
          </div>

          {/* Month Labels and Squares Grid */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Top Month Headers */}
            <div className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-[3px] select-none h-4">
              {Array.from({ length: WEEKS_COUNT }).map((_, colIdx) => {
                const month = getMonthForWeek(colIdx);
                const prevMonth = colIdx > 0 ? getMonthForWeek(colIdx - 1) : null;
                const isFirstWeekOfMonth = month !== prevMonth;
                return (
                  <span key={colIdx} className="text-[9px] font-semibold text-zinc-500 block text-left">
                    {isFirstWeekOfMonth ? month : ''}
                  </span>
                );
              })}
            </div>

            {/* Squares Grid with Hover Animations */}
            <div className="grid grid-flow-col grid-rows-7 gap-[3px] h-[88px] relative z-10">
              {gridData.map((day) => {
                let bgClass = 'bg-[#16171d]';
                let glowColor = 'transparent';
                
                if (day.level === 1) {
                  bgClass = 'bg-[#4a2c52]/40';
                  glowColor = 'rgba(74, 44, 82, 0.2)';
                } else if (day.level === 2) {
                  bgClass = 'bg-[#7e4b8a]/60';
                  glowColor = 'rgba(126, 75, 138, 0.35)';
                } else if (day.level === 3) {
                  bgClass = 'bg-[#b58fbc]/90';
                  glowColor = 'rgba(181, 143, 188, 0.5)';
                } else if (day.level === 4) {
                  bgClass = 'bg-[#e08be3]';
                  glowColor = 'rgba(224, 139, 227, 0.8)';
                }

                return (
                  <motion.div
                    key={day.id}
                    onMouseEnter={(e) => handleCellHover(e, day)}
                    onMouseLeave={() => setTooltip(null)}
                    whileHover={{ scale: 1.35, zIndex: 20 }}
                    style={{
                      '--glow-color': glowColor
                    } as React.CSSProperties}
                    className={`w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-colors duration-300 border border-white/[0.01] ${bgClass} ${day.level > 0 ? 'shadow-[0_0_6px_var(--glow-color)]' : ''}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-end mt-4 text-[10px] text-zinc-500 border-t border-white/[0.03] pt-3">
        <div className="flex items-center gap-1.5 select-none">
          <span>Less</span>
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#16171d] border border-white/[0.01]" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#4a2c52]/40" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#7e4b8a]/60" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#b58fbc]/90" />
          <div className="w-[10px] h-[10px] rounded-[2px] bg-[#e08be3] shadow-[0_0_6px_rgba(224,139,227,0.5)]" />
          <span>More</span>
        </div>
      </div>
    </motion.section>
  );
}
