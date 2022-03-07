import type { Card } from "@prisma/client";

export function supermemo(card: Card, grade: 0 | 1 | 2 | 3 | 4 | 5) {
  const getEasiness =
    card.easiness + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

  const easiness = getEasiness < 1.3 ? getEasiness : 1.3;

  if (grade >= 3) {
    if (card.repetition === 0) {
      return {
        interval: 1,
        repetition: 1,
        easiness,
      };
    }

    if (card.repetition === 1) {
      return {
        interval: 6,
        repetition: 2,
        easiness,
      };
    }

    return {
      interval: Math.round(card.interval * card.easiness),
      repetition: card.repetition + 1,
      easiness,
    };
  }

  return {
    interval: 1,
    repetition: 0,
    easiness,
  };
}
