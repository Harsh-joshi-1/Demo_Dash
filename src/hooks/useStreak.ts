import { useState, useEffect } from 'react';

export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  useEffect(() => {
    // Initialize state from localStorage
    const savedStreak = localStorage.getItem('user-streak');
    const checkedIn = localStorage.getItem('user-checked-in') === 'true';
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    } else {
      setStreak(0);
      localStorage.setItem('user-streak', '0');
    }
    setHasCheckedIn(checkedIn);

    // Event listener for cross-component sync
    const handleStreakChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ streak: number; active: boolean }>;
      setStreak(customEvent.detail.streak);
      setHasCheckedIn(customEvent.detail.active);
    };

    window.addEventListener('streak-change', handleStreakChange);
    return () => {
      window.removeEventListener('streak-change', handleStreakChange);
    };
  }, []);

  const checkIn = () => {
    if (hasCheckedIn) return;

    const newStreak = streak + 1;
    setStreak(newStreak);
    setHasCheckedIn(true);

    localStorage.setItem('user-streak', newStreak.toString());
    localStorage.setItem('user-checked-in', 'true');

    // Dispatch custom event to notify other components
    window.dispatchEvent(
      new CustomEvent('streak-change', {
        detail: { streak: newStreak, active: true }
      })
    );
  };

  return { streak, hasCheckedIn, checkIn };
}
