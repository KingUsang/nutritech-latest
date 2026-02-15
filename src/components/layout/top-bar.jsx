/**
 * TopBar Component
 * Fixed header with user greeting and brain battery indicator
 */

'use client';

import { useAuth } from '@/context/auth-context';

export default function TopBar({ userName = 'Student', batteryLevel = 20, streak = 0 }) {
  // Calculate battery color based on level
  const getBatteryColor = () => {
    if (batteryLevel < 30) return 'bg-red-500';
    if (batteryLevel < 70) return 'bg-yellow-500';
    return 'bg-tech-primary';
  };

  return (
    <div className="fixed top-0 w-full z-40 bg-navy-900/85 backdrop-blur-md border-b border-white/5 px-4 py-3 shadow-lg">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {/* User Greeting */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-tech-primary to-blue-500 flex items-center justify-center font-bold text-navy-900 shadow-lg shadow-tech-primary/20">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">
              Hi {userName} 👋
            </h1>
            {streak > 0 && (
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/20 font-bold">
                  🔥 {streak} Day Streak
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Brain Battery */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-tech-primary">
              Brain Power
            </span>
            <span className="text-xs font-bold">{batteryLevel}%</span>
          </div>
          <div className="w-24 h-3 bg-navy-900 rounded-full border border-gray-700 relative overflow-hidden">
            <div
              className={`h-full ${getBatteryColor()} rounded-full shadow-[0_0_10px_currentColor] transition-all duration-1000`}
              style={{ width: `${batteryLevel}%` }}
            />
            {/* Charging Bolt */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-2 h-2 text-white opacity-50"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
