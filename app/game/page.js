"use client";
import playSound from "../utils/audio/play-sound";
import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { useAppContext } from "../context";

import Clock from "../components/clock";
import Cockpit from "../components/cockpit";
import MissionResult from "../components/mission-result";

import createQuestion from "../utils/game/create-question";

export default function GamePage() {
  const router = useRouter();
  const {
    timeType,
    difficulty,
    isSoundOn,
    addPoint,
    score,
    resetScore,
    timeLimit,
    timeUp,
    setTimeUp,
  } = useAppContext();
  const [questionNumber,setQuestionNumber] = useState(1);
  const [wrongAnswers,setWrongAnswers] = useState([]);
  const [message,setMessage] = useState("");
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const question = useMemo(() => {
    return createQuestion(difficulty, timeType);
  }, [difficulty, timeType, questionNumber]);

  const nextQuestion = () => {
    setWrongAnswers([]);
    setWrongAttempts(0);
    setMessage("");

    setQuestionNumber(
      (current) => current + 1
    );
  };

  const chooseAnswer = (answer) => {
    const isCorrect = answer.value === question.correctAnswer;

    if (isCorrect) {
      if (isSoundOn) playSound("/audio/correct.mp3");
      addPoint();

      setTimeout(() => {
        nextQuestion();
      }, 50);

      return;
    }

    setWrongAnswers((current) => [
      ...current,
      answer.value,
    ]);

    setWrongAttempts((current) => current + 1);

    if (wrongAttempts >=2) {
      if (isSoundOn) playSound("/audio/wrong.mp3");
      nextQuestion();
    } else {
      setMessage("NOT QUITE — TRY AGAIN");
      if (isSoundOn) playSound("/audio/wrong.mp3");
    }

  };

  const gameContentRef = useRef(null);

  useEffect(() => {
    gameContentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }, []);

  const playAgain = () => {
    resetScore();
    setTimeUp(false);
    router.push("/options");
  };

  if (timeUp) {
    return (
      <Cockpit status="MISSION COMPLETE">
        <MissionResult
          score={score}
          timeLimit={
            timeLimit ? timeLimit / 1000 : null
          }
          onPlayAgain={playAgain}
        />
      </Cockpit>
    );
  }

  return (
    <Cockpit
      status={`QUESTION ${questionNumber}`}
      showCountdown
    >
      <div className="gameContent">
        <p className="screenLabel">
          GALACTIC TIME COMMAND
        </p>

        <h1 className="gameTitle">
          WHAT TIME IS IT?
        </h1>

        <div ref={gameContentRef} />
        <div
          key={`clock-${questionNumber}`}
          className="clockTransition"
        >
          <Clock
            hour={question.correctTime.hour}
            minute={question.correctTime.minute}
          />
        </div>

        <div
          key={questionNumber}
          className="answerGrid"
        >
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

        {!timeLimit && (
          <div className="endMissionArea">
            <button
              type="button"
              onClick={() => setTimeUp(true)}
            >
              END MISSION
            </button>
          </div>
        )}
      </div>
    </Cockpit>
  );
}