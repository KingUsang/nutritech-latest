'use client';

import Link from 'next/link';

/**
 * Landing page navigation bar
 */
export default function LandingNav() {
  return (
    <nav className="fixed w-full z-50 glass-nav transition-all duration-300" style={{
      background: 'rgba(10, 14, 31, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="relative w-8 h-8 flex items-center justify-center bg-gradient-to-br from-tech-primary to-emerald-600 rounded-lg shadow-lg group-hover:rotate-12 transition-transform">
              <span className="text-navy-900 font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-tech-primary transition-colors">
              Nutri-Tech
            </span>
          </Link>

          {/* CTA Button */}
          <div>
            <Link
              href="/auth"
              className="glass px-6 py-2 rounded-full text-sm font-bold text-tech-primary hover:bg-tech-primary hover:text-navy-900 transition-all border-tech-primary/30"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
