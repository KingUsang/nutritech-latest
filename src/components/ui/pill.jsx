/**
 * Pill Component
 * Toggleable pill/tag for multi-select options
 */

export function Pill({
  children,
  isSelected,
  onClick,
  className = '',
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-medium
        border transition-all cursor-pointer
        ${
          isSelected
            ? 'bg-tech-primary/15 border-tech-primary text-tech-primary'
            : 'border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}
