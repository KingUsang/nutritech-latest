'use client';

import { useState } from 'react';
import { useGroq } from '@/hooks/use-groq';
import GlassCard from '@/components/ui/glass-card';
import GlassButton from '@/components/ui/glass-button';
import LoadingSpinner from '@/components/ui/loading-spinner';

const articles = [
  {
    id: 1,
    title: 'Best Nigerian Foods for Brain Power',
    category: 'Nutrition Tips',
    emoji: '🧠',
    description: 'Discover local foods that boost concentration and memory during exams.',
  },
  {
    id: 2,
    title: 'Eating Healthy on ₦1000/Day',
    category: 'Budget Guide',
    emoji: '💰',
    description: 'Practical meal planning tips for students on a tight budget.',
  },
  {
    id: 3,
    title: 'Iron-Rich Nigerian Foods',
    category: 'Health',
    emoji: '🥬',
    description: 'Combat fatigue with these affordable iron sources like Ugwu and beans.',
  },
  {
    id: 4,
    title: 'Quick 15-Minute Student Meals',
    category: 'Recipes',
    emoji: '⏱️',
    description: 'Easy recipes you can make in your hostel room.',
  },
];

/**
 * Learn Hub page - Articles and AI chat
 */
export default function LearnPage() {
  const { messages, loading, sendMessage, clearChat } = useGroq();
  const [input, setInput] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    try {
      await sendMessage(input);
      setInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Learn Hub 📚</h1>
        <p className="text-sm text-gray-400">Nutrition tips and guides for students</p>
      </div>

      {/* AI Chat Section */}
      <GlassCard className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold">Ask Our AI Nutritionist 🤖</h3>
            <p className="text-sm text-gray-400">Get instant answers to your nutrition questions</p>
          </div>
          <GlassButton
            variant="primary"
            size="sm"
            onClick={() => setShowChat(!showChat)}
          >
            {showChat ? 'Hide Chat' : 'Start Chat'}
          </GlassButton>
        </div>

        {showChat && (
          <div className="mt-4 space-y-4">
            {/* Chat Messages */}
            <div className="h-64 overflow-y-auto space-y-3 p-4 bg-white/5 rounded-xl">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 text-sm py-8">
                  Ask me anything about nutrition, meal planning, or healthy eating!
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-xl ${
                        msg.role === 'user'
                          ? 'bg-tech-primary text-navy-900'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <LoadingSpinner size="sm" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tech-primary"
                disabled={loading}
              />
              <GlassButton type="submit" variant="primary" disabled={loading}>
                Send
              </GlassButton>
            </form>
          </div>
        )}
      </GlassCard>

      {/* Articles Grid */}
      <div>
        <h3 className="font-bold mb-4">Popular Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((article) => (
            <GlassCard
              key={article.id}
              className="p-6 hover:bg-white/10 transition cursor-pointer"
            >
              <div className="text-4xl mb-3">{article.emoji}</div>
              <div className="text-xs text-tech-primary font-bold mb-2">{article.category}</div>
              <h4 className="font-bold mb-2">{article.title}</h4>
              <p className="text-sm text-gray-400">{article.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <GlassCard className="p-6 bg-tech-primary/10 border border-tech-primary/20">
        <h3 className="font-bold mb-3">💡 Quick Tip of the Day</h3>
        <p className="text-sm text-gray-300">
          Combine beans and rice in the same meal to create a "complete protein" - your body will
          get all essential amino acids needed for muscle repair and brain function!
        </p>
      </GlassCard>
    </div>
  );
}
