import { useState, useEffect } from 'react';
import { useSupabase } from './use-supabase';
import { useAuth } from '@/context/auth-context';

/**
 * Hook for managing meal tracking and nutrition logs
 * @returns {Object} Tracking operations and state
 */
export function useTracking() {
  const { user } = useAuth();
  // Using 'tracking_logs' as table name, cleaner than generic 'tracking'
  const { getDocuments, addDocument, updateDocument, deleteDocument } = useSupabase('tracking_logs');
  const [logs, setLogs] = useState([]);
  const [todayLogs, setTodayLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchLogs();
    }
  }, [user]);

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      // Query: userId == user.uid, sort by date desc
      const allLogs = await getDocuments((query) => 
        query.eq('user_id', user.uid).order('date', { ascending: false })
      );
      
      setLogs(allLogs);

      // Filter today's logs
      const today = new Date().toISOString().split('T')[0];
      const filtered = allLogs.filter(log => log.date === today);
      setTodayLogs(filtered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logMeal = async (mealData) => {
    setError(null);
    try {
      const log = await addDocument({
        user_id: user.uid,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        ...mealData,
      });
      // Add to local state
      setLogs(prev => [log, ...prev]);
      // If it's today (it is), add to todayLogs
      setTodayLogs(prev => [log, ...prev]);
      return log;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateLog = async (logId, updates) => {
    setError(null);
    try {
      const updated = await updateDocument(logId, updates);
      setLogs(prev => prev.map(log => log.id === logId ? { ...log, ...updated } : log));
      setTodayLogs(prev => prev.map(log => log.id === logId ? { ...log, ...updated } : log));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteLog = async (logId) => {
    setError(null);
    try {
      await deleteDocument(logId);
      setLogs(prev => prev.filter(log => log.id !== logId));
      setTodayLogs(prev => prev.filter(log => log.id !== logId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getTodayTotals = () => {
    return todayLogs.reduce((totals, log) => ({
      calories: totals.calories + (log.calories || 0),
      protein: totals.protein + (log.protein || 0),
      carbs: totals.carbs + (log.carbs || 0),
      fats: totals.fats + (log.fats || 0),
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  return {
    logs,
    todayLogs,
    loading,
    error,
    logMeal,
    updateLog,
    deleteLog,
    getTodayTotals,
    fetchLogs // Exposed for manual refresh if needed
  };
}
