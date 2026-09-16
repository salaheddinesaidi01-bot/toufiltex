"use client";

import { useEffect } from "react";

export function DashedThreadScroll() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const paths = document.querySelectorAll<SVGPathElement>(".animated-thread-path");
      paths.forEach((path, idx) => {
        // Offset proportional to scroll: alternates direction per curve
        const factor = (idx % 2 === 0 ? 1 : -1) * 0.06;
        path.style.strokeDashoffset = `${-scrollY * factor}`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
