"use client";

import { useEffect, useState } from "react";

const images = [
  "/images/little-alien-1.png",
  "/images/little-alien-2.png",
  "/images/little-alien-3.png",
];

export default function Alien() {
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
    <div className="alien">
      <img
        src={images[imageIndex]}
        alt="Cute green alien"
        className="alienImage"
      />
    </div>
  );
}