import { useState, useEffect, useCallback } from 'react';
import { EssayViewModel } from '../viewModels/essayViewModel';
import { GrammarResult, StructureResult, OutlineResult } from '../viewModels/essayViewModel';

export function useEssayViewModel() {
  const [viewModel] = useState(() => new EssayViewModel());
  const [state, setState] = useState({
    essayTitle: viewModel.essayTitle,
    essayContent: viewModel.essayContent,
    wordCount: viewModel.wordCount,
    selectedTemplate: viewModel.selectedTemplate,
    aiText: viewModel.aiText,
    humanizedText: viewModel.humanizedText,
    humanizerStrength: viewModel.humanizerStrength,
    isGeneratingEssay: viewModel.isGeneratingEssay,
    isCheckingGrammar: viewModel.isCheckingGrammar,
    isAnalyzingStructure: viewModel.isAnalyzingStructure,
    isHumanizingText: viewModel.isHumanizingText,
    isGeneratingOutline: viewModel.isGeneratingOutline,
  });

  // Update state when ViewModel changes
  const updateState = useCallback(() => {
    setState({
      essayTitle: viewModel.essayTitle,
      essayContent: viewModel.essayContent,
      wordCount: viewModel.wordCount,
      selectedTemplate: viewModel.selectedTemplate,
      aiText: viewModel.aiText,
      humanizedText: viewModel.humanizedText,
      humanizerStrength: viewModel.humanizerStrength,
      isGeneratingEssay: viewModel.isGeneratingEssay,
      isCheckingGrammar: viewModel.isCheckingGrammar,
      isAnalyzingStructure: viewModel.isAnalyzingStructure,
      isHumanizingText: viewModel.isHumanizingText,
      isGeneratingOutline: viewModel.isGeneratingOutline,
    });
  }, [viewModel]);

  // Register event listeners
  useEffect(() => {
    const events = [
      'essayTitle', 'essayContent', 'wordCount', 'selectedTemplate',
      'aiText', 'humanizedText', 'humanizerStrength', 'isGeneratingEssay',
      'isCheckingGrammar', 'isAnalyzingStructure', 'isHumanizingText', 'isGeneratingOutline'
    ];

    events.forEach(event => {
      viewModel.addEventListener(event, updateState);
    });

    return () => {
      events.forEach(event => {
        viewModel.removeEventListener(event, updateState);
      });
    };
  }, [viewModel, updateState]);

  // Wrapper functions for ViewModel methods
  const setEssayTitle = useCallback((title: string) => {
    viewModel.setEssayTitle(title);
  }, [viewModel]);

  const setEssayContent = useCallback((content: string) => {
    viewModel.setEssayContent(content);
  }, [viewModel]);

  const setSelectedTemplate = useCallback((template: string) => {
    viewModel.setSelectedTemplate(template);
  }, [viewModel]);

  const setAiText = useCallback((text: string) => {
    viewModel.setAiText(text);
  }, [viewModel]);

  const setHumanizedText = useCallback((text: string) => {
    viewModel.setHumanizedText(text);
  }, [viewModel]);

  const setHumanizerStrength = useCallback((strength: 'light' | 'medium' | 'strong') => {
    viewModel.setHumanizerStrength(strength);
  }, [viewModel]);

  const generateEssay = useCallback(async (topic: string, length?: 'short' | 'medium' | 'long') => {
    try {
      await viewModel.generateEssay(topic, length);
    } catch (error) {
      throw error;
    }
  }, [viewModel]);

  const checkGrammar = useCallback(async (text: string): Promise<GrammarResult> => {
    try {
      return await viewModel.checkGrammar(text);
    } catch (error) {
      throw error;
    }
  }, [viewModel]);

  const analyzeStructure = useCallback(async (text: string): Promise<StructureResult> => {
    try {
      return await viewModel.analyzeStructure(text);
    } catch (error) {
      throw error;
    }
  }, [viewModel]);

  const humanizeText = useCallback(async (text: string, strength?: 'light' | 'medium' | 'strong'): Promise<string> => {
    try {
      return await viewModel.humanizeText(text, strength);
    } catch (error) {
      throw error;
    }
  }, [viewModel]);

  const generateOutline = useCallback(async (topic: string, essayType?: string, length?: 'short' | 'medium' | 'long'): Promise<OutlineResult> => {
    try {
      return await viewModel.generateOutline(topic, essayType, length);
    } catch (error) {
      throw error;
    }
  }, [viewModel]);

  const saveEssay = useCallback(() => {
    try {
      viewModel.saveEssay();
    } catch (error) {
      throw error;
    }
  }, [viewModel]);

  const exportEssay = useCallback(() => {
    viewModel.exportEssay();
  }, [viewModel]);

  const addHumanizedTextToEssay = useCallback(() => {
    viewModel.addHumanizedTextToEssay();
  }, [viewModel]);

  const applyGrammarCorrection = useCallback((issue: any, correction: string) => {
    viewModel.applyGrammarCorrection(issue, correction);
  }, [viewModel]);

  const applyAllGrammarCorrections = useCallback((grammarResult: GrammarResult) => {
    viewModel.applyAllGrammarCorrections(grammarResult);
  }, [viewModel]);

  const getEssayTemplates = useCallback(() => {
    return viewModel.getEssayTemplates();
  }, [viewModel]);

  const getWritingTips = useCallback(() => {
    return viewModel.getWritingTips();
  }, [viewModel]);

  return {
    // State
    ...state,
    
    // Actions
    setEssayTitle,
    setEssayContent,
    setSelectedTemplate,
    setAiText,
    setHumanizedText,
    setHumanizerStrength,
    generateEssay,
    checkGrammar,
    analyzeStructure,
    humanizeText,
    generateOutline,
    saveEssay,
    exportEssay,
    addHumanizedTextToEssay,
    applyGrammarCorrection,
    applyAllGrammarCorrections,
    getEssayTemplates,
    getWritingTips,
  };
}