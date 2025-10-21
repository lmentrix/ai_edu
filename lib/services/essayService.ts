// @/lib/services/essayService.ts
import {
    GrammarResult,
    StructureResult,
    OutlineResult
} from '../viewModels/essayViewModel'; // Adjust path as needed

// Essay AI Service - Handles all AI-powered essay operations
export class EssayService {
    private static baseUrl = '/api/ai'; // Unified base for all endpoints

    /**
     * Generic streaming fetch helper (reusable for all methods)
     */
    private static async fetchStream(
        endpoint: string,
        body: any,
        onChunk?: (chunk: string) => void
    ): Promise<string | any> {
        const controller = new AbortController(); // For cancellable requests
        const signal = controller.signal;

        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                signal, // Abort support
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `API Error: ${response.status} - ${response.statusText}`);
            }

            if (!response.body) {
                throw new Error('No streaming body available.');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulated = '';

            try {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        const trimmedLine = line.trim();
                        if (!trimmedLine) continue;

                        let dataStr: string;
                        if (trimmedLine.startsWith('data: ')) {
                            // Standard SSE from AI SDK (single-turn, e.g., streamText + toUIMessageStreamResponse)
                            dataStr = trimmedLine.slice(6).trim();
                        } else if (trimmedLine.startsWith('0:')) {
                            // Fallback for chat-style UI streams (multi-message, indexed)
                            dataStr = trimmedLine.slice(2).trim();
                        } else {
                            continue; // Ignore non-matching lines (e.g., headers, [DONE])
                        }

                        if (dataStr === '[DONE]') break;

                        try {
                            const data = JSON.parse(dataStr);
                            if (data.type === 'text-delta' && (data.textDelta || data.delta)) {
                                const delta = data.textDelta || data.delta;
                                accumulated += delta;
                                onChunk?.(accumulated);
                            } else if (typeof data === 'string') {
                                accumulated += data;
                                onChunk?.(data);
                            } else if (data.type === 'finish' || data.done) {
                                // Stream end
                                break;
                            } else {
                                // For JSON results (e.g., grammar), accumulate and parse at end
                                accumulated += JSON.stringify(data);
                            }
                        } catch (parseError) {
                            console.warn('Parse error in stream chunk:', parseError, dataStr);
                            // Fallback: Treat as raw text
                            accumulated += dataStr;
                            onChunk?.(dataStr);
                        }
                    }
                }
                return accumulated;
            } finally {
                reader.releaseLock();
            }
        } catch (error) {
            if (error=== 'AbortError') {
                throw new Error('Request was aborted.');
            }
            throw error;
        }
    }

    /**
     * Generate an essay based on topic, type, and length
     */
    static async generateEssay(
        topic: string,
        essayType: string = 'expository',
        length: 'short' | 'medium' | 'long' = 'medium',
        onChunk?: (chunk: string) => void
    ): Promise<string> {
        if (!topic.trim()) throw new Error('Topic is required.');
        try {
            const body = { type: 'generate', prompt: topic, essayType, length, topic }; // Include 'topic' for original route compat
            const result = await this.fetchStream('essay', body, onChunk);

            // For text generation, return accumulated string
            // If JSON-wrapped, parse if needed (e.g., { essay: "text" })
            if (typeof result === 'string') return result;
            return JSON.stringify(result); // Fallback
        } catch (error) {
            console.error('Error generating essay:', error);
            throw new Error('Failed to generate essay. Please try again.');
        }
    }

    /**
     * Check grammar and provide corrections
     */
    static async checkGrammar(text: string): Promise<GrammarResult> {
        if (!text.trim()) throw new Error('Text is required.');
        try {
            const body = { type: 'grammar', text };
            const result = await this.fetchStream('grammar', body);

            // Parse as JSON for structured result
            return typeof result === 'string' ? JSON.parse(result) : result;
        } catch (error) {
            console.error('Error checking grammar:', error);
            throw new Error('Failed to check grammar. Please try again.');
        }
    }

    /**
     * Analyze essay structure
     */
    static async analyzeStructure(text: string): Promise<StructureResult> {
        if (!text.trim()) throw new Error('Text is required.');
        try {
            const body = { type: 'structure', text };
            const result = await this.fetchStream('structure', body);

            return typeof result === 'string' ? JSON.parse(result) : result;
        } catch (error) {
            console.error('Error analyzing structure:', error);
            throw new Error('Failed to analyze structure. Please try again.');
        }
    }

    /**
     * Humanize AI-generated text
     */
    static async humanizeText(
        text: string,
        strength: 'light' | 'medium' | 'strong' = 'medium',
        onChunk?: (chunk: string) => void
    ): Promise<string> {
        if (!text.trim()) throw new Error('Text is required.');
        try {
            const body = { type: 'humanize', text, strength };
            const result = await this.fetchStream('humanize', body, onChunk);
            return typeof result === 'string' ? result : JSON.stringify(result);
        } catch (error) {
            console.error('Error humanizing text:', error);
            throw new Error('Failed to humanize text. Please try again.');
        }
    }

    /**
     * Generate essay outline
     */
    static async generateOutline(
        topic: string,
        essayType: string = 'expository',
        length: 'short' | 'medium' | 'long' = 'medium'
    ): Promise<OutlineResult> {
        if (!topic.trim()) throw new Error('Topic is required.');
        try {
            const body = { type: 'outline', topic, essayType, length };
            const result = await this.fetchStream('outline', body);

            return typeof result === 'string' ? JSON.parse(result) : result;
        } catch (error) {
            console.error('Error generating outline:', error);
            throw new Error('Failed to generate outline. Please try again.');
        }
    }

    // Add abort method if needed (e.g., for UI "Stop" button)
    static abortAllRequests(): void {
        // Implement global AbortController if multiple requests
        console.log('Aborting all ongoing requests...');
    }
}
