export type AngleMode = "DEG" | "RAD";

export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity; // Limit for JavaScript 64-bit float
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}

export function evaluateScientificFunction(
  fn: string,
  val: number,
  mode: AngleMode = "DEG"
): number {
  if (isNaN(val)) return NaN;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  switch (fn) {
    case "sin":
      return Math.sin(mode === "DEG" ? toRad(val) : val);
    case "cos":
      return Math.cos(mode === "DEG" ? toRad(val) : val);
    case "tan": {
      const res = Math.tan(mode === "DEG" ? toRad(val) : val);
      return Math.abs(res) > 1e14 ? NaN : res;
    }
    case "asin": {
      if (val < -1 || val > 1) return NaN;
      const rad = Math.asin(val);
      return mode === "DEG" ? toDeg(rad) : rad;
    }
    case "acos": {
      if (val < -1 || val > 1) return NaN;
      const rad = Math.acos(val);
      return mode === "DEG" ? toDeg(rad) : rad;
    }
    case "atan": {
      const rad = Math.atan(val);
      return mode === "DEG" ? toDeg(rad) : rad;
    }
    case "log":
      return val > 0 ? Math.log10(val) : NaN;
    case "ln":
      return val > 0 ? Math.log(val) : NaN;
    case "sqrt":
      return val >= 0 ? Math.sqrt(val) : NaN;
    case "cbrt":
      return Math.cbrt(val);
    case "sqr":
      return val * val;
    case "cube":
      return val * val * val;
    case "exp10":
      return Math.pow(10, val);
    case "expe":
      return Math.exp(val);
    case "abs":
      return Math.abs(val);
    case "fact":
      return factorial(val);
    case "inv":
      return val !== 0 ? 1 / val : NaN;
    default:
      return val;
  }
}

// Tokenizer & Safe Expression Evaluator
export function evaluateMathExpression(expr: string): number {
  const sanitized = expr
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/π/g, `${Math.PI}`)
    .replace(/e/g, `${Math.E}`);

  // Safe tokenizer matching numbers, operators, parentheses
  const tokens = sanitized.match(/(\d+(\.\d+)?|[+\-*/^()])/g);
  if (!tokens || tokens.length === 0) return 0;

  // Shunting-yard algorithm
  const outputQueue: string[] = [];
  const opStack: string[] = [];

  const precedence: Record<string, number> = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3,
  };

  const isOperator = (tok: string) => ["+", "-", "*", "/", "^"].includes(tok);

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (!isNaN(Number(token))) {
      outputQueue.push(token);
    } else if (isOperator(token)) {
      // Handle unary minus
      if (token === "-" && (i === 0 || tokens[i - 1] === "(" || isOperator(tokens[i - 1]))) {
        outputQueue.push("0");
      }

      while (
        opStack.length > 0 &&
        opStack[opStack.length - 1] !== "(" &&
        (precedence[opStack[opStack.length - 1]] > precedence[token] ||
          (precedence[opStack[opStack.length - 1]] === precedence[token] && token !== "^"))
      ) {
        outputQueue.push(opStack.pop()!);
      }
      opStack.push(token);
    } else if (token === "(") {
      opStack.push(token);
    } else if (token === ")") {
      while (opStack.length > 0 && opStack[opStack.length - 1] !== "(") {
        outputQueue.push(opStack.pop()!);
      }
      opStack.pop(); // discard '('
    }
  }

  while (opStack.length > 0) {
    outputQueue.push(opStack.pop()!);
  }

  // Evaluate Reverse Polish Notation (RPN)
  const evalStack: number[] = [];
  for (const token of outputQueue) {
    if (!isNaN(Number(token))) {
      evalStack.push(Number(token));
    } else if (isOperator(token)) {
      const b = evalStack.pop() ?? 0;
      const a = evalStack.pop() ?? 0;
      switch (token) {
        case "+":
          evalStack.push(a + b);
          break;
        case "-":
          evalStack.push(a - b);
          break;
        case "*":
          evalStack.push(a * b);
          break;
        case "/":
          evalStack.push(b !== 0 ? a / b : NaN);
          break;
        case "^":
          evalStack.push(Math.pow(a, b));
          break;
      }
    }
  }

  return evalStack.length > 0 ? evalStack[0] : 0;
}
