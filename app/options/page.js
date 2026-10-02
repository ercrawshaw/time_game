"use client";

import { useRouter } from "next/navigation";

import { useAppContext } from "../context";
import {
  DIFFICULTIES,
  TIME_LIMITS,
  TIME_TYPES,
} from "../config/options";

import Cockpit from "../components/cockpit";
import OptionCard from "../components/option-card";

import "./index.css";

export default function OptionsPage() {
  const router = useRouter();

  const {
    timeType,
    setTimeType,
    difficulty,
    setDifficulty,
    timeLimit,
    setTimeLimit,
    resetGame,
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

    resetGame();
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
              <OptionCard
                key={option.value}
                icon={option.icon}
                label={option.label}
                selected={
                  timeType === option.value
                }
                onSelect={() =>
                  setTimeType(option.value)
                }
              />
            ))}
          </div>
        </section>

        <section className="optionSection">
          <h2>2. Choose your accuracy</h2>

          <div className="optionGrid difficultyGrid">
            {DIFFICULTIES.map((option) => (
              <OptionCard
                key={option.value}
                className="difficultyCard"
                label={option.label}
                example={option.example}
                selected={
                  difficulty === option.value
                }
                onSelect={() =>
                  setDifficulty(option.value)
                }
              />
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
              <OptionCard
                key={option.value}
                icon={option.icon}
                label={option.label}
                selected={
                  timeLimit === option.value
                }
                onSelect={() =>
                  chooseTimeLimit(option.value)
                }
              />
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
