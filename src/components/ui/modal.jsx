/**
 * Modal Component
 * Full-screen overlay modal with animations
 */

'use client';

import { useEffect } from 'react';

export default function Modal({ 
  isOpen, 
  onClose, 
  title,
  children, 
  className = '' 
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed inset-0 z-50 
        flex items-end sm:items-center justify-center
        ${isOpen ? 'animate-fade-in' : ''}
      `}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div
        className={`
          relative z-10 
          bg-navy-900 
          w-full max-w-md 
          rounded-t-3xl sm:rounded-3xl 
          border-t sm:border border-white/10 
          max-h-[90vh] overflow-y-auto
          ${className}
        `}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between p-4 border-b border-white/5 sticky top-0 bg-navy-900/95 backdrop-blur z-20">
            {title && <h3 className="text-lg font-bold">{title}</h3>}
            {onClose && (
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
