import { useFormContext, Controller } from 'react-hook-form';
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
export default function DietAssessmentStep() {
  const { register, control } = useFormContext();

  const toggleAllergy = (current = [], allergy, onChange) => {
    const newAllergies = current.includes(allergy)
      ? current.filter((a) => a !== allergy)
      : [...current, allergy];
    onChange(newAllergies);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">Diet Type</label>
        <div className="flex flex-wrap gap-2">
            <Controller
                control={control}
                name="dietAssessment.dietType"
                render={({ field: { value, onChange } }) => (
                    <>
                    {dietTypes.map((type) => (
                        <Pill
                        key={type.value}
                        isSelected={value === type.value}
                        onClick={() => onChange(type.value)}
                        >
                            {type.label}
                        </Pill>
                    ))}
                    </>
                )}
            />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">
          Allergies or Foods to Avoid (Select all that apply)
        </label>
        <div className="flex flex-wrap gap-2">
            <Controller
                control={control}
                name="dietAssessment.allergies"
                render={({ field: { value, onChange } }) => (
                    <>
                    {commonAllergies.map((allergy) => (
                        <Pill
                        key={allergy}
                        isSelected={value?.includes(allergy)}
                        onClick={() => toggleAllergy(value, allergy, onChange)}
                        >
                            {allergy}
                        </Pill>
                    ))}
                    </>
                )}
            />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Favorite Nigerian Foods</label>
        <textarea
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tech-primary focus:bg-white/10 transition-all min-h-[80px]"
          placeholder="e.g., Jollof rice, Moin-moin, Eba and Egusi..."
          {...register('dietAssessment.favoriteFoods')}
        />
      </div>
    </div>
  );
}
