/**
 * Modal Component
 * Full-screen overlay modal with animations
 */

'use client';

import { useEffect } from 'react';

export function Modal({ 
  isOpen, 
  onClose, 
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
        {children}
      </div>
    </div>
  );
}
