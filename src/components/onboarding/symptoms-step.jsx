'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Pill from '@/components/ui/pill';
import { useMealPlan } from '@/hooks/use-meal-plan';
import LoadingSpinner from '@/components/ui/loading-spinner';

const commonSymptoms = [
  'Always Tired',
  'Brain Fog',
  'Frequent Headaches',
  'Poor Concentration',
  'Getting Sick Often',
  'Sleep Issues',
  'Mood Swings',
  'None',
];

/**
 * Step 5: Symptoms and generate plan
 */
export default function SymptomsStep({ data, onChange }) {
  const router = useRouter();
  const { createMealPlan, generating } = useMealPlan();
  const [error, setError] = useState('');

  const toggleSymptom = (symptom) => {
    const current = data.symptoms?.list || [];
    const newSymptoms = current.includes(symptom)
      ? current.filter((s) => s !== symptom)
      : [...current, symptom];
    onChange({ symptoms: { ...data.symptoms, list: newSymptoms } });
  };

  const handleSubmit = async () => {
    setError('');
    try {
      await createMealPlan(data);
      router.push('/meal-plan');
    } catch (err) {
      setError(err.message || 'Failed to generate meal plan');
    }
  };

  if (generating) {
    return (
      <div className="py-12 flex flex-col items-center">
        <LoadingSpinner size="lg" />
        <p className="mt-6 text-tech-primary font-medium">Generating your personalized meal plan...</p>
        <p className="mt-2 text-sm text-gray-400">This may take 10-15 seconds</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">
          Any symptoms you're experiencing? (Select all that apply)
        </label>
        <div className="flex flex-wrap gap-2">
          {commonSymptoms.map((symptom) => (
            <Pill
              key={symptom}
              label={symptom}
              selected={data.symptoms?.list?.includes(symptom)}
              onClick={() => toggleSymptom(symptom)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
        <textarea
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tech-primary focus:bg-white/10 transition-all min-h-[100px]"
          placeholder="Any other information about your health, schedule, or preferences..."
          value={data.symptoms?.notes || ''}
          onChange={(e) =>
            onChange({ symptoms: { ...data.symptoms, notes: e.target.value } })
          }
        />
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="bg-tech-primary/10 border border-tech-primary/20 rounded-xl p-4">
        <p className="text-sm text-gray-300">
          🎉 You're all set! Click "Generate My Plan" to create your personalized 7-day meal plan
          tailored to your budget, health goals, and Nigerian food preferences.
        </p>
      </div>
    </div>
  );
}
