import React from 'react';
import { GrammarResult } from '@/lib/viewModels/essayViewModel';

interface GrammarHighlighterProps {
  text: string;
  grammarResult?: GrammarResult;
  onIssueClick?: (issue: any) => void;
  className?: string;
}

export function GrammarHighlighter({ 
  text, 
  grammarResult, 
  onIssueClick, 
  className = '' 
}: GrammarHighlighterProps) {
  if (!grammarResult || !grammarResult.issues || grammarResult.issues.length === 0) {
    return <div className={className}>{text}</div>;
  }

  // Sort issues by position to process them correctly
  const sortedIssues = [...grammarResult.issues].sort((a, b) => a.startPosition - b.startPosition);
  
  // Build highlighted text
  let result = [];
  let lastIndex = 0;
  
  for (const issue of sortedIssues) {
    // Add text before the issue
    if (issue.startPosition > lastIndex) {
      result.push(
        <span key={`text-${lastIndex}`}>
          {text.substring(lastIndex, issue.startPosition)}
        </span>
      );
    }
    
    // Determine color based on severity
    let colorClass = '';
    switch (issue.severity) {
      case 'critical':
        colorClass = 'bg-red-200 hover:bg-red-300 border-b-2 border-red-500';
        break;
      case 'major':
        colorClass = 'bg-orange-200 hover:bg-orange-300 border-b-2 border-orange-500';
        break;
      case 'moderate':
        colorClass = 'bg-yellow-200 hover:bg-yellow-300 border-b-2 border-yellow-500';
        break;
      case 'minor':
        colorClass = 'bg-blue-100 hover:bg-blue-200 border-b border-blue-400';
        break;
      default:
        colorClass = 'bg-gray-100 hover:bg-gray-200 border-b border-gray-400';
    }
    
    // Add the highlighted issue
    result.push(
      <span
        key={`issue-${issue.startPosition}`}
        className={`${colorClass} cursor-pointer relative px-1 rounded transition-colors`}
        onClick={() => onIssueClick && onIssueClick(issue)}
        title={`${issue.type}: ${issue.explanation}`}
      >
        {text.substring(issue.startPosition, issue.endPosition)}
      </span>
    );
    
    lastIndex = issue.endPosition;
  }
  
  // Add remaining text after the last issue
  if (lastIndex < text.length) {
    result.push(
      <span key={`text-end`}>
        {text.substring(lastIndex)}
      </span>
    );
  }
  
  return <div className={className}>{result}</div>;
}

interface GrammarIssueTooltipProps {
  issue: any;
  onApplyCorrection: (issue: any, correction: string) => void;
  onClose: () => void;
}

export function GrammarIssueTooltip({ issue, onApplyCorrection, onClose }: GrammarIssueTooltipProps) {
  return (
    <div className="absolute z-10 w-80 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-sm capitalize">{issue.type}</h3>
        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Original:</p>
        <p className="p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm">{issue.original}</p>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Suggested:</p>
        <p className="p-2 bg-green-50 dark:bg-green-900/20 rounded text-sm">{issue.suggestion}</p>
      </div>
      
      {issue.alternatives && issue.alternatives.length > 0 && (
        <div className="mb-3">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Alternatives:</p>
          <div className="space-y-1">
            {issue.alternatives.map((alt: string, index: number) => (
              <button
                key={index}
                onClick={() => onApplyCorrection(issue, alt)}
                className="block w-full text-left p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                {alt}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="mb-3">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Explanation:</p>
        <p className="text-sm">{issue.explanation}</p>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={() => onApplyCorrection(issue, issue.suggestion)}
          className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
        >
          Apply Suggestion
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          Ignore
        </button>
      </div>
    </div>
  );
}