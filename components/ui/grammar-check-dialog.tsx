import React, { useState } from 'react';
import { GrammarResult } from '@/lib/viewModels/essayViewModel';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

interface GrammarCheckDialogProps {
  isOpen: boolean;
  onClose: () => void;
  grammarResult: GrammarResult;
  onApplyCorrection: (issue: any, correction: string) => void;
  onApplyAllCorrections: () => void;
}

export function GrammarCheckDialog({ 
  isOpen, 
  onClose, 
  grammarResult, 
  onApplyCorrection,
  onApplyAllCorrections
}: GrammarCheckDialogProps) {
  const [activeTab, setActiveTab] = useState('issues');

  if (!isOpen) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'major': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'minor': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'grammar': return '📝';
      case 'spelling': return '🔤';
      case 'punctuation': return '❗';
      case 'structure': return '🏗️';
      case 'clarity': return '💡';
      case 'vocabulary': return '📖';
      case 'tone': return '🎭';
      case 'flow': return '🌊';
      default: return '📋';
    }
  };

  // Group issues by type
  const issuesByType = grammarResult.issues.reduce((acc, issue) => {
    if (!acc[issue.type]) {
      acc[issue.type] = [];
    }
    acc[issue.type].push(issue);
    return acc;
  }, {} as Record<string, typeof grammarResult.issues>);

  // Count issues by severity
  const issuesBySeverity = grammarResult.issues.reduce((acc, issue) => {
    if (!acc[issue.severity]) {
      acc[issue.severity] = 0;
    }
    acc[issue.severity]++;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl text-slate-800 dark:text-slate-100">Grammar Check Results</CardTitle>
              <CardDescription className="mt-1">
                Overall Score: <span className="font-semibold">{grammarResult.overallScore}/100</span> | 
                Readability Level: <span className="font-semibold">{grammarResult.readabilityLevel}</span>
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto">
          {/* Summary badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(issuesBySeverity).map(([severity, count]) => (
              <Badge key={severity} className={getSeverityColor(severity)}>
                {severity}: {count}
              </Badge>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="vocabulary">Vocabulary</TabsTrigger>
              <TabsTrigger value="corrected">Corrected Text</TabsTrigger>
            </TabsList>

            <TabsContent value="issues" className="mt-4">
              <div className="space-y-4">
                {Object.entries(issuesByType).map(([type, issues]) => (
                  <div key={type} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span>{getTypeIcon(type)}</span>
                      <span className="capitalize">{type}</span> ({issues.length})
                    </h3>
                    <div className="space-y-3">
                      {issues.map((issue, index) => (
                        <div key={index} className="border-b border-slate-100 dark:border-slate-700 pb-3 last:border-0">
                          <div className="flex justify-between items-start mb-2">
                            <Badge className={getSeverityColor(issue.severity)} variant="outline">
                              {issue.severity}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onApplyCorrection(issue, issue.suggestion)}
                            >
                              Apply
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                            <div>
                              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Original:</p>
                              <p className="p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm">{issue.original}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Suggested:</p>
                              <p className="p-2 bg-green-50 dark:bg-green-900/20 rounded text-sm">{issue.suggestion}</p>
                            </div>
                          </div>
                          {issue.alternatives && issue.alternatives.length > 0 && (
                            <div className="mb-2">
                              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Alternatives:</p>
                              <div className="flex flex-wrap gap-1">
                                {issue.alternatives.map((alt, altIndex) => (
                                  <Button
                                    key={altIndex}
                                    size="sm"
                                    variant="outline"
                                    className="text-xs h-6"
                                    onClick={() => onApplyCorrection(issue, alt)}
                                  >
                                    {alt}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-medium">Rule:</span> {issue.rule}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            <span className="font-medium">Explanation:</span> {issue.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="mt-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Overall Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{grammarResult.feedback}</p>
                  </CardContent>
                </Card>

                {grammarResult.strengths.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600">Writing Strengths</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {grammarResult.strengths.map((strength, index) => (
                          <li key={index} className="text-sm">{strength}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {grammarResult.priorityImprovements.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg text-orange-600">Priority Improvements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {grammarResult.priorityImprovements.map((improvement, index) => (
                          <li key={index} className="text-sm">{improvement}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="vocabulary" className="mt-4">
              <div className="space-y-4">
                {grammarResult.wordChoiceSuggestions.overused.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Overused Words</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {grammarResult.wordChoiceSuggestions.overused.map((word) => (
                          <div key={word} className="border rounded-lg p-3">
                            <p className="font-medium mb-2">{word}</p>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Alternatives:</p>
                            <div className="flex flex-wrap gap-1">
                              {grammarResult.wordChoiceSuggestions.alternatives[word]?.map((alt, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {alt}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="corrected" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Fully Corrected Text</CardTitle>
                    <Button onClick={onApplyAllCorrections}>
                      Apply All Corrections
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                    <p className="whitespace-pre-wrap text-sm">{grammarResult.correctedText}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onApplyAllCorrections}>
            Apply All Corrections
          </Button>
        </div>
      </div>
    </div>
  );
}