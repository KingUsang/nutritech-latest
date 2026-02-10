/**
 * GlassCard Component
 * Reusable card with glassmorphism effect
 */

export function GlassCard({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-gradient-to-br from-white/5 to-white/[0.01]
        backdrop-blur-[10px]
        border border-white/5
        rounded-2xl
        shadow-lg
        ${onClick ? 'cursor-pointer hover:bg-white/10 transition-all' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
