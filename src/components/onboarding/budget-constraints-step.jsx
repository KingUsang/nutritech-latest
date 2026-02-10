import InputField from '@/components/ui/input-field';
import ToggleSwitch from '@/components/ui/toggle-switch';

/**
 * Step 4: Budget and constraints
 */
export default function BudgetConstraintsStep({ data, onChange }) {
  return (
    <div className="space-y-6">
      <InputField
        label="Daily Food Budget (₦)"
        type="number"
        placeholder="1000"
        value={data.budgetConstraints?.dailyBudget || ''}
        onChange={(e) =>
          onChange({ budgetConstraints: { ...data.budgetConstraints, dailyBudget: e.target.value } })
        }
      />

      <div>
        <label className="block text-sm font-medium mb-2">Meal Preparation Preference</label>
        <select
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-tech-primary focus:bg-white/10 transition-all"
          value={data.budgetConstraints?.mealPrep || 'both'}
          onChange={(e) =>
            onChange({ budgetConstraints: { ...data.budgetConstraints, mealPrep: e.target.value } })
          }
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
        <ToggleSwitch
          checked={data.budgetConstraints?.hasKitchen || false}
          onChange={(checked) =>
            onChange({ budgetConstraints: { ...data.budgetConstraints, hasKitchen: checked } })
          }
        />
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
        <div>
          <div className="font-medium">Market Access</div>
          <div className="text-sm text-gray-400">Easy access to fresh food markets?</div>
        </div>
        <ToggleSwitch
          checked={data.budgetConstraints?.hasMarketAccess || false}
          onChange={(checked) =>
            onChange({
              budgetConstraints: { ...data.budgetConstraints, hasMarketAccess: checked },
            })
          }
        />
      </div>
    </div>
  );
}
