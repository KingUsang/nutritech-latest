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

    if (user) {
      // Save user profile to Supabase 'users' table
      // Note: You might want to use a trigger for this in production, 
      // but client-side set is closest to your existing firebase logic.
      const { error: profileError } = await supabase
        .from('users')
        .insert({
            id: user.id, // Important: Match auth.uid
            email: user.email,
            ...userData,
            created_at: new Date().toISOString(),
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        // Note: Auth user was created, but profile failed. 
        // You might want to delete the auth user or handle this contentiously.
      }
    }

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
 * Get user profile from Supabase
 * @param {string} uid - User ID
 * @returns {Promise<Object>} User profile data
 */
export async function getUserProfile(uid) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', uid)
      .single();

    if (error) {
       console.warn('Error fetching profile:', error.message);
       return null; 
    }
    
    return { uid: data.id, ...data };
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
}
