"use client";

import { useEffect, useRef } from "react";

export default function useAmbientSound(src, isPlaying) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.play().catch(() => {});
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  }, [isPlaying]);
}
