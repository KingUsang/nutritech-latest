'use client';

import { useFormContext, useWatch, useController } from 'react-hook-form';
import Pill from '@/components/ui/pill';

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
 * Step 5: Symptoms — uses react-hook-form context like all other steps
 */
export default function SymptomsStep() {
  const { register, control } = useFormContext();

  const { field } = useController({
    name: 'symptoms.list',
    control,
    defaultValue: [],
  });

  const toggleSymptom = (symptom) => {
    const current = field.value || [];
    const next = current.includes(symptom)
      ? current.filter((s) => s !== symptom)
      : [...current, symptom];
    field.onChange(next);
  };

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
              isSelected={(field.value || []).includes(symptom)}
              onClick={() => toggleSymptom(symptom)}
            >
              {symptom}
            </Pill>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
        <textarea
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tech-primary focus:bg-white/10 transition-all min-h-[100px]"
          placeholder="Any other information about your health, schedule, or preferences..."
          {...register('symptoms.notes')}
        />
      </div>

      <div className="bg-tech-primary/10 border border-tech-primary/20 rounded-xl p-4">
        <p className="text-sm text-gray-300">
          🎉 You're all set! Click "Generate My Plan" to create your personalized 7-day meal plan
          tailored to your budget, health goals, and Nigerian food preferences.
        </p>
      </div>
    </div>
  );
}
