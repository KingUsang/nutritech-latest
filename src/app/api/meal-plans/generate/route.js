import { NextResponse } from 'next/server';
import { generateMealPlan } from '@/lib/groq';

// Extend serverless function timeout to 60 s (Vercel / Next.js)
export const maxDuration = 60;

/**
 * POST /api/meal-plans/generate
 * Generate a meal plan using Groq AI
 */
export async function POST(request) {
  const routeStart = Date.now();
  console.log('[MealPlan] ▶ POST /api/meal-plans/generate received');

  try {
    const t1 = Date.now();
    const userProfile = await request.json();
    console.log(`[MealPlan] ✅ Parsed request body in ${Date.now() - t1}ms`);

    // Validate required fields
    if (!userProfile || !userProfile.basicInfo) {
      console.warn('[MealPlan] ❌ Missing userProfile.basicInfo');
      return NextResponse.json(
        { error: 'User profile is required' },
        { status: 400 }
      );
    }

    console.log('[MealPlan] 🤖 Calling Groq AI...');
    const t2 = Date.now();
    const mealPlan = await generateMealPlan(userProfile);
    console.log(`[MealPlan] ✅ Groq AI responded in ${Date.now() - t2}ms`);

    console.log(`[MealPlan] 🏁 Total route time: ${Date.now() - routeStart}ms`);
    return NextResponse.json(mealPlan);
  } catch (error) {
    console.error(`[MealPlan] 💥 Error after ${Date.now() - routeStart}ms:`, error);
    return NextResponse.json(
      { error: 'Failed to generate meal plan', details: error.message },
      { status: 500 }
    );
  }
}
