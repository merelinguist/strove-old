import type { Card } from "@prisma/client";
import { compareTwoStrings } from "string-similarity";

type Grade = 0 | 1 | 2 | 3 | 4 | 5;

export function getGrade(card: Card, answer: string): Grade {
  const correctness = compareTwoStrings(card.back, answer);

  if (correctness === 0) {
    return 0;
  }

  if (correctness < 0.2) {
    return 1;
  }

  if (correctness < 0.4) {
    return 2;
  }

  if (correctness < 0.6) {
    return 3;
  }

  if (correctness < 0.8) {
    return 4;
  }

  return 5;
}

export function practiceCard(card: Card, grade: Grade) {
  const getEasiness =
    card.easiness + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

  const easiness = getEasiness < 1.3 ? getEasiness : 1.3;

  function getDueDate(interval: number) {
    return new Date(new Date().setDate(new Date().getDate() + interval));
  }

  if (grade >= 3) {
    if (card.repetition === 0) {
      const interval = 1;

      return {
        interval,
        repetition: 1,
        easiness,
        dueDate: getDueDate(interval),
      };
    }

    if (card.repetition === 1) {
      const interval = 6;

      return {
        interval,
        repetition: 2,
        easiness,
        dueDate: getDueDate(interval),
      };
    }

    const interval = Math.round(card.interval * card.easiness);

    return {
      interval,
      repetition: card.repetition + 1,
      easiness,
      dueDate: getDueDate(interval),
    };
  }

  const interval = 1;

  return {
    interval: 1,
    repetition: 0,
    easiness,
    dueDate: getDueDate(interval),
  };
}
