"use client";

import { useState } from "react";
import Countdown from "react-countdown";

import "./index.css";

const CRITICAL_MS = 10000;

export default function TimeDrive({
  duration,
  onComplete,
}) {
  // fixed once on mount so re-renders don't restart the countdown
  const [endsAt] = useState(
    () => Date.now() + (duration ?? 0)
  );

  if (!duration) {
    return (
      <span className="countdownDisplay countdownUnlimited">
        ∞
      </span>
    );
  }

  return (
    <Countdown
      date={endsAt}
      onComplete={onComplete}
      renderer={({ minutes, seconds, total }) => (
        <span
          className={
            total <= CRITICAL_MS
              ? "countdownDisplay countdownCritical"
              : "countdownDisplay"
          }
        >
          {String(minutes).padStart(2, "0")}
          <span className="countdownColon">:</span>
          {String(seconds).padStart(2, "0")}
        </span>
      )}
    />
  );
}
