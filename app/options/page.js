"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cockpit from "../components/cockpit";

const timeTypes = [
  {
    label: "Analog Time",
    value: "analog",
    icon: "◷",
  },
  {
    label: "Mixed Time",
    value: "mixed",
    icon: "◷ + 12:30",
  },
];

const difficulties = [
  {
    label: "To the Hour",
    value: "hour",
    example: "3:00",
  },
  {
    label: "To the Half Hour",
    value: "half-hour",
    example: "3:30",
  },
  {
    label: "To the Quarter Hour",
    value: "quarter-hour",
    example: "3:15",
  },
  {
    label: "To the Nearest Five Minutes",
    value: "five-minutes",
    example: "3:25",
  },
  {
    label: "To the Minute",
    value: "minute",
    example: "3:27",
  },
];

export default function OptionsPage() {
  const router = useRouter();

  const [selectedTimeType, setSelectedTimeType] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const canStart = selectedTimeType && selectedDifficulty;

  const startGame = () => {
    if (!canStart) {
      return;
    }

    const params = new URLSearchParams({
      timeType: selectedTimeType,
      difficulty: selectedDifficulty,
    });

    router.push(`/game?${params.toString()}`);
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
            Configure your time training before launch.
          </p>

          <section className="optionSection">
            <h2>1. Choose your clock type</h2>

            <div className="optionGrid timeTypeGrid">
              {timeTypes.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`optionCard ${
                    selectedTimeType === option.value ? "selected" : ""
                  }`}
                  onClick={() => setSelectedTimeType(option.value)}
                >
                  <span className="optionIcon">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="optionSection">
            <h2>2. Choose your accuracy</h2>

            <div className="optionGrid difficultyGrid">
              {difficulties.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`optionCard difficultyCard ${
                    selectedDifficulty === option.value ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDifficulty(option.value)}
                >
                  <span>{option.label}</span>
                  <span className="optionExample">{option.example}</span>
                </button>
              ))}
            </div>
          </section>

          <div className="launchArea">
            {!canStart && (
              <p className="selectionMessage">
                Select one option from each section to continue.
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