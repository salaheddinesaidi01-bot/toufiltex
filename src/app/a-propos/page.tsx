import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Factory, ShieldCheck, HeartHandshake, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

export default function AProposPage() {
  return (
    <div style={{ padding: "4rem 0 7rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 4rem" }}>
          <span className="badge badge-gold" style={{ marginBottom: "0.8rem" }}>
            Héritage & Savoir-Faire
          </span>
          <h1 style={{ fontSize: "clamp(2.3rem, 4vw, 3.4rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>
            La Manufacture Toufiltex
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginTop: "1rem", lineHeight: 1.6 }}>
            Une tradition textile d&apos;excellence conjuguée aux technologies les plus avancées du tissage,
            de la filature et du tricotage pour répondre aux plus hautes exigences des créateurs et industriels.
          </p>
        </div>

        {/* Story Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem",
            alignItems: "center",
            marginBottom: "6rem",
          }}
        >
          <div>
            <span className="badge badge-outline" style={{ marginBottom: "1rem" }}>
              Notre Histoire
            </span>
            <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1.2rem", color: "var(--text-primary)" }}>
              Plus de trois décennies de passion pour le fil et la matière
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.2rem", fontSize: "0.98rem" }}>
              Fondée au cœur d&apos;un bassin historique du textile méditerranéen, <strong>Toufiltex</strong> s&apos;est
              imposée comme une référence incontournable de la filature de coton peigné et du tissage d&apos;ameublement
              haut de gamme.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.8rem", fontSize: "0.98rem" }}>
              De l&apos;approvisionnement en matières premières pures (coton égyptien Giza, lin normand certifié,
              viscoses écologiques) jusqu&apos;à la finition noble en pièce, nous perpétuons un engagement absolu
              pour la régularité, le toucher et la durabilité de chaque mètre produit.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="glass" style={{ padding: "1rem", borderRadius: "var(--radius-sm)" }}>
                <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-gold)", fontFamily: "var(--font-serif)" }}>
                  15 000 m²
                </span>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                  Superficie du complexe industriel
                </p>
              </div>
              <div className="glass" style={{ padding: "1rem", borderRadius: "var(--radius-sm)" }}>
                <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-gold)", fontFamily: "var(--font-serif)" }}>
                  250+
                </span>
                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
                  Collaborateurs qualifiés & ingénieurs
                </p>
              </div>
            </div>
          </div>

          <div style={{ position: "relative", height: "420px", borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-gold)" }}>
            <Image
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1000&auto=format&fit=crop"
              alt="Atelier Toufiltex métiers à tisser"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Industrial Infrastructure */}
        <div id="parc-machines" style={{ marginBottom: "6rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge badge-gold" style={{ marginBottom: "0.6rem" }}>
              Technologie & Outils
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 700, color: "var(--text-primary)" }}>
              Parc Machines de Dernière Génération
            </h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0.5rem auto 0" }}>
              Investissements continus dans l&apos;automatisation et les métiers à tisser grande vitesse pour répondre aux volumes industriels.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "2rem",
            }}
          >
            <div className="card" style={{ padding: "2rem" }}>
              <Factory size={28} color="var(--color-gold)" style={{ marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.6rem" }}>Métiers Jacquard Électroniques</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Capacité de tissage jusqu&apos;à 12 000 crochets par trame, permettant les dessins les plus riches en grande laize (280-300 cm).
              </p>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <Sparkles size={28} color="var(--color-gold)" style={{ marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.6rem" }}>Lignes de Filature Ouverte & Peignée</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Production de fils du Ne 10 au Ne 80 avec contrôle optique des impuretés et retordage sur cônes de haute précision.
              </p>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <ShieldCheck size={28} color="var(--color-gold)" style={{ marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.6rem" }}>Ennoblissement & Teinture Basse Consommation</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Processus de teinture en boucle fermée réduisant la consommation hydrique de 40%, avec station de traitement intégrée.
              </p>
            </div>
          </div>
        </div>

        {/* CSR & Certifications Banner */}
        <div
          className="glass-gold"
          style={{
            padding: "3.5rem 2.5rem",
            borderRadius: "var(--radius-lg)",
            textAlign: "center",
          }}
        >
          <Award size={40} color="var(--color-gold)" style={{ margin: "0 auto 1rem" }} />
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.8rem" }}>
            Un Engagement Responsable Certifié
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "680px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
            Toufiltex s&apos;engage pour un textile propre : conformité stricte REACH, audits sociaux BSCI,
            certification biologique GOTS et certification OEKO-TEX Standard 100 garantissant l&apos;absence de substances nocives pour l&apos;humain et l&apos;environnement.
          </p>

          <Link href="/catalogue" className="btn btn-primary">
            <span>Découvrir nos tissus éco-responsables</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
