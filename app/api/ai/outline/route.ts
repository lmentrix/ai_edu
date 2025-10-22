import {createGoogleGenerativeAI} from '@ai-sdk/google';
import { streamText } from 'ai';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(request: Request) {
    const { topic, essayType, length = 'medium' } = await request.json();

    if (!topic) {
        return new Response(JSON.stringify({ error: 'Topic is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const lengthMap = {
        short: '3-4 main points with brief subpoints',
        medium: '4-5 main points with detailed subpoints',
        long: '5-6 main points with comprehensive subpoints and supporting evidence'
    };

    const essayTypeMap = {
        argumentative: 'argumentative essay with thesis, supporting arguments, counterarguments, and refutation',
        expository: 'expository essay with clear explanations, examples, and analysis',
        narrative: 'narrative essay with story elements, chronological progression, and personal insights',
        descriptive: 'descriptive essay with sensory details, spatial organization, and vivid imagery',
        compare: 'compare and contrast essay with balanced analysis of similarities and differences'
    };

    const systemPrompt = `You are an expert academic writer and essay planner. Create a comprehensive outline for a ${essayTypeMap["expository"]} on the topic: "${topic}". The outline should include ${lengthMap["medium"]}.

    Provide your outline in the following JSON format:
    {
        "title": "Suggested essay title",
        "thesisStatement": "Clear and concise thesis statement",
        "introduction": {
            "hook": "Engaging opening strategy",
            "background": "Brief background information",
            "thesis": "Thesis statement placement and approach"
        },
        "bodyParagraphs": [
            {
                "paragraphNumber": 1,
                "topicSentence": "Clear topic sentence",
                "mainPoints": ["Main point 1", "Main point 2", "Main point 3"],
                "supportingEvidence": ["Evidence or example 1", "Evidence or example 2"],
                "transition": "Transition to next paragraph"
            }
        ],
        "conclusion": {
            "restatedThesis": "Restated thesis in new words",
            "summary": "Summary of main points",
            "finalThought": "Concluding thought or call to action"
        },
        "estimatedWordCount": "Estimated word count for this essay",
        "writingTips": ["Specific tips for writing this type of essay"]
    }`;

    try {
        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: systemPrompt,
            prompt: `Create a detailed essay outline for: ${topic}`,
            temperature: 0.7,
            maxOutputTokens: 2000,
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error('Outline generation error:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate outline' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}