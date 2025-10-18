"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Atom, BookOpen, Calculator, Play, RotateCcw } from "lucide-react";
import { mathEngine, MathEvaluationResult } from "@/lib/mathEngine";

export function FormulaLibrary() {
  const [selectedCategory, setSelectedCategory] = useState("algebra");
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null);
  const [formulaInputs, setFormulaInputs] = useState<Record<string, Record<string, string>>>({});
  const [formulaResults, setFormulaResults] = useState<Record<string, MathEvaluationResult>>({});
  
  const formulas = {
    algebra: [
      {
        name: "Quadratic Formula",
        formula: "x = (-b ± √(b² - 4ac)) / 2a",
        inputs: ["a", "b", "c"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.solveQuadratic(
            parseFloat(inputs.a) || 0,
            parseFloat(inputs.b) || 0,
            parseFloat(inputs.c) || 0
          )
      },
      {
        name: "Difference of Squares",
        formula: "a² - b² = (a + b)(a - b)",
        inputs: ["a", "b"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.evaluate(
            `(${inputs.a} + ${inputs.b}) * (${inputs.a} - ${inputs.b})`,
            [
              { name: "a", value: parseFloat(inputs.a) || 0 },
              { name: "b", value: parseFloat(inputs.b) || 0 }
            ]
          )
      },
      {
        name: "Binomial Theorem",
        formula: "(a + b)² = a² + 2ab + b²",
        inputs: ["a", "b"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.evaluate(
            `${inputs.a}^2 + 2*${inputs.a}*${inputs.b} + ${inputs.b}^2`,
            [
              { name: "a", value: parseFloat(inputs.a) || 0 },
              { name: "b", value: parseFloat(inputs.b) || 0 }
            ]
          )
      },
      {
        name: "Exponent Rules",
        formula: "a^m × a^n = a^(m+n)",
        inputs: ["a", "m", "n"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.evaluate(
            `${inputs.a}^(${inputs.m}+${inputs.n})`,
            [
              { name: "a", value: parseFloat(inputs.a) || 0 },
              { name: "m", value: parseFloat(inputs.m) || 0 },
              { name: "n", value: parseFloat(inputs.n) || 0 }
            ]
          )
      }
    ],
    geometry: [
      {
        name: "Pythagorean Theorem",
        formula: "a² + b² = c²",
        inputs: ["a", "b"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.pythagorean(
            parseFloat(inputs.a) || 0,
            parseFloat(inputs.b) || 0
          )
      },
      {
        name: "Circle Area",
        formula: "A = πr²",
        inputs: ["r"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.circleArea(parseFloat(inputs.r) || 0)
      },
      {
        name: "Circle Circumference",
        formula: "C = 2πr",
        inputs: ["r"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.circleCircumference(parseFloat(inputs.r) || 0)
      },
      {
        name: "Triangle Area",
        formula: "A = ½ × base × height",
        inputs: ["base", "height"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.triangleArea(
            parseFloat(inputs.base) || 0,
            parseFloat(inputs.height) || 0
          )
      }
    ],
    trigonometry: [
      {
        name: "Sine Rule",
        formula: "a/sin(A) = b/sin(B) = c/sin(C)",
        inputs: ["a", "A", "b", "B"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.evaluate(
            `${inputs.a}/sin(${inputs.A})`,
            [
              { name: "a", value: parseFloat(inputs.a) || 0 },
              { name: "A", value: parseFloat(inputs.A) || 0 }
            ]
          )
      },
      {
        name: "Cosine Rule",
        formula: "c² = a² + b² - 2ab cos(C)",
        inputs: ["a", "b", "C"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.evaluate(
            `${inputs.a}^2 + ${inputs.b}^2 - 2*${inputs.a}*${inputs.b}*cos(${inputs.C})`,
            [
              { name: "a", value: parseFloat(inputs.a) || 0 },
              { name: "b", value: parseFloat(inputs.b) || 0 },
              { name: "C", value: parseFloat(inputs.C) || 0 }
            ]
          )
      },
      {
        name: "Pythagorean Identity",
        formula: "sin²θ + cos²θ = 1",
        inputs: ["θ"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.evaluate(
            `sin(${inputs.θ})^2 + cos(${inputs.θ})^2`,
            [
              { name: "θ", value: parseFloat(inputs.θ) || 0 }
            ]
          )
      },
      {
        name: "Double Angle",
        formula: "sin(2θ) = 2sinθcosθ",
        inputs: ["θ"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.evaluate(
            `sin(2*${inputs.θ})`,
            [
              { name: "θ", value: parseFloat(inputs.θ) || 0 }
            ]
          )
      }
    ],
    calculus: [
      {
        name: "Power Rule",
        formula: "d/dx(x^n) = nx^(n-1)",
        inputs: ["coefficient", "exponent"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.powerRuleDerivative(
            parseFloat(inputs.coefficient) || 1,
            parseFloat(inputs.exponent) || 0
          )
      },
      {
        name: "Product Rule",
        formula: "d/dx(uv) = u'v + uv'",
        inputs: ["u", "v", "u'", "v'"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.evaluate(
            `${inputs["u'"]}*${inputs.v} + ${inputs.u}*${inputs["v'"]}`,
            [
              { name: "u", value: parseFloat(inputs.u) || 0 },
              { name: "v", value: parseFloat(inputs.v) || 0 },
              { name: "u'", value: parseFloat(inputs["u'"]) || 0 },
              { name: "v'", value: parseFloat(inputs["v'"]) || 0 }
            ]
          )
      },
      {
        name: "Chain Rule",
        formula: "d/dx(f(g(x))) = f'(g(x)) × g'(x)",
        inputs: ["f'", "g", "g'"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.evaluate(
            `${inputs["f'"]}*${inputs["g'"]}`,
            [
              { name: "f'", value: parseFloat(inputs["f'"]) || 0 },
              { name: "g", value: parseFloat(inputs.g) || 0 },
              { name: "g'", value: parseFloat(inputs["g'"]) || 0 }
            ]
          )
      },
      {
        name: "Fundamental Theorem",
        formula: "∫[a,b] f(x)dx = F(b) - F(a)",
        inputs: ["F(b)", "F(a)"],
        evaluator: (inputs: Record<string, string>) =>
          mathEngine.evaluate(
            `${inputs["F(b)"]} - ${inputs["F(a)"]}`,
            [
              { name: "F(b)", value: parseFloat(inputs["F(b)"]) || 0 },
              { name: "F(a)", value: parseFloat(inputs["F(a)"]) || 0 }
            ]
          )
      }
    ]
  };

  const categories = Object.keys(formulas);

  const handleInputChange = (formulaKey: string, inputName: string, value: string) => {
    setFormulaInputs(prev => ({
      ...prev,
      [formulaKey]: {
        ...prev[formulaKey],
        [inputName]: value
      }
    }));
  };

  const evaluateFormula = (formulaKey: string, formula: {
    name: string;
    formula: string;
    inputs: string[];
    evaluator: (inputs: Record<string, string>) => MathEvaluationResult;
  }) => {
    const inputs = formulaInputs[formulaKey] || {};
    const result = formula.evaluator(inputs);
    setFormulaResults(prev => ({
      ...prev,
      [formulaKey]: result
    }));
  };

  const resetFormula = (formulaKey: string) => {
    setFormulaInputs(prev => ({
      ...prev,
      [formulaKey]: {}
    }));
    setFormulaResults(prev => {
      const newResults = { ...prev };
      delete newResults[formulaKey];
      return newResults;
    });
  };

  const toggleFormulaExpansion = (formulaKey: string) => {
    setExpandedFormula(expandedFormula === formulaKey ? null : formulaKey);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-500 to-purple-600">
        <CardTitle className="flex items-center gap-2 text-white">
          <Atom className="h-5 w-5" />
          Formula Library
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="capitalize"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formulas[category as keyof typeof formulas].map((item, index) => {
                  const formulaKey = `${category}-${index}`;
                  const isExpanded = expandedFormula === formulaKey;
                  const result = formulaResults[formulaKey];
                  const inputs = formulaInputs[formulaKey] || {};
                  
                  return (
                    <Card key={index} className="p-4 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                          {item.name}
                        </h4>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFormulaExpansion(formulaKey)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          >
                            <Calculator className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(item.formula)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded-md border border-blue-100 dark:border-blue-900">
                        <code className="text-lg font-mono text-center block text-blue-900 dark:text-blue-100">
                          {item.formula}
                        </code>
                      </div>
                      
                      {isExpanded && (
                        <div className="mt-4 space-y-3">
                          <div className="grid grid-cols-2 gap-2">
                            {item.inputs.map((inputName: string) => (
                              <div key={inputName} className="space-y-1">
                                <label className="text-xs font-medium text-blue-700 dark:text-blue-300">
                                  {inputName}
                                </label>
                                <Input
                                  type="number"
                                  placeholder={`Enter ${inputName}`}
                                  value={inputs[inputName] || ""}
                                  onChange={(e) => handleInputChange(formulaKey, inputName, e.target.value)}
                                  className="text-sm"
                                />
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => evaluateFormula(formulaKey, item)}
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                              <Play className="h-3 w-3 mr-1" />
                              Calculate
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => resetFormula(formulaKey)}
                              className="bg-gray-50 hover:bg-gray-100"
                            >
                              <RotateCcw className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          {result && (
                            <div className="mt-3 p-3 bg-white dark:bg-slate-800 rounded-md border border-blue-100 dark:border-blue-900">
                              <div className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                                Result:
                              </div>
                              <div className="text-lg font-mono text-blue-900 dark:text-blue-100">
                                {result.result}
                              </div>
                              {result.error && (
                                <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                                  {result.error}
                                </div>
                              )}
                              {result.steps && result.steps.length > 0 && (
                                <div className="mt-2 text-xs text-blue-700 dark:text-blue-300">
                                  <div className="font-medium mb-1">Steps:</div>
                                  <ol className="list-decimal list-inside space-y-1">
                                    {result.steps.map((step, stepIndex) => (
                                      <li key={stepIndex}>{step}</li>
                                    ))}
                                  </ol>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <h4 className="font-semibold text-blue-800 dark:text-blue-200">Pro Tip</h4>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Understanding these formulas is key to mastering mathematics. Try asking the Math Assistant to explain any formula in detail or show you how to apply it to solve problems!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}