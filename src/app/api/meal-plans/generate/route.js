import { NextResponse } from 'next/server';
import { generateMealPlan } from '@/lib/groq';

/**
 * POST /api/meal-plans/generate
 * Generate a meal plan using Groq AI
 */
export async function POST(request) {
  try {
    const userProfile = await request.json();

    // Validate required fields
    if (!userProfile || !userProfile.basicInfo) {
      return NextResponse.json(
        { error: 'User profile is required' },
        { status: 400 }
      );
    }

    // Generate meal plan
    const mealPlan = await generateMealPlan(userProfile);

    return NextResponse.json(mealPlan);
  } catch (error) {
    console.error('Meal plan generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate meal plan', details: error.message },
      { status: 500 }
    );
  }
}
