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

    const systemPrompt = `You are an expert grammar and writing assistant with advanced knowledge of academic writing standards. Analyze the provided text comprehensively for:

    1. Grammar errors (subject-verb agreement, tense consistency, pronoun usage, etc.)
    2. Spelling mistakes and typos
    3. Punctuation issues (commas, semicolons, apostrophes, etc.)
    4. Sentence structure improvements (run-on sentences, fragments, variety)
    5. Clarity and readability suggestions
    6. Word choice and vocabulary enhancement
    7. Academic tone and formality
    8. Flow and coherence between ideas

    For each issue identified, provide:
    - The exact location of the problem
    - A clear explanation of the issue
    - A specific correction with alternatives
    - The reason why the correction improves the text

    Provide your analysis in the following JSON format:
    {
        "correctedText": "The fully corrected version of the text with all improvements applied",
        "issues": [
            {
                "type": "grammar|spelling|punctuation|structure|clarity|vocabulary|tone|flow",
                "severity": "minor|moderate|major|critical",
                "startPosition": 0,
                "endPosition": 10,
                "original": "The original problematic text",
                "suggestion": "The suggested correction",
                "alternatives": ["Alternative correction 1", "Alternative correction 2"],
                "explanation": "Detailed explanation of why this correction is needed",
                "rule": "The grammatical or stylistic rule being applied"
            }
        ],
        "overallScore": 85,
        "feedback": "Comprehensive feedback on the writing quality with specific strengths and areas for improvement",
        "strengths": ["List of specific writing strengths demonstrated in the text"],
        "priorityImprovements": ["List of the most important issues to address first"],
        "readabilityLevel": "Assessment of reading level (e.g., college-level, high school-level)",
        "wordChoiceSuggestions": {
            "overused": ["word1", "word2"],
            "alternatives": {
                "word1": ["synonym1", "synonym2"],
                "word2": ["synonym1", "synonym2"]
            }
        }
    }`;

    try {
        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: systemPrompt,
            prompt: `Please analyze and correct this text: "${text}"`,
            temperature: 0.3,
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error('Grammar check error:', error);
        return new Response(JSON.stringify({ error: 'Failed to check grammar' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}