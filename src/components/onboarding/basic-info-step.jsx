import { useFormContext, Controller } from 'react-hook-form';
import InputField from '@/components/ui/input-field';
import SelectCard from '@/components/ui/select-card';

/**
 * Step 1: Basic Info (age, gender, height, weight, activity)
 */
export default function BasicInfoStep() {
  const { register, control, formState: { errors } } = useFormContext();

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
          error={errors.basicInfo?.age?.message}
          {...register('basicInfo.age', {
             required: 'Age is required',
             min: { value: 16, message: 'Must be 16+' },
             max: { value: 120, message: 'Invalid age' }
          })}
        />
        <InputField
          label="Weight (kg)"
          type="number"
          placeholder="70"
          error={errors.basicInfo?.weight?.message}
          {...register('basicInfo.weight', {
             required: 'Weight is required',
             min: { value: 30, message: 'Invalid weight' }
          })}
        />
      </div>

      <InputField
        label="Height (cm)"
        type="number"
        placeholder="170"
        error={errors.basicInfo?.height?.message}
        {...register('basicInfo.height', {
            required: 'Height is required',
            min: { value: 100, message: 'Invalid height' }
        })}
      />

      <div>
        <label className="block text-sm font-medium mb-3">Gender</label>
        {errors.basicInfo?.gender && (
            <p className="text-red-400 text-xs mb-2">{errors.basicInfo.gender.message}</p>
        )}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="basicInfo.gender"
            rules={{ required: 'Gender is required' }}
            render={({ field: { value, onChange } }) => (
              <>
              {genders.map((gender) => (
                <SelectCard
                  key={gender.value}
                  icon={gender.icon}
                  label={gender.label}
                  isSelected={value === gender.value}
                  onClick={() => onChange(gender.value)}
                />
              ))}
              </>
            )}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-3">Activity Level</label>
        <div className="space-y-2">
           <Controller
            control={control}
            name="basicInfo.activityLevel"
            render={({ field: { value, onChange } }) => (
              <>
                {activityLevels.map((level) => (
                    <SelectCard
                    key={level.value}
                    label={level.label}
                    description={level.description}
                    isSelected={value === level.value}
                    onClick={() => onChange(level.value)}
                    />
                ))}
              </>
            )}
           />
        </div>
      </div>
    </div>
  );
}
