/**
 * InputField Component
 * Styled input with label and error handling
 */

export function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 rounded-xl
          bg-navy-800 border border-white/10
          text-white placeholder-gray-500
          focus:outline-none focus:border-tech-primary focus:ring-1 focus:ring-tech-primary/20
          transition-all
          ${error ? 'border-red-500' : ''}
        `}
        {...props}
      />
      
      {error && (
        <p className="text-xs text-red-400 ml-1">{error}</p>
      )}
    </div>
  );
}
