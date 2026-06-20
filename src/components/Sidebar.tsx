'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  LayoutDashboard,
  MessageSquare,
  Users,
  Bell,
  LogOut,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'Home', label: 'Home', icon: Home },
    { id: 'Homework', label: 'Homework', icon: BookOpen },
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Chat', label: 'Chat', icon: MessageSquare, badge: 2 },
    { id: 'Students', label: 'Students', icon: Users },
    { id: 'Notifications', label: 'Notifications', icon: Bell, badge: 7 },
  ];

  const bottomItems = [
    { id: 'Logout', label: 'Log out', icon: LogOut },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="app-sidebar hidden md:flex flex-col bg-[#0b0c10]/95 border border-[#1d1e26] rounded-[24px] transition-all duration-300 w-20 lg:w-64 p-5 select-none shrink-0">
        {/* Brand / Logo */}
        <div className="bg-[#b58fbc] text-[#341e3a] p-4 rounded-[20px] text-center mb-6 mt-2 mx-2 hidden lg:block">
          <h2 className="font-bold text-[18px] tracking-[1.5px] leading-tight">NEXT-GEN</h2>
          <p className="text-[9px] font-semibold tracking-[0.5px]">LEARNING</p>
        </div>
        {/* Collapsed Logo */}
        <div className="lg:hidden flex items-center justify-center mb-6 mt-2">
          <div className="w-12 h-12 rounded-xl bg-[#b58fbc] text-[#341e3a] flex items-center justify-center font-bold text-lg">
            N
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex flex-col gap-1.5" aria-label="Sidebar navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-150 group cursor-pointer ${isActive ? 'text-[#341e3a]' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'
                  }`}
              >
                {/* layoutId active background */}
                {isActive && (
                  <motion.div
                    layoutId="activeHighlight"
                    className="absolute inset-0 bg-[#b58fbc] rounded-xl"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <span className="relative z-10 flex-shrink-0">
                  <Icon className={`w-5 h-5 transition-transform duration-150 group-hover:scale-105 ${isActive ? 'text-[#341e3a]' : 'text-zinc-400'}`} />
                </span>

                <span className="relative z-10 hidden lg:inline overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.label}
                </span>

                {item.badge && (
                  <span className={`relative z-10 ml-auto hidden lg:flex w-5 h-5 items-center justify-center text-[10px] font-bold rounded-full ${isActive ? 'bg-[#341e3a]/15 text-[#341e3a]' : 'bg-[#53a6db] text-white'
                    }`}>
                    {item.badge}
                  </span>
                )}

                {/* Badge for Collapsed View */}
                {item.badge && !isActive && (
                  <span className="absolute top-2 right-2 flex lg:hidden w-2 h-2 rounded-full bg-[#53a6db]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-[#1d1e26] pt-4 flex flex-col gap-1.5">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-150 group cursor-pointer ${isActive ? 'text-[#341e3a]' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/20'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeHighlight"
                    className="absolute inset-0 bg-[#b58fbc] rounded-xl"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex-shrink-0">
                  <Icon className={`w-5 h-5 transition-transform duration-150 group-hover:scale-105 ${isActive ? 'text-[#341e3a]' : 'text-zinc-400'}`} />
                </span>
                <span className="relative z-10 hidden lg:inline overflow-hidden text-ellipsis whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar - Floating Premium Dock */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-[#0b0c10]/90 border border-white/[0.08] rounded-[20px] flex items-center justify-around py-2.5 px-3 shadow-[0_12px_36px_rgba(0,0,0,0.55)] backdrop-blur-md" aria-label="Mobile navigation">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="relative flex flex-col items-center justify-center p-2.5 rounded-xl text-zinc-400 hover:text-zinc-200 cursor-pointer group"
            >
              {isActive && (
                <motion.div
                  layoutId="activeHighlightMobile"
                  className="absolute inset-0 bg-[#b58fbc]/15 border border-[#b58fbc]/30 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <div className="relative z-10">
                <Icon className={`w-5 h-5 transition-colors duration-150 ${isActive ? 'text-[#b58fbc]' : 'text-zinc-400 group-hover:text-zinc-200'}`} />
                {item.badge && (
                  <span className={`absolute -top-1.5 -right-1.5 flex w-4 h-4 items-center justify-center text-[8px] font-bold rounded-full ${isActive ? 'bg-[#341e3a] text-[#b58fbc]' : 'bg-[#53a6db] text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </>
  );
}
