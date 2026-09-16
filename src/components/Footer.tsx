import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="modern-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>TOUFILTEX IMPORT</h3>
            <p>
              Spécialiste de l&apos;importation et de la distribution de matières premières textiles et fils industriels de haute qualité en Algérie.
            </p>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><Link href="/#presentation">Qui sommes-nous</Link></li>
              <li><Link href="/#gammes">Nos gammes de fils</Link></li>
              <li><Link href="/catalogue">Catalogue complet</Link></li>
              <li><Link href="/devis">Demande de cotation</Link></li>
              <li><Link href="/contact">Contact & Localisation</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Coordonnées Tlemcen</h4>
            <ul className="footer-links">
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <MapPin size={15} color="#cbd5e1" />
                <span>Tlemcen, Algérie</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Phone size={15} color="#cbd5e1" />
                <span>+213 561 21 94 66</span>
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Mail size={15} color="#cbd5e1" />
                <span>salaheddinesaid101@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} Toufiltex — Tous droits réservés. Tlemcen, Algérie.
          </div>
          <div>
            Plateforme d&apos;approvisionnement direct pour l&apos;industrie textile algérienne.
          </div>
        </div>
      </div>
    </footer>
  );
}
