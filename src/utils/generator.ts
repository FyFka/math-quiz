import { ComplexityEnum } from "../interfaces/Complexity";

export const generateExpression = (complexity: ComplexityEnum, step: number) => {
  const scale = Number(complexity);
  const operators = ["-", "+", "*", "/"];
  const expression = new Array<string | number>();
  for (let i = 0; i < scale; i++) {
    const numbo = generateRandomNumber(1, scale * step);

    if (i !== 0) {
      const symbol = generateRandomNumber(0, 3);
      expression.push(operators[symbol]);
    }
    expression.push(numbo);
  }
  return expression;
};

export const generateFakeAnswers = (rightAnswer: number, count: number, width: number) => {
  const border = Math.abs(rightAnswer) + (width + 20) * 2;
  const buffer = new Set<number>([rightAnswer]);
  while (buffer.size < count + 1) {
    buffer.add(generateRandomNumber(border * -1, border));
  }

  return [...buffer].slice(1);
};

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
