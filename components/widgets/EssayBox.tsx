import React, { useState, useRef, useEffect } from 'react';
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
  const [essay, setEssay] = useState(initialValue);
  const [wordCount, setWordCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCheckingGrammar, setIsCheckingGrammar] = useState(false);
  const [isAnalyzingStructure, setIsAnalyzingStructure] = useState(false);
  const [isHumanizing, setIsHumanizing] = useState(false);
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [essayType, setEssayType] = useState(defaultEssayType);
  const [essayLength, setEssayLength] = useState(defaultLength);
  const [topic, setTopic] = useState("");
  const [showOutline, setShowOutline] = useState(false);
  const [outlineData, setOutlineData] = useState<any>(null);
  const [grammarResult, setGrammarResult] = useState<any>(null);
  const [structureResult, setStructureResult] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const words = essay.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
    onEssayChange?.(essay);
  }, [essay, onEssayChange]);

  const handleGenerateEssay = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
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
          length: essayLength
        }),
      });

      if (!response.ok) throw new Error('Failed to generate essay');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let generatedText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('0:')) {
              const content = line.slice(2);
              try {
                const parsed = JSON.parse(content);
                if (parsed.text) {
                  generatedText += parsed.text;
                  setEssay(generatedText);
                }
              } catch (e) {
                // Skip parsing errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating essay:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGrammarCheck = async () => {
    if (!essay.trim()) return;
    
    setIsCheckingGrammar(true);
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
      });

      if (!response.ok) throw new Error('Failed to check grammar');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let resultText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          resultText += chunk;
        }
      }

      try {
        const result = JSON.parse(resultText);
        setGrammarResult(result);
        onGrammarCheck?.(result);
      } catch (e) {
        console.error('Error parsing grammar result:', e);
      }
    } catch (error) {
      console.error('Error checking grammar:', error);
    } finally {
      setIsCheckingGrammar(false);
    }
  };

  const handleStructureAnalysis = async () => {
    if (!essay.trim()) return;
    
    setIsAnalyzingStructure(true);
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
      });

      if (!response.ok) throw new Error('Failed to analyze structure');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let resultText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          resultText += chunk;
        }
      }

      try {
        const result = JSON.parse(resultText);
        setStructureResult(result);
        onStructureAnalysis?.(result);
      } catch (e) {
        console.error('Error parsing structure result:', e);
      }
    } catch (error) {
      console.error('Error analyzing structure:', error);
    } finally {
      setIsAnalyzingStructure(false);
    }
  };

  const handleHumanize = async (strength: 'light' | 'medium' | 'strong' = 'medium') => {
    if (!essay.trim()) return;
    
    setIsHumanizing(true);
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
      });

      if (!response.ok) throw new Error('Failed to humanize text');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let humanizedText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          for (const line of lines) {
            if (line.startsWith('0:')) {
              const content = line.slice(2);
              try {
                const parsed = JSON.parse(content);
                if (parsed.text) {
                  humanizedText += parsed.text;
                  setEssay(humanizedText);
                }
              } catch (e) {
                // Skip parsing errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error humanizing text:', error);
    } finally {
      setIsHumanizing(false);
    }
  };

  const handleGenerateOutline = async () => {
    if (!topic.trim()) return;
    
    setIsGeneratingOutline(true);
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
      });

      if (!response.ok) throw new Error('Failed to generate outline');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let resultText = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          resultText += chunk;
        }
      }

      try {
        const result = JSON.parse(resultText);
        setOutlineData(result);
        setShowOutline(true);
      } catch (e) {
        console.error('Error parsing outline result:', e);
      }
    } catch (error) {
      console.error('Error generating outline:', error);
    } finally {
      setIsGeneratingOutline(false);
    }
  };

  const handleCopyEssay = () => {
    navigator.clipboard.writeText(essay);
  };

  const handleDownloadEssay = () => {
    const blob = new Blob([essay], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'essay.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className={`futuristic-card w-full ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
            <FileText className="h-5 w-5 text-white" />
          </div>
          {title}
          <div className="ml-auto flex items-center gap-2">
            {showWordCount && (
              <Badge variant="outline" className="futuristic-button">
                {wordCount} words
              </Badge>
            )}
            <Badge variant="outline" className="futuristic-button">
              {essayType}
            </Badge>
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
              disabled={isGenerating}
            />
            <Button
              onClick={handleGenerateEssay}
              disabled={isGenerating || !topic.trim()}
              className="futuristic-button"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Generate
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={essayType}
              onChange={(e) => setEssayType(e.target.value as any)}
              className="px-3 py-1 rounded-md border border-input bg-background text-sm"
              disabled={isGenerating}
            >
              <option value="argumentative">Argumentative</option>
              <option value="expository">Expository</option>
              <option value="narrative">Narrative</option>
              <option value="descriptive">Descriptive</option>
              <option value="compare">Compare & Contrast</option>
            </select>
            
            <select
              value={essayLength}
              onChange={(e) => setEssayLength(e.target.value as any)}
              className="px-3 py-1 rounded-md border border-input bg-background text-sm"
              disabled={isGenerating}
            >
              <option value="short">Short (300-500 words)</option>
              <option value="medium">Medium (600-900 words)</option>
              <option value="long">Long (1000-1500 words)</option>
            </select>
            
            {showOutlineGeneration && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateOutline}
                disabled={isGeneratingOutline || !topic.trim()}
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
            value={essay}
            onChange={(e) => setEssay(e.target.value.slice(0, maxLength))}
            placeholder={placeholder}
            className="min-h-[300px] resize-none"
            readOnly={readOnly}
            maxLength={maxLength}
          />
          {showWordCount && (
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {essay.length}/{maxLength} characters
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {showGrammarCheck && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleGrammarCheck}
              disabled={isCheckingGrammar || !essay.trim()}
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
          
          {showStructureAnalysis && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleStructureAnalysis}
              disabled={isAnalyzingStructure || !essay.trim()}
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
          
          {showHumanizeOption && (
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleHumanize('light')}
                disabled={isHumanizing || !essay.trim()}
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
            onClick={handleCopyEssay}
            disabled={!essay.trim()}
            className="futuristic-button"
          >
            <Copy className="h-4 w-4" />
            Copy
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadEssay}
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
