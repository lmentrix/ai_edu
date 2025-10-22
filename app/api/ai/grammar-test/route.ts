import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';
import {
    grammarCache,
    withTimeout,
    log,
    logError,
    createErrorResponse,
    createAbortController
} from '@/lib/utils/grammar-api-utils';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

// Optimized schema for grammar analysis results (reduced fields)
const grammarAnalysisSchema = z.object({
    correctedText: z.string().describe("The fully corrected version of the text with all improvements applied"),
    issues: z.array(z.object({
        type: z.enum(["grammar", "spelling", "punctuation", "structure", "clarity", "vocabulary", "tone", "flow"]),
        severity: z.enum(["minor", "moderate", "major", "critical"]),
        startPosition: z.number().describe("Character position where the issue starts"),
        endPosition: z.number().describe("Character position where the issue ends"),
        original: z.string().describe("The original problematic text"),
        suggestion: z.string().describe("The suggested correction"),
        explanation: z.string().describe("Brief explanation of why this correction is needed")
    })),
    overallScore: z.number().min(0).max(100).describe("Overall writing quality score"),
    feedback: z.string().describe("Brief feedback on the writing quality")
});

export async function POST(request: Request) {
    try {
        log('[Grammar Test API] Request received');
        
        // Check API key configuration
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!apiKey) {
            logError('[Grammar Test API] GOOGLE_GENERATIVE_AI_API_KEY is not configured');
            return createErrorResponse('Server configuration error: API key not found', 500);
        }
        
        log('[Grammar Test API] API key configured');
        
        const { text } = await request.json();
        log('[Grammar Test API] Text to analyze:', text?.substring(0, 50) + '...');

        if (!text) {
            return createErrorResponse('Text is required', 400);
        }

        // Check cache first
        const cachedResult = grammarCache.get(text);
        if (cachedResult) {
            log('[Grammar Test API] Cache hit for text');
            return Response.json(cachedResult);
        }

        const systemPrompt = `You are an expert grammar and writing assistant. Analyze the provided text for:

1. Grammar errors
2. Spelling mistakes
3. Punctuation issues
4. Sentence structure
5. Clarity and readability
6. Word choice and vocabulary
7. Academic tone
8. Flow and coherence

For each issue, provide:
- Exact location (start and end character positions)
- Brief explanation
- Specific correction

Be precise with character positions. Count from position 0.
Provide concise feedback.`;

        // Create abort controller for request cancellation
        const controller = createAbortController(30000); // 30 second timeout
        
        log('[Grammar Test API] Calling Google AI with generateObject (non-streaming)');
        
        // Create the request with timeout
        const resultPromise = generateObject({
            model: google('gemini-2.5-flash'),
            system: systemPrompt,
            prompt: `Please analyze and correct this text: "${text}"`,
            schema: grammarAnalysisSchema,
            temperature: 0.3,
            abortSignal: controller.signal,
        });

        // Apply timeout to the request
        const result = await withTimeout(resultPromise, 30000);
        
        // Cache the result
        grammarCache.set(text, result.object);
        
        log('[Grammar Test API] Analysis complete');
        return Response.json(result.object);
    } catch (error) {
        logError('[Grammar Test API] Grammar check error:', error);
        
        // Handle different error types
        if (error instanceof Error) {
            if (error.message.includes('timed out')) {
                return createErrorResponse('Request timed out. Please try again.', 408);
            }
            
            if (error.message.includes('aborted')) {
                return createErrorResponse('Request was cancelled', 499);
            }
        }
        
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return createErrorResponse('Failed to check grammar', 500, errorMessage);
    }
}