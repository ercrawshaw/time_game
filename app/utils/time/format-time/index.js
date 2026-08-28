export function formatDigitalTime(
  hour,
  minute
) {
  return `${hour}:${minute
    .toString()
    .padStart(2, "0")}`;
}

export function formatTimeAsWords(
  hour,
  minute
) {
  const numbers = [
    "twelve",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
  ];

  const currentHour = numbers[hour];

  const nextHour =
    numbers[
      hour === 12
        ? 1
        : hour + 1
    ];

  if (minute === 0) {
    return `${currentHour} o'clock`;
  }

  if (minute === 15) {
    return `quarter past ${currentHour}`;
  }

  if (minute === 30) {
    return `half past ${currentHour}`;
  }

  if (minute === 45) {
    return `quarter to ${nextHour}`;
  }

  if (minute < 30) {
    return `${numberToWords(minute)} ${
      minute === 1
        ? "minute"
        : "minutes"
    } past ${currentHour}`;
  }

  const minutesToNextHour =
    60 - minute;

  return `${numberToWords(
    minutesToNextHour
  )} ${
    minutesToNextHour === 1
      ? "minute"
      : "minutes"
  } to ${nextHour}`;
}

function numberToWords(number) {
  const words = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
  ];

  if (number <= 20) {
    return words[number];
  }

  const tens = {
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
  };

  const tensNumber =
    Math.floor(number / 10) * 10;

  const remainder = number % 10;

  if (remainder === 0) {
    return tens[tensNumber];
  }

  return `${tens[tensNumber]}-${words[remainder]}`;
}