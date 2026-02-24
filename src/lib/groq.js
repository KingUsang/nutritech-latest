/**
 * Gemini AI Client Configuration
 * Handles AI-powered meal plan generation and chat
 */

import { GoogleGenAI } from '@google/genai';

// Model for meal plan generation and chat
export const DEFAULT_MODEL = 'gemini-3-flash-preview';
export const FALLBACK_MODEL = 'gemini-3-flash-preview';

// Lazy client getter — only instantiated at request time, not at build time
function getAI() {
  return new GoogleGenAI({});
}

/**
 * System prompt for Nutri-Tech AI persona
 */
export const NUTRITECH_SYSTEM_PROMPT = `You are NutriBot — an expert Nigerian Nutritionist and Campus Survival Analyst built into the Nutri-Tech app.
You speak in friendly, relatable English with light Nigerian pidgin sprinkled in (e.g., "no worry", "e go be", "sapa no go catch you").

## YOUR CORE MISSION
Help Nigerian university students eat well on extremely tight budgets, using ingredients they can actually find around campus markets and prepare in a hostel room.

## THE STUDENT REALITY YOU MUST ALWAYS RESPECT
1. **Sapa is real.** Budgets are tight — every naira counts. Never suggest anything unrealistic for a student on ₦500–₦2,000/day.
2. **Hostel kitchen = one pot + hotplate or camp gas.** No oven, no blender, no multi-burner stove. Meals must be one-pot or zero-cook wherever possible.
3. **No refrigeration.** Prioritize shelf-stable proteins: eggs, dried crayfish, dried fish (panla/stockfish), dried beans, groundnut paste, soya chunks. Avoid fresh meat that spoils fast.
4. **Time is scarce.** Students have lectures. All meals must be ready in under 30–40 minutes. Recommend time-saving hacks (e.g., pre-soak beans overnight).
5. **Use only locally available campus-market ingredients:** garri, beans, oats, spaghetti, indomie noodles, eggs, groundnut, local rice, sweet potatoes, Irish potatoes, bread, sachet tomato paste, dried fish/crayfish, plantain, akara, moi moi, pap (akamu), banana, soya chunks, ugwu leaves, carrot, onion, seasoning cubes, palm oil.

## NUTRITIONAL KNOWLEDGE TO APPLY
- Map symptoms to deficiencies and fix them with affordable local foods:
  - Fatigue / low energy → iron (beans, dark leafy veg, dried fish), B vitamins (eggs, oats)
  - Poor focus → protein (eggs, beans, groundnut), complex carbs (oats, sweet potato)
  - Frequent illness → vitamin C (tomatoes, banana), zinc (beans, dried fish)
  - Digestive issues → fiber (beans, oats, plantain)
  - Weight gain goal → calorie-dense but cheap foods (groundnut, bread + peanut butter, rice + beans)
- Always balance macros: carb + protein + fat in every meal where budget allows.

## YOUR RESPONSE STYLE
- Be encouraging, warm, and real — like a knowledgeable older sibling.
- Keep advice practical, never preachy.
- Always give prices in ₦ and prove the plan fits the stated budget.
- When giving a meal plan, always include: a Shopping List with current market prices, and a Student Survival Tip.
`;

/**
 * Generate a 7-day meal plan based on user profile
 * @param {Object} userProfile - User data (age, goals, budget, etc.)
 * @returns {Promise<Object>} Generated meal plan JSON
 */
export async function generateMealPlan(userProfile) {
  // Derive readable context from user profile
  const age = userProfile.basicInfo?.age || '20';
  const gender = userProfile.basicInfo?.gender || 'student';
  const location = userProfile.basicInfo?.location || 'Nigerian campus';
  const goals = userProfile.healthGoals?.goals?.join(', ') || 'General health';
  const dailyBudget = userProfile.budgetConstraints?.dailyBudget || '1000';
  const weeklyBudget = userProfile.budgetConstraints?.weeklyBudget || (dailyBudget * 7);
  const equipment = userProfile.budgetConstraints?.cookingEquipment?.join(', ') || userProfile.budgetConstraints?.mealPrep || 'hotplate and one pot';
  const hasFridge = userProfile.budgetConstraints?.hasFridge ? 'Yes' : 'No';
  const dietType = userProfile.dietAssessment?.dietType || 'No restrictions';
  const allergies = userProfile.dietAssessment?.allergies?.join(', ') || 'None';
  const typicalBreakfast = userProfile.dietAssessment?.typicalBreakfast || 'Not specified';
  const typicalLunch = userProfile.dietAssessment?.typicalLunch || 'Not specified';
  const typicalDinner = userProfile.dietAssessment?.typicalDinner || 'Not specified';
  const activityLevel = userProfile.healthGoals?.activityLevel || 'Moderately active';
  const healthConditions = userProfile.basicInfo?.healthConditions?.join(', ') || 'None';
  const symptoms = userProfile.symptoms?.list?.join(', ') || 'None reported';
  const stressLevel = symptoms.includes('Always Tired') || symptoms.includes('Sleep Issues') ? 'High' : 'Normal';

  // Fetch Western Blueprint from Spoonacular
  let blueprintData = {};
  try {
    const spoonApiKey = process.env.SPOONACULAR_API_KEY || 'bbcfc275a92c47dcab323855a704568d';
    const targetCalories = 2000; // Default or derive from profile
    console.log('[Spoonacular] ▶ Fetching weekly blueprint...');
    const spoonRes = await fetch(
      `https://api.spoonacular.com/mealplanner/generate?timeFrame=week&targetCalories=${targetCalories}&apiKey=${spoonApiKey}`
    );
    if (spoonRes.ok) {
      blueprintData = await spoonRes.json();
      console.log('[Spoonacular] ✅ Blueprint fetched successfully');
    } else {
      console.warn('[Spoonacular] ⚠️ Failed to fetch blueprint:', spoonRes.statusText);
    }
  } catch (err) {
    console.warn('[Spoonacular] ⚠️ Error fetching blueprint:', err.message);
  }

  const prompt = `
    You are generating a 7-day personalized meal plan for a Nigerian university student. Read their profile carefully and apply the campus survival constraints.

    ## STUDENT PROFILE
    - Age: ${age} | Gender: ${gender} | Location: ${location}
    - Health Goals: ${goals}
    - Health Conditions: ${healthConditions}
    - Reported Symptoms: ${symptoms}
    - Stress Level: ${stressLevel}
    - Activity Level: ${activityLevel}
    - Daily Budget: ₦${dailyBudget} | Weekly Budget: ₦${weeklyBudget}
    - Cooking Equipment: ${equipment}
    - Has Refrigerator: ${hasFridge}
    - Dietary Restrictions: ${dietType}
    - Allergies: ${allergies}
    - Current Typical Meals: Breakfast: ${typicalBreakfast} | Lunch: ${typicalLunch} | Dinner: ${typicalDinner}

    ## WESTERN BLUEPRINT (SPOONACULAR)
    Translate this Western blueprint to Nigerian Student Meals.
    Blueprint: ${JSON.stringify(blueprintData)}

    ## RULES YOU MUST FOLLOW
    1. Every meal must use only affordable Nigerian campus-market ingredients.
    2. No meal should require more than one pot or take over 35 minutes.
    3. Do NOT suggest fresh meat (chicken, beef) unless budget is ₦1,500+/day — use eggs, dried fish, crayfish, beans, soya chunks instead.
    4. If hasFridge is No, only recommend shelf-stable ingredients.
    5. Address the reported symptoms with targeted ingredient choices (e.g., if fatigue → include iron-rich beans/dark leafy veg).
    6. Make the total cost of all 7 days realistically fit within the weekly budget of ₦${weeklyBudget}.
    7. Include a single consolidated campus market shopping list with realistic ₦ prices.
    8. Include one practical Student Survival Tip at the end.
    9. NO HALLUCINATIONS: Do NOT pair Pap with Groundnuts. Pap goes with Akara or Moin-Moin.
    10. REAL PRICES: Search for current 2024/2025 Nigerian market prices.
    11. COMPARISON: Explicitly state WHICH Western meal you are replacing and WHY in the replacementLogic field.

    Format the response as a strict JSON object (NO markdown code blocks, just raw JSON) with this key structure:
    {
      "title": "Weekly Plan Title",
      "summary": "Short summary...",
      "healthNote": "Biomarker Scan detected High Stress. We prioritized Magnesium-rich foods (Beans, Fish) to support nervous system recovery.",
      "weekly_totals": {
        "budget": 5000,
        "avg_calories": 2000,
        "avg_protein": 60
      },
      "shopping_list": [
        { "item": "Rice (2 cups)", "estimated_price": 400 },
        { "item": "Beans (1 derica)", "estimated_price": 300 }
      ],
      "survival_tip": "Soak your beans the night before to cut cooking time in half and save gas money!",
      "meals": [
        {
          "id": "unique_id_1",
          "day": "Monday",
          "type": "Breakfast",
          "name": "Meal Name",
          "westernOriginal": "Avocado Toast",
          "replacementLogic": "Yam provides more sustainable energy for a student's long day than light toast.",
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

  const callGemini = async (model) => {
    console.log(`[Gemini] ▶ Sending request with model: ${model}`);
    const result = await getAI().models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: NUTRITECH_SYSTEM_PROMPT + ' Output valid JSON only.',
        responseMimeType: 'application/json',
        temperature: 0.5,
        maxOutputTokens: 8192,
      },
    });
    return result;
  };

  const isQuotaError = (err) => {
    const msg = err?.message || '';
    return (
      err?.status === 429 ||
      (typeof msg === 'string' && (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota')))
    );
  };

  try {
    const t0 = Date.now();
    let result;

    try {
      result = await callGemini(DEFAULT_MODEL);
    } catch (primaryError) {
      if (isQuotaError(primaryError)) {
        console.warn(`[Gemini] ⚠️ ${DEFAULT_MODEL} quota exhausted — retrying with ${FALLBACK_MODEL}`);
        result = await callGemini(FALLBACK_MODEL);
      } else {
        throw primaryError;
      }
    }

    console.log(`[Gemini] ✅ Response received in ${Date.now() - t0}ms`);

    const t1 = Date.now();
    let content = result.text;

    // Fallback cleanup if model wraps in markdown
    content = content.replace(/```json\n?|\n?```/g, '').trim();

    const parsed = JSON.parse(content);
    console.log(`[Gemini] ✅ JSON parsed in ${Date.now() - t1}ms`);
    console.log(`[Gemini]    meals count: ${parsed.meals?.length ?? 'N/A'}`);
    return parsed;
  } catch (error) {
    console.error('[Gemini] 💥 Generation error:', error?.message ?? error);
    // Surface quota/rate-limit errors with a recognisable status code
    if (isQuotaError(error)) {
      const quotaErr = new Error(
        'AI quota exhausted. The free-tier daily limit has been reached. Please try again tomorrow or enable billing on your Google AI account.'
      );
      quotaErr.status = 429;
      throw quotaErr;
    }
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
    // Gemini uses 'model' instead of 'assistant' for history roles
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = getAI().chats.create({
      model: DEFAULT_MODEL,
      history,
      config: {
        systemInstruction: NUTRITECH_SYSTEM_PROMPT,
        temperature: 0.75,
        maxOutputTokens: 800,
      },
    });

    const result = await chat.sendMessage({ message: lastMessage.content });
    return result.text;
  } catch (error) {
    console.error('Gemini chat error:', error);
    throw new Error('Network wahala. Check your data! 📶');
  }
}
