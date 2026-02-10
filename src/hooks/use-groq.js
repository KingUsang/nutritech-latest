import { useState } from 'react';
import { chatWithAI } from '@/lib/groq';

/**
 * Hook for interacting with Groq AI chat
 * @returns {Object} Chat operations and state
 */
export function useGroq() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (userMessage) => {
    setLoading(true);
    setError(null);

    // Add user message
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Get AI response
      const chatHistory = [...messages, newUserMessage];
      const aiResponse = await chatWithAI(chatHistory);

      // Add AI response
      const newAiMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, newAiMessage]);

      return aiResponse;
    } catch (err) {
      setError(err.message);
      // Remove user message on error
      setMessages(prev => prev.slice(0, -1));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearChat,
  };
}
