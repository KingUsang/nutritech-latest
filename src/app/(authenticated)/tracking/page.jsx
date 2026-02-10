'use client';

import { useState } from 'react';
import { useTracking } from '@/hooks/use-tracking';
import GlassCard from '@/components/ui/glass-card';
import GlassButton from '@/components/ui/glass-button';
import Modal from '@/components/ui/modal';
import InputField from '@/components/ui/input-field';

/**
 * Tracking page - Log and view meals
 */
export default function TrackingPage() {
  const { todayLogs, getTodayTotals, logMeal, deleteLog } = useTracking();
  const [showModal, setShowModal] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: '', calories: '', protein: '', carbs: '', fats: '' });

  const totals = getTodayTotals();
  const targetCalories = 2000;

  const handleLogMeal = async () => {
    try {
      await logMeal({
        name: newMeal.name,
        calories: parseInt(newMeal.calories) || 0,
        protein: parseInt(newMeal.protein) || 0,
        carbs: parseInt(newMeal.carbs) || 0,
        fats: parseInt(newMeal.fats) || 0,
      });
      setShowModal(false);
      setNewMeal({ name: '', calories: '', protein: '', carbs: '', fats: '' });
    } catch (error) {
      console.error('Failed to log meal:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Meal Tracking 📊</h1>
          <p className="text-sm text-gray-400">Track your daily nutrition</p>
        </div>
        <GlassButton variant="primary" size="sm" onClick={() => setShowModal(true)}>
          + Log Meal
        </GlassButton>
      </div>

      {/* Today's Summary */}
      <GlassCard className="p-6">
        <h3 className="font-bold mb-4">Today's Summary</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Calories</span>
              <span className="font-bold">{totals.calories} / {targetCalories} kcal</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-tech-primary to-emerald-600 transition-all"
                style={{ width: `${Math.min((totals.calories / targetCalories) * 100, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-xs text-gray-400">Protein</div>
              <div className="text-lg font-bold text-blue-400">{totals.protein}g</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">Carbs</div>
              <div className="text-lg font-bold text-yellow-400">{totals.carbs}g</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400">Fats</div>
              <div className="text-lg font-bold text-pink-400">{totals.fats}g</div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Logged Meals */}
      <div>
        <h3 className="font-bold mb-4">Today's Meals</h3>
        {todayLogs.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <div className="text-4xl mb-2">🍽️</div>
            <p className="text-gray-400">No meals logged yet today</p>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {todayLogs.map((log) => (
              <GlassCard key={log.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{log.name}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteLog(log.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex gap-4 text-xs">
                  <span className="text-tech-primary font-bold">{log.calories} kcal</span>
                  <span className="text-gray-400">P: {log.protein}g</span>
                  <span className="text-gray-400">C: {log.carbs}g</span>
                  <span className="text-gray-400">F: {log.fats}g</span>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* Log Meal Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Log a Meal">
        <div className="space-y-4">
          <InputField
            label="Meal Name"
            placeholder="e.g., Rice and Beans"
            value={newMeal.name}
            onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Calories"
              type="number"
              placeholder="400"
              value={newMeal.calories}
              onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
            />
            <InputField
              label="Protein (g)"
              type="number"
              placeholder="20"
              value={newMeal.protein}
              onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Carbs (g)"
              type="number"
              placeholder="50"
              value={newMeal.carbs}
              onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
            />
            <InputField
              label="Fats (g)"
              type="number"
              placeholder="10"
              value={newMeal.fats}
              onChange={(e) => setNewMeal({ ...newMeal, fats: e.target.value })}
            />
          </div>
          <GlassButton variant="primary" fullWidth onClick={handleLogMeal}>
            Log Meal
          </GlassButton>
        </div>
      </Modal>
    </div>
  );
}
