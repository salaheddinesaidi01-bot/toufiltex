"use client";

import React, { useState } from "react";
import { CraftNavbar } from "@/components/CraftNavbar";
import { ScrollObserver } from "@/components/ScrollObserver";

export default function HomePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    wilaya: "",
    need: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactName: formData.companyName,
          email: `${formData.phone.replace(/[^0-9]/g, "")}@toufiltex.dz`,
          phone: formData.phone,
          projectType: `Wilaya: ${formData.wilaya} | Besoin: ${formData.need}`,
          deadline: "Urgent",
          notes: `Demande de devis depuis la page d'accueil Ronaltex-style. Wilaya: ${formData.wilaya}. Détails: ${formData.need}`,
          items: [],
        }),
      });
      const data = await res.json();
      setReference(data.referenceNumber || `TF-${new Date().getFullYear()}-DZ`);
      setSubmitted(true);
    } catch {
      setReference(`TF-${new Date().getFullYear()}-DEMANDE`);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh", backgroundColor: "var(--bg-page)" }}>
      {/* 1. SCROLL REVEAL OBSERVER */}
      <ScrollObserver />

      {/* 2. MODERN STICKY NAVBAR */}
      <CraftNavbar />

      {/* ========================================================= */}
      {/* SECTION 1 : HERO AVEC VIDÉO D'ARRIÈRE-PLAN TEXTILE        */}
      {/* ========================================================= */}
      <section id="presentation" className="hero-video-section">
        {/* Vidéo textile haute définition en boucle */}
        <video
          className="hero-video-bg"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero-textile.mp4" type="video/mp4" />
        </video>

        {/* Voile de contraste sombre et élégant */}
        <div className="hero-overlay" />

        {/* Contenu textuel Hero */}
        <div className="container hero-content">
          <h1 className="hero-main-title">
            Spécialiste de l&apos;importation de{" "}
            <mark>matières premières textiles</mark> dédiées à l&apos;industrie
          </h1>

          <div className="hero-arabic-subtitle">
            بيع واستيراد الخيوط النسيجية - جميع الأنواع مباشرة من المصنع إلى ورشاتكم ومصانعكم في الجزائر
          </div>

          <p className="hero-description">
            Basée à Tlemcen, Toufiltex est votre partenaire direct pour l&apos;approvisionnement régulier de tous types de fils
            textiles industriels de haute précision. Livraison garantie dans les 58 wilayas sans intermédiaire.
          </p>

          <div className="hero-actions">
            <a href="#devis" className="btn-hero-primary">
              <span>Demander mon devis gratuit</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <a
              href="https://wa.me/213561219466"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-secondary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.579 4.183 1.589 5.926l-1.589 5.8 5.975-1.567c1.705.952 3.67 1.491 5.76 1.491 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
              </svg>
              <span>WhatsApp Direct</span>
            </a>
          </div>

          <div className="hero-trust-row">
            <div className="hero-trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Arrivages réguliers toute l&apos;année</span>
            </div>
            <div className="hero-trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Direct filatures sans intermédiaire</span>
            </div>
            <div className="hero-trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Stock et échantillons à Tlemcen</span>
            </div>
          </div>
        </div>
      </section>

      {/* BANDEAU DÉFILANT ANIMÉ CONTINU (MARQUEE RIBBON) */}
      <div className="animated-ticker-ribbon">
        <div className="ticker-track">
          <span>IMPORTATION DIRECTE USINE SANS INTERMÉDIAIRE</span>
          <span className="ticker-separator">✦</span>
          <span>FILS 100% POLYESTER HAUTE TÉNACITÉ</span>
          <span className="ticker-separator">✦</span>
          <span>STOCK DISPONIBLE À TLEMCEN</span>
          <span className="ticker-separator">✦</span>
          <span>EXPÉDITION D&apos;ÉCHANTILLONS SOUS 48H</span>
          <span className="ticker-separator">✦</span>
          <span>LIVRAISON 58 WILAYAS</span>
          <span className="ticker-separator">✦</span>
          <span>CADENCES INDUSTRIELLES GARANTIES</span>
          <span className="ticker-separator">✦</span>
          <span>IMPORTATION DIRECTE USINE SANS INTERMÉDIAIRE</span>
          <span className="ticker-separator">✦</span>
          <span>FILS 100% POLYESTER HAUTE TÉNACITÉ</span>
          <span className="ticker-separator">✦</span>
          <span>STOCK DISPONIBLE À TLEMCEN</span>
          <span className="ticker-separator">✦</span>
          <span>EXPÉDITION D&apos;ÉCHANTILLONS SOUS 48H</span>
          <span className="ticker-separator">✦</span>
          <span>LIVRAISON 58 WILAYAS</span>
          <span className="ticker-separator">✦</span>
          <span>CADENCES INDUSTRIELLES GARANTIES</span>
          <span className="ticker-separator">✦</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 2 : NOS GAMMES DE FILS (OVERLAPPING CARDS)        */}
      {/* ========================================================= */}
      <section id="gammes" className="overlapping-cards-section">
        <div className="container">
          <div className="cards-grid-3">
            {/* CARTE 1 : FILS INDUSTRIELS */}
            <div className="modern-product-card reveal-on-scroll stagger-1">
              <div className="card-image-wrap">
                <span className="card-badge">INDUSTRIEL</span>
                <img
                  src="/images/bobines-fil-industriel.jpg"
                  alt="Fils Industriels & Techniques"
                />
              </div>
              <div className="card-body">
                <h3>Fils Industriels & Techniques</h3>
                <p>
                  Fils haute résistance et ténacité accrue calibrés pour les métiers à tisser rapides et les cadences industrielles intenses.
                </p>
                <a href="/catalogue" className="card-action-btn">
                  <span>Je découvre</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>

            {/* CARTE 2 : FILS EN POLYESTER */}
            <div className="modern-product-card reveal-on-scroll stagger-2">
              <div className="card-image-wrap">
                <span className="card-badge">POLYESTER</span>
                <img
                  src="/images/fils-polyester.jpg"
                  alt="Fils en Polyester"
                />
              </div>
              <div className="card-body">
                <h3>Fils en Polyester</h3>
                <p>
                  100% polyester spun et texturé de première qualité. Régularité micrométrique pour un tissage fluide sans friction ni rupture.
                </p>
                <a href="/catalogue" className="card-action-btn">
                  <span>Je découvre</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>

            {/* CARTE 3 : FILS DE CONFECTION */}
            <div className="modern-product-card reveal-on-scroll stagger-3">
              <div className="card-image-wrap">
                <span className="card-badge">CONFECTION</span>
                <img
                  src="/images/fils-confection.jpg"
                  alt="Fils de Confection"
                />
              </div>
              <div className="card-body">
                <h3>Fils de Confection</h3>
                <p>
                  Vaste nuancier de teintes éclatantes, haute résistance au lavage et à l&apos;abrasion pour ateliers de confection et prêt-à-porter.
                </p>
                <a href="/catalogue" className="card-action-btn">
                  <span>Je découvre</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* BOUTON JE DÉCOUVRE (POUR TOUT VOIR) */}
          <div style={{ textAlign: "center", margin: "1.5rem 0 1rem" }} className="reveal-on-scroll">
            <a
              href="/catalogue"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "0.95rem 2.5rem",
                borderRadius: "10px",
                background: "var(--primary-blue)",
                color: "#ffffff",
                fontSize: "1.05rem",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 6px 20px rgba(15, 43, 92, 0.25)",
                border: "2px solid var(--primary-blue)",
                transition: "all 0.25s ease",
              }}
              className="btn-discover-all"
            >
              <span>Je découvre tous les produits</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* BANNIÈRE SPÉCIFIQUE (CALLOUT) */}
          <div className="modern-callout-banner reveal-on-scroll stagger-4">
            <div>
              <h3>Besoin d&apos;un fil spécifique ou d&apos;une référence sur-mesure ?</h3>
              <p>
                Polyester, Coton, Acrylique, Laine, Fils Élastiques, Polyamide... Nous importons toutes les spécifications techniques sur commande pour vos besoins industriels.
              </p>
            </div>
            <a
              href="https://wa.me/213561219466"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-primary"
              style={{ flexShrink: 0 }}
            >
              Échanger avec notre expert
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3 : EXPERTISE & POURQUOI CHOISIR TOUFILTEX        */}
      {/* ========================================================= */}
      <section className="section-expertise">
        <div className="container expertise-grid">
          <div className="reveal-on-scroll stagger-1">
            <span className="section-tag">EXCELLENCE & FIABILITÉ B2B</span>
            <h2 className="section-title">
              Pourquoi confier votre approvisionnement à Toufiltex ?
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.65 }}>
              Toufiltex répond à l&apos;exigence fondamentale des industriels et confectionneurs en Algérie : sécuriser des arrivages
              stables, sans rupture de cadence et avec un rapport qualité/prix garanti d&apos;usine.
            </p>

            <div className="benefits-list">
              <div className="benefit-card">
                <div className="benefit-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="benefit-text">
                  <h4>Importation Directe d&apos;Usine</h4>
                  <p>
                    Zéro intermédiaire superflu. Nous négocions directement auprès des meilleures filatures certifiées pour vous garantir les tarifs de gros les plus compétitifs du marché algérien.
                  </p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div className="benefit-text">
                  <h4>Régularité & Sécurité des Approvisionnements</h4>
                  <p>
                    Évitez les arrêts de production causés par des ruptures de matière première. Nos conteneurs réguliers assurent une continuité d&apos;activité sans accroc.
                  </p>
                </div>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className="benefit-text">
                  <h4>Proximité & Échantillonnage à Tlemcen</h4>
                  <p>
                    Un siège basé à Tlemcen avec possibilité d&apos;évaluation technique sur site et expédition rapide d&apos;échantillons physiques sur simple demande.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal-on-scroll stagger-2">
            <div className="expertise-visual-card">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="expertise-video-elem"
              >
                <source src="/videos/hero-textile.mp4" type="video/mp4" />
              </video>
              <div className="live-indicator-pill">
                <span className="live-pulse-dot" />
                <span>FILATURE & ENROULAGE HAUTE PRÉCISION</span>
              </div>
              <div className="expertise-visual-badge">
                <h5>Arrivages Continus & Contrôle Qualité Strict</h5>
                <p>Visualisez la régularité du bobinage et l&apos;absence de friction. Chaque lot importé répond aux normes industrielles les plus strictes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4 : CHIFFRES CLÉS & STATISTIQUES                  */}
      {/* ========================================================= */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-item reveal-on-scroll stagger-1">
            <div className="stat-number">48h</div>
            <div className="stat-label">Délai devis & échantillons</div>
          </div>

          <div className="stat-item reveal-on-scroll stagger-2">
            <div className="stat-number">100%</div>
            <div className="stat-label">Direct usine sans intermédiaire</div>
          </div>

          <div className="stat-item reveal-on-scroll stagger-3">
            <div className="stat-number">58</div>
            <div className="stat-label">Wilayas livrées en Algérie</div>
          </div>

          <div className="stat-item reveal-on-scroll stagger-4">
            <div className="stat-number">+15</div>
            <div className="stat-label">Ans d&apos;expertise textile</div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5 : BON DE COMMANDE & DEVIS EN LIGNE              */}
      {/* ========================================================= */}
      <section id="devis" className="section-devis">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="section-tag">DEVIS EXPRESS B2B</span>
            <h2 className="section-title">Demandez votre cotation gratuite</h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
              Recevez notre meilleure offre de prix sous 24h ouvrées, adaptée aux volumes et spécifications de vos ateliers.
            </p>
          </div>

          <div className="devis-container-grid">
            {/* Formulaire interactif */}
            <div className="devis-card reveal-on-scroll stagger-1">
              {submitted ? (
                <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary-blue)", marginBottom: "0.5rem" }}>
                    Demande transmise avec succès !
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1rem" }}>
                    Votre référence client : <strong style={{ color: "var(--primary-blue)" }}>{reference}</strong>
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", maxWidth: "450px", margin: "0 auto 1.5rem" }}>
                    Notre équipe commerciale à Tlemcen examine votre demande et vous recontactera directement sous 24h.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="card-action-btn"
                    style={{ margin: "0 auto", cursor: "pointer" }}
                  >
                    Nouvelle demande de cotation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group-modern">
                    <label className="form-label-modern">Nom de l&apos;entreprise ou atelier *</label>
                    <input
                      type="text"
                      className="form-input-modern"
                      placeholder="Ex: Société Textile de Confection"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>

                  <div className="form-group-modern">
                    <label className="form-label-modern">Numéro de téléphone direct (Algérie) *</label>
                    <input
                      type="tel"
                      className="form-input-modern"
                      placeholder="+213 Ex: 05 61 21 94 66"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group-modern">
                    <label className="form-label-modern">Wilaya d&apos;implantation *</label>
                    <input
                      type="text"
                      className="form-input-modern"
                      placeholder="Ex: Tlemcen, Oran, Alger, Sétif, Constantine..."
                      required
                      value={formData.wilaya}
                      onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                    />
                  </div>

                  <div className="form-group-modern">
                    <label className="form-label-modern">Types de fils et volumes souhaités</label>
                    <textarea
                      rows={3}
                      className="form-textarea-modern"
                      placeholder="Précisez les matières (polyester, confection, industriel...), les titrages et les quantités estimées..."
                      value={formData.need}
                      onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-submit-devis" disabled={loading}>
                    {loading ? "Envoi en cours..." : "Transmettre ma demande de devis"}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </form>
              )}
            </div>

            {/* Coordonnées & Accompagnement */}
            <div id="contact" className="devis-info-box reveal-on-scroll stagger-2">
              <div className="info-card-contact">
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.8rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(15, 43, 92, 0.08)", color: "var(--primary-blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.579 4.183 1.589 5.926l-1.589 5.8 5.975-1.567c1.705.952 3.67 1.491 5.76 1.491 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <h4 style={{ margin: 0 }}>Service Commercial & WhatsApp</h4>
                </div>
                <p style={{ fontWeight: 700, color: "var(--primary-blue)", fontSize: "1.1rem", marginBottom: "0.2rem" }}>
                  +213 561 21 94 66
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Disponible du Samedi au Jeudi pour conseils techniques et devis instantanés.
                </p>
              </div>

              <div className="info-card-contact">
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.8rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(15, 43, 92, 0.08)", color: "var(--primary-blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <h4 style={{ margin: 0 }}>Courriel Direct</h4>
                </div>
                <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: "0.2rem" }}>
                  salaheddinesaid101@gmail.com
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Réponse écrite garantie sous 24h avec fiche technique de nos fils.
                </p>
              </div>

              <div className="info-card-contact">
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.8rem" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(15, 43, 92, 0.08)", color: "var(--primary-blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <h4 style={{ margin: 0 }}>Siège Social & Dépôt</h4>
                </div>
                <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.95rem", marginBottom: "0.2rem" }}>
                  Tlemcen, Algérie
                </p>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Plateforme logistique d&apos;importation directe avec livraison nationale rapide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER CORPORATE MODERNE                                  */}
      {/* ========================================================= */}
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
                <li><a href="#presentation">Qui sommes-nous</a></li>
                <li><a href="#gammes">Nos gammes de fils</a></li>
                <li><a href="#devis">Demande de devis</a></li>
                <li><a href="#contact">Contact & Localisation</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Gamme de Fils</h4>
              <ul className="footer-links">
                <li><a href="#gammes">Fils Industriels & Techniques</a></li>
                <li><a href="#gammes">Fils en Polyester Spun</a></li>
                <li><a href="#gammes">Fils de Confection & Couture</a></li>
                <li><a href="#gammes">Fils sur-mesure & Spéciaux</a></li>
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

      {/* FLOATING WHATSAPP CTA */}
      <a
        href="https://wa.me/213561219466"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        title="WhatsApp Direct Toufiltex"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.159.579 4.183 1.589 5.926l-1.589 5.8 5.975-1.567c1.705.952 3.67 1.491 5.76 1.491 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
        </svg>
      </a>
    </main>
  );
}
