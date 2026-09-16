"use client";

import React from "react";
import Link from "next/link";

export function CraftNavbar() {
  return (
    <nav
      style={{
        padding: "1.2rem 2.5rem 1.1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px dashed #c9baa5",
        position: "sticky",
        top: 0,
        zIndex: 900,
        backgroundColor: "var(--bg-light)",
        flexWrap: "wrap",
        gap: "1.2rem",
      }}
    >
      {/* 1. LOGO STAMP BOX */}
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            border: "2px solid #2a2a2a",
            padding: "0.32rem 1.3rem 0.42rem",
            position: "relative",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.08)",
            borderRadius: "3px",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          {/* Inner subtle frame border */}
          <div
            style={{
              position: "absolute",
              inset: "2px",
              border: "1px solid rgba(42, 42, 42, 0.2)",
              pointerEvents: "none",
            }}
          />

          <span
            style={{
              fontFamily: "var(--font-main)",
              fontWeight: 900,
              fontSize: "1.35rem",
              letterSpacing: "0.14em",
              color: "#2a2a2a",
              lineHeight: 1,
            }}
          >
            TOUFILTEX
          </span>

          {/* Cutout badge for IMPORT on the bottom right border */}
          <span
            style={{
              position: "absolute",
              bottom: "-9px",
              right: "10px",
              background: "var(--bg-light)",
              padding: "0 5px",
              fontFamily: "var(--font-main)",
              fontStyle: "italic",
              fontWeight: 800,
              fontSize: "0.7rem",
              color: "var(--primary-blue)",
              letterSpacing: "0.08em",
            }}
          >
            ─ IMPORT ─
          </span>
        </div>
      </Link>

      {/* 2. LIENS DE NAVIGATION (Présentation, À propos de nous, Contact) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <a
          href="#presentation"
          style={{
            textDecoration: "none",
            fontSize: "0.92rem",
            fontWeight: 700,
            color: "var(--text-dark)",
            transition: "color 0.2s ease",
          }}
        >
          Présentation
        </a>
        <a
          href="#engagement"
          style={{
            textDecoration: "none",
            fontSize: "0.92rem",
            fontWeight: 700,
            color: "var(--text-dark)",
            transition: "color 0.2s ease",
          }}
        >
          À propos de nous
        </a>
        <a
          href="#catalogue"
          style={{
            textDecoration: "none",
            fontSize: "0.92rem",
            fontWeight: 700,
            color: "var(--text-dark)",
            transition: "color 0.2s ease",
          }}
        >
          Catalogue
        </a>
        <a
          href="#devis"
          style={{
            textDecoration: "none",
            fontSize: "0.92rem",
            fontWeight: 700,
            color: "var(--text-dark)",
            transition: "color 0.2s ease",
          }}
        >
          Contact
        </a>
      </div>

      {/* 3. RIGHT CTAS (WhatsApp & Demander un devis) */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/213561219466"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "0.58rem 1.15rem",
            borderRadius: "6px",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            background: "#fdfbf7",
            border: "1.5px solid var(--primary-blue)",
            color: "var(--primary-blue)",
            boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
            transition: "all 0.2s ease",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.579 4.183 1.589 5.926l-1.589 5.8 5.975-1.567c1.705.952 3.67 1.491 5.76 1.491 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
          </svg>
          <span>WhatsApp</span>
        </a>

        {/* Demander un devis Button */}
        <a
          href="#devis"
          style={{
            padding: "0.62rem 1.3rem",
            borderRadius: "6px",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            background: "var(--primary-blue)",
            color: "#ffffff",
            border: "1.5px solid var(--primary-blue)",
            boxShadow: "0 2px 8px rgba(28, 61, 138, 0.2)",
            transition: "all 0.2s ease",
          }}
        >
          Demander un devis
        </a>
      </div>
    </nav>
  );
}
