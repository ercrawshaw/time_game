"use client";

import { useRouter } from "next/navigation";

import Alien from "./components/alien";
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
          Your mission is to master time and
          travel across the galaxy.
        </p>

        <Alien />

        <button
          onClick={() =>
            router.push("/options")
          }
        >
          START MISSION
        </button>
      </div>
    </Cockpit>
  );
}