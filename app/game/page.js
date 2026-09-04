"use client";
import playSound from "../utils/audio/play-sound";
import { useMemo, useState } from "react";

import { useAppContext } from "../context";

import Clock from "../components/clock";
import Cockpit from "../components/cockpit";

import createQuestion from "../utils/game/create-question";

export default function GamePage() {
  const {timeType, difficulty, isSoundOn} = useAppContext();
  const [questionNumber,setQuestionNumber] = useState(1);
  const [wrongAnswers,setWrongAnswers] = useState([]);
  const [message,setMessage] = useState("");

  const question = useMemo(() => {
    return createQuestion(difficulty, timeType);
  }, [difficulty, timeType, questionNumber]);

  const nextQuestion = () => {
    setWrongAnswers([]);
    setMessage("");

    setQuestionNumber(
      (current) => current + 1
    );
  };

  const chooseAnswer = (answer) => {
    const isCorrect = answer.value === question.correctAnswer;

    if (isCorrect) {
      if (isSoundOn) playSound("/audio/correct.mp3");

      setTimeout(() => {
        nextQuestion();
      }, 10);

      return;
    }

    setWrongAnswers((current) => [
      ...current,
      answer.value,
    ]);

    setMessage("NOT QUITE — TRY AGAIN");
    if (isSoundOn) playSound("/audio/wrong.mp3");

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
          minute={question.correctTime.minute}
        />

        <div className="answerGrid">
          {question.answers.map((answer) => {
            const isWrong =
              wrongAnswers.includes(
                answer.value
              );

            const className = isWrong
              ? "answerButton wrongAttempt"
              : "answerButton";

            return (
              <button
                key={`${answer.value}-${answer.label}`}
                className={className}
                disabled={isWrong}
                onClick={() =>
                  chooseAnswer(answer)
                }
              >
                {answer.label}
              </button>
            );
          })}
        </div>

        {message && (
          <div className="resultArea">
            <p
              className={
                message === "MISSION SUCCESS!"
                  ? "correctMessage"
                  : "wrongMessage"
              }
            >
              {message}
            </p>
          </div>
        )}
      </div>
    </Cockpit>
  );
}