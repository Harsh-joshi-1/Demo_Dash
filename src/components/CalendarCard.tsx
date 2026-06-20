'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ScheduleItem } from '@/types';

const TODAY_SCHEDULE: ScheduleItem[] = [
  { id: 'eng-speak', title: 'English (speaking)', time: '10.30 - 12.00' },
  { id: 'ui-lesson', title: 'UX/UI design (lesson)', time: '12.30 - 15.00' }
];

export default function CalendarCard() {
  const [viewDate, setViewDate] = useState(() => new Date());
  
  const today = new Date();
  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const handlePrevMonth = () => {
    setViewDate(prev => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() - 1);
      return copy;
    });
  };

  const handleNextMonth = () => {
    setViewDate(prev => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() + 1);
      return copy;
    });
  };

  // Get total days in the month
  const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
  
  // Get start weekday (adjusted so Monday = 0, Sunday = 6)
  let startDay = new Date(viewYear, viewMonth, 1).getDay();
  startDay = startDay === 0 ? 6 : startDay - 1;

  const calendarDays: { num: number; active: boolean; currentMonth: boolean }[] = [];

  // Previous month padding days
  const prevMonthTotalDays = new Date(viewYear, viewMonth, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({
      num: prevMonthTotalDays - i,
      active: false,
      currentMonth: false
    });
  }

  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    const isToday = 
      i === today.getDate() && 
      viewMonth === today.getMonth() && 
      viewYear === today.getFullYear();

    calendarDays.push({
      num: i,
      active: isToday,
      currentMonth: true
    });
  }

  // Next month padding days to make it a clean multiple of 7 (up to 42 cells)
  const totalCells = Math.ceil(calendarDays.length / 7) * 7;
  const remaining = totalCells - calendarDays.length;
  for (let i = 1; i <= remaining; i++) {
    calendarDays.push({
      num: i,
      active: false,
      currentMonth: false
    });
  }

  return (
    <motion.section
      whileHover={{
        scale: 1.015,
        y: -3,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="surface-card rounded-[18px] p-4 flex flex-col justify-between min-h-[320px] h-full relative overflow-hidden group"
      aria-labelledby="calendar-title"
    >
      {/* Glow Overlay */}
      <div className="absolute inset-0 rounded-[inherit] border border-[#a78bfa]/40 shadow-[0_0_25px_rgba(167, 139, 250, 0.12)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 id="calendar-title" className="text-sm font-semibold text-zinc-100 tracking-wide">
            {monthNames[viewMonth]} {viewYear}
          </h3>
          <div className="flex items-center gap-1">
            <button 
              onClick={handlePrevMonth}
              className="w-5 h-5 rounded-md flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-[#181922] transition-colors cursor-pointer" 
              aria-label="Previous month"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={handleNextMonth}
              className="w-5 h-5 rounded-md flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-[#181922] transition-colors cursor-pointer" 
              aria-label="Next month"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {daysOfWeek.map((day, idx) => (
            <span key={idx} className="text-[9px] font-bold text-zinc-600">
              {day}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1 text-center mb-3">
          {calendarDays.map((day, idx) => (
            <div key={idx} className="flex justify-center items-center py-0.5">
              {day.active ? (
                <span className="w-5 h-5 rounded-full bg-violet-600 text-zinc-100 font-bold text-[10px] flex items-center justify-center shadow-[0_0_8px_rgba(139,92,246,0.4)]">
                  {day.num}
                </span>
              ) : (
                <span className={`text-[10px] ${
                  day.currentMonth 
                    ? 'text-zinc-300 font-medium' 
                    : 'text-zinc-700 opacity-40'
                }`}>
                  {day.num}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Today Schedule List */}
      <div className="border-t border-[#1d1e26] pt-3">
        <span className="text-[8px] text-zinc-500 font-semibold uppercase tracking-wider block mb-1.5">Today's Schedule</span>
        <div className="flex flex-col gap-2">
          {TODAY_SCHEDULE.map((item, idx) => (
            <div 
              key={item.id} 
              className={`flex flex-col pl-2 border-l-2 ${idx === 0 ? 'border-indigo-400/50' : 'border-violet-400/50'}`}
            >
              <h4 className="font-semibold text-zinc-200 text-[10px] leading-tight">{item.title}</h4>
              <p className="text-[8px] text-zinc-500 mt-0.5">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
