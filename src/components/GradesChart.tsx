'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MONTHS = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];

// SVG dimensions
const CHART_WIDTH = 500;
const CHART_HEIGHT = 150;
const CHART_PADDING = 20;

// Grade points (y-values between 0-100, mapped to height coords)
const DESIGN_GRADES = [60, 55, 70, 45, 85, 80];
const HTML_CSS_GRADES = [50, 65, 50, 60, 75, 70];

const getPointsPath = (grades: number[]) => {
  const points = grades.map((grade, index) => {
    const x = CHART_PADDING + (index * (CHART_WIDTH - CHART_PADDING * 2)) / (grades.length - 1);
    const y = CHART_HEIGHT - CHART_PADDING - (grade * (CHART_HEIGHT - CHART_PADDING * 2)) / 100;
    return { x, y };
  });

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cp1x = p0.x + (p1.x - p0.x) / 3;
    const cp1y = p0.y;
    const cp2x = p0.x + 2 * (p1.x - p0.x) / 3;
    const cp2y = p1.y;
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
  }
  return path;
};

const getAreaPath = (grades: number[]) => {
  const linePath = getPointsPath(grades);
  const startX = CHART_PADDING;
  const endX = CHART_WIDTH - CHART_PADDING;
  const baseY = CHART_HEIGHT - CHART_PADDING;
  return `${linePath} L ${endX} ${baseY} L ${startX} ${baseY} Z`;
};

export default function GradesChart() {
  const designPath = getPointsPath(DESIGN_GRADES);
  const designArea = getAreaPath(DESIGN_GRADES);

  const htmlCssPath = getPointsPath(HTML_CSS_GRADES);
  const htmlCssArea = getAreaPath(HTML_CSS_GRADES);

  return (
    <motion.section
      whileHover={{
        scale: 1.015,
        y: -3,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-[#111218] border border-[#1d1e26] rounded-3xl pt-5 px-5 pb-4 flex flex-col justify-between h-56 relative overflow-hidden group"
      aria-labelledby="grades-title"
    >
      {/* Glow Overlay */}
      <div className="absolute inset-0 rounded-[inherit] border border-[#a78bfa]/40 shadow-[0_0_25px_rgba(167, 139, 250, 0.12)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="flex justify-between items-center mb-2">
        <h3 id="grades-title" className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">Your grades</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span className="text-[9px] text-zinc-400 font-semibold">Design</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-[9px] text-zinc-400 font-semibold">HTML/CSS</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="flex-1 w-full relative">
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          className="w-full h-full overflow-visible"
        >
          {/* Grid lines */}
          {[0, 20, 40, 60, 80, 100].map((gridVal) => {
            const y = CHART_HEIGHT - CHART_PADDING - (gridVal * (CHART_HEIGHT - CHART_PADDING * 2)) / 100;
            return (
              <line
                key={gridVal}
                x1={CHART_PADDING}
                y1={y}
                x2={CHART_WIDTH - CHART_PADDING}
                y2={y}
                stroke="#1d1e26"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* HTML/CSS Area & Line */}
          <motion.path
            d={htmlCssArea}
            fill="url(#htmlCssGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1.0, delay: 0.2 }}
          />
          <motion.path
            d={htmlCssPath}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Design Area & Line */}
          <motion.path
            d={designArea}
            fill="url(#designGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.0, delay: 0.4 }}
          />
          <motion.path
            d={designPath}
            fill="none"
            stroke="#a78bfa"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Definitions for gradients */}
          <defs>
            <linearGradient id="designGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="htmlCssGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* X Axis Labels */}
      <div className="flex justify-between items-center px-5 mt-0.5 border-t border-[#1d1e26]/30 pt-1">
        {MONTHS.map((m) => (
          <span key={m} className="text-[9px] font-bold text-zinc-500">{m}</span>
        ))}
      </div>
    </motion.section>
  );
}
