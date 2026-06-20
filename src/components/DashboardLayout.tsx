'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import BentoGrid from './BentoGrid';
import CourseGrid from './CourseGrid';
import { Course } from '@/types';

interface DashboardLayoutProps {
  courses: Course[];
  isFallback: boolean;
}

// 1. Homework / Focused Course View
function HomeworkView({ courses }: { courses: Course[] }) {
  return (
    <div className="glass-panel border border-[#1d1e26] rounded-3xl p-6">
      <CourseGrid courses={courses} />
    </div>
  );
}

// 2. Chat Room View
function ChatView() {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: 'Welcome to your Next-Gen AI Tutor! Ask me anything about your current courses.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      let reply = "That's a great question! Based on your UX/UI Design course progress (70%), you should review typography hierarchies next.";
      if (userMsg.toLowerCase().includes('react')) {
        reply = "For Advanced React, I suggest practicing compound component patterns. Your current progress is 75%.";
      } else if (userMsg.toLowerCase().includes('html') || userMsg.toLowerCase().includes('css')) {
        reply = "In HTML/CSS, your progress is at 50%. Focus on flexbox layouts and semantic tag ordering.";
      }
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="glass-panel border border-[#1d1e26] rounded-3xl p-5 flex flex-col h-[500px] justify-between">
      <div className="flex items-center gap-3 border-b border-[#1d1e26] pb-3 mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <h3 className="font-bold text-zinc-200">AI Study Tutor</h3>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-2 mb-4 scrollbar-thin scrollbar-thumb-zinc-800">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs ${
              msg.sender === 'user' 
                ? 'bg-violet-600/30 border border-violet-500/20 text-white rounded-br-none' 
                : 'bg-zinc-800/40 border border-white/5 text-zinc-300 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-zinc-800/40 border border-white/5 text-zinc-400 rounded-2xl rounded-bl-none px-4 py-2.5 text-xs italic animate-pulse">
              AI Tutor is typing...
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your studies..."
          className="flex-1 bg-zinc-900 border border-white/[0.05] text-xs text-white rounded-xl px-4 py-3 focus:outline-none focus:border-violet-500/50"
        />
        <button type="submit" className="bg-[#b58fbc] text-[#341e3a] hover:bg-[#c9a6ce] font-semibold text-xs rounded-xl px-5 py-3 transition-colors">
          Send
        </button>
      </form>
    </div>
  );
}

// 3. Class Directory View
function StudentsView() {
  const classmates = [
    { label: 'Sarah Connor', role: 'UX Designer', progress: 85, streak: 12, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=128&auto=format&fit=crop' },
    { label: 'John Doe', role: 'Fullstack Dev', progress: 62, streak: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=128&auto=format&fit=crop' },
    { label: 'Elena Rostova', role: 'UI Engineer', progress: 95, streak: 34, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=128&auto=format&fit=crop' },
    { label: 'Alex Rivera', role: 'HTML Enthusiast', progress: 48, streak: 0, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=128&auto=format&fit=crop' },
  ];

  return (
    <div className="glass-panel border border-[#1d1e26] rounded-3xl p-6">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4 text-left">Class Directory</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {classmates.map((student) => (
          <div key={student.label} className="bg-[#111218] border border-white/[0.03] rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full overflow-hidden bg-zinc-800 relative">
                <img src={student.avatar} alt={student.label} className="object-cover size-full" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-semibold text-white">{student.label}</h4>
                <p className="text-[10px] text-zinc-500">{student.role}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-violet-400">{student.progress}% Progress</p>
              <p className="text-[9px] text-zinc-500">🔥 {student.streak} day streak</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Notifications View
function NotificationsView() {
  const [notifs, setNotifs] = useState([
    { id: 1, text: 'Your design assignment "Figma Layouts" was graded: A+', time: '2 hours ago', read: false },
    { id: 2, text: 'New lecture available in HTML/CSS course.', time: '5 hours ago', read: false },
    { id: 3, text: 'You completed your daily study target! Keep it up.', time: '1 day ago', read: true },
  ]);

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="glass-panel border border-[#1d1e26] rounded-3xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-zinc-300">Recent Notifications</h3>
        <button onClick={markAllRead} className="text-[10px] text-violet-400 hover:text-violet-300 font-semibold transition-colors">
          Mark all as read
        </button>
      </div>
      <div className="space-y-3">
        {notifs.map(n => (
          <div key={n.id} className={`p-3.5 rounded-xl border border-white/[0.02] flex items-center justify-between gap-4 text-left ${n.read ? 'bg-[#111218]/40' : 'bg-violet-950/10 border-l-2 border-l-violet-500'}`}>
            <div>
              <p className="text-xs text-zinc-200">{n.text}</p>
              <span className="text-[9px] text-zinc-500 block mt-1">{n.time}</span>
            </div>
            {!n.read && <span className="size-2 rounded-full bg-violet-400 shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Settings Profile Form
function SettingsView() {
  const [tempName, setTempName] = useState('');
  const [tempFullName, setTempFullName] = useState('');
  const [tempLocation, setTempLocation] = useState('');
  const [targetHours, setTargetHours] = useState('10 hours');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTempName(localStorage.getItem('user-name') || 'Harsh');
    setTempFullName(localStorage.getItem('user-fullname') || 'Harsh Joshi');
    setTempLocation(localStorage.getItem('user-location') || 'Mumbai, India');
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user-name', tempName);
    localStorage.setItem('user-fullname', tempFullName);
    localStorage.setItem('user-location', tempLocation);
    window.dispatchEvent(new Event('profile-change'));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="glass-panel border border-[#1d1e26] rounded-3xl p-6 max-w-xl mx-auto text-left">
      <h3 className="text-sm font-semibold text-zinc-300 mb-4">Edit Student Profile</h3>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1.5">First Name</label>
          <input 
            type="text" 
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            className="w-full bg-zinc-900 border border-white/[0.05] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1.5">Full Name</label>
          <input 
            type="text" 
            value={tempFullName}
            onChange={(e) => setTempFullName(e.target.value)}
            className="w-full bg-zinc-900 border border-white/[0.05] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1.5">Location</label>
          <input 
            type="text" 
            value={tempLocation}
            onChange={(e) => setTempLocation(e.target.value)}
            className="w-full bg-zinc-900 border border-white/[0.05] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500/50"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1.5">Weekly Goal Target</label>
          <select 
            value={targetHours}
            onChange={(e) => setTargetHours(e.target.value)}
            className="w-full bg-zinc-900 border border-white/[0.05] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500/50"
          >
            <option value="5 hours">5 hours / week</option>
            <option value="10 hours">10 hours / week</option>
            <option value="15 hours">15 hours / week</option>
            <option value="20 hours">20 hours / week</option>
          </select>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button type="submit" className="bg-[#b58fbc] text-[#341e3a] hover:bg-[#c9a6ce] font-bold text-xs rounded-xl px-5 py-2.5 transition-colors cursor-pointer">
            Save Profile
          </button>
          {saved && <span className="text-[10px] text-emerald-400 font-semibold">Profile updated!</span>}
        </div>
      </form>
    </div>
  );
}

// 6. Logout View
function LogoutView({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="glass-panel border border-[#1d1e26] rounded-3xl p-8 flex flex-col items-center justify-center h-80 text-center">
      <h3 className="text-lg font-bold text-zinc-300 mb-2">You have logged out</h3>
      <p className="text-xs text-zinc-500 max-w-sm mb-4">
        Thank you for studying with us. Click below to log back in.
      </p>
      <button onClick={onLogin} className="bg-[#b58fbc] text-[#341e3a] hover:bg-[#c9a6ce] font-bold text-xs rounded-xl px-6 py-2.5 transition-colors cursor-pointer">
        Log back in
      </button>
    </div>
  );
}

export default function DashboardLayout({ courses, isFallback }: DashboardLayoutProps) {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
      case 'Home':
        return <BentoGrid courses={courses} />;
      case 'Homework':
        return <HomeworkView courses={courses.slice(0, 2)} />;
      case 'Chat':
        return <ChatView />;
      case 'Students':
        return <StudentsView />;
      case 'Notifications':
        return <NotificationsView />;
      case 'Settings':
        return <SettingsView />;
      case 'Logout':
        return <LogoutView onLogin={() => setActiveTab('Dashboard')} />;
      default:
        return <BentoGrid courses={courses} />;
    }
  };

  return (
    <div className="dashboard-shell min-h-screen text-[#f7f4f8] relative overflow-hidden flex justify-center items-start pt-5 pb-36 px-4 md:py-8 md:px-6 md:pb-16">
      {/* Glow effects */}
      <div className="glow-spot-1" />
      <div className="glow-spot-2" />
      <div className="noise-overlay" />

      {/* Centered App Wrapper */}
      <div className="max-w-[1440px] w-full flex flex-col md:flex-row gap-4 items-stretch">
        {/* Sidebar (Left) */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content Area (Right) */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Header */}
          <Header />
          {isFallback && (
            <div className="demo-notice flex items-center justify-between gap-3 rounded-xl px-4 py-2 text-[10px] text-[#d8bedb]" role="status">
              <span><strong className="text-[#edc5f0]">Demo data</strong> · Connect Supabase to load live courses.</span>
              <span className="size-1.5 shrink-0 rounded-full bg-amber-300" aria-hidden="true" />
            </div>
          )}

          {/* Tab content wrapper with smooth layout transitions */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
