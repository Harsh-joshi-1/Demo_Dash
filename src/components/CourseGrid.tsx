'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Course } from '@/types';

interface CourseGridProps {
  courses: Course[];
}

type LucideIcons = Record<string, React.ComponentType<{ className?: string }>>;

function CourseIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as unknown as LucideIcons)[name] || Icons.BookOpen;
  return <IconComponent className={className} />;
}

const cardStyles = [
  {
    cardClass: 'course-0',
    circleBg: 'bg-[#c59dc9]',
    iconColor: 'text-[#49354d]',
    progressBgClass: 'bg-gradient-to-r from-[#ef8af2] to-[#d78cde]',
    extraStudents: 17,
    hasStripes: false,
    hasLines: true,
  },
  {
    cardClass: 'course-1',
    circleBg: 'bg-[#9199d3]',
    iconColor: 'text-[#353d6e]',
    progressBgClass: 'bg-[#7a81d6]',
    extraStudents: 13,
    hasStripes: true,
    hasLines: false,
  },
  {
    cardClass: 'course-2',
    circleBg: 'bg-[#a3afc2]',
    iconColor: 'text-[#343e4d]',
    progressBgClass: 'bg-[#6d798a]',
    extraStudents: 21,
    hasStripes: false,
    hasLines: true,
  },
  {
    cardClass: 'course-3',
    circleBg: 'bg-[#b8a1bd]',
    iconColor: 'text-[#4a344c]',
    progressBgClass: 'bg-[#806884]',
    extraStudents: 19,
    hasStripes: true,
    hasLines: false,
  }
];

const cardVariants = {
  initial: {
    scale: 1,
    y: 0
  },
  hover: {
    scale: 1.015,
    y: -3,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  }
} as const;

const orbVariants = {
  initial: { opacity: 0.1, scale: 1 },
  hover: { opacity: 0.2, scale: 1.1, transition: { duration: 0.3 } }
} as const;

const glowVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } }
} as const;

const arrowVariants = {
  initial: { x: 0 },
  hover: { x: 4, transition: { type: 'spring', stiffness: 300, damping: 20 } }
} as const;

export default function CourseGrid({ courses }: CourseGridProps) {
  return (
    <section className="surface-card rounded-[22px] p-5 relative overflow-hidden flex flex-col justify-between h-full" aria-labelledby="courses-title">
      <div className="flex items-center justify-between mb-4">
        <h3 id="courses-title" className="text-sm font-medium text-zinc-200">Your courses</h3>
        <button className="text-[10px] text-zinc-500 hover:text-[#dfa0e5] transition-colors">View all</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {courses.map((course, index) => {
          const style = cardStyles[index % cardStyles.length];
          const iconName = course.icon_name;
          const photo1 = index % 2 === 1 ? 'photo-1507003211169-0a1dd7228f2d' : 'photo-1500648767791-00dcc994a43e';
          const photo2 = index % 2 === 1 ? 'photo-1544005313-94ddf0286df2' : 'photo-1494790108377-be9c29b29330';

          return (
            <motion.article
              key={course.id}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className={`${style.cardClass} relative rounded-[20px] p-5 overflow-hidden flex flex-col h-56 cursor-pointer border border-white/[0.08] shadow-[0_14px_28px_rgba(0,0,0,0.12)]`}
            >
              {/* Abstract subtle mesh gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 opacity-50 pointer-events-none" />
              
              {/* Animated Blur Orb via Framer Motion */}
              <motion.div 
                variants={orbVariants}
                className="absolute -top-10 -right-10 w-24 h-24 bg-violet-600 rounded-full blur-2xl pointer-events-none" 
              />

              {/* Animated Glow Border Overlay via Framer Motion */}
              <motion.div
                variants={glowVariants}
                className="absolute inset-0 rounded-[inherit] border border-[#f0b2f4]/32 pointer-events-none"
              />

              {/* Card Header */}
              <div className="flex justify-between items-start relative z-10">
                <div className={`size-11 rounded-full ${style.circleBg} flex items-center justify-center border border-white/15 shadow-inner`}>
                  <CourseIcon name={iconName} className={`w-5 h-5 ${style.iconColor}`} />
                </div>
                {style.hasStripes ? (
                   <div className="flex gap-1.5 pt-1.5 opacity-50 justify-end h-6 overflow-hidden" aria-hidden="true">
                     {[1, 2, 3, 4, 5, 6].map((line) => (
                       <span key={line} className="w-[3px] h-6 rounded-full bg-white transform rotate-[25deg] origin-center" />
                     ))}
                   </div>
                ) : style.hasLines ? (
                   <div className="flex w-24 flex-wrap justify-end gap-x-2 gap-y-1 pt-1 opacity-55" aria-hidden="true">
                     {[32, 38, 24, 34, 29, 20].map((width, line) => (
                       <span key={line} className="h-1 rounded-full bg-[#edb7f0]" style={{ width }} />
                     ))}
                   </div>
                ) : null}
              </div>

              {/* Title & Info */}
              <div className="mt-5 relative z-10">
                <h4 className="font-normal text-lg tracking-wide text-white/90 group-hover:text-white transition-colors line-clamp-1">{course.title}</h4>
              </div>

              {/* Animated Progress Bar (Spring Animation) */}
              <div className="mt-4 relative z-10 w-full">
                <div className="h-2 w-full bg-white/85 rounded-full overflow-hidden">
                  <motion.div
                    style={{ transformOrigin: 'left' }}
                    className={`h-full ${style.progressBgClass} rounded-full`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: course.progress / 100 }}
                    transition={{
                      delay: 0.3,
                      type: 'spring',
                      stiffness: 80,
                      damping: 15
                    }}
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-xs font-medium text-white/85">{course.progress}%</span>
                </div>
              </div>

              <div className="relative z-10 mt-auto flex items-center justify-between">
                <div className="flex items-center -space-x-2" aria-label={`${style.extraStudents + 2} students enrolled`}>
                  {[photo1, photo2].map((photo, avatar) => (
                    <div key={photo} className="relative size-8 flex-none rounded-full border-2 border-white/75 overflow-hidden bg-zinc-700">
                      <Image fill sizes="32px" src={`https://images.unsplash.com/${photo}?q=90&w=128&auto=format&fit=crop`} alt={`Enrolled student ${avatar + 1}`} className="object-cover" />
                    </div>
                  ))}
                  <div className="relative z-10 flex size-8 flex-none items-center justify-center rounded-full border-2 border-white bg-white text-[9px] font-medium text-[#55455a]">
                    +{style.extraStudents}
                  </div>
                </div>
                <motion.div variants={arrowVariants}>
                  <ArrowRight className="size-5 text-[#e4a9e8]" aria-hidden="true" />
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
