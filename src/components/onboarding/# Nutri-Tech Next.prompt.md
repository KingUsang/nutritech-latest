# Nutri-Tech Next.js 14 Migration Plan

## Project Overview
Migrate 9 HTML pages + vanilla JS to Next.js 14 with TypeScript, Tailwind CSS, Firebase (Firestore), and Groq AI integration. 
- **No payment integration** (defer to Phase 2)
- **Components must be ≤100 lines** (break into smaller files)
- **Best-in-class file organization** for readability
- **Groq API** for free AI (meal plans, chat)
- **Comments throughout** for maintainability

---

## File Organization Structure

```
nutritech-nextjs/
├── public/
│   ├── icons/
│   └── images/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.jsx                    # Landing page
│   │   │   ├── auth/
│   │   │   │   ├── sign-in/page.jsx
│   │   │   │   ├── sign-up/page.jsx
│   │   │   │   ├── forgot-password/page.jsx
│   │   │   │   └── layout.jsx              # Auth pages wrapper
│   │   │   ├── about/page.jsx
│   │   │   ├── how-it-works/page.jsx
│   │   │   └── layout.jsx                  # Public pages wrapper
│   │   │
│   │   ├── (authenticated)/
│   │   │   ├── layout.jsx                  # Requires auth + bottom nav
│   │   │   ├── dashboard/
│   │   │   │   └── page.jsx
│   │   │   ├── meal-plan/
│   │   │   │   ├── page.jsx
│   │   │   │   └── [id]/page.jsx           # Meal detail
│   │   │   ├── tracking/
│   │   │   │   └── page.jsx
│   │   │   ├── learn/
│   │   │   │   ├── page.jsx
│   │   │   │   └── [slug]/page.jsx         # Article detail
│   │   │   ├── foods/
│   │   │   │   ├── page.jsx
│   │   │   │   └── [id]/page.jsx
│   │   │   ├── profile/
│   │   │   │   └── page.jsx
│   │   │   └── onboarding/
│   │   │       └── page.jsx
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── register/route.js
│   │   │   │   ├── login/route.js
│   │   │   │   └── logout/route.js
│   │   │   ├── meal-plans/
│   │   │   │   ├── generate/route.js       # Groq API call
│   │   │   │   └── get/route.js
│   │   │   ├── foods/
│   │   │   │   └── search/route.js
│   │   │   ├── tracking/
│   │   │   │   └── log/route.js
│   │   │   └── chat/
│   │   │       └── route.js                # Groq chat API
│   │   │
│   │   └── layout.jsx                      # Root layout
│   │
│   ├── components/
│   │   ├── ui/                             # Reusable UI components
│   │   │   ├── glass-card.jsx
│   │   │   ├── glass-button.jsx
│   │   │   ├── meal-card.jsx
│   │   │   ├── select-card.jsx
│   │   │   ├── pill.jsx
│   │   │   ├── progress-bar.jsx
│   │   │   ├── modal.jsx
│   │   │   ├── input-field.jsx
│   │   │   ├── toggle-switch.jsx
│   │   │   └── loading-spinner.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── top-bar.jsx
│   │   │   ├── bottom-nav.jsx
│   │   │   ├── auth-header.jsx
│   │   │   └── sidebar.jsx                 # Future
│   │   │
│   │   ├── dashboard/
│   │   │   ├── daily-tip-card.jsx
│   │   │   ├── wallet-widget.jsx
│   │   │   ├── vibe-check.jsx
│   │   │   ├── meal-card-dashboard.jsx
│   │   │   ├── swap-overlay.jsx
│   │   │   ├── ai-chat-widget.jsx
│   │   │   └── battery-indicator.jsx
│   │   │
│   │   ├── meal-plan/
│   │   │   ├── day-accordion.jsx
│   │   │   ├── shopping-list-banner.jsx
│   │   │   ├── meal-detail-modal.jsx
│   │   │   └── week-tabs.jsx
│   │   │
│   │   ├── onboarding/
│   │   │   ├── step-container.jsx
│   │   │   ├── step-indicator.jsx
│   │   │   ├── form-step-1.jsx             # Basic info
│   │   │   ├── form-step-2.jsx             # Health & goals
│   │   │   ├── form-step-3.jsx             # Diet assessment
│   │   │   ├── form-step-4.jsx             # Budget & constraints
│   │   │   ├── form-step-5.jsx             # Symptoms
│   │   │   └── loading-animation.jsx
│   │   │
│   │   ├── learn/
│   │   │   ├── featured-article.jsx
│   │   │   ├── category-pills.jsx
│   │   │   ├── article-card.jsx
│   │   │   └── search-bar.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── login-form.jsx
│   │   │   ├── signup-form.jsx
│   │   │   ├── google-button.jsx
│   │   │   └── auth-tabs.jsx
│   │   │
│   │   └── home/
│   │       ├── hero.jsx
│   │       ├── problem-section.jsx
│   │       ├── how-it-works.jsx
│   │       ├── meal-plans-section.jsx
│   │       ├── testimonials-carousel.jsx
│   │       └── cta-section.jsx
│   │
│   ├── hooks/
│   │   ├── use-auth.js                     # Auth state + login/signup
│   │   ├── use-firebase.js                 # Firebase helpers
│   │   ├── use-form-step.js                # Onboarding form state
│   │   ├── use-meal-plan.js                # Fetch + manage meal plans
│   │   ├── use-tracking.js                 # Meal tracking
│   │   └── use-groq.js                     # Groq API calls
│   │
│   ├── lib/
│   │   ├── firebase.js                     # Firebase config & init
│   │   ├── groq.js                         # Groq API client
│   │   ├── auth-helpers.js                 # Auth utility functions
│   │   ├── constants.js                    # App constants (colors, etc)
│   │   ├── food-database.js                # Food data (mock or fetch)
│   │   └── validators.js                   # Form validation
│   │
│   ├── context/
│   │   ├── auth-context.jsx                # Global auth state
│   │   ├── onboarding-context.jsx          # Onboarding form state
│   │   ├── theme-context.jsx               # Dark mode toggle (future)
│   │   └── app-provider.jsx                # Combines all contexts
│   │
│   ├── styles/
│   │   ├── globals.css                     # Global styles + Tailwind
│   │   └── animations.css                  # Custom animations (float, pulse-slow, etc)
│   │
│   └── middleware.js                       # Auth middleware for protected routes
│
├── .env.local                              # Firebase keys, Groq API key
├── tailwind.config.js                      # Tailwind config with custom theme
├── jsconfig.json                           # JavaScript path aliases
├── next.config.js                          # Next.js config
├── package.json                            # Dependencies
└── README.md                               # Setup instructions
```

---

## Dependencies to Install

```bash
npm install next@latest react@latest react-dom@latest
npm install -D tailwindcss postcss autoprefixer
npm install firebase
npm install groq-sdk
npm install framer-motion                  # For animations
npm install react-hook-form                # Form handling
npm install next-auth                      # Auth (optional, or use custom Firebase)
```

---

## Key Implementation Details

### 1. File Organization Principles

- **UI Components** (`/components/ui/`): Dumb, reusable (GlassCard, Button, Input)
- **Feature Components** (`/components/{feature}/`): Smart, feature-specific (MealCard, Dashboard widgets)
- **Hooks** (`/hooks/`): Custom logic, state, API calls
- **Lib** (`/lib/`): Pure utilities (no React dependencies)
- **Context** (`/context/`): Global state management
- **Routes** (`/app/`): Page-level components

**Benefit:** Easy to find, modify, and test. No circular dependencies.

### 2. Component Size Rule (≤100 lines)

**Good:**
```javascript
// GlassButton.jsx (35 lines)
export function GlassButton({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="bg-tech-primary text-navy-900 px-6 py-3 rounded-xl"
    >
      {children}
    </button>
  );
}
```

**Bad:**
```javascript
// GlassButton.jsx (250 lines) - Too much logic
export function GlassButton({ ... }) {
  // 200 lines of logic...
}
```

**Solution:** Extract complex logic into hooks.

### 3. Groq Instead of Claude

**Why Groq?**
- Free tier: 30 requests/day, unlimited tokens within rate limit
- Faster than Claude
- Perfect for MVP
- Later: Upgrade to paid tier (~$0.02 per 1M tokens)

**Integration:**
```javascript
// lib/groq.js
import { Groq } from 'groq-sdk';

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Usage in API route (app/api/meal-plans/generate/route.js)
export async function POST(req) {
  const { userProfile } = await req.json();
  
  try {
    const response = await groq.chat.completions.create({
      messages: [{
        role: 'user',
        content: `Generate meal plan for: ${JSON.stringify(userProfile)}`
      }],
      model: 'mixtral-8x7b-32768'  // Free tier model
    });
    
    return Response.json(response);
  } catch (error) {
    console.error('Groq error:', error);
    return Response.json({ error: 'Failed to generate meal plan' }, { status: 500 });
  }
}
```

### 4. Firestore Schema

```typescript
// Firestore collections:
users/
  {uid}/
    - email: string
    - name: string
    - university: string
    - age: number
    - gender: string
    - budget: number
    - goals: string[]
    - createdAt: timestamp

mealPlans/
  {planId}/
    - userId: string
    - week: number
    - meals: {
        monday: { breakfast, lunch, dinner },
        tuesday: { ... }
      }
    - createdAt: timestamp

tracking/
  {userId}/meals/
    {mealId}/
      - mealName: string
      - eaten: boolean
      - eatenAt: timestamp
      - energyLevel: number (1-5)
```

### 5. Comments Strategy

**Add comments for:**
- Why (not what): explain intent
- Complex logic: algorithm explanation
- API calls: what data is expected
- Component props: JSDoc for defaults
- Async operations: loading states

**Example:**
```javascript
// Hook: useAuth
// Why: Firestore listener causes memory leak if not cleaned up
useEffect(() => {
  const unsubscribe = onSnapshot(userRef, (doc) => {
    setUser(doc.data());
  });
  
  // Cleanup: removes listener when component unmounts
  return () => unsubscribe();
}, [userId]);
```

**JSDoc for props:**
```javascript
/**
 * GlassButton - Reusable button with glassmorphism style
 * @param {string} children - Button text or content
 * @param {function} onClick - Click handler
 * @param {string} [variant='primary'] - Button variant (primary, secondary, danger)
 * @param {boolean} [loading=false] - Show loading spinner
 */
export function GlassButton({ children, onClick, variant = 'primary', loading = false }) {
  // Component code...
}
```

---

## Migration Phase Breakdown

### Phase 1: Setup (Day 1-2)
- [ ] Create Next.js 14 project
- [ ] Install dependencies
- [ ] Configure Tailwind with custom theme
- [ ] Set up Firebase (Firestore, Auth)
- [ ] Create .env.local with API keys
- [ ] Test basic page routing

### Phase 2: Core Infrastructure (Day 3-5)
- [ ] Create reusable UI components
- [ ] Set up Auth context + useAuth hook
- [ ] Create Firebase utility functions
- [ ] Set up Groq client
- [ ] Create middleware for protected routes
- [ ] Build layout components (TopBar, BottomNav)

### Phase 3: Pages & Features (Day 6-15)
- [ ] Landing page (hero, problems, how-it-works)
- [ ] Auth pages (login, signup)
- [ ] Onboarding flow (5 steps)
- [ ] Dashboard (meals, vibe check, chat)
- [ ] Meal plan page (weekly view + detail modal)
- [ ] Tracking page (daily check-ins)
- [ ] Learn hub (articles, education)
- [ ] Profile/settings

### Phase 4: AI Integration (Day 16-18)
- [ ] Groq meal plan generation
- [ ] AI chat widget
- [ ] Vibe check analysis
- [ ] Meal swap suggestions

### Phase 5: Testing & Polish (Day 19-20)
- [ ] Test on mobile
- [ ] Fix layout issues
- [ ] Error handling
- [ ] Loading states
- [ ] Performance optimization

---

## Environment Variables (.env.local)

```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx

# Groq
GROQ_API_KEY=xxx

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Best Practices Implemented

1. **No Type System**: Plain JavaScript - faster to write, easier to modify
2. **Component Composition**: Small, focused components
3. **Custom Hooks**: Logic extracted from components
4. **Context API**: Global state (auth, onboarding)
5. **API Routes**: Backend logic in `/app/api`
6. **Error Handling**: Try-catch, user feedback
7. **Loading States**: Spinners, skeletons
8. **Mobile First**: Responsive design
9. **Comments**: Why + What, not implementation details
10. **Env Separation**: Public/private keys managed properly

---

## Common Patterns in This Project

### Pattern 1: Protected Routes
```typescript
// middleware.ts checks if user is authenticated before accessing /dashboard
// Public routes: /, /auth/*, /about, /learn
// Protected routes: /dashboard, /meal-plan, /tracking, /profile
```

### Pattern 2: Form States with Custom Hooks
```typescript
// useFormStep(totalSteps, onSubmit)
// Manages current step, validation, navigation
```

### Pattern 3: API Integration
```typescript
// hooks/use-groq.ts calls API routes
// API routes (/app/api/*) call Groq
// Components call hooks, never directly call Groq
```

### Pattern 4: Firebase Real-time Listeners
```typescript
// Firestore listeners update state automatically
// Cleanup with unsubscribe in useEffect return
```

---

## Next Steps

1. **Day 1**: Run `create_file` for each core file (firebase.ts, auth-context.tsx, etc.)
2. **Day 2-3**: Build UI components
3. **Day 4-5**: Create page layouts
4. **Day 6+**: Implement interactivity
5. **During**: Test constantly

Ready to start creating files?
