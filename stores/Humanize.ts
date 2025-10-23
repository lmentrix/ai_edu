import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

// Humanization strength levels
export type HumanizeStrength = 'light' | 'medium' | 'strong'

// Humanization styles
export type HumanizeStyle = 'neutral' | 'academic' | 'professional' | 'creative' | 'casual'

// Preservation priorities
export type PreservePriority = 'meaning' | 'tone' | 'structure' | 'length' | 'key_terms'

// Humanization result interface
export interface HumanizeResult {
  originalText: string
  humanizedText: string
  strength: HumanizeStrength
  style: HumanizeStyle
  preserve: PreservePriority
  timestamp: number
}

// Humanization configuration
export interface HumanizeConfig {
  strength: HumanizeStrength
  style: HumanizeStyle
  preserve: PreservePriority
}

// Humanize state interface
interface HumanizeState {
  // Input and output
  inputText: string
  results: HumanizeResult[]
  
  // Configuration
  config: HumanizeConfig
  
  // UI states
  isProcessing: boolean
  currentProcessingIndex: number | null
  
  // History management
  history: HumanizeResult[]
  maxHistorySize: number
  
  // Settings
  showComparison: boolean
  autoSaveResults: boolean
  showAdvancedOptions: boolean
}

// Humanize actions interface
interface HumanizeActions {
  // Text actions
  setInputText: (text: string) => void
  clearInputText: () => void
  
  // Configuration actions
  setStrength: (strength: HumanizeStrength) => void
  setStyle: (style: HumanizeStyle) => void
  setPreserve: (preserve: PreservePriority) => void
  updateConfig: (config: Partial<HumanizeConfig>) => void
  resetConfig: () => void
  
  // Processing actions
  humanizeText: (text?: string) => Promise<void>
  humanizeWithConfig: (text: string, config: HumanizeConfig) => Promise<void>
  
  // Result management
  addResult: (result: HumanizeResult) => void
  removeResult: (index: number) => void
  clearResults: () => void
  useResult: (index: number) => void
  
  // History management
  addToHistory: (result: HumanizeResult) => void
  clearHistory: () => void
  
  // Settings actions
  toggleComparison: () => void
  toggleAutoSave: () => void
  toggleAdvancedOptions: () => void
  setMaxHistorySize: (size: number) => void
  
  // Utility actions
  resetStore: () => void
  exportResults: () => string
  importResults: (data: string) => boolean
}

// Default configuration
const defaultConfig: HumanizeConfig = {
  strength: 'medium',
  style: 'neutral',
  preserve: 'meaning'
}

// Strength descriptions
export const strengthDescriptions = {
  light: 'Subtle humanization that maintains professional tone while adding natural flow',
  medium: 'Balanced humanization that sounds naturally human while preserving credibility',
  strong: 'Complete humanization that sounds like a natural conversation or personal writing'
}

// Style descriptions
export const styleDescriptions = {
  neutral: 'Balanced, objective tone suitable for general content',
  academic: 'Scholarly tone with some humanization for better readability',
  professional: 'Business-appropriate tone with natural human elements',
  creative: 'Artistic, expressive tone with vivid language',
  casual: 'Relaxed, friendly tone for informal contexts'
}

// Preserve descriptions
export const preserveDescriptions = {
  meaning: 'Focus on preserving the exact meaning while changing expression',
  tone: 'Maintain the original tone and emotional impact',
  structure: 'Keep the original paragraph structure and organization',
  length: 'Maintain approximately the same word count',
  key_terms: 'Preserve important technical terms and specialized vocabulary'
}

// Create the store
export const useHumanizeStore = create<HumanizeState & HumanizeActions>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        inputText: '',
        results: [],
        config: defaultConfig,
        isProcessing: false,
        currentProcessingIndex: null,
        history: [],
        maxHistorySize: 50,
        showComparison: true,
        autoSaveResults: true,
        showAdvancedOptions: false,

        // Text actions
        setInputText: (text: string) => {
          set({ inputText: text })
        },

        clearInputText: () => {
          set({ inputText: '' })
        },

        // Configuration actions
        setStrength: (strength: HumanizeStrength) => {
          set((state) => ({
            config: { ...state.config, strength }
          }))
        },

        setStyle: (style: HumanizeStyle) => {
          set((state) => ({
            config: { ...state.config, style }
          }))
        },

        setPreserve: (preserve: PreservePriority) => {
          set((state) => ({
            config: { ...state.config, preserve }
          }))
        },

        updateConfig: (config: Partial<HumanizeConfig>) => {
          set((state) => ({
            config: { ...state.config, ...config }
          }))
        },

        resetConfig: () => {
          set({ config: defaultConfig })
        },

        // Processing actions
        humanizeText: async (text?: string) => {
          const state = get()
          const textToProcess = text || state.inputText
          
          if (!textToProcess.trim()) return

          set({ isProcessing: true, currentProcessingIndex: null })

          try {
            const response = await fetch('/api/ai/humanize', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                text: textToProcess,
                ...state.config
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
                
                const chunk = decoder.decode(value, { stream: true })
                const lines = chunk.split('\n')
                
                for (const line of lines) {
                  if (line.startsWith('0:')) {
                    const content = line.slice(2)
                    if (content) {
                      humanizedText += content
                    }
                  }
                }
              }
            }

            const result: HumanizeResult = {
              originalText: textToProcess,
              humanizedText,
              ...state.config,
              timestamp: Date.now()
            }

            get().addResult(result)
            
            if (state.autoSaveResults) {
              get().addToHistory(result)
            }
          } catch (error) {
            console.error('Error humanizing text:', error)
            throw error
          } finally {
            set({ isProcessing: false, currentProcessingIndex: null })
          }
        },

        humanizeWithConfig: async (text: string, config: HumanizeConfig) => {
          if (!text.trim()) return

          set({ isProcessing: true, currentProcessingIndex: null })

          try {
            const response = await fetch('/api/ai/humanize', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                text,
                ...config
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
                
                const chunk = decoder.decode(value, { stream: true })
                const lines = chunk.split('\n')
                
                for (const line of lines) {
                  if (line.startsWith('0:')) {
                    const content = line.slice(2)
                    if (content) {
                      humanizedText += content
                    }
                  }
                }
              }
            }

            const result: HumanizeResult = {
              originalText: text,
              humanizedText,
              ...config,
              timestamp: Date.now()
            }

            get().addResult(result)
            
            if (get().autoSaveResults) {
              get().addToHistory(result)
            }
          } catch (error) {
            console.error('Error humanizing text with custom config:', error)
            throw error
          } finally {
            set({ isProcessing: false, currentProcessingIndex: null })
          }
        },

        // Result management
        addResult: (result: HumanizeResult) => {
          set((state) => ({
            results: [...state.results, result]
          }))
        },

        removeResult: (index: number) => {
          set((state) => ({
            results: state.results.filter((_, i) => i !== index)
          }))
        },

        clearResults: () => {
          set({ results: [] })
        },

        useResult: (index: number) => {
          const state = get()
          const result = state.results[index]
          if (result) {
            set({ 
              inputText: result.humanizedText,
              config: {
                strength: result.strength,
                style: result.style,
                preserve: result.preserve
              }
            })
          }
        },

        // History management
        addToHistory: (result: HumanizeResult) => {
          set((state) => {
            const newHistory = [result, ...state.history].slice(0, state.maxHistorySize)
            return { history: newHistory }
          })
        },

        clearHistory: () => {
          set({ history: [] })
        },

        // Settings actions
        toggleComparison: () => {
          set((state) => ({ showComparison: !state.showComparison }))
        },

        toggleAutoSave: () => {
          set((state) => ({ autoSaveResults: !state.autoSaveResults }))
        },

        toggleAdvancedOptions: () => {
          set((state) => ({ showAdvancedOptions: !state.showAdvancedOptions }))
        },

        setMaxHistorySize: (size: number) => {
          set((state) => {
            const newHistory = state.history.slice(0, size)
            return { maxHistorySize: size, history: newHistory }
          })
        },

        // Utility actions
        resetStore: () => {
          set({
            inputText: '',
            results: [],
            config: defaultConfig,
            isProcessing: false,
            currentProcessingIndex: null,
            showComparison: true,
            autoSaveResults: true,
            showAdvancedOptions: false
          })
        },

        exportResults: () => {
          const state = get()
          return JSON.stringify({
            results: state.results,
            history: state.history,
            config: state.config,
            exportDate: new Date().toISOString()
          }, null, 2)
        },

        importResults: (data: string) => {
          try {
            const imported = JSON.parse(data)
            if (imported.results && Array.isArray(imported.results)) {
              set({ 
                results: imported.results,
                history: imported.history || [],
                config: imported.config || defaultConfig
              })
              return true
            }
            return false
          } catch (error) {
            console.error('Error importing results:', error)
            return false
          }
        }
      }),
      {
        name: 'humanize-storage',
        partialize: (state) => ({
          config: state.config,
          history: state.history,
          maxHistorySize: state.maxHistorySize,
          showComparison: state.showComparison,
          autoSaveResults: state.autoSaveResults,
          showAdvancedOptions: state.showAdvancedOptions
        })
      }
    )
  )
)