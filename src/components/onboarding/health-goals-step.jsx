import Pill from '@/components/ui/pill';
import { HEALTH_GOALS } from '@/lib/constants';

/**
 * Step 2: Health goals (multiple selection)
 */
export default function HealthGoalsStep({ data, onChange }) {
  const goals = HEALTH_GOALS;

  const toggleGoal = (goalValue) => {
    const currentGoals = data.healthGoals?.goals || [];
    const newGoals = currentGoals.includes(goalValue)
      ? currentGoals.filter((g) => g !== goalValue)
      : [...currentGoals, goalValue];
    onChange({ healthGoals: { ...data.healthGoals, goals: newGoals } });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">
          What are your health goals? (Select all that apply)
        </label>
        <div className="flex flex-wrap gap-2">
          {goals.map((goal) => (
            <Pill
              key={goal.value}
              label={goal.label}
              selected={data.healthGoals?.goals?.includes(goal.value)}
              onClick={() => toggleGoal(goal.value)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Any health conditions we should know about?
        </label>
        <textarea
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tech-primary focus:bg-white/10 transition-all min-h-[100px]"
          placeholder="e.g., Diabetes, allergies, etc."
          value={data.healthGoals?.healthConditions || ''}
          onChange={(e) =>
            onChange({ healthGoals: { ...data.healthGoals, healthConditions: e.target.value } })
          }
        />
      </div>
    </div>
  );
}
