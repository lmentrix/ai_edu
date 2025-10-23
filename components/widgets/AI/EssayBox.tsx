import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  PenTool,
  CheckCircle,
  AlertCircle,
  Loader2,
  Copy,
  Download,
  RefreshCw,
  Eye,
  BookOpen,
  Sparkles,
  CheckSquare
} from 'lucide-react';
import { useEssayModeStore } from '@/stores/essayMode';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

interface EssayBoxProps {
  title?: string;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  showWordCount?: boolean;
  showGrammarCheck?: boolean;
  showStructureAnalysis?: boolean;
  showHumanizeOption?: boolean;
  showOutlineGeneration?: boolean;
  defaultEssayType?: 'argumentative' | 'expository' | 'narrative' | 'descriptive' | 'compare';
  defaultLength?: 'short' | 'medium' | 'long';
  onEssayChange?: (essay: string) => void;
  onGrammarCheck?: (result: any) => void;
  onStructureAnalysis?: (result: any) => void;
  readOnly?: boolean;
  initialValue?: string;
}

export const EssayBox: React.FC<EssayBoxProps> = ({
  title = "Essay Editor",
  placeholder = "Start writing your essay here...",
  className = "",
  maxLength = 5000,
  showWordCount = true,
  showGrammarCheck = true,
  showStructureAnalysis = true,
  showHumanizeOption = true,
  showOutlineGeneration = true,
  defaultEssayType = 'expository',
  defaultLength = 'medium',
  onEssayChange,
  onGrammarCheck,
  onStructureAnalysis,
  readOnly = false,
  initialValue = ""
}) => {
  const {
    essay,
    wordCount,
    characterCount,
    isGenerating,
    isCheckingGrammar,
    isAnalyzingStructure,
    isHumanizing,
    isGeneratingOutline,
    essayType,
    essayLength,
    topic,
    selectedStyle,
    availableStyles,
    showOutline,
    outlineData,
    grammarResult,
    structureResult,
    maxLength: storeMaxLength,
    showWordCount: storeShowWordCount,
    showGrammarCheck: storeShowGrammarCheck,
    showStructureAnalysis: storeShowStructureAnalysis,
    showHumanizeOption: storeShowHumanizeOption,
    showOutlineGeneration: storeShowOutlineGeneration,
    setEssay,
    setTopic,
    setEssayType,
    setEssayLength,
    generateEssay,
    generateOutline,
    checkGrammar,
    analyzeStructure,
    humanizeText,
    setShowOutline,
    copyEssay,
    downloadEssay,
    setMaxLength
  } = useEssayModeStore();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isUsingChatGeneration, setIsUsingChatGeneration] = useState(false);

  // Initialize useChat hook for streaming essay generation
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/ai/essay',
    }),
    onFinish: () => {
      setIsUsingChatGeneration(false);
    },
    onError: (error) => {
      console.error('Chat generation error:', error);
      setIsUsingChatGeneration(false);
    }
  });

  // Initialize store with props if needed
  useEffect(() => {
    if (initialValue && essay === '') {
      setEssay(initialValue);
    }
    if (maxLength !== storeMaxLength) {
      setMaxLength(maxLength);
    }
  }, [initialValue, essay, maxLength, storeMaxLength, setEssay, setMaxLength]);

  // Handle essay change with callback
  const handleEssayChange = (value: string) => {
    setEssay(value);
    onEssayChange?.(value);
  };

  // Handle grammar check with callback
  const handleGrammarCheck = async () => {
    await checkGrammar();
    if (grammarResult) {
      onGrammarCheck?.(grammarResult);
    }
  };

  // Handle structure analysis with callback
  const handleStructureAnalysis = async () => {
    await analyzeStructure();
    if (structureResult) {
      onStructureAnalysis?.(structureResult);
    }
  };

  // Handle streaming essay generation with useChat
  const handleStreamingGenerateEssay = () => {
    if (!topic.trim()) return;
    
    setIsUsingChatGeneration(true);
    setEssay(''); // Clear existing essay
    
    // Send message with essay parameters using the existing API route
    sendMessage(
      { text: topic },
      {
        body: {
          type: 'generate',
          essayType,
          length: essayLength,
          topic
        }
      }
    );
  };

  // Extract essay text from chat messages
  const getEssayFromMessages = () => {
    const assistantMessages = messages.filter(m => m.role === 'assistant');
    if (assistantMessages.length === 0) return '';
    
    return assistantMessages
      .map(msg =>
        msg.parts
          .filter(part => part.type === 'text')
          .map(part => (part as any).text)
          .join('')
      )
      .join('\n\n');
  };

  // Update essay when chat messages change
  useEffect(() => {
    if (isUsingChatGeneration && messages.length > 0) {
      const essayText = getEssayFromMessages();
      if (essayText) {
        setEssay(essayText);
      }
    }
  }, [messages, isUsingChatGeneration, setEssay]);

  // Determine if currently generating
  const isCurrentlyGenerating = isGenerating || isUsingChatGeneration || status === 'streaming';

  return (
    <Card className={`futuristic-card w-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
            <FileText className="h-5 w-5 text-white" />
          </div>
          {title}
          <div className="ml-auto flex items-center gap-2">
            {(showWordCount && storeShowWordCount) && (
              <Badge variant="outline" className="futuristic-button">
                {wordCount} words
              </Badge>
            )}
            {selectedStyle && (
              <Badge variant="outline" className="futuristic-button">
                {availableStyles.find(s => s.value === selectedStyle)?.label}
              </Badge>
            )}

          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Topic Input and Generation Controls */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Textarea
              placeholder="Enter your essay topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 min-h-[60px]"
              disabled={isCurrentlyGenerating}
            />
            <Button
              onClick={handleStreamingGenerateEssay}
              disabled={isCurrentlyGenerating || !topic.trim()}
              className="futuristic-button"
            >
              {isCurrentlyGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Generate
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedStyle ? (
              <div className="px-3 py-1 rounded-md border border-input bg-background text-sm flex items-center gap-2">
                <span>Style: {availableStyles.find(s => s.value === selectedStyle)?.label}</span>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${availableStyles.find(s => s.value === selectedStyle)?.color}`}></div>
              </div>
            ) : (
              <select
                value={essayType}
                onChange={(e) => setEssayType(e.target.value as any)}
                className="px-3 py-1 rounded-md border border-input bg-background text-sm"
                disabled={isCurrentlyGenerating}
              >
                <option value="argumentative">Argumentative</option>
                <option value="expository">Expository</option>
                <option value="narrative">Narrative</option>
                <option value="descriptive">Descriptive</option>
                <option value="compare">Compare & Contrast</option>
              </select>
            )}
            
            <select
              value={essayLength}
              onChange={(e) => setEssayLength(e.target.value as any)}
              className="px-3 py-1 rounded-md border border-input bg-background text-sm"
              disabled={isCurrentlyGenerating}
            >
              <option value="short">Short (300-500 words)</option>
              <option value="medium">Medium (600-900 words)</option>
              <option value="long">Long (1000-1500 words)</option>
            </select>
            
            {(showOutlineGeneration && storeShowOutlineGeneration) && (
              <Button
                variant="outline"
                size="sm"
                onClick={generateOutline}
                disabled={isGeneratingOutline || !topic.trim() || isCurrentlyGenerating}
                className="futuristic-button"
              >
                {isGeneratingOutline ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <BookOpen className="h-4 w-4" />
                )}
                Outline
              </Button>
            )}
          </div>
        </div>

        {/* Outline Display */}
        {showOutline && outlineData && (
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Essay Outline
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOutline(false)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div><strong>Title:</strong> {outlineData.title}</div>
              <div><strong>Thesis:</strong> {outlineData.thesisStatement}</div>
              <div><strong>Introduction:</strong> {outlineData.introduction?.hook}</div>
              <div><strong>Body Paragraphs:</strong></div>
              <ul className="ml-4 space-y-1">
                {outlineData.bodyParagraphs?.map((para: any, index: number) => (
                  <li key={index} className="text-xs">
                    {para.topicSentence}
                  </li>
                ))}
              </ul>
              <div><strong>Conclusion:</strong> {outlineData.conclusion?.summary}</div>
            </div>
          </div>
        )}

        {/* Main Essay Editor */}
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={isUsingChatGeneration ? getEssayFromMessages() : essay}
            onChange={(e) => !isUsingChatGeneration && handleEssayChange(e.target.value.slice(0, storeMaxLength))}
            placeholder={isUsingChatGeneration ? "Generating essay..." : placeholder}
            className="min-h-[300px] resize-none"
            readOnly={readOnly || isUsingChatGeneration}
            maxLength={storeMaxLength}
          />
          {(showWordCount && storeShowWordCount) && (
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {characterCount}/{storeMaxLength} characters
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {(showGrammarCheck && storeShowGrammarCheck) && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleGrammarCheck}
              disabled={isCheckingGrammar || !essay.trim() || isCurrentlyGenerating}
              className="futuristic-button"
            >
              {isCheckingGrammar ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckSquare className="h-4 w-4" />
              )}
              Grammar Check
            </Button>
          )}
          
          {(showStructureAnalysis && storeShowStructureAnalysis) && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleStructureAnalysis}
              disabled={isAnalyzingStructure || !essay.trim() || isCurrentlyGenerating}
              className="futuristic-button"
            >
              {isAnalyzingStructure ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              Analyze Structure
            </Button>
          )}
          
          {(showHumanizeOption && storeShowHumanizeOption) && (
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => humanizeText('light')}
                disabled={isHumanizing || !essay.trim() || isCurrentlyGenerating}
                className="futuristic-button"
              >
                {isHumanizing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Humanize
              </Button>
            </div>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={copyEssay}
            disabled={!essay.trim()}
            className="futuristic-button"
          >
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={downloadEssay}
            disabled={!essay.trim()}
            className="futuristic-button"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>

        {/* Results Display */}
        {grammarResult && (
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Grammar Analysis
              </h3>
              <Badge variant={grammarResult.overallScore >= 80 ? "default" : "destructive"}>
                Score: {grammarResult.overallScore}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>{grammarResult.feedback}</div>
              {grammarResult.issues?.length > 0 && (
                <div>
                  <strong>Issues found:</strong> {grammarResult.issues.length}
                </div>
              )}
            </div>
          </div>
        )}

        {structureResult && (
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Structure Analysis
              </h3>
              <Badge variant={structureResult.overallStructure?.score >= 80 ? "default" : "destructive"}>
                Score: {structureResult.overallStructure?.score}
              </Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div>{structureResult.overallStructure?.feedback}</div>
              {structureResult.suggestions?.length > 0 && (
                <div>
                  <strong>Suggestions:</strong>
                  <ul className="ml-4 mt-1">
                    {structureResult.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="text-xs">• {suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EssayBox;
