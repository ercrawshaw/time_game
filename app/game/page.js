"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cockpit from "../components/cockpit";

function Game() {
  const searchParams = useSearchParams();

  const timeType = searchParams.get("timeType") || "analog";
  const difficulty = searchParams.get("difficulty") || "hour";

  const [questionNumber, setQuestionNumber] = useState(1);

  const question = useMemo(() => {
    return createQuestion(difficulty, timeType);
  }, [difficulty, timeType, questionNumber]);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const chooseAnswer = (answer) => {
    if (hasAnswered) return;

    setSelectedAnswer(answer.value);
    setHasAnswered(true);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setHasAnswered(false);
    setQuestionNumber((current) => current + 1);
  };

  return (
    <Cockpit status={`QUESTION ${questionNumber}`}>
  <div className="gameContent">
    <p className="screenLabel">
      GALACTIC TIME COMMAND
    </p>

    <h1 className="gameTitle">
      WHAT TIME IS IT?
    </h1>

    <Clock
      hour={question.correctTime.hour}
      minute={question.correctTime.minute}
    />

    <div className="answerGrid">
            {question.answers.map((answer) => {
              const isSelected = selectedAnswer === answer.value;
              const isCorrect = answer.value === question.correctAnswer;

              let className = "answerButton";

              if (hasAnswered && isCorrect) {
                className += " correctAnswer";
              }

              if (hasAnswered && isSelected && !isCorrect) {
                className += " wrongAnswer";
              }

              return (
                <button
                  key={`${answer.value}-${answer.label}`}
                  className={className}
                  onClick={() => chooseAnswer(answer)}
                >
                  {answer.label}
                </button>
              );
            })}
          </div>

          {hasAnswered && (
            <div className="resultArea">
              <p
                className={
                  selectedAnswer === question.correctAnswer
                    ? "correctMessage"
                    : "wrongMessage"
                }
              >
                {selectedAnswer === question.correctAnswer
                  ? "MISSION SUCCESS!"
                  : "NOT QUITE — CHECK THE CLOCK AGAIN!"}
              </p>

              <button className="startButton" onClick={nextQuestion}>
                NEXT CLOCK
              </button>
            </div>
          )}
    </div>
    </Cockpit>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<main className="gameSpace" />}>
      <Game />
    </Suspense>
  );
}

/* ========================================
   CLOCK
   ======================================== */

function Clock({ hour, minute }) {
  const minuteAngle = minute * 6;

  const hourAngle =
    ((hour % 12) * 30) +
    (minute * 0.5);

  return (
    <div className="clockWrapper">
      <svg
        className="analogClock"
        viewBox="0 0 300 300"
        role="img"
        aria-label={`Analogue clock showing ${formatDigitalTime(
          hour,
          minute
        )}`}
      >
        <circle
          cx="150"
          cy="150"
          r="140"
          className="clockFace"
        />

        {Array.from({ length: 60 }).map((_, index) => {
          const angle = index * 6;
          const isHour = index % 5 === 0;

          const outerRadius = 130;
          const innerRadius = isHour ? 115 : 123;

          const x1 =
            150 +
            outerRadius *
              Math.sin((angle * Math.PI) / 180);

          const y1 =
            150 -
            outerRadius *
              Math.cos((angle * Math.PI) / 180);

          const x2 =
            150 +
            innerRadius *
              Math.sin((angle * Math.PI) / 180);

          const y2 =
            150 -
            innerRadius *
              Math.cos((angle * Math.PI) / 180);

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className={
                isHour
                  ? "hourMarker"
                  : "minuteMarker"
              }
            />
          );
        })}

        {Array.from({ length: 12 }).map((_, index) => {
          const number = index + 1;
          const angle = number * 30;

          const radius = 94;

          const x =
            150 +
            radius *
              Math.sin((angle * Math.PI) / 180);

          const y =
            155 -
            radius *
              Math.cos((angle * Math.PI) / 180);

          return (
            <text
              key={number}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="clockNumber"
            >
              {number}
            </text>
          );
        })}

        <line
          x1="150"
          y1="150"
          x2="150"
          y2="83"
          className="hourHand"
          transform={`rotate(${hourAngle} 150 150)`}
        />

        <line
          x1="150"
          y1="150"
          x2="150"
          y2="45"
          className="minuteHand"
          transform={`rotate(${minuteAngle} 150 150)`}
        />

        <circle
          cx="150"
          cy="150"
          r="8"
          className="clockCentre"
        />
      </svg>
    </div>
  );
}

/* ========================================
   QUESTION GENERATION
   ======================================== */

function createQuestion(difficulty, timeType) {
  const correctTime = generateTime(difficulty);

  const wrongTimes = generateWrongTimes(
    correctTime,
    difficulty,
    4
  );

  const allTimes = shuffle([
    correctTime,
    ...wrongTimes,
  ]);

  const correctAnswer = timeToValue(correctTime);

  const answers = allTimes.map((time, index) => {
    let label;

    if (timeType === "mixed") {
      /*
       * Alternate between written and digital answers.
       * The correct answer may therefore appear in either style.
       */
      label =
        index % 2 === 0
          ? formatTimeAsWords(time.hour, time.minute)
          : formatDigitalTime(time.hour, time.minute);
    } else {
      /*
       * Analog mode = written answers only.
       */
      label = formatTimeAsWords(
        time.hour,
        time.minute
      );
    }

    return {
      value: timeToValue(time),
      label,
    };
  });

  return {
    correctTime,
    correctAnswer,
    answers,
  };
}

function generateTime(difficulty) {
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
        Math.floor(Math.random() * minutes.length)
      ],
  };
}

function generateWrongTimes(
  correctTime,
  difficulty,
  amount
) {
  const wrongTimes = [];

  while (wrongTimes.length < amount) {
    const possibleTime = generateTime(difficulty);

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

/* ========================================
   TIME FORMATTING
   ======================================== */

function formatDigitalTime(hour, minute) {
  return `${hour}:${minute
    .toString()
    .padStart(2, "0")}`;
}

function formatTimeAsWords(hour, minute) {
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
    numbers[hour === 12 ? 1 : hour + 1];

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
      minute === 1 ? "minute" : "minutes"
    } past ${currentHour}`;
  }

  const minutesToNextHour = 60 - minute;

  return `${numberToWords(minutesToNextHour)} ${
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

/* ========================================
   HELPERS
   ======================================== */

function timeToValue(time) {
  return `${time.hour}-${time.minute}`;
}

function randomNumber(min, max) {
  return (
    Math.floor(
      Math.random() * (max - min + 1)
    ) + min
  );
}

function shuffle(items) {
  return [...items].sort(
    () => Math.random() - 0.5
  );
}