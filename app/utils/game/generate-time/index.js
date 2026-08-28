import randomNumber from "../../common/random-number";

export default function generateTime(
  difficulty
) {
  const hour = randomNumber(1, 12);

  let minutes;

  switch (difficulty) {
    case "hour":
      minutes = [0];
      break;

    case "half-hour":
      minutes = [0, 30];
      break;

    case "quarter-hour":
      minutes = [0, 15, 30, 45];
      break;

    case "five-minutes":
      minutes = Array.from(
        { length: 12 },
        (_, index) => index * 5
      );
      break;

    case "minute":
      minutes = Array.from(
        { length: 60 },
        (_, index) => index
      );
      break;

    default:
      minutes = [0];
  }

  return {
    hour,
    minute:
      minutes[
        Math.floor(
          Math.random() * minutes.length
        )
      ],
  };
}