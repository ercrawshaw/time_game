"use client";

import { useRouter } from "next/navigation";

import { useAppContext } from "../context";
import Cockpit from "../components/cockpit";

import { DIFFICULTIES, TIME_TYPES } from "./config";

export default function OptionsPage() {
  const router = useRouter();

  const {
    timeType,
    setTimeType,
    difficulty,
    setDifficulty,
  } = useAppContext();

  const canStart = timeType && difficulty;

  const startGame = () => {
    if (!canStart) return;
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