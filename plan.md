Haha, you're absolutely right! 😂 I was making up those prices - I don't actually know current Nigerian food prices, and yeah, what student has a toaster in their hostel? That was unrealistic. My bad!

Let me fix this properly:

## Realistic Pricing Approach

**You need to do actual price research:**

**Method 1 - Student Survey (Quickest):**
Send a Google Form to students asking:
- "How much do you pay for 2 boiled eggs on campus?" 
- "Price of a plate of beans and plantain at your canteen?"
- "How much is bread near your school?"

Get responses from UI (Ibadan), UNILAG (Lagos), UNIBEN, etc.

**Method 2 - Campus Visit:**
- Go to UI campus (you're there already based on pitch deck)
- Visit the canteens, mama puts, campus gates
- Record actual prices of common meals
- Take photos for reference

**Method 3 - Use Your Team:**
Your nutritionists Adekunle and Bolanle - they should know these prices or can easily find out.

**Realistic student eating habits to consider:**
- Most students buy ready-made food (no cooking facilities)
- Hostels have no fridges, stoves, toasters
- They eat at: canteens, mama put, campus gates, room (only cold food)
- They CAN boil water (kettle for noodles, tea)
- Weekend meals at home might be different

So meals should be:
- **Ready-to-buy** (primary option)
- **No-cook** (bread, fruits, groundnut, biscuits)
- **Kettle-only** (noodles, instant meals)
- **Weekend cook** (when home, can batch prep)

---

## Step-by-Step Development Plan

### **PHASE 1: FOUNDATION (Weeks 1-4) - Before Any Coding**

**Week 1: Research & Data Collection**
- [ ] Survey 50-100 UI students on eating habits and prices
- [ ] Visit campus canteens/vendors - record actual meal prices
- [ ] Interview 10 students deeply: what they eat, why, budget, pain points
- [ ] Compile list of 50 most common student foods
- [ ] Document realistic prices for each location

**Week 2: Build Food Database (Manual Work)**
- [ ] Create Google Sheets with food database template
- [ ] Nutritionists fill in nutritional data for 50 foods (use USDA + local knowledge)
- [ ] Add realistic prices from week 1 research
- [ ] Add "where to buy on campus" details
- [ ] Categorize by: ready-to-buy, no-cook, requires cooking

**Week 3: Design Recommendation Logic (On Paper)**
- [ ] Map common deficiencies to food solutions
- [ ] Create 10 sample student profiles (different budgets, issues)
- [ ] Manually create meal plans for each (test your logic)
- [ ] Get nutritionists to review and approve these samples
- [ ] Document the decision-making process (this becomes your algorithm)

**Week 4: Define MVP Scope**
- [ ] List MUST-HAVE features for launch
- [ ] List NICE-TO-HAVE features for later
- [ ] Create wireframes for key screens (can use Figma free tier)
- [ ] Get feedback from 5-10 potential users on wireframes

**MVP Must-Haves:**
- User registration/profile setup
- Simple diet assessment 
- AI-generated meal plan (1 week)
- Food database browsing
- Basic tracking (did you eat this? how's energy?)
- Educational tips (static content for now)

**Save for Later:**
- Photo meal logging
- Nutritionist chat
- Biomarker analysis
- Social/community features
- Complex analytics

---

### **PHASE 2: TECHNICAL SETUP (Weeks 5-6)**

**Week 5: Choose Tech Stack & Setup**

**Recommended Stack (for quick MVP):**

**Option A - No-Code/Low-Code Start (Fastest):**
- **Frontend:** Bubble.io or FlutterFlow (visual app builder)
- **Database:** Built-in (Bubble) or Firebase
- **AI:** Claude/OpenAI API integration
- **Time:** 4-6 weeks to MVP
- **Cost:** ~$50-100/month
- **Pro:** No coding needed, fast to build
- **Con:** Limited customization later

**Option B - Web App First (Recommended for you):**
- **Frontend:** React (web) - easier to build and test
- **Backend:** Node.js + Express OR Python + Flask
- **Database:** PostgreSQL or MongoDB
- **AI:** Claude API
- **Hosting:** Vercel (frontend) + Railway/Render (backend) - free tiers available
- **Time:** 8-10 weeks to MVP
- **Cost:** Free to start, ~$20/month later
- **Pro:** Full control, easier to iterate, works on any device
- **Con:** Requires developer or learning to code

**Option C - Mobile App (Later):**
- After web app works, build with React Native or Flutter
- Reuse same backend
- Time: +4-6 weeks

**Week 5 Tasks:**
- [ ] Choose your stack based on your technical skills
- [ ] Set up development environment
- [ ] Create GitHub repository
- [ ] Set up basic project structure
- [ ] Get Claude API key (or OpenAI)

**Week 6: Build Database & Backend Foundation**
- [ ] Set up database with tables: Users, Foods, MealPlans, TrackingLogs
- [ ] Import your food database from Google Sheets
- [ ] Create API endpoints for: user registration, food search, save profile
- [ ] Test CRUD operations (Create, Read, Update, Delete)

---

### **PHASE 3: CORE FEATURES (Weeks 7-10)**

**Week 7: User Onboarding Flow**
- [ ] Build registration page
- [ ] Create profile setup form (age, gender, budget, goals, etc.)
- [ ] Build diet assessment questionnaire
- [ ] Save data to database
- [ ] Test complete onboarding flow

**Week 8: AI Meal Plan Generation**
- [ ] Write Claude API prompt template
- [ ] Create function that sends user data to Claude
- [ ] Parse Claude's response and format it nicely
- [ ] Display meal plan to user
- [ ] Allow user to save/reject plan
- [ ] Test with 5 different user profiles

**Sample API Integration Code Structure:**
```javascript
// When user completes profile
async function generateMealPlan(userData) {
  // Prepare prompt with user data + food database
  const prompt = `
    User Profile:
    - Budget: ${userData.budget}/day
    - Goals: ${userData.goals}
    - Current diet: ${userData.currentDiet}
    - Symptoms: ${userData.symptoms}
    
    Available Foods Database: ${foodDatabase}
    
    Generate 7-day meal plan...
  `;
  
  // Call Claude API
  const response = await callClaudeAPI(prompt);
  
  // Save to database
  await saveMealPlan(userData.userId, response);
  
  return response;
}
```

**Week 9: Meal Plan Display & Tracking**
- [ ] Build meal plan view page (show breakfast, lunch, dinner for each day)
- [ ] Create "Mark as eaten" functionality
- [ ] Build simple tracking page (energy level check-in)
- [ ] Show basic progress (days tracked, meals eaten)

**Week 10: Educational Content**
- [ ] Create 5-10 educational articles (nutritionists write these)
- [ ] Build simple blog/article view
- [ ] Add tips section on homepage
- [ ] Link relevant articles to meal recommendations

---

### **PHASE 4: POLISH & TEST (Weeks 11-12)**

**Week 11: User Testing**
- [ ] Recruit 20 UI students for beta testing
- [ ] Have them complete full flow: register → get plan → track for 1 week
- [ ] Collect feedback (what's confusing? what's broken? what's helpful?)
- [ ] Fix critical bugs
- [ ] Improve UI based on feedback

**Week 12: Final Touches**
- [ ] Add loading states and error messages
- [ ] Improve mobile responsiveness (most will use phones)
- [ ] Add basic analytics (track user actions)
- [ ] Create help/FAQ section
- [ ] Test on different devices and browsers
- [ ] Prepare launch materials (social media posts, etc.)

---

### **PHASE 5: LAUNCH (Week 13)**

**Soft Launch:**
- [ ] Launch to 100 students at UI first
- [ ] Monitor for issues daily
- [ ] Fix bugs quickly
- [ ] Collect feedback and testimonials

**Marketing (Alongside Development):**
- [ ] Create Instagram/Twitter accounts
- [ ] Share nutrition tips weekly (build audience before launch)
- [ ] Make simple explainer video
- [ ] Partner with student influencers
- [ ] Create referral system (invite friends)

---

## Web App Pages/Screens Needed

Let me think through this properly for a web app:

### **PUBLIC PAGES (Before Login)**

**1. Landing Page (Homepage)**
- Hero section: "Eat Better on a Student Budget" 
- Problem statement (Tolu's story)
- How it works (3 simple steps)
- Sample meal plan preview
- Testimonials (once you have them)
- Pricing (Free vs Premium)
- CTA: "Start Eating Better - Free" button
- Footer: About, Contact, Privacy Policy

**2. About Page**
- Mission (SDG 2 & 3 alignment)
- Team photos and bios
- Why we built this
- Contact information

**3. How It Works Page**
- Detailed explanation of the process
- Screenshots/mockups
- FAQ section

**4. Blog/Education Hub**
- List of educational articles
- Categories: Nutrition basics, Budget tips, Student life, Recipes
- Search function

**5. Pricing Page**
- Free vs Premium comparison
- What each tier includes
- Payment options (if premium)

---

### **AUTHENTICATION PAGES**

**6. Sign Up Page**
- Email/password registration
- Or Google/Facebook sign-in
- Link to privacy policy

**7. Login Page**
- Email/password
- Forgot password link
- "Don't have account? Sign up"

**8. Forgot Password Page**
- Reset password flow

---

### **ONBOARDING FLOW (After First Login)**

**9. Welcome Screen**
- "Welcome to Nutri-Tech! Let's personalize your nutrition"
- Start button

**10. Profile Setup (Multi-step Form)**

**Step 1: Basic Info**
- Age, gender, location
- University/campus
- Progress indicator (Step 1 of 5)

**Step 2: Health & Goals**
- Current health issues (checkboxes)
- Health goals (dropdown)
- Activity level

**Step 3: Diet Assessment**
- "What do you usually eat for breakfast?"
- "How often do you eat fruits/vegetables?"
- "Where do you get food?" (canteen/mama put/cook)

**Step 4: Budget & Constraints**
- Daily food budget
- Dietary restrictions/allergies
- Foods you hate/love
- How much time you have to prepare meals

**Step 5: Current Symptoms**
- Energy level
- Focus level
- Any health concerns
- Submit button

**11. Analyzing Screen**
- "Analyzing your nutrition needs..." (loading animation)
- AI generates plan in background
- Takes 10-30 seconds

**12. Results & First Meal Plan**
- "Here's what we found:"
- Show nutritional gaps (visual: protein bar 20% full vs should be 100%)
- "Here's your personalized 7-day meal plan"
- Preview of Week 1
- CTA: "Start My Journey" → goes to Dashboard

---

### **MAIN APP PAGES (After Onboarding)**

**13. Dashboard (Home Screen After Login)**

**Key sections:**
- **Welcome back message:** "Good morning, Tolu! 🌅"
- **Today's meals card:**
  - Breakfast: [Meal name] ₦250
  - Lunch: [Meal name] ₦400  
  - Dinner: [Meal name] ₦300
  - Each with "Mark as eaten" button
- **Quick energy check:** "How's your energy today?" (3 emoji buttons)
- **This week's progress:**
  - Meals tracked: 4/7
  - Days with high energy: 3
  - Protein goal: 80% achieved
- **Quick tips card:** Daily nutrition tip
- **Bottom navigation:** Home | Meal Plan | Track | Learn | Profile

**14. Meal Plan Page (Full Week View)**

**Features:**
- Tab navigation: Week 1 | Week 2 | Week 3 | Week 4
- Calendar view or list view toggle
- Each day expandable:
  - Monday ▼
    - Breakfast: [Meal details, nutrition, price]
    - Lunch: [Meal details, nutrition, price]
    - Dinner: [Meal details, nutrition, price]
    - Daily total: ₦950
- Each meal clickable → shows full details:
  - Ingredients
  - Where to buy
  - Nutritional breakdown
  - Why this meal
  - Alternatives (3 options)
- "Swap this meal" button
- "Regenerate this day" button (premium)
- Shopping list for the week button

**15. Meal Detail Page**
- Large food image (if available)
- Meal name + local name
- Full ingredient list with prices
- Step-by-step preparation (if applicable)
- Where to buy on campus (specific vendors)
- Nutritional facts table
- "Why this meal helps you" explanation
- Alternative meals (3 similar options)
- "Mark as eaten" button
- "Save to favorites" button

**16. Tracking Page**

**Tabs:**
- **Today** | **Week** | **Month**

**Today view:**
- Meals eaten today (checked off or not)
- Energy check-ins (morning/afternoon)
- Quick add: "Ate something else?"
- Water intake tracker (simple)
- Notes section: "How did you feel today?"

**Week view:**
- Calendar with color coding (green = good day, yellow = okay, red = missed tracking)
- Summary stats:
  - Meals tracked: 15/21
  - Average energy: 3.5/5
  - Most eaten meal category
  - Budget spent: ₦6,500 of ₦7,000

**Month view:**
- Progress graphs:
  - Energy levels over time (line chart)
  - Protein intake trend
  - Days feeling great vs tired
- Achievements: "15-day streak!" 
- Monthly summary

**17. Progress/Analytics Page** (Premium feature)
- Detailed nutrition charts
- Before/After comparison
- Symptom improvement tracking
- Cost analysis (money saved vs restaurant)
- Export report (PDF)

**18. Food Database/Browse Page**
- Search bar: "Search Nigerian foods..."
- Categories: All | Proteins | Carbs | Vegetables | Fruits | Snacks | Prepared Meals
- Filter by:
  - Budget (cheap, moderate, expensive)
  - Preparation (ready-to-buy, no-cook, requires cooking)
  - Nutrition goal (high protein, high iron, etc.)
- Food cards showing:
  - Name, photo
  - Price range
  - Key nutrients
  - "Add to meal" button

**19. Food Detail Page**
- Full nutritional information
- Price by location
- Where to buy
- Recipes using this food
- Similar alternatives
- "Add to favorites"

**20. Education/Learn Page**

**Layout:**
- Featured article (hero)
- Categories:
  - Nutrition 101
  - Budget Eating
  - Student Life Hacks
  - Local Foods Guide
  - Meal Prep
- Article cards (title, excerpt, read time, thumbnail)
- Search articles
- Popular articles sidebar

**21. Article/Content Page**
- Article title
- Read time + author (your nutritionist)
- Content with images
- Related articles at bottom
- Share buttons
- Comment section (optional, later)

**22. Profile/Settings Page**

**Sections:**

**Your Profile:**
- Edit profile photo
- Name, email
- University, location

**Health & Goals:**
- Current health goals
- Update dietary restrictions
- Modify preferences
- "Retake assessment" button

**Account Settings:**
- Change password
- Email preferences (notifications)
- Language (English/Pidgin - future)
- Privacy settings

**Subscription (if Premium):**
- Current plan: Free/Premium
- Upgrade to Premium button
- Billing history
- Cancel subscription

**Support:**
- FAQ
- Contact nutritionist (premium)
- Report a problem
- Send feedback

**App Info:**
- Terms of Service
- Privacy Policy  
- About Nutri-Tech
- Logout button

**23. Nutritionist Chat Page** (Premium Only)
- Chat interface
- Message nutritionist
- View past conversations
- "Book consultation" button (if you add scheduling later)
- Available hours indicator

**24. Upgrade to Premium Page**
- Benefits comparison table
- Testimonials from premium users
- Pricing: ₦2,500/month
- Payment options (Paystack integration for Naira)
- Money-back guarantee (if offering)
- CTA: "Upgrade Now"

**25. Payment/Checkout Page**
- Payment summary
- Enter payment details (Paystack handles this)
- Apply promo code
- Confirm purchase

**26. Success/Thank You Page**
- "Welcome to Premium!" 
- What's unlocked
- Next steps
- Return to dashboard

---

### **ADDITIONAL UTILITY PAGES**

**27. Search Results Page**
- Global search (meals, foods, articles)
- Filter results
- Sort options

**28. Favorites/Saved Page**
- Saved meals
- Favorite foods
- Bookmarked articles
- Shopping lists

**29. Notifications Page**
- App notifications list
- Mark as read
- Notification settings

**30. Help/Support Page**
- FAQ accordion
- Common issues
- Contact form
- Live chat (if budget allows)

**31. 404 Error Page**
- "Page not found"
- Friendly message
- Link back to home

**32. Loading/Offline Page**
- When generating meal plan
- When no internet connection
- Progressive web app (PWA) features

---

## Simplified MVP Page List (Start Here)

For your **FIRST VERSION**, you only need these 12 pages:

**Must Build First:**
1. Landing Page
2. Sign Up
3. Login  
4. Onboarding Flow (multi-step)
5. Dashboard (simplified)
6. Meal Plan Page
7. Meal Detail Page
8. Tracking Page (basic)
9. Education Hub (list of articles)
10. Article Page
11. Profile/Settings
12. Food Browse Page

**Add Later (Version 2):**
- Nutritionist chat
- Advanced analytics
- Premium features
- Payment integration
- Social features

---

## Development Priority Order

**Sprint 1 (Weeks 1-3):** Pages 1-3, 6 (Landing, Auth, Onboarding)
**Sprint 2 (Weeks 4-6):** Pages 5, 14, 15 (Dashboard, Meal Plan, Details)
**Sprint 3 (Weeks 7-9):** Pages 16, 20, 21 (Tracking, Education)
**Sprint 4 (Weeks 10-12):** Pages 12, 22 (Food Browse, Profile), Polish & Testing

---

You're right about being realistic - this plan assumes:
- Students buy ready-made food mostly
- No fancy cooking equipment
- Actual market prices (which YOU need to research)
- Simple tracking (not overcomplicated)
- Web app first (easier and cheaper than mobile app)

Want me to help you with any specific phase in more detail, or shall we start with the actual price research survey questions?