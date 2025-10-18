"use client";

import { ConversationBox } from "@/components/widgets/Conversation_Box";
import { ConvoTimeline } from "@/components/widgets/Convo_Timeline";
import { TimelineItem } from "@/types";
import { useState, useEffect } from "react";

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
            />
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="futuristic-card p-6 rounded-lg">
            <ConvoTimeline
              items={timelineItems}
              onItemSelect={handleTimelineItemSelect}
              maxHeight={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
}