/**
 * Authentication Helper Functions
 * Utility functions for Supabase auth operations
 */

import { supabase } from '@/lib/supabase';

/**
 * Register new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} userData - Additional user data
 * @returns {Promise<Object>} User object
 */
export async function registerUser(email, password, userData) {
  try {
    // Create auth user
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: userData.displayName || '',
          ...userData,
        }
      }
    });

    if (signUpError) throw signUpError;

    // All user data is stored in user_metadata via auth.signUp options above.
    // No separate public.users table insert needed.

    return { uid: user.id, email: user.email };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

/**
 * Sign in user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User object
 */
export async function loginUser(email, password) {
  try {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { uid: user.id, email: user.email };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Sign in with Google
 * @returns {Promise<Object>} User object
 */
export async function loginWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
}

/**
 * Log out current user
 * @returns {Promise<void>}
 */
export async function logoutUser() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {Promise<void>}
 */
export async function resetPassword(email) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
}

/**
 * Get user profile from Supabase auth.users (via supabase.auth.getUser())
 * No public.users table needed — data comes from auth metadata.
 * @param {string} uid - User ID (used to verify match)
 * @returns {Promise<Object>} User profile data
 */
export async function getUserProfile(uid) {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.warn('Error fetching auth user:', error.message);
      return null;
    }

    if (!user || user.id !== uid) return null;

    const meta = user.user_metadata || {};

    return {
      uid: user.id,
      email: user.email,
      displayName: meta.display_name || meta.full_name || meta.name || '',
      university: meta.university || '',
      ...meta,
    };
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
}
