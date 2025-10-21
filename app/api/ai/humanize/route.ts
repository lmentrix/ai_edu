import {createGoogleGenerativeAI} from '@ai-sdk/google';
import { streamText } from 'ai';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(request: Request) {
    const { text, strength = 'medium' } = await request.json();

    if (!text) {
        return new Response(JSON.stringify({ error: 'Text is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const strengthMap = {
        light: 'Make minor adjustments to sound more natural while keeping the professional tone. Use slightly simpler language and add occasional conversational elements.',
        medium: 'Transform the text to sound more human-like by replacing formal words with common alternatives, adding personal touches, and using more natural sentence structures.',
        strong: 'Completely humanize the text by making it sound conversational and personal, using informal language, contractions, and adding personal opinions or perspectives where appropriate.'
    };

    const systemPrompt = `You are an expert at transforming AI-generated text to sound more natural and human-written. Your task is to rewrite the provided text to sound like it was written by a human.

    Instructions: ${strength}

    Focus on:
    - Replacing overly formal or academic words with more common alternatives
    - Varying sentence structure and length
    - Adding natural transitions and flow
    - Using more conversational tone where appropriate
    - Removing robotic or formulaic phrases
    - Adding personal touches or perspectives (especially for strong humanization)

    Return only the humanized text without any explanations or metadata.`;

    try {
        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: systemPrompt,
            prompt: `Humanize this text: "${text}"`,
            temperature: 0.8,
            maxOutputTokens: 1500,
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error('Text humanization error:', error);
        return new Response(JSON.stringify({ error: 'Failed to humanize text' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}