// Swap these for `import zibImage from "..."` if you move to next/image later.
const zibImage = "/images/alien-zib.png";
const novaImage = "/images/alien-nova.png";
const orbitImage = "/images/alien-orbit.png";
const cosmoImage = "/images/alien-cosmo.png";
const chronoxImage = "/images/alien-chronox.png";

// Lowest to highest. Add a new rank here and in the objects below.
export const ALIEN_RANKS = [
  "zib",
  "nova",
  "orbit",
  "cosmo",
  "chronox",
];

export const ALIENS = {
  zib: {
    name: "Zib",
    title: "Space Cadet",
    message: "You're off the ground!",
    image: zibImage,
  },
  nova: {
    name: "Nova",
    title: "Navigator",
    message: "Nice navigating!",
    image: novaImage,
  },
  orbit: {
    name: "Orbit",
    title: "Time Traveller",
    message: "Great time skills!",
    image: orbitImage,
  },
  cosmo: {
    name: "Cosmo",
    title: "Time Commander",
    message: "Mission accomplished!",
    image: cosmoImage,
  },
  chronox: {
    name: "Chronox",
    title: "Time Master",
    message: "TIME MASTER!",
    image: chronoxImage,
  },
};

// Keyed by game duration in seconds.
export const SCORE_THRESHOLDS = {
  60: {
    nova: 4,
    orbit: 7,
    cosmo: 10,
    chronox: 13,
  },
  120: {
    nova: 7,
    orbit: 13,
    cosmo: 19,
    chronox: 26,
  },
  300: {
    nova: 16,
    orbit: 31,
    cosmo: 46,
    chronox: 66,
  },
};

export const UNLIMITED_THRESHOLDS = {
  nova: 10,
  orbit: 20,
  cosmo: 35,
  chronox: 50,
};
