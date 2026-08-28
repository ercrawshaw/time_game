"use client";

import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context";

import "./index.css";

export default function Cockpit({
  children,
  status = "SYSTEM ONLINE",
}) {

  const audioRef = useRef(null);
  const { isSoundOn, toggleSound } = useAppContext();

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
      audio.play();
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

            <div className="cockpitSwitch" />
          </div>

          <div className="cockpitRadar">
            <div className="cockpitRadarLine" />
            <div className="cockpitRadarDot" />
          </div>

          <div className="cockpitControlPanel">
            <span>TIME DRIVE</span>

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