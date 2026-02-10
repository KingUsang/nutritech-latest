import { useState } from 'react';

/**
 * Hook for managing multi-step form navigation
 * @param {number} totalSteps - Total number of steps in the form
 * @param {number} initialStep - Starting step (default: 1)
 * @returns {Object} Form step state and controls
 */
export function useFormStep(totalSteps, initialStep = 1) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState([]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const resetSteps = () => {
    setCurrentStep(initialStep);
    setCompletedSteps([]);
  };

  const markStepComplete = (step) => {
    setCompletedSteps(prev => [...new Set([...prev, step])]);
  };

  const isStepComplete = (step) => {
    return completedSteps.includes(step);
  };

  const progress = (currentStep / totalSteps) * 100;

  return {
    currentStep,
    completedSteps,
    progress,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === totalSteps,
    nextStep,
    prevStep,
    goToStep,
    resetSteps,
    markStepComplete,
    isStepComplete,
  };
}
