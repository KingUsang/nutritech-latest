'use client';

import { useMealPlan } from '@/hooks/use-meal-plan';
import GlassCard from '@/components/ui/glass-card';
import GlassButton from '@/components/ui/glass-button';
import LoadingSpinner from '@/components/ui/loading-spinner';

/**
 * Meal Plan page - Display 7-day meal plan
 */
export default function MealPlanPage() {
  const { mealPlan, loading, generating, regenerateMealPlan, toggleFavorite } = useMealPlan();

  if (loading || generating) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <LoadingSpinner size="lg" text="Loading your meal plan..." />
      </div>
    );
  }

  if (!mealPlan) {
    return (
      <div className="text-center py-20">
        <GlassCard className="p-8 max-w-md mx-auto">
          <div className="text-5xl mb-4">🍽️</div>
          <h2 className="text-xl font-bold mb-2">No Meal Plan Yet</h2>
          <p className="text-gray-400 mb-6">
            Complete your onboarding to generate a personalized meal plan.
          </p>
          <GlassButton variant="primary" href="/onboarding">
            Start Onboarding
          </GlassButton>
        </GlassCard>
      </div>
    );
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">Your Meal Plan 🍽️</h1>
          <p className="text-sm text-gray-400">Personalized for your goals and budget</p>
        </div>
        <GlassButton variant="secondary" size="sm" onClick={regenerateMealPlan}>
          Regenerate
        </GlassButton>
      </div>

      {/* Weekly Summary */}
      <GlassCard className="p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-tech-primary">₦{mealPlan.weeklyBudget || 7000}</div>
            <div className="text-xs text-gray-400">Weekly Budget</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">{mealPlan.avgCalories || 2000}</div>
            <div className="text-xs text-gray-400">Avg Calories/Day</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">{mealPlan.avgProtein || 60}g</div>
            <div className="text-xs text-gray-400">Avg Protein/Day</div>
          </div>
        </div>
      </GlassCard>

      {/* Daily Meals */}
      {days.map((day, index) => (
        <GlassCard key={day} className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="text-tech-primary">{day}</span>
            {index === 0 && <span className="text-xs bg-tech-primary/20 text-tech-primary px-2 py-1 rounded-full">Today</span>}
          </h3>

          <div className="space-y-4">
            {['Breakfast', 'Lunch', 'Dinner'].map((mealType) => (
              <div key={mealType} className="border-l-2 border-tech-primary/30 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-medium text-gray-400">{mealType}</div>
                    <div className="font-medium">
                      {mealPlan.meals?.[index]?.[mealType.toLowerCase()]?.name || 'Rice & Beans Combo'}
                    </div>
                  </div>
                  <button className="text-xl">⭐</button>
                </div>
                <div className="flex gap-4 text-xs text-gray-400">
                  <span>350 kcal</span>
                  <span>20g protein</span>
                  <span>₦350</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sm">
            <span className="text-gray-400">Daily Total</span>
            <span className="font-bold text-tech-primary">₦1,000</span>
          </div>
        </GlassCard>
      ))}

      {/* Shopping List */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-bold mb-4">🛒 Weekly Shopping List</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {['Rice (5kg)', 'Beans (2kg)', 'Eggs (30)', 'Titus Fish (5 tins)', 'Ugwu (Bunches)', 'Tomatoes', 'Onions', 'Palm Oil'].map((item) => (
            <div key={item} className="flex items-center gap-2 p-2 rounded bg-white/5">
              <input type="checkbox" className="rounded" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
