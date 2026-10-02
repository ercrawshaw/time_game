"use client";

import { ALIENS } from "../../config/aliens";
import {
  getAlienRank,
  getNextAlien,
} from "../../utils/game/alien-scoring";

import "./index.css";

export default function MissionResult({
  score,
  timeLimit = null,
  onPlayAgain,
}) {
  const rank = getAlienRank(score, timeLimit);
  const alien = rank ? ALIENS[rank] : null;
  const nextAlien = getNextAlien(rank, timeLimit);

  return (
    <div className="missionResult">
      <p className="screenLabel">
        GALACTIC TIME COMMAND
      </p>

      <h1 className="missionResultTitle">
        MISSION COMPLETE
      </h1>

      <div className="missionResultScore">
        <span className="missionResultScoreLabel">
          SCORE
        </span>

        <span className="missionResultScoreValue">
          {score}
        </span>
      </div>

      {alien && (
        <div className="missionResultAlien">
          <p className="missionResultDiscovered">
            YOU DISCOVERED
          </p>

          <img
            className="missionResultImage"
            src={alien.image}
            alt={`${alien.name}, ${alien.title}`}
          />

          <h2 className="missionResultName">
            {alien.name}
          </h2>

          <p className="missionResultRankTitle">
            {alien.title}
          </p>

          <p className="missionResultMessage">
            {alien.message}
          </p>
        </div>
      )}

      {!alien && (
        <div className="missionResultAlien">
          <h2 className="missionResultName">
            GO AGAIN!
          </h2>

          <p className="missionResultMessage">
            Your next mission is waiting.
          </p>
        </div>
      )}

      {nextAlien && (
        <div className="missionResultNext">
          <p className="missionResultNextRank">
            Next rank: {nextAlien.name}
          </p>

          <p className="missionResultNextScore">
            Score {nextAlien.requiredScore}+ next
            time
          </p>
        </div>
      )}

      <button
        type="button"
        className="missionResultButton"
        onClick={onPlayAgain}
      >
        PLAY AGAIN
      </button>
    </div>
  );
}
