"use client";

import {
  Suspense,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import Clock from "../components/clock";
import Cockpit from "../components/cockpit";

import createQuestion from "../utils/game/create-question";

function Game() {
  const searchParams = useSearchParams();

  const timeType =
    searchParams.get("timeType") ||
    "analog";

  const difficulty =
    searchParams.get("difficulty") ||
    "hour";

  const [
    questionNumber,
    setQuestionNumber,
  ] = useState(1);

  const [
    selectedAnswer,
    setSelectedAnswer,
  ] = useState(null);

  const [
    hasAnswered,
    setHasAnswered,
  ] = useState(false);

  const question = useMemo(() => {
    return createQuestion(
      difficulty,
      timeType
    );
  }, [
    difficulty,
    timeType,
    questionNumber,
  ]);

  const chooseAnswer = (answer) => {
    if (hasAnswered) {
      return;
    }

    setSelectedAnswer(answer.value);
    setHasAnswered(true);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);

    setQuestionNumber(
      (current) => current + 1
    );
  };

  return (
    <Cockpit
      status={`QUESTION ${questionNumber}`}
    >
      <div className="gameContent">
        <p className="screenLabel">
          GALACTIC TIME COMMAND
        </p>

        <h1 className="gameTitle">
          WHAT TIME IS IT?
        </h1>

        <Clock
          hour={question.correctTime.hour}
          minute={
            question.correctTime.minute
          }
        />

        <div className="answerGrid">
          {question.answers.map(
            (answer) => {
              const isSelected =
                selectedAnswer ===
                answer.value;

              const isCorrect =
                answer.value ===
                question.correctAnswer;

              let className =
                "answerButton";

              if (
                hasAnswered &&
                isCorrect
              ) {
                className +=
                  " correctAnswer";
              }

              if (
                hasAnswered &&
                isSelected &&
                !isCorrect
              ) {
                className +=
                  " wrongAnswer";
              }

              return (
                <button
                  key={`${answer.value}-${answer.label}`}
                  className={className}
                  onClick={() =>
                    chooseAnswer(answer)
                  }
                >
                  {answer.label}
                </button>
              );
            }
          )}
        </div>

        {hasAnswered && (
          <div className="resultArea">
            <p
              className={
                selectedAnswer ===
                question.correctAnswer
                  ? "correctMessage"
                  : "wrongMessage"
              }
            >
              {selectedAnswer ===
              question.correctAnswer
                ? "MISSION SUCCESS!"
                : "NOT QUITE — CHECK THE CLOCK AGAIN!"}
            </p>

            <button
              className="startButton"
              onClick={nextQuestion}
            >
              NEXT CLOCK
            </button>
          </div>
        )}
      </div>
    </Cockpit>
  );
}

export default function GamePage() {
  return (
    <Suspense
      fallback={
        <main className="gameSpace" />
      }
    >
      <Game />
    </Suspense>
  );
}