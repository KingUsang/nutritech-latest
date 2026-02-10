'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { registerUser, loginWithGoogle } from '@/lib/auth-helpers';
import { isValidEmail, isValidPassword } from '@/lib/validators';
import GlassButton from '@/components/ui/glass-button';
import InputField from '@/components/ui/input-field';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { UNIVERSITIES } from '@/lib/constants';

/**
 * Signup form component
 * @param {Function} onToggle - Switch to login form
 */
export default function SignupForm({ onToggle }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await registerUser(data.email, data.password, {
        displayName: data.name,
        university: data.university,
      });
      router.push('/onboarding');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      router.push('/onboarding');
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
          <LoadingSpinner size="md" text="Creating Account..." />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-1">Create Account 🚀</h2>
      <p className="text-sm text-gray-400 mb-6">Start your healthy student journey today.</p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Full Name"
          type="text"
          placeholder="Tolu Adebayo"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />

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

        <InputField
          label="Password"
          type="password"
          placeholder="Create a strong password"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            validate: (value) => isValidPassword(value) || 'Password must be at least 8 characters',
          })}
        />

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">
            University
          </label>
          <select
            {...register('university', { required: 'University is required' })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 focus:outline-none focus:border-tech-primary focus:bg-white/10 transition-all"
          >
            {UNIVERSITIES.map((uni) => (
              <option key={uni.value} value={uni.value} className="bg-navy-800">
                {uni.label}
              </option>
            ))}
          </select>
          {errors.university && (
            <p className="text-red-400 text-xs mt-1 ml-1">{errors.university.message}</p>
          )}
        </div>

        <GlassButton type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </GlassButton>
      </form>

      <p className="text-center mt-8 text-sm text-gray-400">
        Already have an account?{' '}
        <button onClick={onToggle} className="text-tech-primary font-bold hover:underline ml-1">
          Sign In
        </button>
      </p>
    </div>
  );
}
