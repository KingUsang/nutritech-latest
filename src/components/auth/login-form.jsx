'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { loginUser, registerUser, loginWithGoogle } from '@/lib/auth-helpers';
import { isValidEmail, isValidPassword, isRequired } from '@/lib/validators';
import GlassButton from '@/components/ui/glass-button';
import InputField from '@/components/ui/input-field';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { UNIVERSITIES } from '@/lib/constants';

/**
 * Login form component
 * @param {Function} onToggle - Switch to signup form
 */
export default function LoginForm({ onToggle }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await loginUser(data.email, data.password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-3xl">
          <LoadingSpinner size="md" text="Connecting..." />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-1">Welcome Back 👋</h2>
      <p className="text-sm text-gray-400 mb-6">Enter your details to access your meal plan.</p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Email"
          type="email"
          placeholder="tolu@student.ui.edu.ng"
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            validate: (value) => isValidEmail(value) || 'Invalid email address',
          })}
        />

        <div>
          <div className="flex justify-between items-center mb-1 ml-1">
            <label className="block text-xs font-bold text-gray-400 uppercase">Password</label>
            <button type="button" className="text-xs text-tech-primary hover:underline">
              Forgot?
            </button>
          </div>
          <InputField
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
            })}
          />
        </div>

        <GlassButton type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </GlassButton>
      </form>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-px bg-white/10 flex-1"></div>
        <span className="text-xs text-gray-500 font-medium">OR</span>
        <div className="h-px bg-white/10 flex-1"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full mt-6 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-3 transition disabled:opacity-50"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <p className="text-center mt-8 text-sm text-gray-400">
        Don't have an account?{' '}
        <button onClick={onToggle} className="text-tech-primary font-bold hover:underline ml-1">
          Sign Up
        </button>
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
