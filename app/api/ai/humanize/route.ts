import {createGoogleGenerativeAI} from '@ai-sdk/google';
import { streamText } from 'ai';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(request: Request) {
    const { text, strength = 'medium', style = 'neutral', preserve = 'meaning' } = await request.json();

    if (!text) {
        return new Response(JSON.stringify({ error: 'Text is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Enhanced strength configurations with specific techniques
    const strengthMap = {
        light: {
            description: 'Subtle humanization that maintains professional tone while adding natural flow',
            techniques: [
                'Replace 10-15% of overly formal words with more common alternatives',
                'Vary sentence length slightly (avoid consecutive sentences of similar length)',
                'Add 2-3 natural transition words (however, therefore, meanwhile)',
                'Break up 1-/2 overly long sentences into shorter, clearer ones',
                'Remove formulaic phrases like "in conclusion", "it is important to note"'
            ],
            tone: 'Professional but approachable',
            formality: 'Semi-formal'
        },
        medium: {
            description: 'Balanced humanization that sounds naturally human while preserving credibility',
            techniques: [
                'Replace 20-30% of formal words with conversational alternatives',
                'Introduce 3-4 contractions where appropriate (it\'s, don\'t, you\'re)',
                'Vary sentence structure significantly (mix simple, compound, complex)',
                'Add rhetorical questions to engage readers',
                'Include 1-2 brief personal reflections or perspectives',
                'Replace passive voice with active voice in 50% of cases',
                'Add natural-sounding idioms or expressions'
            ],
            tone: 'Natural and conversational',
            formality: 'Informal'
        },
        strong: {
            description: 'Complete humanization that sounds like a natural conversation or personal writing',
            techniques: [
                'Replace 40-50% of formal words with common alternatives',
                'Use contractions frequently and naturally',
                'Add personal anecdotes or examples where relevant',
                'Include opinions, feelings, or personal perspectives',
                'Use informal language and colloquialisms appropriately',
                'Break grammar rules slightly for effect (sentence fragments, etc.)',
                'Add direct address to reader (you, your)',
                'Include humor, wit, or personality where appropriate'
            ],
            tone: 'Personal and conversational',
            formality: 'Casual'
        }
    };

    // Style presets for different contexts
    const styleMap = {
        neutral: {
            description: 'Balanced, objective tone suitable for general content',
            characteristics: 'Avoid strong emotions, maintain moderate vocabulary, focus on clarity'
        },
        academic: {
            description: 'Scholarly tone with some humanization for better readability',
            characteristics: 'Preserve technical terms, add natural flow, include thoughtful transitions'
        },
        professional: {
            description: 'Business-appropriate tone with natural human elements',
            characteristics: 'Clear, direct language, moderate formality, purpose-driven communication'
        },
        creative: {
            description: 'Artistic, expressive tone with vivid language',
            characteristics: 'Metaphors, sensory details, imaginative expressions, emotional resonance'
        },
        casual: {
            description: 'Relaxed, friendly tone for informal contexts',
            characteristics: 'Everyday language, personal touch, conversational flow'
        }
    };

    // Preservation priorities
    const preserveMap = {
        meaning: 'Focus on preserving the exact meaning while changing expression',
        tone: 'Maintain the original tone and emotional impact',
        structure: 'Keep the original paragraph structure and organization',
        length: 'Maintain approximately the same word count',
        key_terms: 'Preserve important technical terms and specialized vocabulary'
    };

    const selectedStrength = strengthMap[strength as keyof typeof strengthMap] || strengthMap.medium;
    const selectedStyle = styleMap[style as keyof typeof styleMap] || styleMap.neutral;
    const selectedPreserve = preserveMap[preserve as keyof typeof preserveMap] || preserveMap.meaning;

    // Analyze text characteristics for better humanization
    const textAnalysis = {
        wordCount: text.split(/\s+/).length,
        sentenceCount: text.split(/[.!?]+/).length,
        avgWordsPerSentence: text.split(/\s+/).length / Math.max(1, text.split(/[.!?]+/).length),
        formalWords: ['furthermore', 'consequently', 'nevertheless', 'utilize', 'implement', 'facilitate'].filter(word =>
            text.toLowerCase().includes(word.toLowerCase())
        ).length,
        passiveVoice: (text.match(/\b(is|are|was|were|be|been|being)\s+\w+ed\b/gi) || []).length
    };

    // Build comprehensive system prompt
    const systemPrompt = `You are an expert linguistic specialist with advanced skills in transforming AI-generated text into natural, human-like writing. Your task is to rewrite the provided text to sound authentic and natural.

HUMANIZATION PARAMETERS:
Strength Level: ${selectedStrength.description}
Style: ${selectedStyle.description}
Preservation Priority: ${selectedPreserve}

TEXT ANALYSIS:
- Word count: ${textAnalysis.wordCount} words
- Sentence count: ${textAnalysis.sentenceCount} sentences
- Average words per sentence: ${textAnalysis.avgWordsPerSentence.toFixed(1)}
- Formal words detected: ${textAnalysis.formalWords}
- Passive voice instances: ${textAnalysis.passiveVoice}

SPECIFIC TECHNIQUES TO APPLY:
${selectedStrength.techniques.map((technique, index) => `${index + 1}. ${technique}`).join('\n')}

STYLE REQUIREMENTS:
${selectedStyle.characteristics}

HUMANIZATION GUIDELINES:
1. Readability: Ensure the text flows naturally when read aloud
2. Rhythm: Vary sentence length and structure for better rhythm
3. Voice: Create a consistent, authentic voice throughout
4. Flow: Add natural transitions between ideas and paragraphs
5. Authenticity: Remove any robotic, formulaic, or AI-like patterns
6. Engagement: Make the text more engaging and relatable to readers

AVOID THESE PITFALLS:
- Over-correction that changes the core message
- Inconsistent tone or voice
- Excessive informality inappropriate for the context
- Adding information not present in the original text
- Removing essential details or qualifications

PROFESSIONAL STANDARDS:
- Maintain accuracy and factual integrity
- Preserve any technical terms or specialized vocabulary
- Ensure grammatical correctness (unless intentional stylistic choice)
- Keep the text appropriate for the intended audience and context

Return only the humanized text without any explanations, metadata, or commentary. The output should be ready to use as-is.`;

    try {
        const result = streamText({
            model: google('gemini-2.5-flash'),
            system: systemPrompt,
            prompt: `Please humanize the following text using the specified parameters:\n\n${text}`,
            temperature: 0.8,
            maxOutputTokens: Math.max(1500, text.length + 200), // Ensure enough tokens for humanization
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