"use client";

import { useRouter } from "next/navigation";

import { useAppContext } from "../context";
import Cockpit from "../components/cockpit";

import { DIFFICULTIES, TIME_TYPES, TIME_LIMITS } from "./config";

export default function OptionsPage() {
  const router = useRouter();

  const {
    timeType,
    setTimeType,
    difficulty,
    setDifficulty,
    timeLimit,
    setTimeLimit,
    score,
    resetScore,
    addPoint,
    setTimeUp,
  } = useAppContext();

  const canStart = timeType && difficulty;

  const chooseTimeLimit = (value) => {
    // clicking the active card clears it, which means no time limit
    setTimeLimit((current) =>
      current === value ? null : value
    );
  };

  const startGame = () => {
    if (!canStart) return;

    resetScore();
    setTimeUp(false);
    router.push("/game");
  };

  return (
    <Cockpit status="MISSION SETUP">
      <div className="optionsContent">
        <p className="screenLabel">
          GALACTIC TIME COMMAND
        </p>

        <h1 className="optionsTitle">
          CHOOSE YOUR MISSION
        </h1>

        <p className="optionsIntro">
          Configure your time training before
          launch.
        </p>

        <section className="optionSection">
          <h2>1. Choose your clock type</h2>

          <div className="optionGrid timeTypeGrid">
            {TIME_TYPES.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={timeType === option.value}
                className={`optionCard ${
                  timeType === option.value
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setTimeType(option.value)
                }
              >
                <span className="optionIcon">
                  {option.icon}
                </span>

                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="optionSection">
          <h2>2. Choose your accuracy</h2>

          <div className="optionGrid difficultyGrid">
            {DIFFICULTIES.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={difficulty === option.value}
                className={`optionCard difficultyCard ${
                  difficulty === option.value
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setDifficulty(option.value)
                }
              >
                <span>{option.label}</span>

                <span className="optionExample">
                  {option.example}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="optionSection">
          <h2>3. Choose your time limit</h2>

          <p className="optionHint">
            Optional — leave unselected for
            unlimited time, or tap again to
            clear.
          </p>

          <div className="optionGrid timeLimitGrid">
            {TIME_LIMITS.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={timeLimit === option.value}
                className={`optionCard ${
                  timeLimit === option.value
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  chooseTimeLimit(option.value)
                }
              >
                <span className="optionIcon">
                  {option.icon}
                </span>

                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="launchArea">
          {!canStart && (
            <p className="selectionMessage">
              Select one option from each
              section to continue.
            </p>
          )}

          <button
            type="button"
            className="startButton"
            disabled={!canStart}
            onClick={startGame}
          >
            START MISSION
          </button>
        </div>
      </div>
    </Cockpit>
  );
}