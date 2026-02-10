import InputField from '@/components/ui/input-field';
import SelectCard from '@/components/ui/select-card';

/**
 * Step 1: Basic Info (age, gender, height, weight, activity)
 */
export default function BasicInfoStep({ data, onChange }) {
  const genders = [
    { value: 'male', label: 'Male', icon: '♂️' },
    { value: 'female', label: 'Female', icon: '♀️' },
  ];

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
    { value: 'light', label: 'Light', description: '1-3 days/week' },
    { value: 'moderate', label: 'Moderate', description: '3-5 days/week' },
    { value: 'active', label: 'Active', description: '6-7 days/week' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Age"
          type="number"
          placeholder="20"
          value={data.basicInfo?.age || ''}
          onChange={(e) => onChange({ basicInfo: { ...data.basicInfo, age: e.target.value } })}
        />
        <InputField
          label="Weight (kg)"
          type="number"
          placeholder="70"
          value={data.basicInfo?.weight || ''}
          onChange={(e) => onChange({ basicInfo: { ...data.basicInfo, weight: e.target.value } })}
        />
      </div>

      <InputField
        label="Height (cm)"
        type="number"
        placeholder="170"
        value={data.basicInfo?.height || ''}
        onChange={(e) => onChange({ basicInfo: { ...data.basicInfo, height: e.target.value } })}
      />

      <div>
        <label className="block text-sm font-medium mb-3">Gender</label>
        <div className="grid grid-cols-2 gap-4">
          {genders.map((gender) => (
            <SelectCard
              key={gender.value}
              icon={gender.icon}
              label={gender.label}
              selected={data.basicInfo?.gender === gender.value}
              onClick={() => onChange({ basicInfo: { ...data.basicInfo, gender: gender.value } })}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Activity Level</label>
        <div className="space-y-2">
          {activityLevels.map((level) => (
            <SelectCard
              key={level.value}
              label={level.label}
              description={level.description}
              selected={data.basicInfo?.activityLevel === level.value}
              onClick={() =>
                onChange({ basicInfo: { ...data.basicInfo, activityLevel: level.value } })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
