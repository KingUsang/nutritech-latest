import { useFormContext, Controller } from 'react-hook-form';
import InputField from '@/components/ui/input-field';
import ToggleSwitch from '@/components/ui/toggle-switch';

/**
 * Step 4: Budget and constraints
 */
export default function BudgetConstraintsStep() {
  const { register, control, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <InputField
        label="Daily Food Budget (₦)"
        type="number"
        placeholder="1000"
        error={errors.budgetConstraints?.dailyBudget?.message}
        {...register('budgetConstraints.dailyBudget', {
            required: 'Daily budget is required',
            min: { value: 100, message: 'Minimum ₦100' }
        })}
      />

      <div>
        <label className="block text-sm font-medium mb-2">Meal Preparation Preference</label>
        <select
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-tech-primary focus:bg-white/10 transition-all"
          {...register('budgetConstraints.mealPrep')}
        >
          <option value="both" className="bg-navy-800">Both Cooking & Buying</option>
          <option value="cooking" className="bg-navy-800">Mostly Cooking</option>
          <option value="buying" className="bg-navy-800">Mostly Buying Ready-made</option>
        </select>
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
        <div>
          <div className="font-medium">Access to Kitchen</div>
          <div className="text-sm text-gray-400">Can you cook in your accommodation?</div>
        </div>
        <Controller
          control={control}
          name="budgetConstraints.hasKitchen"
          render={({ field: { value, onChange } }) => (
            <ToggleSwitch
                checked={value}
                onChange={onChange}
            />
          )}
        />
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
        <div>
          <div className="font-medium">Market Access</div>
          <div className="text-sm text-gray-400">Easy access to fresh food markets?</div>
        </div>
        <Controller
            control={control}
            name="budgetConstraints.hasMarketAccess"
            render={({ field: { value, onChange } }) => (
                <ToggleSwitch
                    checked={value}
                    onChange={onChange}
                />
            )}
        />
      </div>
    </div>
  );
}
