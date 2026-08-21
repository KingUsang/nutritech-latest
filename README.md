# NutriTech

> An AI-powered nutrition platform that turns nutritional baselines into practical, affordable meal plans for Nigerian university students.

**Live demo:** [nutritech-latest.vercel.app](https://nutritech-latest.vercel.app)

## Why NutriTech

Generic meal planners often overlook the constraints that shape student life in Nigeria: tight daily budgets, campus-market availability, one-pot cooking, limited refrigeration, and busy class schedules. NutriTech is designed around those constraints.

The core meal-plan flow combines a nutritional baseline from Spoonacular with a constrained Gemini prompt. It then generates a seven-day plan using locally available ingredients, estimated naira prices, cooking instructions, a consolidated shopping list, and a practical student survival tip.

## What it includes

- Personalised onboarding covering health goals, symptoms, dietary needs, budget, cooking equipment, and typical meals.
- A seven-day meal-plan generator tailored to Nigerian campus life.
- Symptom-aware meal guidance for concerns such as low energy and poor focus.
- Budget-aware shopping lists and meal estimates.
- Meal-plan, tracking, profile, dashboard, and learning views.
- Supabase client integration for authentication and persisted application data.

## How the AI flow works

1. The user completes their nutrition, budget, and cooking-context profile.
2. The server fetches a weekly nutrition blueprint from Spoonacular.
3. Gemini receives that baseline plus constraints for affordable, locally available Nigerian meals.
4. The app returns structured JSON for the weekly plan, meals, shopping list, cost estimates, and guidance.

The prompt deliberately constrains outputs around realistic student conditions, including a one-pot setup, no-fridge scenarios, local ingredients, time limits, and budget fit.

## Tech stack

- Next.js 14 and React
- JavaScript with the Next.js App Router
- Tailwind CSS and Framer Motion
- Google Gemini via `@google/genai`
- Spoonacular API
- Supabase
- React Hook Form

## Run locally

### Prerequisites

- Node.js 18 or newer
- A Supabase project
- A Google Gemini API key available to the server runtime
- A Spoonacular API key

### Installation

```bash
git clone https://github.com/KingUsang/nutritech-latest.git
cd nutritech-latest
npm install
```

Create a `.env.local` file with your own credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SPOONACULAR_API_KEY=your_spoonacular_key
GOOGLE_API_KEY=your_google_ai_key
```

Start the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Project structure

```text
src/
├── app/                    # App Router pages and API routes
│   ├── (authenticated)/    # Dashboard, meal plan, tracking, profile
│   └── api/meal-plans/     # Server-side meal-plan generation
├── components/             # Landing, onboarding, auth, and UI components
├── context/                # Authentication and onboarding state
├── hooks/                  # Meal-plan, tracking, and form hooks
└── lib/                    # AI, Supabase, validation, and shared utilities
```

## Notes for reviewers

This project is intentionally opinionated about localisation: the value is not only calling an LLM, but translating nutrition guidance into meals a Nigerian student can afford, source locally, and cook in a hostel.

## Security

Never commit API keys or Supabase credentials. Keep them in local or deployment environment variables, rotate any credential that has been exposed, and use a restricted key for each environment.
