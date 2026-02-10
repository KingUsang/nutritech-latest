/**
 * SelectCard Component
 * Clickable card for selection (gender, activity level, etc.)
 */

export function SelectCard({
  icon,
  label,
  value,
  isSelected,
  onClick,
  className = '',
}) {
  return (
    <div
      onClick={() => onClick(value)}
      className={`
        p-4 rounded-xl cursor-pointer
        border transition-all
        flex flex-col items-center gap-2
        ${
          isSelected
            ? 'border-tech-primary bg-tech-primary/10 shadow-lg shadow-tech-primary/10'
            : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
        }
        ${className}
      `}
    >
      {icon && <span className="text-3xl">{icon}</span>}
      <span
        className={`
          font-medium text-center text-sm
          ${isSelected ? 'text-white' : 'text-gray-300'}
        `}
      >
        {label}
      </span>
    </div>
  );
}
