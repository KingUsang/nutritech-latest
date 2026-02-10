/**
 * Authentication Helper Functions
 * Utility functions for Firebase auth operations
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save user profile to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      ...userData,
      createdAt: new Date().toISOString(),
    });

    return { uid: user.uid, email: user.email };
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
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { uid: userCredential.user.uid, email: userCredential.user.email };
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
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if user exists in Firestore, create if not
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
      });
    }

    return { uid: user.uid, email: user.email };
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
    await signOut(auth);
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
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
}

/**
 * Get user profile from Firestore
 * @param {string} uid - User ID
 * @returns {Promise<Object>} User profile data
 */
export async function getUserProfile(uid) {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return { uid, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
}
