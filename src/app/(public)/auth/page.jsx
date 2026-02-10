'use client';

import { useState } from 'react';
import Link from 'next/link';
import LoginForm from '@/components/auth/login-form';
import SignupForm from '@/components/auth/signup-form';

/**
 * Auth page with login and signup forms
 */
export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-navy-900 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tech-primary/5 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8 animate-float">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-tech-primary to-emerald-600 rounded-xl shadow-lg shadow-tech-primary/20">
              <span className="text-navy-900 font-bold text-xl">N</span>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">Nutri-Tech</span>
          </div>
        </Link>

        {/* Auth Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div
            className={`transition-all duration-300 ${
              isSignup ? 'opacity-0 absolute inset-0 p-8 pointer-events-none' : 'opacity-100'
            }`}
          >
            <LoginForm onToggle={() => setIsSignup(true)} />
          </div>

          <div
            className={`transition-all duration-300 ${
              !isSignup ? 'opacity-0 absolute inset-0 p-8 pointer-events-none' : 'opacity-100'
            }`}
          >
            <SignupForm onToggle={() => setIsSignup(false)} />
          </div>
        </div>
      </div>
    </div>
  );
}
