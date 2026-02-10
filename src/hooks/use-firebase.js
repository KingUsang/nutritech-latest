import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

/**
 * Hook for Firestore CRUD operations on a specific collection
 * @param {string} collectionName - Firestore collection name
 * @returns {Object} Firestore operations
 */
export function useFirestore(collectionName) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addDocument = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date().toISOString(),
      });
      return { id: docRef.id, ...data };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async (docId, data) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      });
      return { id: docId, ...data };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (docId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, collectionName, docId));
      return docId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getDocument = async (docId) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getDocuments = async (constraints = []) => {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, collectionName), ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    addDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    getDocuments,
  };
}
