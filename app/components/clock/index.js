import { formatDigitalTime } from "../../utils/time/format-time";

import "./index.css";

export default function Clock({
  hour,
  minute,
}) {
  const minuteAngle = minute * 6;

  const hourAngle =
    (hour % 12) * 30 +
    minute * 0.5;

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

        {Array.from({ length: 60 }).map(
          (_, index) => {
            const angle = index * 6;
            const isHour = index % 5 === 0;

            const outerRadius = 130;
            const innerRadius = isHour
              ? 115
              : 123;

            const x1 =
              150 +
              outerRadius *
                Math.sin(
                  (angle * Math.PI) / 180
                );

            const y1 =
              150 -
              outerRadius *
                Math.cos(
                  (angle * Math.PI) / 180
                );

            const x2 =
              150 +
              innerRadius *
                Math.sin(
                  (angle * Math.PI) / 180
                );

            const y2 =
              150 -
              innerRadius *
                Math.cos(
                  (angle * Math.PI) / 180
                );

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
          }
        )}

        {Array.from({ length: 12 }).map(
          (_, index) => {
            const number = index + 1;
            const angle = number * 30;

            const radius = 94;

            const x =
              150 +
              radius *
                Math.sin(
                  (angle * Math.PI) / 180
                );

            const y =
              155 -
              radius *
                Math.cos(
                  (angle * Math.PI) / 180
                );

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
          }
        )}

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