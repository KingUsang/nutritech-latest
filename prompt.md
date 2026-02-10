# Nutri-Tech App Development Prompt

## Project Overview
You are helping me build **Nutri-Tech**, a digital health platform that provides personalized, affordable nutrition guidance to Nigerian students and young adults. The app uses AI to analyze users' diets, identify nutritional gaps, and recommend budget-friendly meal plans using local Nigerian foods.

## Core Problem We're Solving
Nigerian students like "Tolu" survive on cheap, nutritionally poor foods (bread, noodles, garri) leading to:
- Chronic fatigue and poor focus
- Undernutrition (especially iron, protein, vitamin deficiencies)
- Poor academic and work performance
- Long-term health issues

**The barriers:**
1. **Lack of awareness** - Students don't know what nutrients they're missing
2. **Time constraints** - Too busy to plan balanced meals
3. **Budget limitations** - Healthy eating perceived as expensive

## Our Solution Approach

### Three-Pillar Strategy:
1. **Efficient** - Make healthy eating easy with personalized plans and smart nudges
2. **Cost-effective** - Provide affordable nutrition advice accessible to students (₦1,000/day budgets)
3. **Educational** - Teach users how diet affects health, performance, and well-being

---

## App Features & Functionality

### 1. User Onboarding & Data Collection

**Initial Profile Setup:**
- Basic info: Age, gender, location (city/campus)
- Health status: Current health issues (anemia, diabetes, etc.), medications
- Health goals: More energy, weight management, manage condition, athletic performance
- Activity level: Sedentary, lightly active, moderately active, very active
- Budget: Daily/weekly food budget
- Dietary restrictions: Allergies, food sensitivities, religious restrictions (halal, vegetarian, etc.)
- Food preferences: Foods they love, foods they hate
- Schedule: Class/work times, eating schedule, how much time they have to cook

**Current Diet Assessment:**
- What do you typically eat for breakfast/lunch/dinner?
- How often do you eat fruits? Vegetables? Protein?
- Where do you usually get food? (cook, canteen, street food, restaurant)

**Symptoms Tracking:**
Simple questions:
- How's your energy level lately? (Low/Medium/High)
- How's your focus/concentration? (Poor/Okay/Good)
- Any recent health issues? (frequent illness, headaches, digestive issues, etc.)

---

### 2. AI Analysis Engine

**What the AI needs to do:**

#### a) Nutritional Gap Analysis
Compare user's current diet against recommended daily intake for their age/gender/activity level:
- **Macronutrients:** Protein, carbohydrates, fats
- **Key micronutrients:** Iron, calcium, vitamin A, vitamin C, zinc, B vitamins, folate

Calculate deficiencies:
```
Example Output:
- Protein: 15g/day (Needs: 60-80g) - SEVERELY LOW
- Iron: 3mg/day (Needs: 18mg for women, 8mg for men) - LOW
- Vitamin C: 10mg/day (Needs: 75-90mg) - LOW
- Carbs: 250g/day (Needs: 200-300g) - ADEQUATE
```

#### b) Symptom-Nutrition Correlation
Map reported symptoms to likely nutritional deficiencies:
- **Fatigue/tiredness** → Iron deficiency, low protein, B12 deficiency
- **Poor focus/concentration** → Low omega-3, inadequate protein, dehydration, low iron
- **Frequent illness** → Low vitamin C, zinc deficiency, poor overall nutrition
- **Headaches** → Dehydration, low magnesium, irregular eating
- **Digestive issues** → Low fiber, food intolerances
- **Weak/brittle nails** → Iron, protein, biotin deficiency
- **Hair loss** → Protein, iron, zinc deficiency

#### c) Budget Optimization
Analyze current spending vs. nutritional value:
```
Current diet example:
- Bread (₦200) + Noodles (₦300) + Soft drink (₦200) = ₦700
- Nutrition: High carbs, low protein, minimal micronutrients
- Cost per gram of protein: Very expensive

Optimized diet:
- Eggs (₦200) + Beans and plantain (₦300) + Banana (₦100) = ₦600
- Nutrition: Balanced macros, good micronutrients
- Cost per gram of protein: Much cheaper
- Saves ₦100/day while being healthier
```

---

### 3. Personalized Meal Plan Generation

**Requirements for meal plans:**

#### Must be:
- Within user's stated budget
- Uses Nigerian local foods (rice, beans, yam, plantain, garri, etc.)
- Considers time constraints (quick options for busy days)
- Addresses their specific nutritional gaps
- Culturally appropriate and familiar
- Provides variety (not same food every day)

#### Meal plan structure:
Generate **7-day meal plans** with:

**For each meal (breakfast, lunch, dinner, optional snack):**
```
Meal: [Name of meal in English + local name if applicable]

Ingredients & Cost:
- Item 1: quantity, ₦price
- Item 2: quantity, ₦price
Total cost: ₦XXX

Nutritional breakdown:
- Calories: XXX
- Protein: XXg
- Carbs: XXg
- Fats: XXg
- Key nutrients: Iron XXmg, Calcium XXmg, etc.

Why this meal:
[Educational explanation linking to user's goals/deficiencies]
Example: "Eggs provide 12g protein and iron to boost your energy levels. 
Banana adds quick-release carbs for morning alertness."

Preparation:
- Time needed: XX minutes
- Steps: [Simple 3-5 step instructions]
OR
- Where to buy ready-made: [Specific campus location/canteen if applicable]
- Estimated cost if buying ready-made: ₦XXX

Alternative options:
[2-3 cheaper or quicker alternatives with similar nutrition]
```

#### Smart substitution system:
Don't create completely new diets. Suggest affordable swaps from their current diet:
```
Current: White bread only (₦200)
→ Swap to: Bread + 2 boiled eggs (₦250)
Benefit: +12g protein, +2mg iron, better focus
Cost difference: +₦50 but much better value

Current: Garri only (₦150)
→ Swap to: Garri + groundnut (₦200)
Benefit: +8g protein, healthy fats, more filling
Cost difference: +₦50
```

---

### 4. Nigerian Food Database Structure

**What I need help building:**

Create a structured database template for Nigerian foods with these fields:

```
FOOD ITEM TEMPLATE:

Basic Information:
- Food ID: [unique identifier]
- English name:
- Local names: (Yoruba/Igbo/Hausa if applicable)
- Category: [Protein/Carbohydrate/Vegetable/Fruit/Fat/Prepared meal]
- Subcategory: [Legume/Grain/Leafy vegetable/Street food/etc.]

Serving Information:
- Standard serving size: [in grams AND local measure like "1 cup", "1 wrap", "1 piece"]
- Typical student portion: [realistic portion students actually eat]

Nutritional Data (per serving):
- Calories: XXX kcal
- Protein: XXg
- Carbohydrates: XXg
- Fat: XXg
- Fiber: XXg
- Iron: XXmg
- Calcium: XXmg
- Vitamin A: XXµg
- Vitamin C: XXmg
- Zinc: XXmg
- Folate: XXµg
- Vitamin B12: XXµg
- Other relevant nutrients

Pricing Information:
- Average market price: ₦XXX per serving
- Price range: ₦XXX - ₦XXX
- Location variations:
  * Lagos: ₦XXX
  * Ibadan: ₦XXX
  * Abuja: ₦XXX
- Where to buy: [Market/Canteen/Street vendor/Supermarket]
- Last price update: [Date]

Student-Specific Data:
- Budget category: [Very cheap/Affordable/Moderate/Expensive]
- Convenience level: [Ready-to-eat/Easy to prepare/Requires cooking/Complex preparation]
- Preparation time: [X minutes]
- Campus availability: [Very common/Common/Sometimes available/Rare]
- Storage/shelf life: [How long it keeps]

Meal Context:
- Common meal times: [Breakfast/Lunch/Dinner/Snack/Anytime]
- Common pairings: [Foods typically eaten together]
- Regional preference: [Popular in which regions]

Health & Diet Flags:
- Good for: [List conditions: anemia, weight loss, energy boost, etc.]
- Allergen warnings: [Gluten/Dairy/Nuts/etc.]
- Dietary compatibility: [Vegetarian/Vegan/Halal/etc.]

Additional Notes:
- Preparation tips: [How to make it healthier/cheaper/faster]
- Cultural significance: [If any]
- Seasonal availability: [Year-round/Seasonal]
```

**Initial food list to create (start with 50-100 most common):**

**Staple Carbohydrates:**
- White rice, Brown rice, Jollof rice, Fried rice
- Beans (brown beans, white beans, oloyin beans)
- Yam (boiled, fried, pounded - iyan)
- Garri (white, yellow)
- Plantain (ripe, unripe)
- Sweet potato
- Irish potato
- Bread (sliced bread, agege bread)
- Instant noodles (Indomie, etc.)
- Semovita, Amala, Eba, Fufu
- Spaghetti, Macaroni

**Proteins:**
- Eggs (chicken eggs)
- Chicken (whole, parts)
- Beef
- Fish: Titus (mackerel), fresh fish (tilapia, catfish), stock fish, dried fish
- Ponmo (cow skin)
- Turkey
- Snail
- Groundnuts/peanuts
- Soya beans
- Moin moin, Akara

**Vegetables:**
- Ugwu (fluted pumpkin leaves)
- Waterleaf
- Ewedu (jute leaves)
- Tomatoes
- Peppers (bell pepper, scotch bonnet/ata rodo)
- Onions
- Carrots
- Cabbage
- Lettuce
- Green beans
- Cucumber
- Garden egg

**Fruits:**
- Banana
- Orange
- Watermelon
- Pineapple
- Pawpaw (papaya)
- Mango
- Apple
- Grape
- Avocado (pear)

**Oils & Fats:**
- Palm oil
- Groundnut oil
- Vegetable oil
- Butter
- Margarine

**Common Prepared Foods/Street Food:**
- Suya
- Puff puff
- Boli (roasted plantain)
- Meat pie
- Sausage roll
- Shawarma
- Fried yam and egg
- Bread and akara
- Bread and beans (ewa agoyin)
- Rice and stew
- Amala and ewedu
- Eba and egusi soup
- Pounded yam and soup

**Beverages:**
- Zobo (hibiscus drink)
- Kunu
- Chapman
- Soft drinks
- Water

---

### 5. Meal Recommendation Logic

**Step-by-step recommendation process:**

```
INPUT: User profile data

STEP 1: Identify nutritional gaps
- Compare current intake vs. recommended
- Flag severe deficiencies (>50% below recommended)
- Flag moderate deficiencies (25-50% below recommended)

STEP 2: Prioritize issues
Priority order:
1. Severe macro deficiencies (protein)
2. Micronutrients linked to reported symptoms
3. General micronutrient deficiencies
4. Optimization opportunities

STEP 3: Query food database
Filter foods by:
- Budget (must be within daily budget)
- Availability (campus availability = "common" or "very common")
- Time constraints (if user has <30 min, focus on "ready-to-eat" or "easy to prepare")
- Dietary restrictions (exclude allergens, respect religious restrictions)
- High in deficient nutrients

STEP 4: Create balanced meals
For each meal:
- Include at least one protein source
- Include vegetables/fruits for micronutrients
- Include carbs for energy
- Stay within budget allocation (breakfast ~25%, lunch ~40%, dinner ~30%, snack ~5%)
- Ensure variety (don't repeat same food multiple times in one day)

STEP 5: Generate educational context
For each recommended meal, explain:
- Which nutrient gaps it addresses
- How it helps with their symptoms
- Why it's good value for money
- How to prepare it quickly

STEP 6: Provide alternatives
For each meal, offer 2-3 alternatives:
- Cheaper option
- Quicker option
- Different flavor profile but similar nutrition

STEP 7: Calculate expected outcomes
Estimate improvement timeline:
- Energy levels: "Should improve within 1-2 weeks"
- Focus: "Noticeable improvement by week 2-3"
- Overall health: "Significant improvement within 1 month"
```

**Example recommendation output:**

```
USER: Tolu (from pitch deck)
- Current diet: Mostly bread and noodles
- Symptoms: Tired, unfocused
- Budget: ₦1,000/day
- Student, busy schedule

AI ANALYSIS:
Nutritional gaps:
- Protein: 15g/day (needs 70g) - CRITICAL
- Iron: 4mg/day (needs 8mg) - LOW
- Vitamin B12: Very low - affects energy
- Fiber: Low - affects digestion

Symptom analysis:
Fatigue + poor focus → Likely iron deficiency + inadequate protein + low B vitamins

RECOMMENDED MEAL PLAN (MONDAY):

BREAKFAST - ₦250 (15 minutes)
2 Boiled Eggs + 2 Slices Bread + 1 Banana

Nutritional breakdown:
- Calories: 420
- Protein: 16g
- Iron: 2mg
- B vitamins: Good source

Why this meal:
"Eggs are protein powerhouses - each egg has 6g of protein and iron that 
your body needs to carry oxygen to your brain. That's why you'll feel more 
alert during morning lectures. The banana provides quick energy without the 
crash you get from noodles. Total cost: just ₦250 - cheaper than your usual 
bread-only breakfast but 5x more nutritious."

How to prepare:
1. Boil 2 eggs (7 minutes)
2. Toast bread if desired
3. Grab a banana
Time: 10 minutes

Where to buy ready-made:
- Boiled eggs available at most campus gates (₦50 each)
- Total if buying: ₦250

Alternatives:
1. CHEAPER: Akara (bean cakes) + bread + banana (₦200)
   - Similar protein, slightly less iron
2. QUICKER: Bread + groundnut paste + banana (₦200, 2 minutes)
   - Good protein from groundnuts
3. DIFFERENT: Moi moi + pap + banana (₦250)
   - Traditional, high protein

---

LUNCH - ₦400 (Buy ready-made or 1 hour to cook)
Beans and Plantain (1 cup beans + 1 piece fried plantain)

Nutritional breakdown:
- Calories: 550
- Protein: 18g
- Iron: 4mg
- Fiber: 12g

Why this meal:
"Beans are your energy secret weapon. One cup gives you 18g of protein and 
4mg of iron - that's half your daily iron needs! This is why you'll notice 
less afternoon fatigue by week 2. Plantain adds healthy carbs to keep you 
full through evening classes. Many students skip beans thinking it's 'poor 
man's food' - but it's actually the smartest nutrition choice for your budget."

Where to buy:
- Campus canteen: ₦350-400
- Ewa agoyin vendor near faculty gate: ₦300-350
- Cook yourself: ₦250-300 (but takes time)

If cooking:
1. Soak beans overnight (saves cooking time)
2. Cook beans with palm oil and pepper (45 min)
3. Fry plantain (10 min)

Alternatives:
1. Rice and fish stew with vegetables (₦400)
   - Higher iron from fish
2. Yam and egg sauce (₦350)
   - Quick, high protein
3. Jollof rice with chicken (₦450 - slightly over but very filling)

---

DINNER - ₦300 (20 minutes)
White Rice + Vegetable Stew with Mackerel (Titus)

Ingredients:
- Rice: 1 cup cooked (₦100)
- Titus fish: 1 small piece (₦150)
- Tomato stew with ugwu: (₦50)

Nutritional breakdown:
- Calories: 480
- Protein: 22g
- Omega-3: Good source (from fish)
- Iron: 2mg
- Vitamin A: Excellent (from ugwu)

Why this meal:
"Fish is brain food - the omega-3 helps you focus better during study sessions. 
That's why students who eat fish regularly perform better academically. Ugwu 
(fluted pumpkin) adds iron and vitamin A. Your mom probably told you to eat 
vegetables - she was right! This combo costs ₦300 but gives you premium nutrition."

How to prepare:
1. Cook rice (15 min)
2. Fry titus fish (5 min)
3. Add ugwu to your stew (2 min)

Alternatives:
1. Garri and egusi soup with fish (₦300)
   - More filling, same nutrition
2. Spaghetti with fish sauce and vegetables (₦300)
   - Students favorite
3. Eba and vegetable soup (₦250)
   - Cheaper option

---

SNACK (Optional) - ₦100
Groundnuts (1 small bag)

Why: Protein-rich snack, healthy fats, keeps you alert during study
Or: Banana (₦50) + Groundnut (₦50)

---

DAILY TOTAL: ₦1,050 (slightly over but negotiable - can reduce snack)

NUTRITIONAL SUMMARY:
- Protein: 56g (up from 15g - that's 270% improvement!)
- Iron: 8mg (meets daily needs vs. previous 50%)
- Calories: 1,450 (adequate for your activity level)
- Fiber: 20g (great for digestion)

EXPECTED RESULTS:
- Week 1: More morning energy, less afternoon crashes
- Week 2: Better focus in classes, improved mood
- Week 3-4: Stronger overall, better sleep, healthier appearance

MONEY BREAKDOWN:
- Your old diet: ₦800/day, nutritionally poor
- New diet: ₦1,000/day, complete nutrition
- Extra cost: ₦200/day = ₦6,000/month
- Value: Your health, grades, and future - priceless

Remember: You can adjust based on what you actually like and what's available!
```

---

### 6. Tracking & Feedback System

**Daily tracking (keep it simple - 1-2 minutes max):**

#### Meal Logging:
Options:
1. Take photo of meal → AI identifies food (advanced feature)
2. Select from suggested meals → Check "Ate this"
3. Search food database → Add manually

#### Energy/Symptom Tracking:
**Morning check-in (9-10 AM):**
"How did you wake up today?"
- 😴 Tired/Sluggish
- 😐 Normal/Okay
- ⚡ Energized/Great

**Afternoon check-in (2-3 PM):**
"Energy after lunch?"
- 😴 Crashed/Sleepy
- 😐 Stable
- 💪 Strong/Focused

**Optional evening:**
"How was your day overall?"
- Focus level: Poor/Okay/Good
- Physical feeling: Weak/Normal/Strong

#### Weekly Summary:
Simple questionnaire (once per week):
"This week, did you experience:"
- ☐ Frequent tiredness
- ☐ Difficulty concentrating
- ☐ Headaches
- ☐ Digestive issues
- ☐ Getting sick
- ☐ None of the above - feeling great!

**AI Feedback Loop:**

Based on tracking data, AI should:

```
PATTERN DETECTION:

If: User skipped breakfast 3+ times AND rated energy low those days
Then: Send nudge - "Notice you have low energy on days you skip breakfast. 
Your brain needs fuel! Here's a 5-minute breakfast option: [suggestion]"

If: User ate recommended meals 5+ days AND energy ratings improved
Then: Celebrate - "🎉 Amazing week! Your energy ratings are up 40% since 
you started eating more protein. Your body is thanking you!"

If: User consistently skips a certain food (e.g., beans)
Then: Investigate - "Noticed you're not eating beans much. Any reason?"
Options: "Don't like taste" / "Takes too long" / "Causes bloating" / "Other"
Then: Adjust recommendations with alternatives

If: User reports bloating after beans
Then: Adjust - "Let's try eggs and fish for protein instead. Also, soaking 
beans overnight reduces bloating."

If: Budget dropped (user buying cheaper meals)
Then: Adapt - "Noticed you're watching budget this week. Here are meals 
under ₦700/day that still hit your nutrition goals..."

If: Energy not improving after 2 weeks
Then: Flag for nutritionist review - potential underlying issue
```

**Progress Visualization:**

Show users:
1. **Nutrition progress chart:**
   - Week 1: Protein 15g → Week 4: Protein 65g
   - Iron intake improvement
   - Calorie balance

2. **Symptom improvement:**
   - Energy ratings over time (graph)
   - Focus ratings trend
   - Days feeling "great" vs "tired"

3. **Cost efficiency:**
   - "You're getting 300% more protein for only 20% more cost"
   - "This week's meals: ₦6,800 total, restaurant equivalent: ₦15,000"

4. **Streak & Achievements:**
   - "7-day streak of hitting protein goals! 🔥"
   - "First month complete - you're building healthy habits"
   - "Tried 15 new nutritious meals"

---

### 7. Educational Content System

**In-app education (bite-sized, contextual):**

#### Embedded in recommendations:
Every meal suggestion includes "Why this helps" section explaining the science simply.

#### Weekly tips:
Push notifications with useful info:
- "💡 Tip: Iron from plants (beans) absorbs better with vitamin C. Add tomatoes or orange!"
- "🧠 Brain fact: Your brain uses 20% of your energy. Skipping meals = poor focus"
- "💰 Money saver: Groundnut has same protein as expensive protein powder"

#### Topic-based articles (in-app library):
Short articles (2-3 minute reads):
- "Why Students Get Tired: The Iron-Energy Connection"
- "Eating Well on ₦700/Day: Complete Guide"
- "5 Nigerian Foods That Boost Brain Power"
- "Protein 101: How Much Do You Really Need?"
- "The Truth About Beans: Your Budget Superfood"
- "Quick Meals for Busy Students (Under 15 Minutes)"

#### Interactive elements:
- Quiz: "Test your nutrition knowledge"
- Calculator: "How much protein do you need?"
- Myth busters: "Does bread make you fat?" (Educational fact-check)

---

### 8. Free vs Premium Features

**FREE TIER (₦0/month):**
- General nutrition tips
- Access to educational content (all articles)
- Basic diet tracking (log meals manually)
- AI-generated meal plans (standard, not deeply personalized)
- Weekly nutrition summary
- Community features (if you build this)
- Ads included (not intrusive)
- No nutritionist consultations

**PREMIUM TIER (₦2,500/month):**
- Personalized meal plans (deeply customized to their specific situation)
- Access to all educational content (same as free)
- Advanced tracking (photo recognition for meals - if you implement)
- General nutrition tips (same as free)
- One-on-one nutritionist chat sessions (2-3 per month)
- Priority support
- Unlimited meal plan alterations (adjust for preferences, budget changes, etc.)
- Ad-free experience
- Progress reports with detailed analytics
- Biomarker integration (when you launch urine/facial analysis feature)
- Mea