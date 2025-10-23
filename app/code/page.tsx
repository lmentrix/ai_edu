"use client";

import { ConversationBox } from "@/components/widgets/AI/Conversation_Box";
import { ConvoTimeline } from "@/components/widgets/Convo_Timeline";
import { TimelineItem } from "@/types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save, Upload, Code, FileText } from "lucide-react";

export default function CodePage() {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    {
      id: "1",
      title: "JavaScript Fundamentals",
      description: "Variables, data types, and basic operators in JavaScript",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      type: "knowledge",
      importance: "high",
    },
    {
      id: "2",
      title: "React Hooks",
      description: "useState and useEffect hooks for state management",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      type: "concept",
      importance: "high",
    },
    {
      id: "3",
      title: "Debugging Tip",
      description: "Use console.log() to print values and track program flow",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      type: "note",
      importance: "medium",
    },
    {
      id: "4",
      title: "Array Methods",
      description: "map(), filter(), and reduce() methods for array manipulation",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      type: "code",
      importance: "medium",
    },
  ]);


  const handleTimelineItemSelect = (item: TimelineItem) => {
    console.log("Selected timeline item:", item);
    // In a real application, this could navigate to related messages
    // or highlight relevant parts of the conversation
  };

  return (
    <div className="container mx-auto px-4 py-8 futuristic-content">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 futuristic-heading">Code Learning</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto futuristic-text">
          Learn programming with our AI-powered assistant. Ask questions, get code examples, and improve your coding skills.
        </p>
      </div>
      
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="futuristic-card p-6 rounded-lg">
            <ConversationBox
              title="AI Code Assistant"
              placeholder="Ask me about programming concepts, debugging, or code examples..."
              subject="code"
            />
          </div>
        </div>
        <div className="lg:col-span-1 space-y-6">
          <div className="futuristic-card p-6 rounded-lg">
            <ConvoTimeline
              items={timelineItems}
              onItemSelect={handleTimelineItemSelect}
              maxHeight={600}
            />
          </div>
          
          {/* Quick Actions */}
          <Card className="futuristic-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  const code = "// Example code\nconsole.log('Hello, World!');";
                  const blob = new Blob([code], { type: 'text/javascript' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = "example.js";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <Save className="h-4 w-4 mr-2" />
                Download Example Code
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  const code = "function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}";
                  const blob = new Blob([code], { type: 'text/javascript' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = "fibonacci.js";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                Download Fibonacci Function
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}