"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Cockpit from "./components/cockpit";

export default function Home() {
  const router = useRouter();

  const images = [
    "/images/little-alien-1.png",
    "/images/little-alien-2.png",
    "/images/little-alien-3.png",
  ];

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((currentIndex) => {
        return (currentIndex + 1) % images.length;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Cockpit>
      <div className="homeContent">
        <p className="screenLabel">
          GALACTIC TIME COMMAND
        </p>

        <h1>TIME EXPLORER</h1>

        <p className="missionText">
          Your mission is to master time and travel
          across the galaxy.
        </p>

        <div className="alien">
          <img
            src={images[imageIndex]}
            alt="Cute green alien"
            className="alienImage"
          />
        </div>

        <button
          onClick={() => router.push("/options")}
        >
          START MISSION
        </button>
      </div>
    </Cockpit>
  );
}