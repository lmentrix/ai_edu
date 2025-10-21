
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ConversationBox } from "@/components/widgets/Conversation_Box";
import { Save, Upload, Wand2, FileText } from "lucide-react";
import { useEssayViewModel } from "@/lib/hooks/useEssayViewModel";
import { GrammarHighlighter, GrammarIssueTooltip } from "@/components/ui/grammar-highlighter";
import { GrammarCheckDialog } from "@/components/ui/grammar-check-dialog";

export default function EssayPage() {
  const {
    essayTitle,
    essayContent,
    wordCount,
    selectedTemplate,
    aiText,
    humanizedText,
    humanizerStrength,
    isGeneratingEssay,
    isCheckingGrammar,
    isAnalyzingStructure,
    isHumanizingText,
    isGeneratingOutline,
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
  } = useEssayViewModel();

  // State for grammar checking
  const [grammarResult, setGrammarResult] = useState<any>(null);
  const [showGrammarDialog, setShowGrammarDialog] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [showIssueTooltip, setShowIssueTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleSaveEssay = () => {
    try {
      saveEssay();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to save essay');
    }
  };

  const handleGenerateEssay = async (topic: string, length: 'short' | 'medium' | 'long' = 'medium') => {
    try {
      await generateEssay(topic, length);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to generate essay. Please try again.');
    }
  };

  const handleCheckGrammar = async () => {
    if (!essayContent.trim()) {
      alert('Please enter some essay content to check grammar.');
      return;
    }

    try {
      const result = await checkGrammar(essayContent);
      setGrammarResult(result);
      setShowGrammarDialog(true);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to check grammar. Please try again.');
    }
  };

  const handleApplyCorrection = (issue: any, correction: string) => {
    applyGrammarCorrection(issue, correction);
    setShowIssueTooltip(false);
  };

  const handleApplyAllCorrections = () => {
    if (grammarResult) {
      applyAllGrammarCorrections(grammarResult);
      setShowGrammarDialog(false);
    }
  };

  const handleIssueClick = (issue: any, event: React.MouseEvent) => {
    setSelectedIssue(issue);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setShowIssueTooltip(true);
  };

  const handleAnalyzeStructure = async () => {
    if (!essayContent.trim()) {
      alert('Please enter some essay content to analyze structure.');
      return;
    }

    try {
      const result = await analyzeStructure(essayContent);
      
      // Show structure analysis results
      let message = `Structure Score: ${result.overallStructure?.score || 0}/100\n\n`;
      message += `Feedback: ${result.overallStructure?.feedback || 'No feedback available'}\n\n`;
      
      if (result.suggestions && result.suggestions.length > 0) {
        message += "Suggestions:\n";
        result.suggestions.forEach((suggestion, index) => {
          message += `${index + 1}. ${suggestion}\n`;
        });
      }
      
      if (result.strengths && result.strengths.length > 0) {
        message += "\nStrengths:\n";
        result.strengths.forEach((strength, index) => {
          message += `${index + 1}. ${strength}\n`;
        });
      }
      
      alert(message);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to analyze structure. Please try again.');
    }
  };

  const handleGenerateOutline = async () => {
    if (!essayTitle.trim()) {
      alert('Please enter a topic for the outline.');
      return;
    }

    try {
      const result = await generateOutline(essayTitle, selectedTemplate);
      
      // Show outline results
      let message = `Outline: ${result.title}\n\n`;
      message += `Thesis: ${result.thesisStatement}\n\n`;
      
      if (result.bodyParagraphs && result.bodyParagraphs.length > 0) {
        message += "Body Paragraphs:\n";
        result.bodyParagraphs.forEach((paragraph, index) => {
          message += `${index + 1}. ${paragraph.topicSentence}\n`;
        });
      }
      
      alert(message);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to generate outline. Please try again.');
    }
  };

  const handleHumanizeText = async () => {
    if (!aiText.trim()) {
      alert('Please enter some AI-generated text to humanize.');
      return;
    }

    try {
      await humanizeText(aiText);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to humanize text. Please try again.');
    }
  };

  const handleEssayChange = (value: string) => {
    setEssayContent(value);
  };

  const essayTemplates = getEssayTemplates();
  const writingTips = getWritingTips();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Essay Writing Studio
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Craft compelling essays with our intelligent writing tools, templates, and resources
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="h-full shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">Writing Workspace</CardTitle>
                    <CardDescription>Compose your essay with AI-powered assistance</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {wordCount} words
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Essay Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter your essay title..."
                    value={essayTitle}
                    onChange={(e) => setEssayTitle(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Essay Content</Label>
                  <div className="relative min-h-[400px]">
                    {grammarResult && grammarResult.issues.length > 0 ? (
                      <div
                        className="min-h-[400px] p-3 border border-slate-200 dark:border-slate-700 rounded-md resize-none overflow-auto bg-white dark:bg-slate-800 text-base"
                        onClick={(e) => {
                          // Hide tooltip when clicking outside
                          if ((e.target as HTMLElement).classList.contains('grammar-highlighted-text')) {
                            return;
                          }
                          setShowIssueTooltip(false);
                        }}
                      >
                        <GrammarHighlighter
                          text={essayContent}
                          grammarResult={grammarResult}
                          onIssueClick={handleIssueClick}
                          className="whitespace-pre-wrap"
                        />
                      </div>
                    ) : (
                      <Textarea
                        id="content"
                        placeholder="Start writing your essay here..."
                        value={essayContent}
                        onChange={(e) => handleEssayChange(e.target.value)}
                        className="min-h-[400px] resize-none text-base"
                      />
                    )}
                  </div>
                  {grammarResult && (
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant={grammarResult.overallScore >= 80 ? "default" : grammarResult.overallScore >= 60 ? "secondary" : "destructive"}>
                        Grammar Score: {grammarResult.overallScore}/100
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => setShowGrammarDialog(true)}>
                        View Details ({grammarResult.issues.length} issues)
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  <Button
                    variant="default"
                    className="gap-2"
                    onClick={() => handleGenerateEssay(essayTitle || "current topic", "medium")}
                    disabled={isGeneratingEssay}
                  >
                    <Wand2 className="h-4 w-4" />
                    {isGeneratingEssay ? "Generating..." : "Generate Essay"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={handleCheckGrammar}
                    disabled={isCheckingGrammar}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                    {isCheckingGrammar ? "Checking..." : "Check Grammar"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={handleAnalyzeStructure}
                    disabled={isAnalyzingStructure}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    {isAnalyzingStructure ? "Analyzing..." : "Analyze Structure"}
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={handleSaveEssay}
                  >
                    <Save className="h-4 w-4" />
                    Save Essay
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={exportEssay}
                  >
                    <Upload className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generated Essay Box */}
          {isGeneratingEssay && (
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <Wand2 className="h-5 w-5 animate-pulse" />
                    Generating Essay...
                  </CardTitle>
                  <CardDescription>AI is creating your essay based on the provided topic</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg min-h-[200px]">
                    <div className="animate-pulse">
                      <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-full mb-2"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-full mb-2"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-full mb-2"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-5/6"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Generated Essay Result Box */}
          {essayContent && !isGeneratingEssay && (
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Generated Essay
                    </CardTitle>
                    <Badge variant="secondary" className="text-sm">
                      {wordCount} words
                    </Badge>
                  </div>
                  <CardDescription>Your AI-generated essay is ready for review and editing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg max-h-[400px] overflow-auto">
                    <p className="whitespace-pre-wrap text-sm">{essayContent}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={handleCheckGrammar}
                      disabled={isCheckingGrammar}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                      </svg>
                      {isCheckingGrammar ? "Checking..." : "Check Grammar"}
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={handleAnalyzeStructure}
                      disabled={isAnalyzingStructure}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg>
                      {isAnalyzingStructure ? "Analyzing..." : "Analyze Structure"}
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={handleSaveEssay}
                    >
                      <Save className="h-4 w-4" />
                      Save Essay
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={exportEssay}
                    >
                      <Upload className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 dark:text-slate-100">Essay Templates</CardTitle>
                <CardDescription>Start with a structured template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {essayTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 dark:bg-slate-700/30 dark:border-slate-600 dark:hover:bg-slate-700/50"
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <h3 className="font-medium text-sm">{template.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 dark:text-slate-100">Writing Tools</CardTitle>
                <CardDescription>Enhance your essay with AI assistance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={handleCheckGrammar}
                  disabled={isCheckingGrammar}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                  {isCheckingGrammar ? "Checking..." : "Grammar Check"}
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11H3v2h6v-2zm0-4H3v2h6V7zm0 8H3v2h6v-2zm12-8h-6v2h6V7zm0 4h-6v2h6v-2zm0 4h-6v2h6v-2z"/>
                  </svg>
                  Plagiarism Checker
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  Citation Generator
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={handleGenerateOutline}
                  disabled={isGeneratingOutline}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  {isGeneratingOutline ? "Generating..." : "Outline Generator"}
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 dark:text-slate-100">AI Humanizer</CardTitle>
                <CardDescription>Transform AI-generated text to sound more natural</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ai-text">AI-Generated Text</Label>
                  <Textarea
                    id="ai-text"
                    placeholder="Paste AI-generated text here to humanize it..."
                    value={aiText}
                    onChange={(e) => setAiText(e.target.value)}
                    className="min-h-[120px] resize-none text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Humanizer Strength</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={humanizerStrength === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setHumanizerStrength("light")}
                      className="text-xs"
                    >
                      Light
                    </Button>
                    <Button
                      variant={humanizerStrength === "medium" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setHumanizerStrength("medium")}
                      className="text-xs"
                    >
                      Medium
                    </Button>
                    <Button
                      variant={humanizerStrength === "strong" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setHumanizerStrength("strong")}
                      className="text-xs"
                    >
                      Strong
                    </Button>
                  </div>
                </div>
                <Button
                  className="w-full gap-2"
                  onClick={handleHumanizeText}
                  disabled={isHumanizingText}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                  {isHumanizingText ? "Humanizing..." : "Humanize Text"}
                </Button>
                {humanizedText && (
                  <div className="space-y-2">
                    <Label>Humanized Result</Label>
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                      <p className="text-sm">{humanizedText}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={addHumanizedTextToEssay}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5Z"/>
                        <path d="M12 5L8 21l4-7 4 7-4-16Z"/>
                      </svg>
                      Add to Essay
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Essay Assistant */}
        <div className="mt-8">
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">AI Essay Assistant</CardTitle>
              <CardDescription>Get help with essay writing, brainstorming, and improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <ConversationBox
                title="Essay Writing Assistant"
                placeholder="Ask me for help with your essay, brainstorming ideas, or writing techniques..."
                subject="essay"
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-800 dark:text-slate-100">Writing Resources</CardTitle>
              <CardDescription>Improve your writing with these tips and techniques</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="structure" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="structure">Structure</TabsTrigger>
                  <TabsTrigger value="style">Style</TabsTrigger>
                  <TabsTrigger value="research">Research</TabsTrigger>
                </TabsList>
                {writingTips.map((category) => (
                  <TabsContent key={category.category} value={category.category.toLowerCase()} className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.tips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{index + 1}</span>
                          </div>
                          <p className="text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Grammar Check Dialog */}
      {grammarResult && (
        <GrammarCheckDialog
          isOpen={showGrammarDialog}
          onClose={() => setShowGrammarDialog(false)}
          grammarResult={grammarResult}
          onApplyCorrection={handleApplyCorrection}
          onApplyAllCorrections={handleApplyAllCorrections}
        />
      )}
      
      {/* Grammar Issue Tooltip */}
      {showIssueTooltip && selectedIssue && (
        <div
          className="fixed z-50"
          style={{
            left: `${Math.min(tooltipPosition.x, window.innerWidth - 320)}px`,
            top: `${Math.min(tooltipPosition.y, window.innerHeight - 200)}px`
          }}
        >
          <GrammarIssueTooltip
            issue={selectedIssue}
            onApplyCorrection={handleApplyCorrection}
            onClose={() => setShowIssueTooltip(false)}
          />
        </div>
      )}
    </div>
  );
}
                     