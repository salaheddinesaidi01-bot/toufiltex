"use client";

import React, { useEffect, useState, useRef } from "react";

export function ThreadBobbinAnimation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(scrollY / totalHeight);
      }

      setScrollDir(scrollY >= lastScrollY.current ? "down" : "up");
      lastScrollY.current = scrollY;

      // Move the dashed SVG stroke offset with scroll position
      const paths = document.querySelectorAll<SVGPathElement>(".animated-thread-path");
      paths.forEach((path, idx) => {
        // Offset proportional to scroll + direction
        const speed = 0.08 * (idx % 2 === 0 ? 1 : -1);
        path.style.strokeDashoffset = `${-scrollY * speed}`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bobbin position following the winding thread path as you scroll
  const bobbinY = Math.min(
    window.innerHeight * 0.88,
    Math.max(100, window.innerHeight * 0.15 + scrollProgress * (window.innerHeight * 0.68))
  );
  // Oscillates horizontally to match the curves of the thread
  const bobbinX = 50 + Math.sin(scrollProgress * Math.PI * 3.5) * 32;
  const rotationDeg = scrollProgress * 1200 * (scrollDir === "down" ? 1 : -1);

  return (
    <>
      {/* Bobine voyageuse le long du fil */}
      <div
        style={{
          position: "fixed",
          left: `${bobbinX}%`,
          top: `${bobbinY}px`,
          transform: `translate(-50%, -50%) rotate(${rotationDeg}deg)`,
          zIndex: 920,
          pointerEvents: "none",
          transition: "top 0.15s ease-out, left 0.15s ease-out",
          filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.18))",
        }}
        aria-hidden="true"
      >
        <svg width="44" height="44" viewBox="0 0 60 60" fill="none">
          {/* Joues en bois de la bobine */}
          <ellipse cx="30" cy="8" rx="20" ry="6" fill="#8d5b4c" stroke="#5a382e" strokeWidth="1.5" />
          <ellipse cx="30" cy="52" rx="20" ry="6" fill="#8d5b4c" stroke="#5a382e" strokeWidth="1.5" />

          {/* Corps de la bobine avec fil bleu cobalt */}
          <rect x="14" y="8" width="32" height="44" rx="3" fill="#1c3d8a" />

          {/* Spires de fil */}
          <line x1="14" y1="14" x2="46" y2="14" stroke="#2a52b2" strokeWidth="1.5" />
          <line x1="14" y1="20" x2="46" y2="20" stroke="#3665cf" strokeWidth="1.5" />
          <line x1="14" y1="26" x2="46" y2="26" stroke="#163172" strokeWidth="1.5" />
          <line x1="14" y1="32" x2="46" y2="32" stroke="#2a52b2" strokeWidth="1.5" />
          <line x1="14" y1="38" x2="46" y2="38" stroke="#3665cf" strokeWidth="1.5" />
          <line x1="14" y1="44" x2="46" y2="44" stroke="#163172" strokeWidth="1.5" />

          {/* Trou central */}
          <ellipse cx="30" cy="8" rx="5" ry="2" fill="#3e2723" />

          {/* Aiguille dorée */}
          <line x1="6" y1="6" x2="54" y2="54" stroke="#e0a96d" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="8" cy="8" rx="1.5" ry="1.5" fill="#fff" />
        </svg>

        {/* Petit bout de fil déroulé */}
        <div
          style={{
            position: "absolute",
            width: "2px",
            height: "24px",
            background: "repeating-linear-gradient(to bottom, #1c3d8a 0, #1c3d8a 3px, transparent 3px, transparent 6px)",
            top: "38px",
            left: "50%",
            transformOrigin: "top center",
            transform: `rotate(${Math.sin(scrollProgress * 15) * 20}deg)`,
          }}
        />
      </div>
    </>
  );
}
