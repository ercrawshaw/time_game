import {
  ALIENS,
  ALIEN_RANKS,
  SCORE_THRESHOLDS,
  UNLIMITED_THRESHOLDS,
} from "../../../config/aliens";

const getThresholds = (timeLimit) => {
  return (
    SCORE_THRESHOLDS[timeLimit] ??
    UNLIMITED_THRESHOLDS
  );
};

export const getAlienRank = (score, timeLimit) => {
  if (!Number.isFinite(score) || score <= 0) {
    return null;
  }

  const thresholds = getThresholds(timeLimit);

  // walk highest to lowest so the first match is the best rank earned
  for (
    let index = ALIEN_RANKS.length - 1;
    index > 0;
    index--
  ) {
    const rank = ALIEN_RANKS[index];

    if (score >= thresholds[rank]) {
      return rank;
    }
  }

  return ALIEN_RANKS[0];
};

export const getNextAlien = (rank, timeLimit) => {
  if (!rank) {
    return null;
  }

  const nextRank =
    ALIEN_RANKS[ALIEN_RANKS.indexOf(rank) + 1];

  if (!nextRank) {
    return null;
  }

  return {
    rank: nextRank,
    name: ALIENS[nextRank].name,
    requiredScore:
      getThresholds(timeLimit)[nextRank],
  };
};
