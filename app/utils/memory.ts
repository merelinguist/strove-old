// The most important module in this project! This is a custom spaced-repetition algorithm, based on
// the work of Anki and SuperMemo. It is nicknamed ???. It is customisable, and aims to strike a good balance between
// cramming and long-term learning.

type RepetitionState =
  | {
      state: "reviewing";
      easeFactor: number;
      lastRepetition: Date;
      nextRepetition: Date;
    }
  | {
      state: "learning";
      easyCount: number;
      stage: number;
      nextRepetition: Date;
    };

export {};
