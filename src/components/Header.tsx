'use client';

import React from 'react';
import { Bell, Search, Flame } from 'lucide-react';
import Image from 'next/image';
import { useStreak } from '@/hooks/useStreak';

export default function Header() {
  const { streak, hasCheckedIn } = useStreak();

  const [userName, setUserName] = React.useState('Harsh');
  const [fullName, setFullName] = React.useState('Harsh Joshi');
  const [location, setLocation] = React.useState('Mumbai, India');

  React.useEffect(() => {
    setUserName(localStorage.getItem('user-name') || 'Harsh');
    setFullName(localStorage.getItem('user-fullname') || 'Harsh Joshi');
    setLocation(localStorage.getItem('user-location') || 'Mumbai, India');

    const handleProfileChange = () => {
      setUserName(localStorage.getItem('user-name') || 'Harsh');
      setFullName(localStorage.getItem('user-fullname') || 'Harsh Joshi');
      setLocation(localStorage.getItem('user-location') || 'Mumbai, India');
    };

    window.addEventListener('profile-change', handleProfileChange);
    return () => window.removeEventListener('profile-change', handleProfileChange);
  }, []);

  return (
    <header className="topbar grid grid-cols-3 items-center gap-4 py-3 px-5 sm:px-7 rounded-[22px]">
      <div>
        <h2 className="text-lg sm:text-2xl font-medium tracking-wide text-zinc-100 whitespace-nowrap">
          Hello, {userName}!
        </h2>
      </div>

      <div className="flex justify-center w-full">
        {/* Search Bar */}
        <div className="relative hidden sm:block w-full max-w-[420px]">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search something..."
            className="w-full bg-[#16171d] border border-white/[.04] text-zinc-200 placeholder-zinc-500 text-xs rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:border-[#d492dc]/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 justify-end">
        <button className="sm:hidden text-zinc-400" aria-label="Search"><Search className="size-5" /></button>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 bg-[#16171d] border border-white/[.04] px-2.5 py-1 rounded-full text-zinc-300">
          <Flame className={`w-4 h-4 ${hasCheckedIn ? 'text-amber-500 fill-amber-500' : 'text-zinc-500'}`} />
          <span className="text-xs font-bold">{streak}</span>
        </div>

        <button className="relative text-zinc-400 hover:text-white transition-colors cursor-pointer p-1" aria-label="Notifications">
          <Bell className="size-[17px]" />
          <span className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-[#d68add]" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-violet-500/20 p-0.5 overflow-hidden flex-shrink-0 bg-violet-950/20 relative">
            <Image
              fill
              sizes="40px"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
              alt={fullName}
              className="object-cover rounded-full"
            />
          </div>
          <div className="text-left leading-tight hidden xs:block">
            <p className="text-[11px] sm:text-xs font-semibold text-zinc-200">{fullName}</p>
            <p className="text-[9px] sm:text-[10px] text-zinc-500">{location}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
