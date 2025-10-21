import { EssayService } from '../services/essayService';

// Types for essay data
export interface EssayData {
  title: string;
  content: string;
  wordCount: number;
  createdAt: string;
  template: string;
}

export interface GrammarResult {
  correctedText: string;
  issues: Array<{
    type: string;
    severity: string;
    startPosition: number;
    endPosition: number;
    original: string;
    suggestion: string;
    alternatives: string[];
    explanation: string;
    rule: string;
  }>;
  overallScore: number;
  feedback: string;
  strengths: string[];
  priorityImprovements: string[];
  readabilityLevel: string;
  wordChoiceSuggestions: {
    overused: string[];
    alternatives: Record<string, string[]>;
  };
}

export interface StructureResult {
  overallStructure: {
    score: number;
    feedback: string;
  };
  introduction: any;
  bodyParagraphs: any[];
  conclusion: any;
  transitions: any;
  coherence: any;
  suggestions: string[];
  strengths: string[];
}

export interface OutlineResult {
  title: string;
  thesisStatement: string;
  introduction: any;
  bodyParagraphs: any[];
  conclusion: any;
  estimatedWordCount: string;
  writingTips: string[];
}

// Essay ViewModel - Manages the state and logic for the essay page
export class EssayViewModel {
  private _essayTitle: string = '';
  private _essayContent: string = '';
  private _wordCount: number = 0;
  private _selectedTemplate: string = '';
  private _aiText: string = '';
  private _humanizedText: string = '';
  private _humanizerStrength: 'light' | 'medium' | 'strong' = 'medium';
  private _isGeneratingEssay: boolean = false;
  private _isCheckingGrammar: boolean = false;
  private _isAnalyzingStructure: boolean = false;
  private _isHumanizingText: boolean = false;
  private _isGeneratingOutline: boolean = false;

  // Event listeners
  private _listeners: Map<string, Function[]> = new Map();

  // Getters
  get essayTitle(): string {
    return this._essayTitle;
  }

  get essayContent(): string {
    return this._essayContent;
  }

  get wordCount(): number {
    return this._wordCount;
  }

  get selectedTemplate(): string {
    return this._selectedTemplate;
  }

  get aiText(): string {
    return this._aiText;
  }

  get humanizedText(): string {
    return this._humanizedText;
  }

  get humanizerStrength(): 'light' | 'medium' | 'strong' {
    return this._humanizerStrength;
  }

  get isGeneratingEssay(): boolean {
    return this._isGeneratingEssay;
  }

  get isCheckingGrammar(): boolean {
    return this._isCheckingGrammar;
  }

  get isAnalyzingStructure(): boolean {
    return this._isAnalyzingStructure;
  }

  get isHumanizingText(): boolean {
    return this._isHumanizingText;
  }

  get isGeneratingOutline(): boolean {
    return this._isGeneratingOutline;
  }

  // Setters with event notification
  setEssayTitle(value: string): void {
    this._essayTitle = value;
    this.notifyListeners('essayTitle');
  }

  setEssayContent(value: string): void {
    this._essayContent = value;
    this._wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
    this.notifyListeners('essayContent');
    this.notifyListeners('wordCount');
  }

  setSelectedTemplate(value: string): void {
    this._selectedTemplate = value;
    this.notifyListeners('selectedTemplate');
  }

  setAiText(value: string): void {
    this._aiText = value;
    this.notifyListeners('aiText');
  }

  setHumanizedText(value: string): void {
    this._humanizedText = value;
    this.notifyListeners('humanizedText');
  }

  setHumanizerStrength(value: 'light' | 'medium' | 'strong'): void {
    this._humanizerStrength = value;
    this.notifyListeners('humanizerStrength');
  }

  // Event management
  addEventListener(event: string, callback: Function): void {
    if (!this._listeners.has(event)) {
      this._listeners.set(event, []);
    }
    this._listeners.get(event)!.push(callback);
  }

  removeEventListener(event: string, callback: Function): void {
    const callbacks = this._listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private notifyListeners(event: string): void {
    const callbacks = this._listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback());
    }
  }

  // Essay operations
  async generateEssay(topic: string, length: 'short' | 'medium' | 'long' = 'medium'): Promise<void> {
    if (!topic.trim()) {
      throw new Error('Please enter a topic for the essay.');
    }

    this._isGeneratingEssay = true;
    this.notifyListeners('isGeneratingEssay');

    try {
      const generatedText = await EssayService.generateEssay(
        topic,
        this._selectedTemplate || 'expository',
        length,
        (chunk) => {
          this.setEssayContent(chunk);
        }
      );

      this.setEssayContent(generatedText);
      
      if (!this._essayTitle) {
        this.setEssayTitle(`Essay on ${topic}`);
      }
    } catch (error) {
      console.error('Error generating essay:', error);
      throw error;
    } finally {
      this._isGeneratingEssay = false;
      this.notifyListeners('isGeneratingEssay');
    }
  }

  async checkGrammar(text: string): Promise<GrammarResult> {
    if (!text.trim()) {
      throw new Error('Please provide text to check grammar.');
    }

    this._isCheckingGrammar = true;
    this.notifyListeners('isCheckingGrammar');

    try {
      const result = await EssayService.checkGrammar(text);
      return result;
    } catch (error) {
      console.error('Error checking grammar:', error);
      throw error;
    } finally {
      this._isCheckingGrammar = false;
      this.notifyListeners('isCheckingGrammar');
    }
  }

  async analyzeStructure(text: string): Promise<StructureResult> {
    if (!text.trim()) {
      throw new Error('Please provide text to analyze structure.');
    }

    this._isAnalyzingStructure = true;
    this.notifyListeners('isAnalyzingStructure');

    try {
      const result = await EssayService.analyzeStructure(text);
      return result;
    } catch (error) {
      console.error('Error analyzing structure:', error);
      throw error;
    } finally {
      this._isAnalyzingStructure = false;
      this.notifyListeners('isAnalyzingStructure');
    }
  }

  async humanizeText(text: string, strength?: 'light' | 'medium' | 'strong'): Promise<string> {
    if (!text.trim()) {
      throw new Error('Please provide text to humanize.');
    }

    this._isHumanizingText = true;
    this.notifyListeners('isHumanizingText');

    try {
      const humanizedText = await EssayService.humanizeText(
        text,
        strength || this._humanizerStrength,
        (chunk) => {
          this.setHumanizedText(chunk);
        }
      );

      this.setHumanizedText(humanizedText);
      return humanizedText;
    } catch (error) {
      console.error('Error humanizing text:', error);
      throw error;
    } finally {
      this._isHumanizingText = false;
      this.notifyListeners('isHumanizingText');
    }
  }

  async generateOutline(topic: string, essayType?: string, length?: 'short' | 'medium' | 'long'): Promise<OutlineResult> {
    if (!topic.trim()) {
      throw new Error('Please provide a topic for the outline.');
    }

    this._isGeneratingOutline = true;
    this.notifyListeners('isGeneratingOutline');

    try {
      const result = await EssayService.generateOutline(
        topic,
        essayType || this._selectedTemplate || 'expository',
        length || 'medium'
      );

      return result;
    } catch (error) {
      console.error('Error generating outline:', error);
      throw error;
    } finally {
      this._isGeneratingOutline = false;
      this.notifyListeners('isGeneratingOutline');
    }
  }

  // Utility methods
  saveEssay(): void {
    if (!this._essayTitle.trim()) {
      throw new Error('Please enter an essay title before saving.');
    }

    try {
      const essayData: EssayData = {
        title: this._essayTitle,
        content: this._essayContent,
        wordCount: this._wordCount,
        createdAt: new Date().toISOString(),
        template: this._selectedTemplate
      };

      const blob = new Blob([JSON.stringify(essayData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this._essayTitle.replace(/[^a-z0-9]/gi, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error saving essay:', error);
      throw new Error('Failed to save essay');
    }
  }

  exportEssay(): void {
    const essayText = `${this._essayTitle}\n\n${this._essayContent}`;
    const blob = new Blob([essayText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this._essayTitle.replace(/[^a-z0-9]/gi, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  addHumanizedTextToEssay(): void {
    if (this._humanizedText) {
      this.setEssayContent(
        this._essayContent + (this._essayContent ? "\n\n" : "") + this._humanizedText
      );
      this.setHumanizedText('');
      this.setAiText('');
    }
  }

  // Grammar correction methods
  applyGrammarCorrection(issue: any, correction: string): void {
    // Apply a single grammar correction
    const before = this._essayContent.substring(0, issue.startPosition);
    const after = this._essayContent.substring(issue.endPosition);
    this.setEssayContent(before + correction + after);
  }

  applyAllGrammarCorrections(grammarResult: GrammarResult): void {
    // Apply all grammar corrections at once
    this.setEssayContent(grammarResult.correctedText);
  }

  // Essay templates
  getEssayTemplates() {
    return [
      { id: "argumentative", name: "Argumentative Essay", description: "Present a claim and support it with evidence" },
      { id: "expository", name: "Expository Essay", description: "Explain a topic in a balanced way" },
      { id: "narrative", name: "Narrative Essay", description: "Tell a story or share an experience" },
      { id: "descriptive", name: "Descriptive Essay", description: "Paint a picture with words" },
      { id: "compare", name: "Compare/Contrast", description: "Examine similarities and differences" },
    ];
  }

  // Writing tips
  getWritingTips() {
    return [
      { 
        category: "Structure", 
        tips: [
          "Start with a strong hook", 
          "Create a clear thesis statement", 
          "Use topic sentences for each paragraph", 
          "End with a memorable conclusion"
        ] 
      },
      { 
        category: "Style", 
        tips: [
          "Vary sentence structure", 
          "Use transition words", 
          "Avoid passive voice", 
          "Be concise and clear"
        ] 
      },
      { 
        category: "Research", 
        tips: [
          "Use credible sources", 
          "Take organized notes", 
          "Cite your sources properly", 
          "Check for bias"
        ] 
      },
    ];
  }
}