"use client";

import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context";
import Countdown from 'react-countdown';

import "./index.css";

export default function Cockpit({
  children,
  status = "SYSTEM ONLINE",
  showCountdown = false,
}) {

  const audioRef = useRef(null);
  const { isSoundOn, toggleSound, score, timeLimit, setTimeUp } = useAppContext();

  // fixed once on mount so re-renders don't restart the countdown
  const [countdownEnd] = useState(() => Date.now() + (timeLimit ?? 0));

  const showTimer = showCountdown && Boolean(timeLimit);

  const audioIcon = isSoundOn
    ? "/images/sound.png"
    : "/images/no-sound.png";

  useEffect(() => {
    audioRef.current = new Audio(
      "/audio/radar-beeping-sound.mp3"
    );

    audioRef.current.loop = true;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isSoundOn) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isSoundOn]);

  return (
    <main className="cockpitPage">
      <div className="cockpitStars" />

      <section className="cockpit">
        <div className="cockpitStatusBar">
          <a href="/">
            <img
              src="/images/return-icon.png"
              alt="Home"
              className="icon"
            />
          </a>

          <span className="cockpitStatusText">
            {status}
          </span>

          <button
            className="soundButton"
            onClick={() => {toggleSound()}}
          >
            <img
              src={audioIcon}
              alt={
                isSoundOn
                  ? "Turn sound off"
                  : "Turn sound on"
              }
              className="icon"
            />
          </button>
        </div>

        <div className="cockpitScreen">
          {children}
        </div>

        <div className="cockpitControls">
          <div className="cockpitControlPanel">
            <span>POWER</span>
            {score > 0 ? (<h3 className="scoreDisplay">{score}</h3>) :
            (<div className="cockpitSwitch" />) }
          </div>

          <div className="cockpitRadar">
            <div className="cockpitRadarLine" />
            <div className="cockpitRadarDot" />
          </div>

          <div className="cockpitControlPanel">
            <span>TIME DRIVE</span>
            {showTimer ? (
              <Countdown
                date={countdownEnd}
                onComplete={() => setTimeUp(true)}
                renderer={({ minutes, seconds, total }) => (
                  <span
                    className={
                      total <= 10000
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
            ) : (
              showCountdown && (
                <span className="countdownDisplay countdownUnlimited">
                  ∞
                </span>
              )
            )}
            <div className="cockpitSwitch" />
          </div>
        </div>

        <div className="cockpitConsoleLights">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}