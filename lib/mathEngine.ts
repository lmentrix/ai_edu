/**
 * Math Engine for evaluating mathematical expressions
 * Supports basic arithmetic, algebraic expressions, and common mathematical functions
 */

export interface MathEvaluationResult {
  result: number | string;
  error?: string;
  steps?: string[];
}

export interface FormulaVariable {
  name: string;
  value: number;
  description?: string;
}

export class MathEngine {
  private variables: Map<string, number> = new Map();
  
  constructor() {
    // Initialize with common mathematical constants
    this.variables.set('pi', Math.PI);
    this.variables.set('e', Math.E);
  }

  /**
   * Evaluate a mathematical expression
   */
  evaluate(expression: string, variables?: FormulaVariable[]): MathEvaluationResult {
    try {
      // Set variables if provided
      if (variables) {
        variables.forEach(v => this.variables.set(v.name.toLowerCase(), v.value));
      }

      // Replace common mathematical symbols and functions
      const processedExpression = this.preprocessExpression(expression);
      
      // Evaluate the expression
      const result = this.safeEval(processedExpression);
      
      return { result };
    } catch (error) {
      return { 
        result: "Error", 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  }

  /**
   * Preprocess the expression to handle mathematical notation
   */
  private preprocessExpression(expression: string): string {
    let processed = expression.toLowerCase();
    
    // Replace mathematical symbols with JavaScript equivalents
    processed = processed.replace(/π/g, 'pi');
    processed = processed.replace(/√/g, 'Math.sqrt');
    processed = processed.replace(/∞/g, 'Infinity');
    processed = processed.replace(/×/g, '*');
    processed = processed.replace(/÷/g, '/');
    processed = processed.replace(/−/g, '-');
    processed = processed.replace(/²/g, '**2');
    processed = processed.replace(/³/g, '**3');
    
    // Replace common functions
    processed = processed.replace(/sin\(/g, 'Math.sin(');
    processed = processed.replace(/cos\(/g, 'Math.cos(');
    processed = processed.replace(/tan\(/g, 'Math.tan(');
    processed = processed.replace(/log\(/g, 'Math.log10(');
    processed = processed.replace(/ln\(/g, 'Math.log(');
    processed = processed.replace(/abs\(/g, 'Math.abs(');
    
    // Replace variables
    this.variables.forEach((value, key) => {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      processed = processed.replace(regex, value.toString());
    });
    
    return processed;
  }

  /**
   * Safely evaluate a mathematical expression
   */
  private safeEval(expression: string): number {
    // Only allow mathematical operations and functions
    const allowedChars = /^[0-9+\-*/.() ** Math.sqrt Math.sin Math.cos Math.tan Math.log10 Math.log Math.abs Infinity PI E]+$/;
    
    if (!allowedChars.test(expression)) {
      throw new Error("Invalid characters in expression");
    }
    
    try {
      // Use Function constructor for safer evaluation than eval
      const result = new Function('return ' + expression)();
      return typeof result === 'number' ? result : NaN;
    } catch {
      throw new Error("Failed to evaluate expression");
    }
  }

  /**
   * Solve a quadratic equation ax² + bx + c = 0
   */
  solveQuadratic(a: number, b: number, c: number): MathEvaluationResult {
    try {
      if (a === 0) {
        throw new Error("Coefficient 'a' cannot be zero in a quadratic equation");
      }
      
      const discriminant = b * b - 4 * a * c;
      
      if (discriminant < 0) {
        const realPart = (-b / (2 * a)).toFixed(4);
        const imaginaryPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
        return {
          result: `Complex roots: ${realPart} ± ${imaginaryPart}i`,
          steps: [
            `Discriminant: b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`,
            `Since discriminant < 0, roots are complex`,
            `x = (-b ± √(b² - 4ac)) / 2a = ${realPart} ± ${imaginaryPart}i`
          ]
        };
      } else if (discriminant === 0) {
        const root = (-b / (2 * a)).toFixed(4);
        return {
          result: `Double root: x = ${root}`,
          steps: [
            `Discriminant: b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`,
            `Since discriminant = 0, there is one real root`,
            `x = -b / 2a = ${root}`
          ]
        };
      } else {
        const root1 = ((-b + Math.sqrt(discriminant)) / (2 * a)).toFixed(4);
        const root2 = ((-b - Math.sqrt(discriminant)) / (2 * a)).toFixed(4);
        return {
          result: `Roots: x₁ = ${root1}, x₂ = ${root2}`,
          steps: [
            `Discriminant: b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`,
            `Since discriminant > 0, there are two real roots`,
            `x₁ = (-b + √(b² - 4ac)) / 2a = ${root1}`,
            `x₂ = (-b - √(b² - 4ac)) / 2a = ${root2}`
          ]
        };
      }
    } catch (error) {
      return { 
        result: "Error", 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  }

  /**
   * Calculate the area of a circle given radius
   */
  circleArea(radius: number): MathEvaluationResult {
    try {
      if (radius < 0) {
        throw new Error("Radius cannot be negative");
      }
      
      const area = Math.PI * radius * radius;
      return {
        result: area.toFixed(4),
        steps: [
          `Formula: A = πr²`,
          `A = π × ${radius}²`,
          `A = π × ${radius * radius}`,
          `A ≈ ${area.toFixed(4)}`
        ]
      };
    } catch (error) {
      return { 
        result: "Error", 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  }

  /**
   * Calculate the circumference of a circle given radius
   */
  circleCircumference(radius: number): MathEvaluationResult {
    try {
      if (radius < 0) {
        throw new Error("Radius cannot be negative");
      }
      
      const circumference = 2 * Math.PI * radius;
      return {
        result: circumference.toFixed(4),
        steps: [
          `Formula: C = 2πr`,
          `C = 2π × ${radius}`,
          `C ≈ ${circumference.toFixed(4)}`
        ]
      };
    } catch (error) {
      return { 
        result: "Error", 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  }

  /**
   * Calculate the area of a triangle given base and height
   */
  triangleArea(base: number, height: number): MathEvaluationResult {
    try {
      if (base < 0 || height < 0) {
        throw new Error("Base and height cannot be negative");
      }
      
      const area = 0.5 * base * height;
      return {
        result: area.toFixed(4),
        steps: [
          `Formula: A = ½ × base × height`,
          `A = ½ × ${base} × ${height}`,
          `A = ${area.toFixed(4)}`
        ]
      };
    } catch (error) {
      return { 
        result: "Error", 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  }

  /**
   * Calculate the hypotenuse of a right triangle using Pythagorean theorem
   */
  pythagorean(a: number, b: number): MathEvaluationResult {
    try {
      if (a < 0 || b < 0) {
        throw new Error("Side lengths cannot be negative");
      }
      
      const c = Math.sqrt(a * a + b * b);
      return {
        result: c.toFixed(4),
        steps: [
          `Formula: c² = a² + b²`,
          `c² = ${a}² + ${b}²`,
          `c² = ${a * a} + ${b * b}`,
          `c² = ${a * a + b * b}`,
          `c = √${a * a + b * b}`,
          `c ≈ ${c.toFixed(4)}`
        ]
      };
    } catch (error) {
      return { 
        result: "Error", 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  }

  /**
   * Calculate derivative of a simple power function
   */
  powerRuleDerivative(coefficient: number, exponent: number): MathEvaluationResult {
    try {
      const newCoefficient = coefficient * exponent;
      const newExponent = exponent - 1;
      
      return {
        result: `${newCoefficient}x^${newExponent}`,
        steps: [
          `Function: f(x) = ${coefficient}x^${exponent}`,
          `Power Rule: d/dx(x^n) = nx^(n-1)`,
          `f'(x) = ${coefficient} × ${exponent} × x^(${exponent}-1)`,
          `f'(x) = ${newCoefficient}x^${newExponent}`
        ]
      };
    } catch (error) {
      return { 
        result: "Error", 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  }
}

// Create a singleton instance
export const mathEngine = new MathEngine();