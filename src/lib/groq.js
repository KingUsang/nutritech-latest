/**
 * Groq AI Client Configuration
 * Handles AI-powered meal plan generation and chat
 */

import Groq from 'groq-sdk';

// Initialize Groq client
export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Server-side only
});

// Default model (free tier)
export const DEFAULT_MODEL = 'mixtral-8x7b-32768';

/**
 * System prompt for Nutri-Tech AI persona
 */
export const NUTRITECH_SYSTEM_PROMPT = `You are a Nigerian Nutritionist Assistant for students.
Your name is "NutriBot". You speak friendly, relatable English with slight Nigerian slang (pidgin lite).
You know about: Indomie, Garri, Amala, Rice and Beans, Mama put, Campus gates.
Your goal: Help students eat healthy on a tight budget (₦1000/day).
Keep answers short (under 30 words usually) and actionable. Use emojis.`;

/**
 * Generate meal plan using Groq
 * @param {Object} userProfile - User profile data
 * @returns {Promise<Object>} Generated meal plan
 */
export async function generateMealPlan(userProfile) {
  const prompt = `
    Generate a 7-day meal plan for a Nigerian student with these details:
    
    Budget: ₦${userProfile.budget}/day
    Goal: ${userProfile.goal}
    Activity Level: ${userProfile.activityLevel}
    Dietary Restrictions: ${userProfile.restrictions?.join(', ') || 'None'}
    Current Symptoms: ${userProfile.symptoms?.join(', ') || 'None'}
    
    Format response as JSON with this structure:
    {
      "monday": {
        "breakfast": { "name": "", "price": 0, "ingredients": [], "benefits": "" },
        "lunch": { "name": "", "price": 0, "ingredients": [], "benefits": "" },
        "dinner": { "name": "", "price": 0, "ingredients": [], "benefits": "" }
      },
      // ... repeat for tuesday through sunday
    }
    
    Use realistic Nigerian student foods and campus-available prices.
  `;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: NUTRITECH_SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      model: DEFAULT_MODEL,
      temperature: 0.7,
      max_tokens: 4000,
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('Groq meal plan generation error:', error);
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
      max_tokens: 150,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Groq chat error:', error);
    throw new Error('Network wahala. Check your data! 📶');
  }
}
