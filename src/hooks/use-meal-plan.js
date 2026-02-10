import { useState, useEffect } from 'react';
import { useFirestore } from './use-firebase';
import { useAuth } from '@/context/auth-context';
import { generateMealPlan } from '@/lib/groq';
import { where, orderBy, limit } from 'firebase/firestore';

/**
 * Hook for managing user meal plans
 * @returns {Object} Meal plan operations and state
 */
export function useMealPlan() {
  const { user } = useAuth();
  const { getDocuments, addDocument, updateDocument } = useFirestore('mealPlans');
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
      const plans = await getDocuments([
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc'),
        limit(1)
      ]);
      if (plans.length > 0) {
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
      // Generate meal plan using Groq AI
      const generatedPlan = await generateMealPlan(userProfile);
      
      // Save to Firestore
      const savedPlan = await addDocument({
        userId: user.uid,
        ...generatedPlan,
        userProfile,
      });
      
      setMealPlan(savedPlan);
      return savedPlan;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setGenerating(false);
    }
  };

  const regenerateMealPlan = async () => {
    if (!mealPlan) return;
    return createMealPlan(mealPlan.userProfile);
  };

  const toggleFavorite = async (mealId) => {
    if (!mealPlan) return;
    
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
