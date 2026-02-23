'use client';

/**
 * OAuth Callback Handler
 * Supabase redirects here after Google sign-in.
 * Exchanges the auth code for a session, then routes the user.
 */

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Suspense } from 'react';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      // Handle OAuth errors returned in the URL
      if (error) {
        console.error('OAuth error:', error, errorDescription);
        router.replace(`/auth?error=${encodeURIComponent(errorDescription || error)}`);
        return;
      }

      if (code) {
        // Exchange the PKCE code for a session
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
          console.error('Code exchange error:', exchangeError.message);
          router.replace('/auth?error=Authentication+failed');
          return;
        }
      }

      // Session is now set — check if the user has completed onboarding
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.replace('/auth');
        return;
      }

      // Route to onboarding if profile is incomplete, otherwise dashboard
      const meta = user.user_metadata || {};
      const hasCompletedOnboarding = meta.onboarding_completed === true;

      router.replace(hasCompletedOnboarding ? '/dashboard' : '/onboarding');
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy-900 gap-4">
      <LoadingSpinner />
      <p className="text-gray-400 text-sm">Signing you in…</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-navy-900">
          <LoadingSpinner />
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
