import timeToValue from "../../time/time-to-value";

import generateTime from "../generate-time";

export default function generateWrongTimes(
  correctTime,
  difficulty,
  amount
) {
  const wrongTimes = [];

  while (wrongTimes.length < amount) {
    const possibleTime =
      generateTime(difficulty);

    const alreadyUsed = wrongTimes.some(
      (time) =>
        timeToValue(time) ===
        timeToValue(possibleTime)
    );

    const isCorrect =
      timeToValue(possibleTime) ===
      timeToValue(correctTime);

    if (!alreadyUsed && !isCorrect) {
      wrongTimes.push(possibleTime);
    }
  }

  return wrongTimes;
}