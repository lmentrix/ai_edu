"use client";

import { useState } from "react";
import { ConversationBox } from "@/components/widgets/Conversation_Box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, FunctionSquare, PieChart, TrendingUp, BrainCircuit, Atom } from "lucide-react";
import { Calculator as CalculatorComponent } from "@/components/math/Calculator";
import { FormulaLibrary } from "@/components/math/FormulaLibrary";
import { MathJaxComponent } from "@/components/math/MathJaxComponent";
import "@/styles/math.css";

export default function MathPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  const mathSymbols = ["∫", "∑", "√", "π", "∞", "Δ", "θ", "∝", "∂"];
  
  const mathTools = [
    {
      id: "calculator",
      name: "Calculator",
      description: "Perform basic and advanced calculations",
      icon: Calculator,
      color: "bg-blue-500"
    },
    {
      id: "equations",
      name: "Equation Solver",
      description: "Solve linear and quadratic equations",
      icon: FunctionSquare,
      color: "bg-purple-500"
    },
    {
      id: "geometry",
      name: "Geometry",
      description: "Explore shapes, angles and formulas",
      icon: PieChart,
      color: "bg-indigo-500"
    },
    {
      id: "statistics",
      name: "Statistics",
      description: "Analyze data and probability",
      icon: TrendingUp,
      color: "bg-cyan-500"
    },
    {
      id: "calculus",
      name: "Calculus",
      description: "Derivatives, integrals and limits",
      icon: BrainCircuit,
      color: "bg-violet-500"
    },
    {
      id: "formulas",
      name: "Formula Library",
      description: "Common mathematical formulas",
      icon: Atom,
      color: "bg-blue-600"
    }
  ];

  const mathTopics = [
    "Algebra", "Geometry", "Trigonometry", "Calculus",
    "Statistics", "Probability", "Number Theory", "Discrete Math"
  ];

  return (
    <MathJaxComponent>
      <div className="min-h-screen relative overflow-hidden">
      {/* Floating Math Symbols Background */}
      <div className="floating-symbols">
        {mathSymbols.map((symbol, index) => (
          <div key={index} className="floating-symbol text-blue-500 dark:text-blue-400">
            {symbol}
          </div>
        ))}
      </div>
      
      <div className="container mx-auto p-6 relative z-10 futuristic-content">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 futuristic-button">
            <FunctionSquare className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 futuristic-heading">
            Math Learning Assistant
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto futuristic-text">
            Ask questions about mathematical concepts, get help with problem-solving, and explore various math topics with our AI assistant.
          </p>
        </div>
        
        {/* Interactive Tools Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center futuristic-heading">Math Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {mathTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.id}
                  className={`cursor-pointer futuristic-card ${
                    activeTool === tool.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                  }`}
                  onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${tool.color}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Math Topics Pills */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-center futuristic-heading">Popular Topics</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {mathTopics.map((topic) => (
              <Badge
                key={topic}
                variant={selectedTopic === topic ? "default" : "outline"}
                className={`px-3 py-1 futuristic-button cursor-pointer ${
                  selectedTopic === topic
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    : ""
                }`}
                onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
              >
                {topic}
              </Badge>
            ))}
          </div>
          
          {selectedTopic && (
            <div className="mt-4 p-4 futuristic-card rounded-lg max-w-2xl mx-auto">
              <p className="text-center futuristic-text">
                You selected <span className="font-semibold">{selectedTopic}</span>.
                Try asking the Math Assistant about this topic or explore the interactive tools above!
              </p>
            </div>
          )}
        </div>
        
        {/* Math Examples Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-center futuristic-heading">Mathematical Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <Card className="p-4 futuristic-card">
              <h4 className="font-medium mb-2">Quadratic Formula</h4>
              <p className="text-sm">The solutions to {"$ax^2 + bx + c = 0$"} are given by:</p>
              <div className="text-center my-3">
                {"$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$"}
              </div>
            </Card>
            
            <Card className="p-4 futuristic-card">
              <h4 className="font-medium mb-2">Euler's Identity</h4>
              <p className="text-sm">Often called the most beautiful equation in mathematics:</p>
              <div className="text-center my-3">
                {"$$e^{i\\pi} + 1 = 0$$"}
              </div>
            </Card>
            
            <Card className="p-4 futuristic-card">
              <h4 className="font-medium mb-2">Pythagorean Theorem</h4>
              <p className="text-sm">In a right triangle with legs {"$a$"} and {"$b$"} and hypotenuse {"$c$"}:</p>
              <div className="text-center my-3">
                {"$$a^2 + b^2 = c^2$$"}
              </div>
            </Card>
            
            <Card className="p-4 futuristic-card">
              <h4 className="font-medium mb-2">Derivative of {"$x^n$"}</h4>
              <p className="text-sm">The power rule for differentiation:</p>
              <div className="text-center my-3">
                {"$$\\frac{d}{dx}(x^n) = nx^{n-1}$$"}
              </div>
            </Card>
          </div>
        </div>
        
        {/* Interactive Tool Display */}
        {activeTool === "calculator" && (
          <div className="mb-8 flex justify-center">
            <CalculatorComponent />
          </div>
        )}
        
        {activeTool === "formulas" && (
          <div className="mb-8">
            <FormulaLibrary />
          </div>
        )}
        
        {/* Other tool placeholders */}
        {activeTool && activeTool !== "calculator" && activeTool !== "formulas" && (
          <div className="mb-8">
            <Card className="max-w-2xl mx-auto futuristic-card">
              <CardHeader>
                <CardTitle className="text-center">
                  {mathTools.find(tool => tool.id === activeTool)?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  This interactive {mathTools.find(tool => tool.id === activeTool)?.name.toLowerCase()} tool is coming soon!
                  Try asking the Math Assistant about this topic instead.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Conversation Box with Enhanced Styling */}
        <div className="max-w-5xl mx-auto">
          <div className="futuristic-card p-6 rounded-lg">
            <ConversationBox
              title="Math Assistant"
              placeholder="Ask me anything about mathematics..."
            />
          </div>
        </div>
      </div>
    </div>
    </MathJaxComponent>
  );
}