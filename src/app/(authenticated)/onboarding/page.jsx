'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { useAuth } from '@/context/auth-context';
import { useOnboarding } from '@/context/onboarding-context';
import { useMealPlan } from '@/hooks/use-meal-plan';
import ProgressBar from '@/components/ui/progress-bar';
import GlassButton from '@/components/ui/glass-button';
import LoadingSpinner from '@/components/ui/loading-spinner';
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
  const { formData, updateMultipleFields, progress, nextStep, prevStep, currentStep } = useOnboarding();
  const { createMealPlan, generating } = useMealPlan();
  const [generationError, setGenerationError] = useState('');
  
  const methods = useForm({
    defaultValues: formData,
    mode: 'onChange'
  });

  const { trigger, getValues } = methods;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    }
  }, [user, authLoading, router]);

  // Sync form with context when mounting (or if context updates from elsewhere)
  // Note: loops if not careful, but defaultValues handles initial mount.
  // We'll rely on updateMultipleFields on step change.

  if (authLoading || !user) {
    return null;
  }

  if (generating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-tech-900 py-8 px-4 flex flex-col items-center justify-center text-center">
        <LoadingSpinner size="lg" />
        <h2 className="mt-6 text-2xl font-bold text-white">Generating Your Personalized Plan...</h2>
        <p className="mt-2 text-gray-400 max-w-md">
          We're analyzing your profile, preferences, and budget to create the perfect meal plan for you.
          This usually takes about 10-15 seconds.
        </p>
      </div>
    );
  }

  const steps = [
    { component: BasicInfoStep, title: 'Basic Info', fields: ['basicInfo.age', 'basicInfo.gender', 'basicInfo.weight', 'basicInfo.height'] },
    { component: HealthGoalsStep, title: 'Health & Goals', fields: ['healthGoals.goals'] },
    { component: DietAssessmentStep, title: 'Diet Assessment', fields: [] }, // Optional usually?
    { component: BudgetConstraintsStep, title: 'Budget & Constraints', fields: ['budgetConstraints.dailyBudget'] },
    { component: SymptomsStep, title: 'Symptoms & Submit', fields: [] },
  ];

  const currentStepInfo = steps[currentStep - 1];
  const CurrentStepComponent = currentStepInfo.component;
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === steps.length;

  const handleNext = async () => {
    const fieldsToValidate = currentStepInfo.fields || [];
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
        // Save current form state to context before moving
        updateMultipleFields(getValues());
        nextStep();
    }
  };

  const handleBack = () => {
    // Save state even when going back
    updateMultipleFields(getValues());
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
          <h2 className="text-xl font-bold mb-6">{currentStepInfo.title}</h2>
          <FormProvider {...methods}>
            <CurrentStepComponent />
          </FormProvider>
        </div>

        {generationError && (
            <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {generationError}
            </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          {!isFirstStep && (
            <GlassButton variant="secondary" onClick={handleBack} className="flex-1">
              Back
            </GlassButton>
          )}
          {!isLastStep ? (
             <GlassButton variant="primary" onClick={handleNext} fullWidth={isFirstStep}>
                Continue
             </GlassButton>
          ) : (
            <GlassButton variant="primary" onClick={async () => {
                const isValid = await trigger();
                if (isValid) {
                    setGenerationError('');
                    const data = getValues();
                    updateMultipleFields(data);
                    try {
                        await createMealPlan(data);
                        router.push('/meal-plan');
                    } catch (err) {
                        setGenerationError(err.message || 'Failed to generate plan. Please try again.');
                    }
                }
            }}>
                Generate My Plan
            </GlassButton>
          )}
        </div>
      </div>
    </div>
  );
}
