import { NextResponse } from 'next/server';
import { chatWithAI } from '@/lib/groq';

/**
 * POST /api/chat
 * Chat with Groq AI nutritionist
 */
export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Get AI response
    const response = await chatWithAI(messages);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response', details: error.message },
      { status: 500 }
    );
  }
}
