import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToModelMessages, UIMessage } from 'ai';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(request: Request) {
    const { type, prompt, essayType, length, topic, text, strength, messages }: {
        type?: string;
        prompt?: string;
        essayType?: string;
        length?: string;
        topic?: string;
        text?: string;
        strength?: string;
        messages?: UIMessage[];
    } = await request.json();

    // Shared error response helper
    const sendError = (message: string, status = 400) =>
        new Response(JSON.stringify({ error: message }), {
            status,
            headers: { 'Content-Type': 'application/json' },
        });

    // Base essay generation logic (for 'generate' type)
    const generateEssay = async () => {
        const lengthDetails: Record<string, { words: string; paragraphs: string; structure: string }> = {
            short: {
                words: '300-500 words',
                paragraphs: '3-4 paragraphs',
                structure: 'Introduction (1 paragraph), Body (1-2 paragraphs), Conclusion (1 paragraph)'
            },
            medium: {
                words: '600-900 words',
                paragraphs: '5-7 paragraphs',
                structure: 'Introduction (1 paragraph), Body (3-5 paragraphs), Conclusion (1 paragraph)'
            },
            long: {
                words: '1000-1500 words',
                paragraphs: '8-10 paragraphs',
                structure: 'Introduction (1-2 paragraphs), Body (6-7 paragraphs), Conclusion (1-2 paragraphs)'
            },
        };

        const essayTypePrompts: Record<string, {
            description: string;
            structure: string;
            tone: string;
            techniques: string;
            exampleIntro: string;
        }> = {
            argumentative: {
                description: 'persuasive argumentative essay that takes a clear position on a controversial topic',
                structure: 'Begin with a compelling hook that presents the controversy, state your clear thesis in the introduction, dedicate each body paragraph to a specific argument with evidence, address and refute counterarguments, and conclude with a powerful restatement of your position and call to action.',
                tone: 'Confident, authoritative, evidence-based, and persuasive',
                techniques: 'Use logical reasoning (logos), emotional appeals (pathos), and establish credibility (ethos). Incorporate statistical data, expert opinions, and real-world examples.',
                exampleIntro: 'In an era where [topic controversy], one position stands out as both logically sound and ethically compelling: [your thesis].'
            },
            expository: {
                description: 'informative expository essay that thoroughly explains a complex topic',
                structure: 'Start with a clear definition of your topic in the introduction, organize body paragraphs around distinct aspects of the topic, use the compare-contrast, cause-effect, or problem-solution structure as appropriate, and conclude with a synthesis of key points and their broader significance.',
                tone: 'Objective, informative, analytical, and educational',
                techniques: 'Use clear topic sentences, provide concrete examples and data, define specialized terminology, and maintain a neutral perspective while thoroughly covering all facets of the topic.',
                exampleIntro: 'Understanding [topic] requires examining its fundamental components, historical development, and contemporary implications.'
            },
            narrative: {
                description: 'compelling narrative essay that tells a meaningful personal story',
                structure: 'Create a narrative arc with vivid exposition that establishes context, build rising action through specific scenes and dialogue, reach a climactic moment of realization or transformation, include falling action that shows consequences, and end with resolution that reflects on the story\'s significance.',
                tone: 'Personal, reflective, evocative, and authentic',
                techniques: 'Use sensory details, dialogue, specific anecdotes, temporal transitions, and introspective reflection. Show rather than tell through concrete scenes and actions.',
                exampleIntro: 'The moment that changed everything began like any other [ordinary circumstance], but by its end, [transformation].'
            },
            descriptive: {
                description: 'vivid descriptive essay that creates a powerful sensory impression',
                structure: 'Organize spatially (near to far, inside to outside) or by importance (most striking to least striking), begin with an overall impression, dedicate body paragraphs to different sensory dimensions or aspects of the subject, and conclude with the emotional impact or significance of what you\'ve described.',
                tone: 'Evocative, immersive, detailed, and atmospheric',
                techniques: 'Engage all five senses, use figurative language (metaphors, similes, personification), select precise adjectives and verbs, and create a dominant mood.',
                exampleIntro: 'To truly understand [subject], one must experience it through every sense—seeing, hearing, smelling, tasting, and touching.'
            },
            compare: {
                description: 'insightful compare and contrast essay that reveals meaningful relationships between subjects',
                structure: 'Choose either point-by-point (alternating between subjects) or block method (all about one subject, then all about the other). Begin with a clear thesis that states the significance of the comparison, use parallel structure for balanced treatment, and conclude with insights about the relationship or evaluation of which subject is superior in certain respects.',
                tone: 'Analytical, balanced, evaluative, and insightful',
                techniques: 'Use transition words for comparison (similarly, likewise) and contrast (however, in contrast), establish clear criteria for comparison, and draw meaningful conclusions from similarities and differences.',
                exampleIntro: 'While [subject A] and [subject B] may appear similar at first glance, a closer examination reveals crucial differences in [key aspects].'
            },
        };

        const defaultType = (essayType as string) || 'expository';
        const defaultLength = (length as string) || 'medium';
        
        const lengthInfo = lengthDetails[defaultLength];
        const typeInfo = essayTypePrompts[defaultType];

        // Calculate approximate words per paragraph for guidance
        const wordCount = lengthInfo.words.split('-').map(w => parseInt(w));
        const avgWords = Math.round((wordCount[0] + wordCount[1]) / 2);
        const paragraphCount = parseInt(lengthInfo.paragraphs.split('-')[1]);
        const wordsPerParagraph = Math.round(avgWords / paragraphCount);

        const systemPrompt = `You are an expert academic writer with extensive experience in crafting high-quality essays. Your task is to write an exceptional ${typeInfo.description} that is exactly ${lengthInfo.words} (${lengthInfo.paragraphs}).

ESSAY STRUCTURE:
${lengthInfo.structure}
Each paragraph should be approximately ${wordsPerParagraph} words.

STYLE-SPECIFIC REQUIREMENTS:
${typeInfo.structure}

TONE AND VOICE:
Maintain a ${typeInfo.tone} throughout the essay.

LITERARY TECHNIQUES:
${typeInfo.techniques}

CONTENT STANDARDS:
- Develop a clear, focused thesis that guides your entire essay
- Each paragraph should explore a single main idea with a strong topic sentence
- Provide specific examples, evidence, or details to support your points
- Include smooth transitions between paragraphs using appropriate transition words and phrases
- Use sophisticated vocabulary and varied sentence structures (simple, compound, complex, and compound-complex)
- Demonstrate critical thinking and deep analysis of the topic
- Avoid clichés, generic statements, and superficial observations
- Ensure logical flow and coherence from introduction to conclusion

INTRODUCTION REQUIREMENTS:
- Begin with an engaging hook that captures the reader's attention
- Provide necessary background context for your topic
- End with a clear thesis statement that presents your main argument or purpose
Example approach: "${typeInfo.exampleIntro}"

BODY PARAGRAPH REQUIREMENTS:
- Each paragraph should begin with a clear topic sentence that connects to the thesis
- Provide 2-3 pieces of supporting evidence (facts, statistics, examples, quotes)
- Include analysis that explains how the evidence supports your topic sentence
- End each paragraph with a concluding thought or transition to the next paragraph

CONCLUSION REQUIREMENTS:
- Restate your thesis in a fresh way (don't simply repeat it)
- Summarize your main points without introducing new information
- End with a memorable final thought, call to action, or implication for the future

FORMATTING:
- Write in standard paragraph format without headings or section markers
- Use proper indentation for new paragraphs
- Ensure your essay flows naturally from one idea to the next
- Maintain consistent formatting throughout

Write a compelling, well-structured essay on the given topic that demonstrates advanced writing skills and deep understanding of the subject matter. Focus on creating a piece that is both informative and engaging, with a clear voice and purpose.`;

        try {
            // Support both chat messages and simple prompt/topic
            let essayPrompt = prompt || topic;
            
            // If chat messages are provided, extract the topic from the last user message
            if (messages && messages.length > 0) {
                const lastUserMessage = messages.filter((m: UIMessage) => m.role === 'user').pop();
                if (lastUserMessage) {
                    const textPart = lastUserMessage.parts.find((p: any) => p.type === 'text');
                    if (textPart) {
                        essayPrompt = (textPart as any).text;
                    }
                }
            }

            const result = streamText({
                model: google('gemini-2.5-flash'),
                system: systemPrompt,
                // Use messages if provided (chat mode), otherwise use simple prompt
                ...(messages ? { messages: convertToModelMessages(messages) } : { prompt: `Write an essay about: ${essayPrompt}` }),
                temperature: 0.7,
                maxOutputTokens: defaultLength === 'long' ? 3000 : defaultLength === 'medium' ? 2000 : 1000,
            });

            return result.toUIMessageStreamResponse();
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

        const strengthMap: Record<string, string> = {
            light: 'Make mild adjustments to sound more natural while preserving original meaning and structure.',
            medium: 'Rephrase for natural flow, vary sentence structure, and add subtle human-like nuances.',
            strong: 'Completely rewrite to sound authentically human, with varied vocabulary and personal touch, but keep core ideas intact.',
        };

        const defaultStrength = (strength as string) || 'medium';

        const systemPrompt = `You are a writing assistant specializing in humanizing AI-generated text. Rewrite the following text to make it sound more natural and human-written, applying ${strengthMap[defaultStrength]} changes. Output ONLY the rewritten text (no explanations or JSON).

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

        const lengthMap: Record<string, string> = {
            short: '3-4 paragraphs, concise',
            medium: '5-7 paragraphs, standard',
            long: '8-10 paragraphs, detailed',
        };

        const defaultLength = (length as string) || 'medium';
        const defaultType = (essayType as string) || 'expository';

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

    // Chat-based essay generation (for useChat hook)
    const chatGenerateEssay = async () => {
        // For chat mode, we use the same logic but with messages
        return await generateEssay();
    };

    // Route based on type (single route handles multiple types for simplicity and modularity)
    try {
        // Support both legacy type-based routing and new chat-based routing
        if (type === 'generate' || (!type && messages)) {
            return await generateEssay();
        } else if (type) {
            switch (type) {
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
        } else {
            // Default to essay generation if no type is specified
            return await generateEssay();
        }
    } catch (error) {
        console.error(`Error in ${type || 'essay generation'} handler:`, error);
        return sendError(`Failed to process ${type || 'essay generation'} request`, 500);
    }
}
