/**
 * Onboarding Context Provider
 * Manages multi-step onboarding form state
 */

'use client';

import { createContext, useContext, useState } from 'react';
import { ONBOARDING_STEPS } from '@/lib/constants';

// Create context
const OnboardingContext = createContext({});

/**
 * Onboarding Provider Component
 */
export function OnboardingProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    basicInfo: {
      age: '',
      gender: '',
      weight: '',
      height: '',
      activityLevel: '', 
    },
    
    // Step 2: Health & Goals
    healthGoals: {
      goals: [],
    },
    
    // Step 3: Diet Assessment
    dietAssessment: {
      dietType: '',
      allergies: [],
    },
    
    // Step 4: Budget & Constraints
    budgetConstraints: {
      dailyBudget: 1000,
      mealPrep: 'both',
    },
    
    // Step 5: Symptoms
    symptoms: {
      list: [],
    },
  });

  /**
   * Update form data for specific field
   */
  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Update multiple fields at once
   */
  const updateMultipleFields = (fields) => {
    setFormData((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  /**
   * Go to next step
   */
  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.TOTAL) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  /**
   * Go to previous step
   */
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  /**
   * Reset onboarding state
   */
  const resetOnboarding = () => {
    setCurrentStep(1);
    setFormData({
        basicInfo: {},
        healthGoals: { goals: [] },
        dietAssessment: { allergies: [] },
        budgetConstraints: {},
        symptoms: { list: [] }
    });
  };

  const value = {
    currentStep,
    formData,
    updateFormData,
    updateMultipleFields,
    nextStep,
    prevStep,
    resetOnboarding,
    totalSteps: ONBOARDING_STEPS.TOTAL,
    progress: ((currentStep - 1) / ONBOARDING_STEPS.TOTAL) * 100,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

/**
 * Hook to use onboarding context
 */
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}
