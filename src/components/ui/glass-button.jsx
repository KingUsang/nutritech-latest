/**
 * GlassButton Component
 * Reusable button with multiple variants
 */

export default function GlassButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
}) {
  // Base styles
  const baseStyles = 'font-bold rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-2';
  
  // Size variants
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  // Color variants
  const variantStyles = {
    primary: 'bg-gradient-to-r from-tech-primary to-emerald-500 text-navy-900 hover:shadow-lg hover:shadow-green-500/20',
    secondary: 'bg-white/5 border border-white/10 text-white hover:bg-white/10',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    ghost: 'bg-transparent text-white hover:bg-white/5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

// Simple loading spinner
//Make a "NutriTech" themed loading spinner with a green color and a small size
function LoadingSpinner({ size = 'sm' }) {
  const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  return (
    <div
      className={`${sizeClass} border-2 border-current border-t-transparent rounded-full animate-spin`}
    />
  );
}
