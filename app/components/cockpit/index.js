"use client";

import Link from "next/link";

import { useAppContext } from "../../context";
import useAmbientSound from "../../hooks/use-ambient-sound";
import TimeDrive from "../time-drive";

import "./index.css";

export default function Cockpit({
  children,
  status = "SYSTEM ONLINE",
  showTimeDrive = false,
}) {
  const {
    isSoundOn,
    toggleSound,
    score,
    timeLimit,
    setTimeUp,
  } = useAppContext();

  useAmbientSound(
    "/audio/radar-beeping-sound.mp3",
    isSoundOn
  );

  return (
    <main className="cockpitPage">
      <div className="cockpitStars" />

      <section className="cockpit">
        <div className="cockpitStatusBar">
          <Link href="/">
            <img
              src="/images/return-icon.png"
              alt="Home"
              className="icon"
            />
          </Link>

          <span className="cockpitStatusText">
            {status}
          </span>

          <button
            className="soundButton"
            onClick={toggleSound}
          >
            <img
              src={
                isSoundOn
                  ? "/images/sound.png"
                  : "/images/no-sound.png"
              }
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

            {score > 0 ? (
              <h3 className="scoreDisplay">
                {score}
              </h3>
            ) : (
              <div className="cockpitSwitch" />
            )}
          </div>

          <div className="cockpitRadar">
            <div className="cockpitRadarLine" />
            <div className="cockpitRadarDot" />
          </div>

          <div className="cockpitControlPanel">
            <span>TIME DRIVE</span>

            {showTimeDrive && (
              <TimeDrive
                duration={timeLimit}
                onComplete={() => setTimeUp(true)}
              />
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
