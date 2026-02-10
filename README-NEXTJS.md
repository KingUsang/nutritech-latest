# Nutri-Tech - Next.js Migration

Smart nutrition platform for Nigerian students. AI-powered meal planning with Groq, built on Next.js 14 with Firebase.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Auth**: Firebase Authentication
- **AI**: Groq SDK (Mixtral model)
- **Animations**: Framer Motion

## 📦 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase project setup
- Groq API key (free tier available)

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
cd nutritech-gemini
npm install
```

### 2. Environment Variables

Create `.env.local` in the root directory:

```bash
cp .env.local.example .env.local
```

Fill in your credentials:
- **Firebase**: Get from Firebase Console → Project Settings
- **Groq API**: Get from https://console.groq.com

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project or use existing
3. Enable **Authentication** (Email/Password + Google)
4. Create **Firestore Database** (start in test mode)
5. Copy config to `.env.local`

### 4. Groq API Setup

1. Sign up at [Groq Console](https://console.groq.com)
2. Create API key
3. Add to `.env.local` as `GROQ_API_KEY`

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components (nav, header)
│   ├── dashboard/      # Dashboard-specific components
│   ├── auth/           # Auth forms
│   └── ...
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── styles/             # Global styles
```

## 🎨 Key Components

### UI Components (≤100 lines each)
- `GlassCard` - Glassmorphism card
- `GlassButton` - Multi-variant button
- `InputField` - Form input with validation
- `SelectCard` - Clickable selection card
- `Pill` - Toggle pill/tag
- `Modal` - Full-screen modal
- `ProgressBar` - Step progress indicator
- `LoadingSpinner` - Loading states
- `ToggleSwitch` - iOS-style toggle

### Layout Components
- `TopBar` - Fixed header with battery indicator
- `BottomNav` - Bottom navigation bar

## 🔥 Features

- ✅ Firebase authentication (email/password + Google)
- ✅ Multi-step onboarding flow
- ✅ AI meal plan generation (Groq)
- ✅ Daily meal tracking
- ✅ Budget management
- ✅ Educational content
- ✅ User profiles
- ✅ Responsive design (mobile-first)

## 📚 Development Guidelines

### Component Rules
1. Keep components **≤100 lines**
2. Extract logic into **custom hooks**
3. Use **JSDoc comments** for props
4. Follow naming: `ComponentName.jsx`

### Code Style
```javascript
/**
 * Component description
 * @param {string} prop - Prop description
 */
export function MyComponent({ prop }) {
  // Component code...
}
```

### File Organization
- **UI Components**: Generic, reusable
- **Feature Components**: Feature-specific logic
- **Hooks**: Stateful logic extraction
- **Lib**: Pure utility functions

## 🚧 Current Status

- [x] Core infrastructure
- [x] Authentication system
- [x] Context providers
- [x] UI component library
- [ ] Page conversions (in progress)
- [ ] API routes
- [ ] Groq integration testing

## 📝 Next Steps

1. Convert HTML pages to Next.js pages
2. Implement API routes for Groq
3. Connect Firestore collections
4. Add loading states
5. Test authentication flow
6. Deploy to Vercel

## 🤝 Contributing

This is a personal project. For questions, open an issue.

## 📄 License

Private - All rights reserved

---

Built with ❤️ for Nigerian students
