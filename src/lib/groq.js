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

// Default model (using Llama 3.3 70B Versatile for high quality and speed)
export const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

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
    - Goal: ${userProfile.healthGoals?.primaryGoal || 'Healthy Eating'}
    - Budget: ${userProfile.budget?.level || 'Medium'} (${userProfile.budget?.amount || '5000'} Naira/week)
    - Kitchen: ${userProfile.budget?.cookingEquipment?.join(', ') || 'Stove'}
    - Dietary Restrictions: ${userProfile.dietAssessment?.dietType || 'None'}
    - Allergies: ${userProfile.dietAssessment?.allergies?.join(', ') || 'None'}
    
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
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: NUTRITECH_SYSTEM_PROMPT + " Output valid JSON only." },
        { role: 'user', content: prompt }
      ],
      model: DEFAULT_MODEL,
      temperature: 0.5,
      response_format: { type: "json_object" }, 
    });

    let content = completion.choices[0].message.content;
    
    // Fallback cleanup if model includes markdown
    content = content.replace(/```json\n?|\n?```/g, '').trim();

    return JSON.parse(content);
  } catch (error) {
    console.error('Groq AI generation error:', error);
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
