import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Factory, ShieldCheck, ArrowRight, Sparkles, CheckCircle, Truck, PackageCheck } from "lucide-react";
import { CraftNavbar } from "@/components/CraftNavbar";

export default function AProposPage() {
  return (
    <div style={{ paddingTop: "6.5rem", paddingBottom: "7rem", minHeight: "100vh", backgroundColor: "var(--bg-page)" }}>
      <CraftNavbar />
      <div className="container" style={{ marginTop: "1rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
          <span className="card-badge" style={{ position: "static", display: "inline-block", marginBottom: "0.8rem" }}>
            EXPERTISE & APPROVISIONNEMENT DIRECT
          </span>
          <h1 style={{ fontSize: "clamp(2.1rem, 3.8vw, 3.2rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.25 }}>
            Toufiltex — Votre Partenaire Textile Industriel
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginTop: "1rem", lineHeight: 1.65 }}>
            Implantée à Tlemcen, Toufiltex est une référence de l&apos;importation directe et de la distribution de matières premières textiles et fils de haute technicité dédiés aux industriels et confectionneurs algériens.
          </p>
        </div>

        {/* Story Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3.5rem",
            alignItems: "center",
            marginBottom: "5rem",
          }}
        >
          <div>
            <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0f2b5c", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              NOTRE MISSION
            </span>
            <h2 style={{ fontSize: "1.9rem", fontWeight: 800, margin: "0.5rem 0 1.2rem", color: "var(--text-primary)" }}>
              Sécuriser la chaîne de matière première des ateliers algériens
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.2rem", fontSize: "0.95rem" }}>
              Fondée avec la volonté de supprimer les intermédiaires coûteux et les ruptures d&apos;approvisionnement en Algérie, <strong>Toufiltex</strong> négocie directement auprès des meilleures filatures internationales certifiées.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.8rem", fontSize: "0.95rem" }}>
              Des fils 100% polyester haute ténacité aux fils de confection et matières techniques spéciales, chaque arrivage est rigoureusement contrôlé pour garantir une régularité micrométrique sur vos métiers et machines.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="card" style={{ padding: "1.2rem", border: "1.5px solid #e2e8f0" }}>
                <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f2b5c", display: "block", lineHeight: 1 }}>
                  58
                </span>
                <p style={{ fontSize: "0.84rem", fontWeight: 600, color: "var(--text-secondary)", marginTop: "0.4rem" }}>
                  Wilayas livrées en direct sans rupture
                </p>
              </div>
              <div className="card" style={{ padding: "1.2rem", border: "1.5px solid #e2e8f0" }}>
                <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f2b5c", display: "block", lineHeight: 1 }}>
                  100%
                </span>
                <p style={{ fontSize: "0.84rem", fontWeight: 600, color: "var(--text-secondary)", marginTop: "0.4rem" }}>
                  Direct usine sans intermédiaire
                </p>
              </div>
            </div>
          </div>

          <div style={{ position: "relative", height: "400px", borderRadius: "14px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(15, 43, 92, 0.08)" }}>
            <Image
              src="/images/bobines-fil-industriel.jpg"
              alt="Stock de fils textiles industriels Toufiltex"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* 3 Pillars */}
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.8rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 800, color: "#0f2b5c", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              VALEUR AJOUTÉE B2B
            </span>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "0.4rem" }}>
              Pourquoi les industriels choisissent Toufiltex
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
            }}
          >
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(15, 43, 92, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f2b5c", marginBottom: "1.2rem" }}>
                <Factory size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>Direct Filatures Partenaires</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Contrats d&apos;exclusivité et partenariats directs avec des filateurs certifiés assurant des tarifs de gros imbattables.
              </p>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(15, 43, 92, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f2b5c", marginBottom: "1.2rem" }}>
                <PackageCheck size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>Stock Disponible & Échantillons 48h</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Dépôt central basé à Tlemcen permettant d&apos;expédier des échantillons de contrôle sous 48h dans toute l&apos;Algérie.
              </p>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(15, 43, 92, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f2b5c", marginBottom: "1.2rem" }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>Tolérances & Cadences Strictes</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Résistance à la traction, stabilité de teinture et absence de nœuds vérifiées pour un dévidage continu haute vitesse.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div
          className="card"
          style={{
            padding: "3rem 2.5rem",
            background: "#0f2b5c",
            color: "#ffffff",
            borderRadius: "14px",
            textAlign: "center",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <h2 style={{ fontSize: "1.9rem", fontWeight: 800, color: "#ffffff", marginBottom: "0.8rem" }}>
            Découvrez nos gammes et demandez votre devis direct
          </h2>
          <p style={{ color: "#e2e8f0", maxWidth: "650px", margin: "0 auto 2rem", lineHeight: 1.6, fontSize: "0.95rem" }}>
            Consultez nos fiches techniques de fils polyester, fils techniques et fils de confection, ou contactez notre bureau d&apos;études à Tlemcen.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/catalogue"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.85rem 1.8rem",
                borderRadius: "8px",
                background: "#ffffff",
                color: "#0f2b5c",
                fontWeight: 800,
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              <span>Parcourir le catalogue</span>
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/devis"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.85rem 1.8rem",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.12)",
                color: "#ffffff",
                border: "1.5px solid rgba(255, 255, 255, 0.3)",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              <span>Demander un devis express</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
