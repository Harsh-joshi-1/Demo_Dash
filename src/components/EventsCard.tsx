'use client';

import React from 'react';
import { Bell, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { EventItem } from '@/types';

export default function EventsCard() {
  const events: EventItem[] = [
    { id: '1', title: 'Design Fest', time: '21.02.2023 on 12 PM' },
    { id: '2', title: 'IT Fest', time: '27.02.2023 on 10 PM' }
  ];

  return (
    <div className="flex h-full flex-col gap-3">
      <motion.section
        whileHover={{
          scale: 1.015,
          y: -2,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="surface-card rounded-[18px] p-4 flex-1 relative overflow-hidden group"
        aria-labelledby="events-title"
      >
        {/* Glow Overlay */}
        <div className="absolute inset-0 rounded-[inherit] border border-[#a78bfa]/40 shadow-[0_0_25px_rgba(167, 139, 250, 0.12)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div>
          <h3 id="events-title" className="text-sm font-normal text-zinc-100 mb-3 tracking-wide">Events</h3>
          <div className="flex flex-col gap-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex justify-between items-center py-2 border-b border-white/20 last:border-b-0"
              >
                <div>
                  <h4 className="font-normal text-zinc-100 text-xs">{event.title}</h4>
                  <p className="text-[8px] text-zinc-400">{event.time}</p>
                </div>
                <button
                  className="size-7 rounded-full flex items-center justify-center text-zinc-200 hover:text-[#dfa0e5] transition-colors cursor-pointer"
                  aria-label={`Notify for ${event.title}`}
                >
                  <Bell className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        whileHover={{
          scale: 1.015,
          y: -2,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="surface-card rounded-[18px] px-4 py-3 flex items-center justify-between min-h-[66px] relative overflow-hidden group"
        aria-label="Your mentor"
      >
        {/* Glow Overlay */}
        <div className="absolute inset-0 rounded-[inherit] border border-[#a78bfa]/40 shadow-[0_0_25px_rgba(167, 139, 250, 0.12)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-[#242633] bg-[#181922] relative">
            <Image
              fill
              sizes="36px"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128&auto=format&fit=crop"
              alt="Anna Miller"
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="font-bold text-xs text-zinc-200">Anna Miller</h4>
            <p className="text-[10px] text-zinc-500">Mentor</p>
          </div>
        </div>
        <button
          className="size-8 rounded-full flex items-center justify-center text-zinc-200 hover:text-[#dfa0e5] transition-colors cursor-pointer"
          aria-label="Chat with mentor"
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </button>
      </motion.section>
    </div>
  );
}
