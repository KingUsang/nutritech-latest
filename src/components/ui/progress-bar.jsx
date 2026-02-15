/**
 * ProgressBar Component
 * Visual progress indicator for multi-step forms
 */

export default function ProgressBar({ progress = 0, className = '' }) {
  return (
    <div className={`w-full h-1 bg-gray-800 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-tech-primary to-blue-500 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
