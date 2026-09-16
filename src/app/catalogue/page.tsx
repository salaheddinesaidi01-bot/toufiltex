"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { CraftNavbar } from "@/components/CraftNavbar";
import { Search, X, SlidersHorizontal, RotateCcw, Sparkles, Package, Layers, ShieldCheck } from "lucide-react";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("cat") || "all";

  const [productsList, setProductsList] = useState(PRODUCTS);
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrammage, setSelectedGrammage] = useState<string>("all");
  const [selectedCertif, setSelectedCertif] = useState<string>("all");

  useEffect(() => {
    fetch("/api/produits")
      .then((res) => res.json())
      .then((data) => {
        if (data.products && data.products.length > 0) setProductsList(data.products);
        if (data.categories && data.categories.length > 0) setCategoriesList(data.categories);
      })
      .catch((err) => console.error(err));
  }, []);

  // Synchronisation avec l'URL param ?cat=
  useEffect(() => {
    const cat = searchParams.get("cat");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Logique de filtrage
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      // Filtrage par catégorie
      if (selectedCategory !== "all") {
        const cat = categoriesList.find((c) => c.slug === selectedCategory);
        if (cat && product.categoryId !== cat.id) return false;
      }

      // Recherche textuelle (nom, référence, composition, usage)
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesRef = product.reference.toLowerCase().includes(q);
        const matchesComp = product.composition.toLowerCase().includes(q);
        const matchesUsage = product.usage.toLowerCase().includes(q);
        if (!matchesName && !matchesRef && !matchesComp && !matchesUsage) return false;
      }

      // Filtrage par grammage / titrage
      if (selectedGrammage === "light" && product.grammage >= 200) return false;
      if (selectedGrammage === "medium" && (product.grammage < 200 || product.grammage > 350)) return false;
      if (selectedGrammage === "heavy" && product.grammage <= 350) return false;

      // Filtrage par certifications
      if (selectedCertif !== "all") {
        const hasCert = product.certifications?.some((c) =>
          c.toLowerCase().includes(selectedCertif.toLowerCase())
        );
        if (!hasCert) return false;
      }

      return true;
    });
  }, [productsList, categoriesList, selectedCategory, searchQuery, selectedGrammage, selectedCertif]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedGrammage("all");
    setSelectedCertif("all");
  };

  // Couleurs et styles dynamiques pour les boutons de catégories
  const getCategoryButtonColor = (slug: string) => {
    if (slug.includes("polyester")) return { bg: "#c24637", light: "rgba(194, 70, 55, 0.12)", border: "#c24637" };
    if (slug.includes("confection") || slug.includes("couture")) return { bg: "#059669", light: "rgba(5, 150, 105, 0.12)", border: "#059669" };
    if (slug.includes("ameublement")) return { bg: "#7c3aed", light: "rgba(124, 58, 237, 0.12)", border: "#7c3aed" };
    if (slug.includes("maille")) return { bg: "#d97706", light: "rgba(217, 119, 6, 0.12)", border: "#d97706" };
    return { bg: "#0f2b5c", light: "rgba(15, 43, 92, 0.12)", border: "#0f2b5c" };
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "var(--bg-page)" }}>
      {/* 1. NAVBAR FIXE AVEC BOUTONS CENTRÉS */}
      <CraftNavbar />

      {/* 2. HERO ANIMÉ DU CATALOGUE AVEC VIDÉO TEXTILE */}
      <header className="hero-video-section" style={{ minHeight: "52vh", paddingTop: "7rem", paddingBottom: "4.5rem" }}>
        {/* Vidéo textile d'arrière-plan haute définition */}
        <video
          className="hero-video-bg"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero-textile.mp4" type="video/mp4" />
        </video>

        {/* Voile de contraste clair et lumineux */}
        <div className="hero-overlay" />

        <div className="container hero-content" style={{ maxWidth: "940px" }}>
          {/* Badge animé en direct */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              padding: "0.45rem 1.1rem",
              borderRadius: "9999px",
              background: "rgba(15, 23, 42, 0.75)",
              border: "1.5px solid rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(10px)",
              fontSize: "0.78rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              color: "#ffffff",
              marginBottom: "1.2rem",
              textTransform: "uppercase",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 10px #22c55e",
                animation: "live-dot-pulse 1.8s infinite",
              }}
            />
            <span>CATALOGUE INDUSTRIEL & ÉCHANTILLONNAGE DIRECT</span>
          </div>

          <h1 className="hero-main-title" style={{ fontSize: "clamp(2.1rem, 3.8vw, 3.2rem)", marginBottom: "0.8rem" }}>
            Nos Gammes de <mark>Fils & Matières Textiles</mark>
          </h1>

          <div className="hero-arabic-subtitle" style={{ fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)", marginBottom: "1rem" }}>
            كتالوج الخيوط النسيجية الصناعية — أسعار الجملة مباشرة من المصنع في الجزائر
          </div>

          <p className="hero-description" style={{ maxWidth: "750px", marginBottom: "1.8rem" }}>
            Retrouvez tous nos arrivages de fils industriels, 100% polyester spun et texturé, fils de confection et armures techniques.
            Commandes en gros, fiches techniques et expédition d&apos;échantillons physiques depuis notre dépôt à Tlemcen.
          </p>

          {/* 4 Puces Avantages Clés */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
              fontSize: "0.86rem",
              fontWeight: 700,
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.85)",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
              <Package size={17} color="#22c55e" />
              <span>Direct Filatures sans intermédiaire</span>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
              <Sparkles size={17} color="#38bdf8" />
              <span>Échantillons expédiés sous 48h</span>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
              <Layers size={17} color="#fbbf24" />
              <span>Livraison garantie dans les 58 wilayas</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. BANDEAU ANIMÉ DÉFILANT CONTINU (MARQUEE RIBBON) */}
      <div className="animated-ticker-ribbon">
        <div className="ticker-track">
          <span>CATALOGUE TOUFILTEX EN LIGNE</span>
          <span className="ticker-separator">✦</span>
          <span>FILS HAUTE RÉSISTANCE POUR MÉTIERS RAPIDES</span>
          <span className="ticker-separator">✦</span>
          <span>FILS 100% POLYESTER HAUTE TÉNACITÉ</span>
          <span className="ticker-separator">✦</span>
          <span>FILS DE CONFECTION & COUTURE INDUSTRIELLE</span>
          <span className="ticker-separator">✦</span>
          <span>ARRIVAGES CONTINUS À TLEMCEN</span>
          <span className="ticker-separator">✦</span>
          <span>DEVIS & COTATION SOUS 24H OUVRÉES</span>
          <span className="ticker-separator">✦</span>
          <span>CATALOGUE TOUFILTEX EN LIGNE</span>
          <span className="ticker-separator">✦</span>
          <span>FILS HAUTE RÉSISTANCE POUR MÉTIERS RAPIDES</span>
          <span className="ticker-separator">✦</span>
          <span>FILS 100% POLYESTER HAUTE TÉNACITÉ</span>
          <span className="ticker-separator">✦</span>
          <span>FILS DE CONFECTION & COUTURE INDUSTRIELLE</span>
          <span className="ticker-separator">✦</span>
          <span>ARRIVAGES CONTINUS À TLEMCEN</span>
          <span className="ticker-separator">✦</span>
          <span>DEVIS & COTATION SOUS 24H OUVRÉES</span>
          <span className="ticker-separator">✦</span>
        </div>
      </div>

      {/* 4. CORPS PRINCIPAL DU CATALOGUE */}
      <main className="container" style={{ padding: "3rem 1.5rem 6rem" }}>
        {/* BARRE D'ACTION : RECHERCHE + SÉLECTION DE GAMMES */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "1.8rem",
            borderRadius: "16px",
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
            marginBottom: "2.5rem",
          }}
        >
          {/* Barre de Recherche Intuitive */}
          <div style={{ position: "relative", marginBottom: "1.5rem" }}>
            <Search
              size={20}
              color="var(--primary-blue)"
              style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Rechercher un fil par nom (ex: Polyester, Coton), référence (ex: TF-POLY), titrage, matière..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.95rem 3rem 0.95rem 3.2rem",
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                backgroundColor: "#f8fafc",
                border: "2px solid #e2e8f0",
                borderRadius: "12px",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              className="catalogue-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "#e2e8f0",
                  border: "none",
                  borderRadius: "50%",
                  width: "26px",
                  height: "26px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#475569",
                  cursor: "pointer",
                }}
                title="Effacer la recherche"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Boutons Sélecteurs de Gammes Colorés */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)" }}>
                Filtrer par Gamme de Fils :
              </span>
              {(selectedCategory !== "all" || searchQuery || selectedGrammage !== "all" || selectedCertif !== "all") && (
                <button
                  onClick={resetFilters}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--accent-red)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  <RotateCcw size={13} />
                  <span>Réinitialiser les filtres</span>
                </button>
              )}
            </div>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
              {/* Bouton "Toutes les gammes" */}
              <button
                onClick={() => setSelectedCategory("all")}
                style={{
                  padding: "0.65rem 1.4rem",
                  borderRadius: "10px",
                  fontSize: "0.92rem",
                  fontWeight: selectedCategory === "all" ? 800 : 700,
                  background: selectedCategory === "all" ? "var(--primary-blue)" : "#ffffff",
                  color: selectedCategory === "all" ? "#ffffff" : "var(--primary-blue)",
                  border: selectedCategory === "all" ? "2px solid var(--primary-blue)" : "2px solid #e2e8f0",
                  cursor: "pointer",
                  boxShadow: selectedCategory === "all" ? "0 6px 18px rgba(15, 43, 92, 0.25)" : "0 2px 6px rgba(0,0,0,0.03)",
                  transition: "all 0.25s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                className="category-pill-btn"
              >
                <span>Toutes les gammes</span>
                <span
                  style={{
                    fontSize: "0.76rem",
                    padding: "0.1rem 0.45rem",
                    borderRadius: "6px",
                    background: selectedCategory === "all" ? "rgba(255,255,255,0.25)" : "#f1f5f9",
                    color: selectedCategory === "all" ? "#ffffff" : "#475569",
                  }}
                >
                  {productsList.length}
                </span>
              </button>

              {/* Boutons pour chaque catégorie avec sa propre couleur */}
              {categoriesList.map((cat) => {
                const active = selectedCategory === cat.slug;
                const colors = getCategoryButtonColor(cat.slug);

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    style={{
                      padding: "0.65rem 1.35rem",
                      borderRadius: "10px",
                      fontSize: "0.92rem",
                      fontWeight: active ? 800 : 700,
                      background: active ? colors.bg : "#ffffff",
                      color: active ? "#ffffff" : colors.bg,
                      border: active ? `2px solid ${colors.border}` : "2px solid #e2e8f0",
                      cursor: "pointer",
                      boxShadow: active ? `0 6px 18px ${colors.light}` : "0 2px 6px rgba(0,0,0,0.03)",
                      transition: "all 0.25s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                    className="category-pill-btn"
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: active ? "#ffffff" : colors.bg,
                      }}
                    />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. GRILLE PRINCIPALE AVEC SIDEBAR DE FILTRES ET PRODUITS */}
        <div style={{ display: "grid", gridTemplateColumns: "270px 1fr", gap: "2.5rem", alignItems: "start" }} className="catalogue-layout-grid">
          {/* SIDEBAR DE FILTRAGE TECHNIQUE */}
          <aside
            style={{
              backgroundColor: "#ffffff",
              padding: "1.6rem",
              borderRadius: "16px",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
              display: "flex",
              flexDirection: "column",
              gap: "1.8rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1.5px solid #f1f5f9", paddingBottom: "0.8rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--primary-blue)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <SlidersHorizontal size={18} color="var(--primary-blue)" />
                <span>Critères Techniques</span>
              </h3>
            </div>

            {/* Filtre Titrage / Grammage */}
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", display: "block", marginBottom: "0.8rem" }}>
                Grammage & Titrage
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", fontSize: "0.88rem" }}>
                {[
                  { label: "Tous les titrages", val: "all" },
                  { label: "Titrage Fin (< 200 g/m²)", val: "light" },
                  { label: "Titrage Moyen (200 - 350 g/m²)", val: "medium" },
                  { label: "Titrage Lourd (> 350 g/m²)", val: "heavy" },
                ].map((item) => (
                  <label
                    key={item.val}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      cursor: "pointer",
                      padding: "0.4rem 0.5rem",
                      borderRadius: "6px",
                      backgroundColor: selectedGrammage === item.val ? "rgba(15, 43, 92, 0.06)" : "transparent",
                      color: selectedGrammage === item.val ? "var(--primary-blue)" : "var(--text-secondary)",
                      fontWeight: selectedGrammage === item.val ? 800 : 500,
                      transition: "all 0.15s ease",
                    }}
                  >
                    <input
                      type="radio"
                      name="grammage"
                      checked={selectedGrammage === item.val}
                      onChange={() => setSelectedGrammage(item.val)}
                      style={{ accentColor: "var(--primary-blue)", width: "16px", height: "16px" }}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtre Certifications Industrielles */}
            <div>
              <label style={{ fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", display: "block", marginBottom: "0.8rem" }}>
                Certifications d&apos;Usine
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem", fontSize: "0.88rem" }}>
                {[
                  { label: "Toutes certifications", val: "all" },
                  { label: "OEKO-TEX Standard 100", val: "oeko-tex" },
                  { label: "GOTS Bio Organique", val: "gots" },
                  { label: "Norme Ignifuge M1", val: "m1" },
                ].map((item) => (
                  <label
                    key={item.val}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      cursor: "pointer",
                      padding: "0.4rem 0.5rem",
                      borderRadius: "6px",
                      backgroundColor: selectedCertif === item.val ? "rgba(5, 150, 105, 0.08)" : "transparent",
                      color: selectedCertif === item.val ? "#059669" : "var(--text-secondary)",
                      fontWeight: selectedCertif === item.val ? 800 : 500,
                      transition: "all 0.15s ease",
                    }}
                  >
                    <input
                      type="radio"
                      name="certif"
                      checked={selectedCertif === item.val}
                      onChange={() => setSelectedCertif(item.val)}
                      style={{ accentColor: "#059669", width: "16px", height: "16px" }}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Encadré d'Assistance Directe */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(15, 43, 92, 0.05) 0%, rgba(194, 70, 55, 0.05) 100%)",
                border: "1.5px solid rgba(15, 43, 92, 0.15)",
                borderRadius: "12px",
                padding: "1.2rem",
                fontSize: "0.84rem",
                lineHeight: 1.55,
              }}
            >
              <strong style={{ color: "var(--primary-blue)", display: "block", marginBottom: "0.4rem", fontSize: "0.9rem" }}>
                Besoin d&apos;un fil spécifique ?
              </strong>
              <p style={{ color: "var(--text-secondary)", marginBottom: "0.8rem" }}>
                Nous importons sur cahier des charges des armures et titrages spéciaux pour vos métiers à tisser.
              </p>
              <a
                href="https://wa.me/213561219466"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "#15803d",
                  fontWeight: 800,
                  textDecoration: "none",
                  fontSize: "0.82rem",
                }}
              >
                <span>Contacter l&apos;expert Toufiltex</span>
                <span>&rarr;</span>
              </a>
            </div>
          </aside>

          {/* ZONE DE GRILLE PRODUITS */}
          <div>
            {/* Barre de compteur de résultats */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                Affichage de <strong style={{ color: "var(--primary-blue)" }}>{filteredProducts.length}</strong> référence{filteredProducts.length > 1 ? "s" : ""} disponible{filteredProducts.length > 1 ? "s" : ""}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>
                Arrivages en continu — Dépôt Tlemcen
              </div>
            </div>

            {/* Grille de Produits Revampée */}
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "4rem 2rem",
                  textAlign: "center",
                  borderRadius: "16px",
                  border: "2px dashed #cbd5e1",
                }}
              >
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.2rem", color: "var(--primary-blue)" }}>
                  <Package size={28} />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  Aucune référence ne correspond à ces critères
                </h3>
                <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", maxWidth: "450px", margin: "0 auto 1.5rem" }}>
                  Essayez d&apos;élargir votre recherche ou de sélectionner &quot;Toutes les gammes&quot;.
                </p>
                <button
                  onClick={resetFilters}
                  style={{
                    padding: "0.75rem 1.8rem",
                    borderRadius: "8px",
                    background: "var(--primary-blue)",
                    color: "#ffffff",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Réinitialiser tous les filtres
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(285px, 1fr))",
                  gap: "1.85rem",
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 6. PIED DE PAGE CORPORATE */}
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
                <li><a href="/">Accueil</a></li>
                <li><a href="/catalogue">Catalogue complet</a></li>
                <li><a href="/devis">Demande de devis</a></li>
                <li><a href="/#contact">Contact & Localisation</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Gammes Disponibles</h4>
              <ul className="footer-links">
                <li><a href="/catalogue?cat=filature">Fils Industriels & Filature</a></li>
                <li><a href="/catalogue?cat=polyester">Fils 100% Polyester Spun</a></li>
                <li><a href="/catalogue?cat=confection">Fils de Confection & Couture</a></li>
                <li><a href="/catalogue?cat=techniques">Fils Techniques & Spéciaux</a></li>
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

      {/* 7. BOUTON FLOTTANT WHATSAPP DIRECT */}
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
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--bg-page)" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: "50px", height: "50px", border: "4px solid rgba(15, 43, 92, 0.2)", borderTopColor: "var(--primary-blue)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
            <p style={{ fontWeight: 700, color: "var(--primary-blue)" }}>Chargement du catalogue Toufiltex...</p>
          </div>
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
