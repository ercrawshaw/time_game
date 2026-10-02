"use client";

import { useRouter } from "next/navigation";

import { useAppContext } from "../context";
import useQuiz from "../hooks/use-quiz";

import AnswerGrid from "../components/answer-grid";
import Clock from "../components/clock";
import Cockpit from "../components/cockpit";
import MissionResult from "../components/mission-result";

import "./index.css";

export default function GamePage() {
  const router = useRouter();

  const {
    timeType,
    difficulty,
    isSoundOn,
    addPoint,
    score,
    timeLimit,
    timeUp,
    setTimeUp,
    resetGame,
  } = useAppContext();

  const {
    question,
    questionNumber,
    wrongAnswers,
    message,
    chooseAnswer,
  } = useQuiz({
    difficulty,
    timeType,
    isSoundOn,
    onCorrect: addPoint,
  });

  const playAgain = () => {
    resetGame();
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
      showTimeDrive
    >
      <div className="gameContent">
        <p className="screenLabel">
          GALACTIC TIME COMMAND
        </p>

        <h1 className="gameTitle">
          WHAT TIME IS IT?
        </h1>

        <div
          key={`clock-${questionNumber}`}
          className="clockTransition"
        >
          <Clock
            hour={question.correctTime.hour}
            minute={question.correctTime.minute}
          />
        </div>

        <AnswerGrid
          key={questionNumber}
          answers={question.answers}
          wrongAnswers={wrongAnswers}
          onChoose={chooseAnswer}
        />

        {message && (
          <div className="resultArea">
            <p className="wrongMessage">
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
