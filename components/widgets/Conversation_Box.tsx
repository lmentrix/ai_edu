"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ConversationBoxProps {
  title?: string;
  placeholder?: string;
  className?: string;
}

export function ConversationBox({
  title = "AI Code Assistant",
  placeholder = "Ask me anything about coding...",
  className = "",
}: ConversationBoxProps) {
  const getInitialMessage = () => {
    if (typeof window !== 'undefined' && window.location.pathname === '/math') {
      return "Hello! I'm your AI Math Assistant. I can help you with mathematical concepts, problem-solving strategies, and explanations. What math topic would you like to explore today?";
    }
    return "Hello! I'm your AI code assistant. How can I help you with your coding questions today?";
  };
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: getInitialMessage(),
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(input),
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    // Check if this is the math page and provide math-specific responses
    const isMathPage = typeof window !== 'undefined' && window.location.pathname === '/math';
    
    if (isMathPage) {
      const mathResponses = [
        "Let me help you understand this mathematical concept step by step.",
        "Mathematics is all about patterns and logic. Here's how to approach this problem:",
        "This is a fundamental concept in mathematics. Let me break it down for you:",
        "To solve this problem, we need to apply these mathematical principles:",
        "Great question! Mathematics builds on previous concepts. Here's what you need to know:",
      ];
      
      const mathExamples = [
        "```javascript\n// Example: Calculating the area of a circle\nconst radius = 5;\nconst area = Math.PI * radius * radius;\nconsole.log(`Area: ${area.toFixed(2)}`);\n```",
        "```javascript\n// Example: Solving a quadratic equation\nfunction solveQuadratic(a, b, c) {\n  const discriminant = b*b - 4*a*c;\n  if (discriminant >= 0) {\n    const x1 = (-b + Math.sqrt(discriminant)) / (2*a);\n    const x2 = (-b - Math.sqrt(discriminant)) / (2*a);\n    return [x1, x2];\n  }\n  return null; // No real solutions\n}\n```",
        "```javascript\n// Example: Finding the derivative\nfunction derivative(f, x, h = 0.0001) {\n  return (f(x + h) - f(x - h)) / (2 * h);\n}\n\n// Example function\nconst f = (x) => x*x + 2*x + 1;\nconsole.log(`Derivative at x=2: ${derivative(f, 2)}`);\n```",
      ];
      
      return mathResponses[Math.floor(Math.random() * mathResponses.length)] +
        "\n\n" + mathExamples[Math.floor(Math.random() * mathExamples.length)];
    }
    
    // Default responses for non-math pages
    const responses = [
      "That's a great question! Let me explain this concept in detail.",
      "I can help you with that. Here's how you can approach this problem:",
      "This is a common challenge in programming. Here's a solution that works well:",
      "Let me break this down for you step by step.",
      "Good thinking! Here's some additional context that might help:",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)] +
      "\n\n```javascript\n// Example code\nconst example = {\n  // Your code here\n};\n```";
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto h-[600px] flex flex-col ${className}`}>
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-gradient-to-r from-blue-500 to-purple-600">
            <Bot className="h-4 w-4 text-white" />
          </div>
          {title}
          <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Math AI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 pt-0">
        <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 message-bubble ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              {message.role === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full typing-dot"></div>
                  </div>
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || input.trim() === ""}
              size="icon"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ConversationBox;