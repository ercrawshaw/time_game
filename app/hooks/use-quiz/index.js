"use client";

import { useMemo, useState } from "react";

import playSound from "../../utils/audio/play-sound";
import createQuestion from "../../utils/game/create-question";

const MAX_WRONG_ATTEMPTS = 3;
const WRONG_MESSAGE = "NOT QUITE — TRY AGAIN";

export default function useQuiz({
  difficulty,
  timeType,
  isSoundOn,
  onCorrect,
}) {
  const [questionNumber, setQuestionNumber] =
    useState(1);
  const [wrongAnswers, setWrongAnswers] = useState(
    []
  );
  const [wrongAttempts, setWrongAttempts] =
    useState(0);
  const [message, setMessage] = useState("");

  // questionNumber is the trigger that rolls a fresh question
  const question = useMemo(
    () => createQuestion(difficulty, timeType),
    [difficulty, timeType, questionNumber]
  );

  const nextQuestion = () => {
    setWrongAnswers([]);
    setWrongAttempts(0);
    setMessage("");

    setQuestionNumber(
      (current) => current + 1
    );
  };

  const chooseAnswer = (answer) => {
    if (answer.value === question.correctAnswer) {
      if (isSoundOn) {
        playSound("/audio/correct.mp3");
      }

      onCorrect();

      // let the click register before swapping the question
      setTimeout(nextQuestion, 50);

      return;
    }

    if (isSoundOn) {
      playSound("/audio/wrong.mp3");
    }

    setWrongAnswers((current) => [
      ...current,
      answer.value,
    ]);

    setWrongAttempts(
      (current) => current + 1
    );

    if (wrongAttempts >= MAX_WRONG_ATTEMPTS - 1) {
      nextQuestion();
      return;
    }

    setMessage(WRONG_MESSAGE);
  };

  return {
    question,
    questionNumber,
    wrongAnswers,
    message,
    chooseAnswer,
  };
}
