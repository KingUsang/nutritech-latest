'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useOnboarding } from '@/context/onboarding-context';
import { useFormStep } from '@/hooks/use-form-step';
import ProgressBar from '@/components/ui/progress-bar';
import GlassButton from '@/components/ui/glass-button';
import BasicInfoStep from '@/components/onboarding/basic-info-step';
import HealthGoalsStep from '@/components/onboarding/health-goals-step';
import DietAssessmentStep from '@/components/onboarding/diet-assessment-step';
import BudgetConstraintsStep from '@/components/onboarding/budget-constraints-step';
import SymptomsStep from '@/components/onboarding/symptoms-step';

/**
 * Onboarding page with 5-step form
 */
export default function OnboardingPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { formData, updateFormData, progress } = useOnboarding();
  const { currentStep, nextStep, prevStep, isFirstStep, isLastStep } = useFormStep(5);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return null;
  }

  const steps = [
    { component: BasicInfoStep, title: 'Basic Info' },
    { component: HealthGoalsStep, title: 'Health & Goals' },
    { component: DietAssessmentStep, title: 'Diet Assessment' },
    { component: BudgetConstraintsStep, title: 'Budget & Constraints' },
    { component: SymptomsStep, title: 'Symptoms & Submit' },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  const handleNext = () => {
    nextStep();
  };

  const handleBack = () => {
    prevStep();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-tech-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Nutri-Tech! 🎉</h1>
          <p className="text-gray-400">Let's personalize your nutrition plan</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Step {currentStep}/5</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <ProgressBar progress={progress} />
        </div>

        {/* Form Card */}
        <div className="glass rounded-3xl p-8 mb-6">
          <h2 className="text-xl font-bold mb-6">{steps[currentStep - 1].title}</h2>
          <CurrentStepComponent data={formData} onChange={updateFormData} />
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          {!isFirstStep && (
            <GlassButton variant="secondary" onClick={handleBack} className="flex-1">
              Back
            </GlassButton>
          )}
          <GlassButton variant="primary" onClick={handleNext} fullWidth={isFirstStep}>
            {isLastStep ? 'Generate My Plan' : 'Continue'}
          </GlassButton>
        </div>
      </div>
    </div>
  );
}
