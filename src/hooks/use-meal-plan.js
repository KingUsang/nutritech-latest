import { useState, useEffect } from 'react';
import { useSupabase } from './use-supabase';
import { useAuth } from '@/context/auth-context';

/**
 * Hook for managing user meal plans
 * @returns {Object} Meal plan operations and state
 */
export function useMealPlan() {
  const { user } = useAuth();
  const { getDocuments, addDocument, updateDocument } = useSupabase('meal_plans');
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user's current meal plan
  useEffect(() => {
    if (user) {
      fetchMealPlan();
    }
  }, [user]);

  const fetchMealPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const plans = await getDocuments(query => 
        query
          .eq('user_id', user.uid)
          .order('created_at', { ascending: false })
          .limit(1)
      );
      
      if (plans && plans.length > 0) {
        setMealPlan(plans[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createMealPlan = async (userProfile) => {
    setGenerating(true);
    setError(null);
    try {
      // Generate meal plan using the API endpoint (Client-side safe)
      const response = await fetch('/api/meal-plans/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate meal plan');
      }

      const generatedPlan = await response.json();
      
      // Save to Supabase (exclude summary if column doesn't exist)
      const { summary, ...planData } = generatedPlan;
      
      const savedPlan = await addDocument({
        user_id: user.uid,
        ...planData,
        // If you add the summary column later, you can uncomment this:
        // summary,
        user_profile: userProfile,
      });
      
      // Combine for local state usage so the UI still sees the summary
      const fullPlan = { ...savedPlan, summary: generatedPlan.summary };
      setMealPlan(fullPlan);
      return fullPlan;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setGenerating(false);
    }
  };

  const regenerateMealPlan = async () => {
    if (!mealPlan) return;
    return createMealPlan(mealPlan.user_profile);
  };

  const toggleFavorite = async (mealId) => {
    if (!mealPlan) return;
    
    // Note: This logic assumes 'meals' is a JSONB column in the database
    // which is common coming from NoSQL/Firebase conversions.
    const updatedMeals = mealPlan.meals.map(meal => 
      meal.id === mealId ? { ...meal, isFavorite: !meal.isFavorite } : meal
    );
    
    const updatedPlan = { ...mealPlan, meals: updatedMeals };
    
    await updateDocument(mealPlan.id, { meals: updatedMeals });
    setMealPlan(updatedPlan);
  };

  return {
    mealPlan,
    loading,
    generating,
    error,
    fetchMealPlan,
    createMealPlan,
    regenerateMealPlan,
    toggleFavorite,
  };
}
