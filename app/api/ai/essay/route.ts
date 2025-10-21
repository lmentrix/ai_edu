import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(request: Request) {
    const { type, prompt, essayType, length, topic, text, strength } = await request.json(); // Flexible: prompt/topic for generation, text for analysis

    // Shared error response helper
    const sendError = (message: string, status = 400) =>
        new Response(JSON.stringify({ error: message }), {
            status,
            headers: { 'Content-Type': 'application/json' },
        });

    // Base essay generation logic (for 'generate' type)
    const generateEssay = async () => {
        const lengthMap = {
            short: 'approximately 300-500 words (3-4 paragraphs)',
            medium: 'approximately 600-900 words (5-7 paragraphs)',
            long: 'approximately 1000-1500 words (8-10 paragraphs)',
        };

        const essayTypeMap = {
            argumentative: 'argumentative essay with a clear thesis statement, supporting evidence, counterarguments, and refutation',
            expository: 'expository essay that explains a topic in a balanced and informative way with clear examples',
            narrative: 'narrative essay that tells a compelling story with personal insights, vivid descriptions, and emotional impact',
            descriptive: 'descriptive essay that paints a vivid picture with sensory details, spatial organization, and imagery',
            compare: 'compare and contrast essay that examines similarities and differences between subjects with balanced analysis',
        };

        const structureGuidance = {
            argumentative: 'Start with a compelling hook, present your thesis clearly, provide 3-4 body paragraphs each with a topic sentence and supporting evidence, address counterarguments, and end with a strong conclusion.',
            expository: 'Begin with an introduction that defines your topic, follow with 3-4 body paragraphs that each explore a different aspect, use clear examples, and conclude with a summary of key points.',
            narrative: 'Create a narrative arc with exposition, rising action, climax, falling action, and resolution. Use descriptive language and dialogue to bring your story to life.',
            descriptive: 'Organize your description spatially or by importance. Use all five senses to create a vivid impression. Show rather than tell through specific details.',
            compare: 'Structure your comparison either point-by-point or subject-by-subject. Ensure balanced treatment of both subjects and provide meaningful insights about their relationship.',
        };

        const defaultType = essayType || 'expository';
        const defaultLength = length || 'medium';

        const systemPrompt = `You are an expert academic writer with extensive experience in crafting high-quality essays. Write an exceptional ${essayTypeMap["descriptive"]} that is ${lengthMap["medium"]}.

STRUCTURE REQUIREMENTS:
${structureGuidance["expository"]}

QUALITY STANDARDS:
- Use sophisticated vocabulary and varied sentence structures
- Include smooth transitions between paragraphs
- Provide specific examples, evidence, or details to support your points
- Maintain a consistent tone and voice throughout
- Ensure logical flow and coherence
- Use proper academic formatting

CONTENT GUIDELINES:
- Develop a clear, focused thesis that guides your entire essay
- Each paragraph should explore a single main idea
- Use engaging hooks in your introduction
- End with a memorable conclusion that reinforces your thesis
- Avoid clichés and generic statements
- Demonstrate critical thinking and deep analysis

FORMATTING:
- Write in standard paragraph format without headings or section markers
- Use proper indentation for new paragraphs
- Ensure your essay flows naturally from one idea to the next

Please write a compelling, well-structured essay on the given topic that demonstrates advanced writing skills and deep understanding of the subject matter.`;

        try {
            const result = streamText({
                model: google('gemini-2.5-flash'),
                system: systemPrompt,
                prompt: `Write an essay about: ${prompt || topic}`,
                temperature: 0.7, // Balanced creativity for essays (per docs: 0-1 range)
                maxOutputTokens: defaultLength === 'long' ? 3000 : defaultLength === 'medium' ? 2000 : 1000, // Dynamic tokens based on length (Gemini limit ~8k+)
            });

            return result.toUIMessageStreamResponse(); // UI-friendly SSE stream (text-delta chunks)
        } catch (error) {
            console.error('Essay generation error:', error);
            return sendError('Failed to generate essay', 500);
        }
    };

    // Grammar check logic (for 'grammar' type)
    const checkGrammar = async () => {
        if (!text) return sendError('Text is required for grammar check');

        const systemPrompt = `You are a professional grammar and style editor. Analyze the following text for grammar, punctuation, spelling, style, and clarity issues. Respond ONLY with valid JSON in this exact format (do not add extra text or explanations outside JSON):

{
  "correctedText": "The full corrected version of the text",
  "issues": [
    {
      "type": "grammar|punctuation|style|spelling|clarity",
      "severity": "minor|moderate|critical",
      "startPosition": 0,
      "endPosition": 10,
      "original": "original phrase",
      "suggestion": "suggested correction",
      "alternatives": ["alt1", "alt2"],
      "explanation": "Brief explanation",
      "rule": "Grammar rule reference"
    }
  ],
  "overallScore": 85,
  "feedback": "Overall feedback summary",
  "strengths": ["Strength 1", "Strength 2"],
  "priorityImprovements": ["Key fix 1", "Key fix 2"],
  "readabilityLevel": "elementary|middle|high school|college|professional",
  "wordChoiceSuggestions": {
    "overused": ["word1", "word2"],
    "alternatives": {
      "word1": ["synonym1", "synonym2"]
    }
  }
}

Text to analyze: ${text}`;

        try {
            const result = streamText({
                model: google('gemini-2.5-flash'),
                system: systemPrompt,
                prompt: 'Analyze and return JSON only.', // Short prompt to enforce JSON
                temperature: 0.2, // Low for factual/analytical output (best practice)
                maxOutputTokens: 2000, // Sufficient for detailed analysis
            });

            // Use toDataStreamResponse for raw JSON streaming (parse in client/service)
            return result.toTextStreamResponse();
        } catch (error) {
            console.error('Grammar check error:', error);
            return sendError('Failed to check grammar', 500);
        }
    };

    // Structure analysis logic (for 'structure' type)
    const analyzeStructure = async () => {
        if (!text) return sendError('Text is required for structure analysis');

        const systemPrompt = `You are an expert essay structure analyst. Evaluate the following essay for organization, coherence, flow, and overall structure. Respond ONLY with valid JSON in this exact format:

{
  "overallStructure": {
    "score": 75,
    "feedback": "General structure feedback"
  },
  "introduction": {
    "score": 80,
    "feedback": "Intro-specific feedback"
  },
  "bodyParagraphs": [
    {
      "paragraphNumber": 1,
      "score": 70,
      "feedback": "Body para feedback",
      "topicSentenceStrength": "strong|weak|missing"
    }
  ],
  "conclusion": {
    "score": 65,
    "feedback": "Conclusion feedback"
  },
  "transitions": {
    "score": 60,
    "feedback": "Transition feedback"
  },
  "coherence": {
    "score": 72,
    "feedback": "Coherence feedback"
  },
  "suggestions": ["Suggestion 1", "Suggestion 2"],
  "strengths": ["Strength 1", "Strength 2"]
}

Essay text: ${text}`;

        try {
            const result = streamText({
                model: google('gemini-2.5-flash'),
                system: systemPrompt,
                prompt: 'Analyze and return JSON only.',
                temperature: 0.2,
                maxOutputTokens: 1500,
            });

            return result.toTextStreamResponse(); // JSON stream
        } catch (error) {
            console.error('Structure analysis error:', error);
            return sendError('Failed to analyze structure', 500);
        }
    };

    // Humanize text logic (for 'humanize' type)
    const humanizeText = async () => {
        if (!text) return sendError('Text is required for humanization');
        if (!strength) return sendError('Strength is required for humanization');

        const strengthMap = {
            light: 'Make mild adjustments to sound more natural while preserving original meaning and structure.',
            medium: 'Rephrase for natural flow, vary sentence structure, and add subtle human-like nuances.',
            strong: 'Completely rewrite to sound authentically human, with varied vocabulary and personal touch, but keep core ideas intact.',
        };

        const systemPrompt = `You are a writing assistant specializing in humanizing AI-generated text. Rewrite the following text to make it sound more natural and human-written, applying ${strengthMap["medium"]} changes. Output ONLY the rewritten text (no explanations or JSON).

Original text: ${text}`;

        try {
            const result = streamText({
                model: google('gemini-2.5-flash'),
                system: systemPrompt,
                prompt: 'Rewrite the text.',
                temperature: 0.8, // Higher for creative rephrasing (best practice for generation)
                maxOutputTokens: 2000,
            });

            return result.toUIMessageStreamResponse(); // Text stream for incremental humanization
        } catch (error) {
            console.error('Humanize text error:', error);
            return sendError('Failed to humanize text', 500);
        }
    };

    // Generate outline logic (for 'outline' type)
    const generateOutline = async () => {
        if (!prompt && !topic) return sendError('Topic is required for outline generation');

        const lengthMap = {
            short: '3-4 paragraphs, concise',
            medium: '5-7 paragraphs, standard',
            long: '8-10 paragraphs, detailed',
        };

        const defaultLength = length || 'medium';
        const defaultType = essayType || 'expository';

        const systemPrompt = `You are an expert essay planner. Generate a detailed outline for a ${defaultType} essay on the topic "${prompt || topic}", aiming for ${lengthMap["medium"]}. Respond ONLY with valid JSON in this exact format (no extra text):

{
  "title": "Suggested essay title",
  "thesisStatement": "Clear, focused thesis",
  "introduction": {
    "hook": "Engaging hook idea",
    "background": "Brief background points",
    "thesisPreview": true
  },
  "bodyParagraphs": [
    {
      "paragraphNumber": 1,
      "topicSentence": "Main idea for this paragraph",
      "supportingPoints": ["Point 1", "Point 2", "Evidence ideas"],
      "estimatedWords": 150
    }
  ],
  "conclusion": {
    "summary": "Key points recap",
    "finalThoughts": "Memorable close or call to action"
  },
  "estimatedWordCount": "${lengthMap["medium"]}",
  "writingTips": ["Tip 1", "Tip 2", "General advice"]
}

Ensure the outline is logical, comprehensive, and tailored to the essay type.`;

        try {
            const result = streamText({
                model: google('gemini-2.5-flash'),
                system: systemPrompt,
                prompt: 'Generate the outline in JSON.',
                temperature: 0.5, // Moderate for structured planning
                maxOutputTokens: 1500,
            });

            return result.toTextStreamResponse(); // JSON stream
        } catch (error) {
            console.error('Outline generation error:', error);
            return sendError('Failed to generate outline', 500);
        }
    };

    // Route based on type (single route handles multiple types for simplicity and modularity)
    try {
        switch (type) {
            case 'generate':
                return await generateEssay();
            case 'grammar':
                return await checkGrammar();
            case 'structure':
                return await analyzeStructure();
            case 'humanize':
                return await humanizeText();
            case 'outline':
                return await generateOutline();
            default:
                return sendError('Invalid request type. Supported: generate, grammar, structure, humanize, outline');
        }
    } catch (error) {
        console.error(`Error in ${type} handler:`, error);
        return sendError(`Failed to process ${type} request`, 500);
    }
}
