import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Award, Shield, CheckCircle2 } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#070b14",
        borderTop: "1px solid var(--border-subtle)",
        marginTop: "auto",
        paddingTop: "4rem",
        paddingBottom: "2rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "3rem",
            marginBottom: "3.5rem",
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.2rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, var(--color-gold) 0%, #fff 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0b1120",
                  fontWeight: 900,
                  fontSize: "1.1rem",
                }}
              >
                T
              </div>
              <span
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-serif)",
                  letterSpacing: "0.06em",
                }}
              >
                TOUFILTEX
              </span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Manufacture & négoce de textiles haut de gamme. Spécialiste de la filature, du tissage d'ameublement,
              de la maille et des tissus techniques certifiés éco-responsables pour les marques et professionnels.
            </p>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              <div className="badge badge-gold">
                <Award size={13} /> GOTS & OEKO-TEX
              </div>
              <div className="badge badge-outline">
                <Shield size={13} /> Norme ISO 9001
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "1.2rem",
                letterSpacing: "0.02em",
              }}
            >
              Catalogue Textile
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li>
                <Link href="/catalogue?cat=filature" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
                  Filature & Fils Industriels
                </Link>
              </li>
              <li>
                <Link href="/catalogue?cat=ameublement" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
                  Tissus d&apos;Ameublement & Jacquards
                </Link>
              </li>
              <li>
                <Link href="/catalogue?cat=mailles" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
                  Mailles & Tricotage Circulaire
                </Link>
              </li>
              <li>
                <Link href="/catalogue?cat=eco-responsable" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
                  Gamme Bio & Éco-responsable
                </Link>
              </li>
              <li>
                <Link href="/catalogue?cat=techniques" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
                  Textiles Techniques M1 & Non-Feu
                </Link>
              </li>
            </ul>
          </div>

          {/* Savoir-Faire */}
          <div>
            <h4
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "1.2rem",
                letterSpacing: "0.02em",
              }}
            >
              Notre Entreprise
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li>
                <Link href="/a-propos" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
                  Histoire & Manufacture
                </Link>
              </li>
              <li>
                <Link href="/a-propos#parc-machines" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
                  Parc Machines & Métiers à Tisser
                </Link>
              </li>
              <li>
                <Link href="/devis" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
                  Demander un Devis Professionnel
                </Link>
              </li>
              <li>
                <Link href="/admin" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
                  Espace Administration Devis
                </Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem" }}>
                  Contact & Prise de Rendez-vous
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "1.2rem",
                letterSpacing: "0.02em",
              }}
            >
              Coordonnées Commerciales
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem" }}>
                <MapPin size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: "0.2rem" }} />
                <span>Zone Industrielle Textile, Ksar Hellal / Monastir - Tunisie</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                <Phone size={18} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span>+216 73 000 111 / +33 1 89 00 00 00</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                <Mail size={18} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                <span>contact@toufiltex.com / commercial@toufiltex.com</span>
              </div>
              <div style={{ marginTop: "0.5rem", padding: "0.8rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.8rem", color: "var(--color-gold-light)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <CheckCircle2 size={14} /> Réponses aux devis sous 24h ouvrées
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "1.8rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} TOUFILTEX Manufacture & Négoce Textile. Tous droits réservés.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Mentions légales</span>
            <span>Politique de confidentialité</span>
            <span>Conditions générales de vente B2B</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
