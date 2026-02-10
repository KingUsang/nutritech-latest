import Pill from '@/components/ui/pill';

const dietTypes = [
  { value: 'balanced', label: 'Balanced' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'halal', label: 'Halal' },
  { value: 'no-preference', label: 'No Preference' },
];

const commonAllergies = [
  'Peanuts',
  'Dairy',
  'Eggs',
  'Fish',
  'Shellfish',
  'Soy',
  'Wheat/Gluten',
  'None',
];

/**
 * Step 3: Diet preferences and allergies
 */
export default function DietAssessmentStep({ data, onChange }) {
  const toggleAllergy = (allergy) => {
    const current = data.dietAssessment?.allergies || [];
    const newAllergies = current.includes(allergy)
      ? current.filter((a) => a !== allergy)
      : [...current, allergy];
    onChange({ dietAssessment: { ...data.dietAssessment, allergies: newAllergies } });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">Diet Type</label>
        <div className="flex flex-wrap gap-2">
          {dietTypes.map((type) => (
            <Pill
              key={type.value}
              label={type.label}
              selected={data.dietAssessment?.dietType === type.value}
              onClick={() =>
                onChange({ dietAssessment: { ...data.dietAssessment, dietType: type.value } })
              }
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">
          Allergies or Foods to Avoid (Select all that apply)
        </label>
        <div className="flex flex-wrap gap-2">
          {commonAllergies.map((allergy) => (
            <Pill
              key={allergy}
              label={allergy}
              selected={data.dietAssessment?.allergies?.includes(allergy)}
              onClick={() => toggleAllergy(allergy)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Favorite Nigerian Foods</label>
        <textarea
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tech-primary focus:bg-white/10 transition-all min-h-[80px]"
          placeholder="e.g., Jollof rice, Moin-moin, Eba and Egusi..."
          value={data.dietAssessment?.favoriteFoods || ''}
          onChange={(e) =>
            onChange({ dietAssessment: { ...data.dietAssessment, favoriteFoods: e.target.value } })
          }
        />
      </div>
    </div>
  );
}
