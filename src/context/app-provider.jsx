/**
 * App Provider
 * Combines all context providers for cleaner app structure
 */

'use client';

import { AuthProvider } from './auth-context';
import { OnboardingProvider } from './onboarding-context';

/**
 * Main app provider that wraps all other providers
 * Usage: Wrap root layout with this component
 */
export function AppProvider({ children }) {
  return (
    <AuthProvider>
      <OnboardingProvider>
        {children}
      </OnboardingProvider>
    </AuthProvider>
  );
}
