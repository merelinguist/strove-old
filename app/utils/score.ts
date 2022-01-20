export const score = (positive: number, negative: number) =>
  positive / (positive + negative + 1);
