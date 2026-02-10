import LandingNav from '@/components/landing/landing-nav';
import LandingFooter from '@/components/landing/landing-footer';
import HeroSection from '@/components/landing/hero-section';
import ProblemSection from '@/components/landing/problem-section';
import HowItWorksSection from '@/components/landing/how-it-works';
import MealPlansSection from '@/components/landing/meal-plans-section';
import TestimonialsSection from '@/components/landing/testimonials-section';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tech-primary/5 rounded-full blur-[100px] animate-pulse-slow"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <LandingNav />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <MealPlansSection />
      <TestimonialsSection />
      <LandingFooter />
    </div>
  );
}
