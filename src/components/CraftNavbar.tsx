"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export function CraftNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: scrolled ? "0.85rem 3rem" : "1.1rem 3rem",
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1.5px solid rgba(15, 43, 92, 0.1)",
        boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "0 2px 10px rgba(0, 0, 0, 0.03)",
        transition: "all 0.25s ease",
      }}
    >
      {/* 1. LOGO EMBLEM TOUFILTEX */}
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              border: "2px solid #0f2b5c",
              padding: "0.35rem 0.95rem",
              borderRadius: "5px",
              position: "relative",
              background: "#ffffff",
              boxShadow: "0 2px 6px rgba(15, 43, 92, 0.08)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-main)",
                fontWeight: 900,
                fontSize: "1.25rem",
                letterSpacing: "0.12em",
                color: "#0f2b5c",
                lineHeight: 1,
                display: "block",
              }}
            >
              TOUFILTEX
            </span>
            <span
              style={{
                position: "absolute",
                bottom: "-8px",
                right: "6px",
                background: "#c24637",
                color: "#ffffff",
                padding: "0.08rem 0.4rem",
                borderRadius: "3px",
                fontFamily: "var(--font-main)",
                fontWeight: 800,
                fontSize: "0.62rem",
                letterSpacing: "0.08em",
              }}
            >
              IMPORT
            </span>
          </div>
        </div>
      </Link>

      {/* 2. BOUTONS CADRÉS DE NAVIGATION (Qui sommes-nous, Nos gammes de fils, Contact) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.9rem",
          flexWrap: "wrap",
        }}
      >
        <a
          href="#presentation"
          style={{
            textDecoration: "none",
            fontSize: "0.88rem",
            fontWeight: 700,
            color: "#0f2b5c",
            padding: "0.55rem 1.15rem",
            borderRadius: "8px",
            border: "1.5px solid #0f2b5c",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 5px rgba(15, 43, 92, 0.05)",
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
          }}
          className="nav-btn-framed"
        >
          Qui sommes-nous
        </a>

        <a
          href="#gammes"
          style={{
            textDecoration: "none",
            fontSize: "0.88rem",
            fontWeight: 700,
            color: "#0f2b5c",
            padding: "0.55rem 1.15rem",
            borderRadius: "8px",
            border: "1.5px solid #0f2b5c",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 5px rgba(15, 43, 92, 0.05)",
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
          }}
          className="nav-btn-framed"
        >
          Nos gammes de fils
        </a>

        <a
          href="#devis"
          style={{
            textDecoration: "none",
            fontSize: "0.88rem",
            fontWeight: 700,
            color: "#0f2b5c",
            padding: "0.55rem 1.15rem",
            borderRadius: "8px",
            border: "1.5px solid #0f2b5c",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 5px rgba(15, 43, 92, 0.05)",
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
          }}
          className="nav-btn-framed"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
