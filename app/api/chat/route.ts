import {createGoogleGenerativeAI} from '@ai-sdk/google';
import { streamText, convertToModelMessages, UIMessage, stepCountIs } from 'ai';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY, // Replace with your actual API key
});


export async function POST(request: Request) {
    const { messages }: { messages: UIMessage[] } = await request.json();

    const result = streamText({
        model: google('gemini-2.5-flash'),
        system: 'You are a friendly assistant!',
        messages: convertToModelMessages(messages),
        stopWhen: stepCountIs(5),
    });

    return result.toUIMessageStreamResponse();
}