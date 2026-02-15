/**
 * ToggleSwitch Component
 * iOS-style toggle switch for settings
 */

export default function ToggleSwitch({
  checked = false,
  onChange,
  label = '',
  className = '',
}) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
      {label && <span className="text-sm text-white">{label}</span>}
      
      <div className="relative inline-block w-11 h-6">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        
        {/* Track */}
        <div
          className={`
            w-full h-full rounded-full transition-colors
            ${checked ? 'bg-tech-primary' : 'bg-gray-700'}
          `}
        />
        
        {/* Thumb */}
        <div
          className={`
            absolute top-0.5 left-0.5
            w-5 h-5 rounded-full bg-white
            transition-transform duration-200
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </div>
    </label>
  );
}
