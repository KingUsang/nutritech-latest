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
  const [loading, setLoading] = useState(true); // true by default so page never flickers
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Use stable user.uid as dependency — avoids double-fetch when auth context
  // creates two new user object references on the same session (checkSession + onAuthStateChange)
  const userId = user?.uid;

  useEffect(() => {
    if (userId) {
      fetchMealPlan();
    } else {
      // No user yet — stop loading so page doesn't hang
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchMealPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const plans = await getDocuments(query => 
        query
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(1)
      );
      
      if (plans && plans.length > 0) {
        const row = plans[0];
        // Unwrap plan_data if the row uses the JSON blob pattern
        const fullPlan = row.plan_data ? { ...row, ...row.plan_data } : row;
        setMealPlan(fullPlan);
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
    const clientStart = Date.now();
    console.log('[useMealPlan] ▶ createMealPlan started');
    try {
      console.log('[useMealPlan] 📡 Sending fetch to /api/meal-plans/generate...');
      const fetchStart = Date.now();
      // Generate meal plan using the API endpoint (Client-side safe)
      const response = await fetch('/api/meal-plans/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      });
      console.log(`[useMealPlan] ✅ fetch() resolved in ${Date.now() - fetchStart}ms — status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json();
        const err = new Error(errorData.error || 'Failed to generate meal plan');
        err.status = response.status;
        throw err;
      }

      const t1 = Date.now();
      const generatedPlan = await response.json();
      console.log(`[useMealPlan] ✅ Response JSON parsed in ${Date.now() - t1}ms`);

      // Save to Supabase — store the whole plan as a single JSON blob
      // to avoid column-not-found errors if the schema is minimal
      console.log('[useMealPlan] 💾 Saving to Supabase...');
      const t2 = Date.now();
      const savedPlan = await addDocument({
        user_id: user.uid,
        plan_data: generatedPlan,
        user_profile: userProfile,
      });
      console.log(`[useMealPlan] ✅ Supabase save done in ${Date.now() - t2}ms`);

      // Merge saved row with full plan so UI sees all fields
      const fullPlan = { ...savedPlan, ...generatedPlan };
      setMealPlan(fullPlan);
      console.log(`[useMealPlan] 🏁 Total createMealPlan time: ${Date.now() - clientStart}ms`);
      return fullPlan;
    } catch (err) {
      console.error(`[useMealPlan] 💥 Error after ${Date.now() - clientStart}ms:`, err);
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
