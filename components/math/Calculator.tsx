"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator as CalculatorIcon } from "lucide-react";

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "*":
        return firstValue * secondValue;
      case "/":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-500 to-purple-600">
        <CardTitle className="flex items-center gap-2 text-white">
          <CalculatorIcon className="h-5 w-5" />
          Math Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4">
          <Input
            value={display}
            readOnly
            className="text-right text-xl font-mono bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            onClick={clear}
            className="col-span-2 bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
          >
            Clear
          </Button>
          <Button
            variant="outline"
            onClick={() => performOperation("/")}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
          >
            ÷
          </Button>
          <Button
            variant="outline"
            onClick={() => performOperation("*")}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
          >
            ×
          </Button>
          
          <Button
            variant="outline"
            onClick={() => inputNumber("7")}
            className="bg-gray-50 hover:bg-gray-100"
          >
            7
          </Button>
          <Button
            variant="outline"
            onClick={() => inputNumber("8")}
            className="bg-gray-50 hover:bg-gray-100"
          >
            8
          </Button>
          <Button
            variant="outline"
            onClick={() => inputNumber("9")}
            className="bg-gray-50 hover:bg-gray-100"
          >
            9
          </Button>
          <Button
            variant="outline"
            onClick={() => performOperation("-")}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
          >
            −
          </Button>
          
          <Button
            variant="outline"
            onClick={() => inputNumber("4")}
            className="bg-gray-50 hover:bg-gray-100"
          >
            4
          </Button>
          <Button
            variant="outline"
            onClick={() => inputNumber("5")}
            className="bg-gray-50 hover:bg-gray-100"
          >
            5
          </Button>
          <Button
            variant="outline"
            onClick={() => inputNumber("6")}
            className="bg-gray-50 hover:bg-gray-100"
          >
            6
          </Button>
          <Button
            variant="outline"
            onClick={() => performOperation("+")}
            className="bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200"
          >
            +
          </Button>
          
          <Button
            variant="outline"
            onClick={() => inputNumber("1")}
            className="bg-gray-50 hover:bg-gray-100"
          >
            1
          </Button>
          <Button
            variant="outline"
            onClick={() => inputNumber("2")}
            className="bg-gray-50 hover:bg-gray-100"
          >
            2
          </Button>
          <Button
            variant="outline"
            onClick={() => inputNumber("3")}
            className="bg-gray-50 hover:bg-gray-100"
          >
            3
          </Button>
          <Button
            variant="outline"
            onClick={performCalculation}
            className="row-span-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            =
          </Button>
          
          <Button
            variant="outline"
            onClick={() => inputNumber("0")}
            className="col-span-2 bg-gray-50 hover:bg-gray-100"
          >
            0
          </Button>
          <Button
            variant="outline"
            onClick={inputDecimal}
            className="bg-gray-50 hover:bg-gray-100"
          >
            .
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}