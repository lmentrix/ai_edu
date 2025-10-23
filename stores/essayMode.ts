import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Essay style types
export interface EssayStyle {
  value: string
  label: string
  description: string
  color: string
}

// Essay generation parameters
export interface EssayGenerationParams {
  topic: string
  essayType: 'argumentative' | 'expository' | 'narrative' | 'descriptive' | 'compare'
  length: 'short' | 'medium' | 'long'
  style: string
}

// Essay analysis results
export interface GrammarResult {
  overallScore: number
  feedback: string
  issues: Array<{
    type: string
    message: string
    position: number
  }>
}

export interface StructureResult {
  overallStructure: {
    score: number
    feedback: string
  }
  suggestions: string[]
}

export interface OutlineData {
  title: string
  thesisStatement: string
  introduction: {
    hook: string
    background: string
  }
  bodyParagraphs: Array<{
    topicSentence: string
    supportingPoints: string[]
  }>
  conclusion: {
    summary: string
    finalThought: string
  }
}

// Essay mode state interface
interface EssayModeState {
  // Essay content and basic info
  essay: string
  wordCount: number
  characterCount: number
  
  // Style selection
  selectedStyle: string
  availableStyles: EssayStyle[]
  
  // Generation parameters
  topic: string
  essayType: 'argumentative' | 'expository' | 'narrative' | 'descriptive' | 'compare'
  essayLength: 'short' | 'medium' | 'long'
  
  // UI states
  isGenerating: boolean
  isCheckingGrammar: boolean
  isAnalyzingStructure: boolean
  isHumanizing: boolean
  isGeneratingOutline: boolean
  showOutline: boolean
  
  // Results
  grammarResult: GrammarResult | null
  structureResult: StructureResult | null
  outlineData: OutlineData | null
  
  // Settings
  maxLength: number
  showWordCount: boolean
  showGrammarCheck: boolean
  showStructureAnalysis: boolean
  showHumanizeOption: boolean
  showOutlineGeneration: boolean
}

// Essay mode actions interface
interface EssayModeActions {
  // Content actions
  setEssay: (essay: string) => void
  clearEssay: () => void
  updateWordCount: () => void
  
  // Style actions
  setSelectedStyle: (style: string) => void
  applyStyle: () => void
  
  // Parameter actions
  setTopic: (topic: string) => void
  setEssayType: (type: EssayGenerationParams['essayType']) => void
  setEssayLength: (length: EssayGenerationParams['length']) => void
  
  // Generation actions
  generateEssay: () => Promise<void>
  generateStreamingEssay: (onMessage?: (text: string) => void) => Promise<void>
  generateOutline: () => Promise<void>
  
  // Analysis actions
  checkGrammar: () => Promise<void>
  analyzeStructure: () => Promise<void>
  humanizeText: (strength?: string) => Promise<void>
  
  // UI actions
  setShowOutline: (show: boolean) => void
  clearResults: () => void
  
  // Settings actions
  setMaxLength: (length: number) => void
  toggleWordCount: () => void
  toggleGrammarCheck: () => void
  toggleStructureAnalysis: () => void
  toggleHumanizeOption: () => void
  toggleOutlineGeneration: () => void
  
  // Utility actions
  copyEssay: () => Promise<void>
  downloadEssay: () => void
  resetStore: () => void
}

// Initial essay styles
const initialEssayStyles: EssayStyle[] = [
  {
    value: 'academic',
    label: 'Academic',
    description: 'Formal, evidence-based writing with proper citations',
    color: 'from-blue-500 to-blue-600'
  },
  {
    value: 'narrative',
    label: 'Narrative',
    description: 'Storytelling approach with personal experiences',
    color: 'from-purple-500 to-purple-600'
  },
  {
    value: 'persuasive',
    label: 'Persuasive',
    description: 'Convincing arguments to sway the reader',
    color: 'from-green-500 to-green-600'
  },
  {
    value: 'expository',
    label: 'Expository',
    description: 'Informative writing that explains a topic',
    color: 'from-orange-500 to-orange-600'
  },
  {
    value: 'descriptive',
    label: 'Descriptive',
    description: 'Vivid details that paint a picture',
    color: 'from-pink-500 to-pink-600'
  },
  {
    value: 'argumentative',
    label: 'Argumentative',
    description: 'Logical reasoning with counterarguments',
    color: 'from-red-500 to-red-600'
  },
  {
    value: 'compare-contrast',
    label: 'Compare & Contrast',
    description: 'Analyzing similarities and differences',
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    value: 'cause-effect',
    label: 'Cause & Effect',
    description: 'Explaining relationships between events',
    color: 'from-teal-500 to-teal-600'
  }
]

// Create the store
export const useEssayModeStore = create<EssayModeState & EssayModeActions>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        essay: '',
        wordCount: 0,
        characterCount: 0,
        selectedStyle: '',
        availableStyles: initialEssayStyles,
        topic: '',
        essayType: 'expository',
        essayLength: 'medium',
        isGenerating: false,
        isCheckingGrammar: false,
        isAnalyzingStructure: false,
        isHumanizing: false,
        isGeneratingOutline: false,
        showOutline: false,
        grammarResult: null,
        structureResult: null,
        outlineData: null,
        maxLength: 5000,
        showWordCount: true,
        showGrammarCheck: true,
        showStructureAnalysis: true,
        showHumanizeOption: true,
        showOutlineGeneration: true,

        // Content actions
        setEssay: (essay: string) => {
          const characterCount = essay.length
          const wordCount = essay.trim().split(/\s+/).filter(word => word.length > 0).length
          set({ essay, characterCount, wordCount })
        },

        clearEssay: () => {
          set({ 
            essay: '', 
            wordCount: 0, 
            characterCount: 0,
            grammarResult: null,
            structureResult: null
          })
        },

        updateWordCount: () => {
          const { essay } = get()
          const characterCount = essay.length
          const wordCount = essay.trim().split(/\s+/).filter(word => word.length > 0).length
          set({ characterCount, wordCount })
        },

        // Style actions
        setSelectedStyle: (style: string) => {
          const state = get()
          set({ selectedStyle: style })
          
          // Auto-map style to essay type for better alignment
          const styleToTypeMap: Record<string, EssayGenerationParams['essayType']> = {
            'academic': 'expository',
            'narrative': 'narrative',
            'persuasive': 'argumentative',
            'expository': 'expository',
            'descriptive': 'descriptive',
            'argumentative': 'argumentative',
            'compare-contrast': 'compare',
            'cause-effect': 'expository'
          }
          
          const mappedType = styleToTypeMap[style]
          if (mappedType && mappedType !== state.essayType) {
            set({ essayType: mappedType })
          }
        },

        applyStyle: () => {
          const { selectedStyle, essay } = get()
          if (selectedStyle) {
            console.log(`Applied essay style: ${selectedStyle}`)
            // Here you would typically apply the style to the essay
            // This could modify the essay content or trigger a regeneration
            // For now, just log the action
          }
        },

        // Parameter actions
        setTopic: (topic: string) => {
          set({ topic })
        },

        setEssayType: (type: EssayGenerationParams['essayType']) => {
          set({ essayType: type })
        },

        setEssayLength: (length: EssayGenerationParams['length']) => {
          set({ essayLength: length })
        },

        // Generation actions
        generateEssay: async () => {
          const { topic, essayType, essayLength, selectedStyle } = get()
          if (!topic.trim()) return

          set({ isGenerating: true })
          try {
            const response = await fetch('/api/ai/essay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'generate',
                prompt: topic,
                essayType,
                length: essayLength,
                style: selectedStyle
              }),
            })

            if (!response.ok) throw new Error('Failed to generate essay')

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let generatedText = ''

            if (reader) {
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                
                const chunk = decoder.decode(value)
                const lines = chunk.split('\n')
                
                for (const line of lines) {
                  if (line.startsWith('0:')) {
                    const content = line.slice(2)
                    try {
                      const parsed = JSON.parse(content)
                      if (parsed.text) {
                        generatedText += parsed.text
                        get().setEssay(generatedText)
                      }
                    } catch (e) {
                      // Skip parsing errors
                    }
                  }
                }
              }
            }
          } catch (error) {
            console.error('Error generating essay:', error)
          } finally {
            set({ isGenerating: false })
          }
        },

        // New chat-based essay generation method using existing API route
        generateStreamingEssay: async (onMessage?: (text: string) => void) => {
          const { topic, essayType, essayLength, selectedStyle } = get()
          if (!topic.trim()) return

          set({ isGenerating: true })
          try {
            const response = await fetch('/api/ai/essay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'generate',
                messages: [{ role: 'user', parts: [{ type: 'text', text: topic }] }],
                essayType,
                length: essayLength,
                topic
              }),
            })

            if (!response.ok) throw new Error('Failed to generate essay')

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let generatedText = ''

            if (reader) {
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                
                const chunk = decoder.decode(value)
                const lines = chunk.split('\n')
                
                for (const line of lines) {
                  if (line.startsWith('0:')) {
                    const content = line.slice(2)
                    try {
                      const parsed = JSON.parse(content)
                      if (parsed.text) {
                        generatedText += parsed.text
                        get().setEssay(generatedText)
                        onMessage?.(generatedText)
                      }
                    } catch (e) {
                      // Skip parsing errors
                    }
                  }
                }
              }
            }
          } catch (error) {
            console.error('Error generating streaming essay:', error)
          } finally {
            set({ isGenerating: false })
          }
        },

        generateOutline: async () => {
          const { topic, essayType, essayLength } = get()
          if (!topic.trim()) return

          set({ isGeneratingOutline: true })
          try {
            const response = await fetch('/api/ai/essay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'outline',
                prompt: topic,
                essayType,
                length: essayLength
              }),
            })

            if (!response.ok) throw new Error('Failed to generate outline')

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let resultText = ''

            if (reader) {
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                
                const chunk = decoder.decode(value)
                resultText += chunk
              }
            }

            try {
              const result = JSON.parse(resultText)
              set({ outlineData: result, showOutline: true })
            } catch (e) {
              console.error('Error parsing outline result:', e)
            }
          } catch (error) {
            console.error('Error generating outline:', error)
          } finally {
            set({ isGeneratingOutline: false })
          }
        },

        // Analysis actions
        checkGrammar: async () => {
          const { essay } = get()
          if (!essay.trim()) return

          set({ isCheckingGrammar: true })
          try {
            const response = await fetch('/api/ai/essay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'grammar',
                text: essay
              }),
            })

            if (!response.ok) throw new Error('Failed to check grammar')

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let resultText = ''

            if (reader) {
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                
                const chunk = decoder.decode(value)
                resultText += chunk
              }
            }

            try {
              const result = JSON.parse(resultText)
              set({ grammarResult: result })
            } catch (e) {
              console.error('Error parsing grammar result:', e)
            }
          } catch (error) {
            console.error('Error checking grammar:', error)
          } finally {
            set({ isCheckingGrammar: false })
          }
        },

        analyzeStructure: async () => {
          const { essay } = get()
          if (!essay.trim()) return

          set({ isAnalyzingStructure: true })
          try {
            const response = await fetch('/api/ai/essay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'structure',
                text: essay
              }),
            })

            if (!response.ok) throw new Error('Failed to analyze structure')

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let resultText = ''

            if (reader) {
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                
                const chunk = decoder.decode(value)
                resultText += chunk
              }
            }

            try {
              const result = JSON.parse(resultText)
              set({ structureResult: result })
            } catch (e) {
              console.error('Error parsing structure result:', e)
            }
          } catch (error) {
            console.error('Error analyzing structure:', error)
          } finally {
            set({ isAnalyzingStructure: false })
          }
        },

        humanizeText: async (strength: 'light' | 'medium' | 'strong' = 'medium') => {
          const { essay } = get()
          if (!essay.trim()) return

          set({ isHumanizing: true })
          try {
            const response = await fetch('/api/ai/essay', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 'humanize',
                text: essay,
                strength
              }),
            })

            if (!response.ok) throw new Error('Failed to humanize text')

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let humanizedText = ''

            if (reader) {
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                
                const chunk = decoder.decode(value)
                const lines = chunk.split('\n')
                
                for (const line of lines) {
                  if (line.startsWith('0:')) {
                    const content = line.slice(2)
                    try {
                      const parsed = JSON.parse(content)
                      if (parsed.text) {
                        humanizedText += parsed.text
                        get().setEssay(humanizedText)
                      }
                    } catch (e) {
                      // Skip parsing errors
                    }
                  }
                }
              }
            }
          } catch (error) {
            console.error('Error humanizing text:', error)
          } finally {
            set({ isHumanizing: false })
          }
        },

        // UI actions
        setShowOutline: (show: boolean) => {
          set({ showOutline: show })
        },

        clearResults: () => {
          set({
            grammarResult: null,
            structureResult: null,
            outlineData: null,
            showOutline: false
          })
        },

        // Settings actions
        setMaxLength: (length: number) => {
          set({ maxLength: length })
        },

        toggleWordCount: () => {
          set((state) => ({ showWordCount: !state.showWordCount }))
        },

        toggleGrammarCheck: () => {
          set((state) => ({ showGrammarCheck: !state.showGrammarCheck }))
        },

        toggleStructureAnalysis: () => {
          set((state) => ({ showStructureAnalysis: !state.showStructureAnalysis }))
        },

        toggleHumanizeOption: () => {
          set((state) => ({ showHumanizeOption: !state.showHumanizeOption }))
        },

        toggleOutlineGeneration: () => {
          set((state) => ({ showOutlineGeneration: !state.showOutlineGeneration }))
        },

        // Utility actions
        copyEssay: async () => {
          const { essay } = get()
          await navigator.clipboard.writeText(essay)
        },

        downloadEssay: () => {
          const { essay } = get()
          const blob = new Blob([essay], { type: 'text/plain' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'essay.txt'
          a.click()
          URL.revokeObjectURL(url)
        },

        resetStore: () => {
          set({
            essay: '',
            wordCount: 0,
            characterCount: 0,
            selectedStyle: '',
            topic: '',
            essayType: 'expository',
            essayLength: 'medium',
            isGenerating: false,
            isCheckingGrammar: false,
            isAnalyzingStructure: false,
            isHumanizing: false,
            isGeneratingOutline: false,
            showOutline: false,
            grammarResult: null,
            structureResult: null,
            outlineData: null
          })
        }
      }),
      {
        name: 'essay-mode-storage',
        partialize: (state) => ({
          essay: state.essay,
          selectedStyle: state.selectedStyle,
          essayType: state.essayType,
          essayLength: state.essayLength,
          maxLength: state.maxLength,
          showWordCount: state.showWordCount,
          showGrammarCheck: state.showGrammarCheck,
          showStructureAnalysis: state.showStructureAnalysis,
          showHumanizeOption: state.showHumanizeOption,
          showOutlineGeneration: state.showOutlineGeneration
        })
      }
    )
  )
)