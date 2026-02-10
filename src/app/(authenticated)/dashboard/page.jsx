'use client';

import { useAuth } from '@/context/auth-context';
import { useTracking } from '@/hooks/use-tracking';
import { useMealPlan } from '@/hooks/use-meal-plan';
import GlassCard from '@/components/ui/glass-card';
import Link from 'next/link';

/**
 * Dashboard page - Main home screen
 */
export default function DashboardPage() {
  const { userProfile } = useAuth();
  const { todayLogs, getTodayTotals } = useTracking();
  const { mealPlan } = useMealPlan();

  const totals = getTodayTotals();
  const targetCalories = 2000; // This would come from user profile

  const quickStats = [
    { label: 'Calories', value: totals.calories, target: targetCalories, unit: 'kcal', color: 'tech' },
    { label: 'Protein', value: totals.protein, target: 60, unit: 'g', color: 'blue' },
    { label: 'Carbs', value: totals.carbs, target: 250, unit: 'g', color: 'yellow' },
    { label: 'Fats', value: totals.fats, target: 65, unit: 'g', color: 'pink' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <GlassCard className="p-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {userProfile?.displayName || 'Student'}! 👋
        </h1>
        <p className="text-gray-400">
          Let's continue your journey to better health and focus.
        </p>
      </GlassCard>

      {/* Today's Stats */}
      <div>
        <h2 className="text-lg font-bold mb-4">Today's Nutrition</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickStats.map((stat) => (
            <GlassCard key={stat.label} className="p-4">
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold mb-2">
                {stat.value}<span className="text-sm text-gray-400 ml-1">{stat.unit}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-${stat.color}-400 to-${stat.color}-600 transition-all`}
                  style={{ width: `${Math.min((stat.value / stat.target) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Goal: {stat.target}{stat.unit}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/meal-plan">
            <GlassCard className="p-6 hover:bg-white/10 transition cursor-pointer">
              <div className="text-3xl mb-2">🍽️</div>
              <div className="font-bold">View Meal Plan</div>
              <div className="text-xs text-gray-400 mt-1">
                {mealPlan ? '7-day plan ready' : 'Generate your plan'}
              </div>
            </GlassCard>
          </Link>

          <Link href="/tracking">
            <GlassCard className="p-6 hover:bg-white/10 transition cursor-pointer">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-bold">Track Meal</div>
              <div className="text-xs text-gray-400 mt-1">
                {todayLogs.length} meals logged today
              </div>
            </GlassCard>
          </Link>

          <Link href="/learn">
            <GlassCard className="p-6 hover:bg-white/10 transition cursor-pointer">
              <div className="text-3xl mb-2">📚</div>
              <div className="font-bold">Learn Hub</div>
              <div className="text-xs text-gray-400 mt-1">
                Nutrition tips & guides
              </div>
            </GlassCard>
          </Link>

          <Link href="/profile">
            <GlassCard className="p-6 hover:bg-white/10 transition cursor-pointer">
              <div className="text-3xl mb-2">⚙️</div>
              <div className="font-bold">Settings</div>
              <div className="text-xs text-gray-400 mt-1">
                Update your profile
              </div>
            </GlassCard>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      {todayLogs.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4">Recent Meals</h2>
          <div className="space-y-3">
            {todayLogs.slice(0, 3).map((log) => (
              <GlassCard key={log.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{log.name}</div>
                    <div className="text-sm text-gray-400">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-tech-primary">
                    {log.calories} kcal
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
