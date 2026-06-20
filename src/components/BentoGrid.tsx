'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Course } from '@/types';
import CourseGrid from './CourseGrid';
import EventsCard from './EventsCard';
import CalendarCard from './CalendarCard';
import StatsCard from './StatsCard';
import LearningHoursChart from './LearningHoursChart';
import GradesChart from './GradesChart';
import DaysReport from './DaysReport';
import SubmissionTracker from './SubmissionTracker';

interface BentoGridProps {
  courses: Course[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 24,
    },
  },
} as const;

export default function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="bento-board grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 p-4 sm:p-5 xl:p-5 pb-20 md:pb-5 select-none rounded-[28px]"
    >
      {/* LEFT COLUMN (6 Cols on Desktop, 1 Col on Tablet) */}
      <div className="md:col-span-1 xl:col-span-6 flex flex-col gap-4">
        {/* Row 1: Your Courses */}
        <motion.div variants={itemVariants}>
          <CourseGrid courses={courses.slice(0, 2)} />
        </motion.div>

        {/* Row 2: Stats */}
        <motion.div variants={itemVariants}>
          <StatsCard />
        </motion.div>

        {/* Row 3: Days Report & Learning Hours (Side-by-Side) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <DaysReport />
          </motion.div>
          <motion.div variants={itemVariants}>
            <LearningHoursChart />
          </motion.div>
        </div>
      </div>

      {/* RIGHT AREA (6 Cols on Desktop, 1 Col on Tablet) */}
      <div className="md:col-span-1 xl:col-span-6 flex flex-col gap-4">
        {/* Row 1: Events (Middle Col) and Calendar (Right Col) Side-by-Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <EventsCard />
          </motion.div>
          <motion.div variants={itemVariants}>
            <CalendarCard />
          </motion.div>
        </div>

        {/* Row 2: Grades Chart (Spanning full width of the Right Area) */}
        <motion.div variants={itemVariants} className="w-full">
          <GradesChart />
        </motion.div>
      </div>

      {/* Row 3: Submission Tracker (Full Width - 12 Cols on Desktop, Spanning both columns on Tablet) */}
      <motion.div variants={itemVariants} className="md:col-span-2 xl:col-span-12 w-full">
        <SubmissionTracker />
      </motion.div>
    </motion.main>
  );
}
