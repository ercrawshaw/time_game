import shuffle from "../../common/shuffle";
import { formatDigitalTime, formatTimeAsWords } from "../../time/format-time";
import timeToValue from "../../time/time-to-value";
import generateTime from "../generate-time";
import generateWrongTimes from "../generate-wrong-time";

export default function createQuestion( difficulty, timeType) {
  
  const correctTime = generateTime(difficulty);
  const wrongTimes = generateWrongTimes(correctTime, difficulty, 4);

  const allTimes = shuffle([ correctTime, ...wrongTimes ]);

  const correctAnswer = timeToValue(correctTime);

  const answers = allTimes.map(
    (time, index) => {
      let label;

      if (timeType === "mixed") {
        label =
          index % 2 === 0
            ? formatTimeAsWords(
                time.hour,
                time.minute
              )
            : formatDigitalTime(
                time.hour,
                time.minute
              );
      } else {
        label = formatTimeAsWords(
          time.hour,
          time.minute
        );
      }

      return {
        value: timeToValue(time),
        label,
      };
    }
  );

  return {
    correctTime,
    correctAnswer,
    answers,
  };
}