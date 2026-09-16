"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { FileText, Phone, MessageCircle, Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsDrawerOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", href: "/" },
    { name: "Catalogue des Fils", href: "/catalogue" },
    { name: "Notre Engagement", href: "/a-propos" },
    { name: "Demande de Devis", href: "/#devis" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      style={{
        backgroundColor: "var(--bg-light)",
        borderBottom: "1px solid var(--border-card)",
        position: "sticky",
        top: 0,
        zIndex: 900,
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
      }}
    >
      {/* Top Banner Bar */}
      <div
        style={{
          background: "var(--primary-blue)",
          color: "#ffffff",
          padding: "0.35rem 1.5rem",
          fontSize: "0.78rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>📍 Siège & Dépôt : Tlemcen, Algérie</span>
          <span>•</span>
          <span>Expédition rapide vers toutes les Wilayas</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <a
            href="https://wa.me/213561219466"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem", fontWeight: 600 }}
          >
            <MessageCircle size={14} /> WhatsApp : +213 561 21 94 66
          </a>
          <Link href="/admin" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.74rem" }}>
            Espace Admin
          </Link>
        </div>
      </div>

      {/* Main Bar */}
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.9rem 0" }}>
        {/* Brand */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
          <span
            style={{
              fontSize: "1.7rem",
              fontWeight: 800,
              color: "var(--primary-blue)",
              letterSpacing: "-0.02em",
            }}
          >
            TOUFILTEX
          </span>
          <span className="handwritten" style={{ fontSize: "1.6rem", color: "var(--red-banner)" }}>
            Tlemcen
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}>
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  textDecoration: "none",
                  fontSize: "0.88rem",
                  fontWeight: active ? 700 : 600,
                  color: active ? "var(--primary-blue)" : "var(--text-dark)",
                  borderBottom: active ? "2px solid var(--primary-blue)" : "2px solid transparent",
                  paddingBottom: "0.2rem",
                  transition: "all 0.2s ease",
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <a
            href="https://wa.me/213561219466"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ padding: "0.5rem 1rem", fontSize: "0.82rem" }}
          >
            <MessageCircle size={15} />
            <span>WhatsApp Direct</span>
          </a>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="btn btn-blue"
            style={{ padding: "0.5rem 1rem", fontSize: "0.82rem" }}
          >
            <FileText size={15} />
            <span>Mon Devis</span>
            {totalItems > 0 && (
              <span
                style={{
                  background: "var(--red-banner)",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  marginLeft: "0.2rem",
                }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
