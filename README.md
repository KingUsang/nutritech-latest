# Nutri-Tech Next.js

This is the Next.js version of the Nutri-Tech application - an AI-powered nutrition platform for Nigerian students.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

- `app/` - Next.js App Router pages and layouts
  - `page.tsx` - Landing page
  - `auth/` - Authentication pages
  - `dashboard/` - Main dashboard
  - `onboarding/` - User onboarding flow
  - `meal-plan/` - Weekly meal plans
  - `profile/` - User profile
  - `tracking/` - Nutrition tracking
  - `learn/` - Educational content
- `app/globals.css` - Global styles and Tailwind directives
- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.js` - Next.js configuration

## Features

- 🏠 **Landing Page**: Marketing page with hero section, features, testimonials
- 🔐 **Authentication**: Login/Signup with email or Google (mock implementation)
- 📊 **Dashboard**: Daily meal tracking with budget monitoring
- 🍽️ **Meal Plans**: Personalized meal recommendations
- 📈 **Tracking**: Nutrition and progress tracking
- 📚 **Learn**: Educational resources about nutrition

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Outfit)

## Original HTML Files

The original HTML files have been converted to Next.js pages with React components. They are preserved in the repository for reference but are not used in the Next.js application.

## Development Notes

- Uses client-side components (`'use client'`) for interactive features
- Custom Tailwind theme with brand colors (tech-primary, navy, etc.)
- Responsive design optimized for mobile-first
- Glass morphism UI effects throughout

## Future Enhancements

- Integrate Firebase Authentication
- Add Gemini AI API integration for meal recommendations
- Implement database for meal plans and user data
- Add real-time nutrition tracking
- Progressive Web App (PWA) support
