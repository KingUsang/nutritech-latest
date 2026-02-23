/**
 * Groq AI Client Configuration
 * Handles AI-powered meal plan generation and chat
 */

import Groq from 'groq-sdk';

// Initialize Groq client
// IMPORTANT: This file should ONLY be imported in Server Components or API Routes
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, 
});

// Fast model for meal plan generation
export const DEFAULT_MODEL = 'llama-3.1-8b-instant';

/**
 * System prompt for Nutri-Tech AI persona
 */
export const NUTRITECH_SYSTEM_PROMPT = `You are a Nigerian Nutritionist Assistant for students.
Your name is "NutriBot". You speak friendly, relatable English with slight Nigerian slang (pidgin lite).

Your goal is to provide affordable, healthy, and accessible meal advice using Nigerian ingredients commonly found in student areas or markets.

Constraints:
1. Always consider student budget (low cost).
2. Recommend foods that are quick to cook (under 30 mins) or easy to store.
3. Be encouraging and concise.
`;

/**
 * Generate a 7-day meal plan based on user profile
 * @param {Object} userProfile - User data (age, goals, budget, etc.)
 * @returns {Promise<Object>} Generated meal plan JSON
 */
export async function generateMealPlan(userProfile) {
  const prompt = `
    Generate a 7-day student meal plan (Breakfast, Lunch, Dinner) for a Nigerian student with these details:
    - Age: ${userProfile.basicInfo?.age || '20'}
    - Gender: ${userProfile.basicInfo?.gender || 'Any'}
    - Goal: ${userProfile.healthGoals?.goals?.[0] || 'Healthy Eating'}
    - Daily Budget: ₦${userProfile.budgetConstraints?.dailyBudget || '1000'} Naira/day
    - Kitchen: ${userProfile.budgetConstraints?.cookingEquipment?.join(', ') || userProfile.budgetConstraints?.mealPrep || 'Stove'}
    - Dietary Restrictions: ${userProfile.dietAssessment?.dietType || 'None'}
    - Allergies: ${userProfile.dietAssessment?.allergies?.join(', ') || 'None'}
    
    Be concise. Keep meal names short, max 3 ingredients per meal, instructions under 15 words.
    Format the response as a strict JSON object (NO markdown code blocks, just raw JSON) with this key structure:
    {
      "title": "Weekly Plan Title",
      "summary": "Short summary...",
      "weekly_totals": {
        "budget": 5000,
        "avg_calories": 2000,
        "avg_protein": 60
      },
      "shopping_list": [
        "Rice (2 cups)", 
        "Beans (1 derica)"
      ],
      "meals": [
        {
          "id": "unique_id_1",
          "day": "Monday",
          "type": "Breakfast",
          "name": "Meal Name",
          "calories": 400,
          "protein": 15,
          "price": 350,
          "ingredients": ["item 1", "item 2"],
          "instructions": "Quick cooking steps",
          "isFavorite": false
        }
        ... (repeat for all 7 days, 3 meals per day)
      ]
    }
  `;

  try {
    const t0 = Date.now();
    console.log('[Groq] ▶ Sending request to Groq API...');
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: NUTRITECH_SYSTEM_PROMPT + " Output valid JSON only." },
        { role: 'user', content: prompt }
      ],
      model: DEFAULT_MODEL,
      temperature: 0.5,
      max_tokens: 4000,
      response_format: { type: "json_object" },
    });

    console.log(`[Groq] ✅ Groq API raw response received in ${Date.now() - t0}ms`);
    console.log(`[Groq]    model: ${completion.model}`);
    console.log(`[Groq]    prompt_tokens: ${completion.usage?.prompt_tokens}, completion_tokens: ${completion.usage?.completion_tokens}, total_tokens: ${completion.usage?.total_tokens}`);

    const t1 = Date.now();
    let content = completion.choices[0].message.content;

    // Fallback cleanup if model includes markdown
    content = content.replace(/```json\n?|\n?```/g, '').trim();

    const parsed = JSON.parse(content);
    console.log(`[Groq] ✅ JSON parsed in ${Date.now() - t1}ms`);
    console.log(`[Groq]    meals count: ${parsed.meals?.length ?? 'N/A'}`);
    return parsed;
  } catch (error) {
    console.error('[Groq] 💥 Generation error:', error);
    throw new Error('Failed to generate meal plan');
  }
}

/**
 * Chat with AI nutritionist
 * @param {Array} messages - Chat history
 * @returns {Promise<string>} AI response
 */
export async function chatWithAI(messages) {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: NUTRITECH_SYSTEM_PROMPT },
        ...messages,
      ],
      model: DEFAULT_MODEL,
      temperature: 0.8,
      max_tokens: 450,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Groq chat error:', error);
    throw new Error('Network wahala. Check your data! 📶');
  }
}
