/**
 * Auth Context Provider
 * Manages global authentication state across the app
 */

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { getUserProfile } from '@/lib/auth-helpers';

// Create context
const AuthContext = createContext({});

/**
 * Auth Provider Component
 * Wraps app to provide auth state to all children
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
            setUser({
                uid: session.user.id,
                email: session.user.email,
                // Supabase doesn't always have displayName in user object directly like Firebase
                displayName: session.user.user_metadata?.display_name || session.user.user_metadata?.full_name,
                photoURL: session.user.user_metadata?.avatar_url,
            });

            try {
                const profile = await getUserProfile(session.user.id);
                setUserProfile(profile);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        }
        setLoading(false);
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        // User is signed in
        setUser({
            uid: session.user.id,
            email: session.user.email,
            displayName: session.user.user_metadata?.display_name || session.user.user_metadata?.full_name,
            photoURL: session.user.user_metadata?.avatar_url,
        });

        // Fetch user profile from Supabase
        try {
          const profile = await getUserProfile(session.user.id);
          setUserProfile(profile);
        } catch (error) {
        //   console.error('Error fetching user profile:', error);
        }
      } else {
        // User is signed out
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    // Cleanup: Remove listener when component unmounts
    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    userProfile,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to use auth context
 * @returns {Object} Auth state and user data
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
