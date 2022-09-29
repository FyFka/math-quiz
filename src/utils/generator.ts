import { ComplexityEnum } from "../interfaces/Complexity";

export const generateExpression = (complexity: ComplexityEnum, step: number) => {
  const scale = Number(complexity);
  const operators = ["-", "+", "*", "/"];
  const expression = new Array<string | number>();
  for (let i = 0; i < scale; i++) {
    const numbo = generateRandomNumber(0, scale * step);

    if (i !== 0) {
      const symbol = generateRandomNumber(0, 3);
      expression.push(operators[symbol]);
    }
    expression.push(numbo);
  }
  return expression;
};

export const generateFakeAnswers = (rightAnswer: number, count: number, width: number) => {
  const border = rightAnswer + width * 2;
  const fakeAnswers = [...new Array<number>(count)].map((fakeAnsw) =>
    generateRandomNumber(-Math.round(border / 2), Math.round(border / 2))
  );
  return fakeAnswers;
};

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
