"use client";

import { useRouter } from "next/navigation";
import Cockpit from "./components/cockpit";

export default function Home() {
  const router = useRouter();

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
            src="/little-alien.png"
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