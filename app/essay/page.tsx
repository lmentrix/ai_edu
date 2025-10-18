"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

export default function EssayPage() {
  const [essayContent, setEssayContent] = useState("");
  const [essayTitle, setEssayTitle] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [aiText, setAiText] = useState("");
  const [humanizedText, setHumanizedText] = useState("");
  const [humanizerStrength, setHumanizerStrength] = useState("medium");

  const handleEssayChange = (value: string) => {
    setEssayContent(value);
    setWordCount(value.trim().split(/\s+/).filter(word => word.length > 0).length);
  };

  const essayTemplates = [
    { id: "argumentative", name: "Argumentative Essay", description: "Present a claim and support it with evidence" },
    { id: "expository", name: "Expository Essay", description: "Explain a topic in a balanced way" },
    { id: "narrative", name: "Narrative Essay", description: "Tell a story or share an experience" },
    { id: "descriptive", name: "Descriptive Essay", description: "Paint a picture with words" },
    { id: "compare", name: "Compare/Contrast", description: "Examine similarities and differences" },
  ];

  const writingTips = [
    { category: "Structure", tips: ["Start with a strong hook", "Create a clear thesis statement", "Use topic sentences for each paragraph", "End with a memorable conclusion"] },
    { category: "Style", tips: ["Vary sentence structure", "Use transition words", "Avoid passive voice", "Be concise and clear"] },
    { category: "Research", tips: ["Use credible sources", "Take organized notes", "Cite your sources properly", "Check for bias"] },
  ];

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
                  <Textarea
                    id="content"
                    placeholder="Start writing your essay here..."
                    value={essayContent}
                    onChange={(e) => handleEssayChange(e.target.value)}
                    className="min-h-[400px] resize-none text-base"
                  />
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  <Button variant="default" className="gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                    Check Grammar
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                    Analyze Structure
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    Save Draft
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

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
                <Button variant="outline" className="w-full justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                    Grammar Check
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
                <Button variant="outline" className="w-full justify-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                    Outline Generator
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
                  onClick={() => {
                    // Simulate humanization process
                    const simulatedHumanized = aiText
                      .replace(/\b(therefore|consequently|furthermore|moreover)\b/gi, "so")
                      .replace(/\b(in order to|so as to)\b/gi, "to")
                      .replace(/\b(utilize|utilizes|utilized)\b/gi, "use")
                      .replace(/\b(ameliorate|ameliorated)\b/gi, "improve")
                      .replace(/\b(commence|commenced)\b/gi, "start")
                      + (humanizerStrength === "strong" ? " I think this makes sense from my perspective." : "");
                    setHumanizedText(simulatedHumanized);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                  Humanize Text
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
                      onClick={() => {
                        setEssayContent(essayContent + (essayContent ? "\n\n" : "") + humanizedText);
                        setHumanizedText("");
                        setAiText("");
                      }}
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
    </div>
  );
}