import {createGoogleGenerativeAI} from '@ai-sdk/google';
import { streamText } from 'ai';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(request: Request) {
    const { text } = await request.json();

    if (!text) {
        return new Response(JSON.stringify({ error: 'Text is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const systemPrompt = `You are an expert essay analyst. Analyze the provided essay text for structure, coherence, and organization. Provide your analysis in the following JSON format:

    {
        "overallStructure": {
            "score": 85,
            "feedback": "Assessment of the overall essay structure"
        },
        "introduction": {
            "present": true,
            "hasHook": true,
            "hasThesis": true,
            "score": 80,
            "feedback": "Feedback on the introduction quality"
        },
        "bodyParagraphs": [
            {
                "paragraph": 1,
                "hasTopicSentence": true,
                "hasSupportingEvidence": true,
                "hasTransition": true,
                "score": 85,
                "feedback": "Feedback on this paragraph"
            }
        ],
        "conclusion": {
            "present": true,
            "restatesThesis": true,
            "providesClosure": true,
            "score": 80,
            "feedback": "Feedback on the conclusion"
        },
        "transitions": {
            "score": 75,
            "feedback": "Assessment of transition usage between paragraphs"
        },
        "coherence": {
            "score": 85,
            "feedback": "Assessment of overall coherence and flow"
        },
        "suggestions": [
            "Specific suggestions for improving structure"
        ],
        "strengths": [
            "Identified strengths in the essay structure"
        ]
    }`;

    try {
        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: systemPrompt,
            prompt: `Please analyze the structure of this essay: "${text}"`,
            temperature: 0.3,
            maxOutputTokens: 2000,
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error('Structure analysis error:', error);
        return new Response(JSON.stringify({ error: 'Failed to analyze structure' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}