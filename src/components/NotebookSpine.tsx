"use client";

import React from "react";

export function NotebookSpine() {
  // Generate 40 spiral rings that cover the vertical height
  const rings = Array.from({ length: 45 }, (_, i) => i);

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "48px",
        background: "linear-gradient(to right, #dfd1bd 0%, #e6d8c4 75%, #d5c4ad 100%)",
        borderRight: "1px solid #c9b79d",
        boxShadow: "3px 0 12px rgba(0, 0, 0, 0.08)",
        zIndex: 950,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "12px",
        overflow: "hidden",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "18px", width: "100%", alignItems: "center" }}>
        {rings.map((idx) => (
          <div
            key={idx}
            style={{
              position: "relative",
              width: "36px",
              height: "14px",
            }}
          >
            {/* Punched hole in the paper (Trou dans le papier kraft) */}
            <div
              style={{
                position: "absolute",
                left: "4px",
                top: "2px",
                width: "12px",
                height: "10px",
                background: "#2a221b",
                borderRadius: "50%",
                boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.7), 1px 1px 1px rgba(255,255,255,0.4)",
              }}
            />

            {/* Metal spiral wire loop (Anneau de spirale métallique avec reflets et ombre) */}
            <div
              style={{
                position: "absolute",
                left: "2px",
                top: "0px",
                width: "32px",
                height: "12px",
                borderRadius: "10px 10px 8px 8px",
                border: "2.5px solid #4a433d",
                borderBottomColor: "#221d19",
                transform: "rotate(-12deg)",
                boxShadow: "0 3px 5px rgba(0,0,0,0.35)",
                background: "transparent",
              }}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
