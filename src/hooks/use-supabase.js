import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Hook for Supabase CRUD operations on a specific table
 * @param {string} tableName - Supabase table name
 * @returns {Object} Database operations
 */
export function useSupabase(tableName) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addDocument = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert({
          ...data,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  const updateDocument = useCallback(async (docId, data) => {
    setLoading(true);
    setError(null);
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', docId) // Assuming 'id' is the primary key column
        .select()
        .single();

      if (error) throw error;
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  const deleteDocument = useCallback(async (docId) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', docId);

      if (error) throw error;
      return docId;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  const getDocument = useCallback(async (docId) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', docId)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  const getDocuments = useCallback(async (queryCallback) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from(tableName).select('*');
      
      // Allow custom query modifications
      if (queryCallback) {
        query = queryCallback(query);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  return {
    addDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    getDocuments,
    loading,
    error,
  };
}
