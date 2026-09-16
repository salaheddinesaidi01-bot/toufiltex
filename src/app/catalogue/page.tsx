"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { CraftNavbar } from "@/components/CraftNavbar";
import { Search, X, SlidersHorizontal, RotateCcw, Sparkles, Package, Layers } from "lucide-react";

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

      // Filtrage par titrage / grammage
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

  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "var(--bg-page)" }}>
      {/* 1. NAVBAR FIXE AVEC BOUTONS CENTRÉS */}
      <CraftNavbar />

      {/* 2. HERO ÉPURÉ DU CATALOGUE AVEC VIDÉO TEXTILE */}
      <header className="hero-video-section" style={{ minHeight: "50vh", paddingTop: "7rem", paddingBottom: "4.5rem" }}>
        <video
          className="hero-video-bg"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero-textile.mp4" type="video/mp4" />
        </video>

        {/* Voile de contraste léger */}
        <div className="hero-overlay" />

        <div className="container hero-content" style={{ maxWidth: "920px" }}>
          {/* Badge Studio */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1rem",
              borderRadius: "9999px",
              background: "rgba(15, 23, 42, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "#ffffff",
              marginBottom: "1.2rem",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 8px #22c55e",
              }}
            />
            <span>CATALOGUE INDUSTRIEL & APPROVISIONNEMENT DIRECT</span>
          </div>

          <h1 className="hero-main-title" style={{ fontSize: "clamp(2rem, 3.6vw, 3.1rem)", marginBottom: "0.8rem" }}>
            Nos Gammes de <mark>Fils & Matières Textiles</mark>
          </h1>

          <div className="hero-arabic-subtitle" style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", marginBottom: "1rem" }}>
            كتالوج الخيوط النسيجية الصناعية — استيراد مباشر لورشات ومصانع النسيج في الجزائر
          </div>

          <p className="hero-description" style={{ maxWidth: "720px", marginBottom: "1.8rem" }}>
            Consultez nos arrivages réguliers de fils 100% polyester, fils techniques et confection.
            Vente en gros sans intermédiaire avec livraison garantie dans les 58 wilayas d&apos;Algérie.
          </p>

          {/* Points forts */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.8rem",
              flexWrap: "wrap",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <Package size={16} color="#22c55e" />
              <span>Direct Filatures usine</span>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <Sparkles size={16} color="#93c5fd" />
              <span>Échantillons sous 48h</span>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <Layers size={16} color="#fcd34d" />
              <span>58 Wilayas couvertes</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. BANDEAU DÉFILANT ANIMÉ (MARQUEE RIBBON) */}
      <div className="animated-ticker-ribbon">
        <div className="ticker-track">
          <span>CATALOGUE TOUFILTEX EN LIGNE</span>
          <span className="ticker-separator">✦</span>
          <span>FILS 100% POLYESTER HAUTE TÉNACITÉ</span>
          <span className="ticker-separator">✦</span>
          <span>STOCK DISPONIBLE À TLEMCEN</span>
          <span className="ticker-separator">✦</span>
          <span>ARRIVAGES CONTINUS TOUTE L&apos;ANNÉE</span>
          <span className="ticker-separator">✦</span>
          <span>EXPÉDITION D&apos;ÉCHANTILLONS SOUS 48H</span>
          <span className="ticker-separator">✦</span>
          <span>LIVRAISON NATIONALE 58 WILAYAS</span>
          <span className="ticker-separator">✦</span>
          <span>CATALOGUE TOUFILTEX EN LIGNE</span>
          <span className="ticker-separator">✦</span>
          <span>FILS 100% POLYESTER HAUTE TÉNACITÉ</span>
          <span className="ticker-separator">✦</span>
          <span>STOCK DISPONIBLE À TLEMCEN</span>
          <span className="ticker-separator">✦</span>
          <span>ARRIVAGES CONTINUS TOUTE L&apos;ANNÉE</span>
          <span className="ticker-separator">✦</span>
          <span>EXPÉDITION D&apos;ÉCHANTILLONS SOUS 48H</span>
          <span className="ticker-separator">✦</span>
          <span>LIVRAISON NATIONALE 58 WILAYAS</span>
          <span className="ticker-separator">✦</span>
        </div>
      </div>

      {/* 4. CORPS PRINCIPAL DU CATALOGUE */}
      <main className="container" style={{ padding: "3rem 1.5rem 6rem" }}>
        {/* BARRE DE CONTRÔLE UNIFIÉE & PROFESSIONNELLE */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "1.6rem",
            borderRadius: "14px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 16px rgba(15, 23, 42, 0.04)",
            marginBottom: "2.5rem",
          }}
        >
          {/* Recherche sobre et moderne */}
          <div style={{ position: "relative", marginBottom: "1.4rem" }}>
            <Search
              size={19}
              color="var(--primary-blue)"
              style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Rechercher par matière (polyester, coton...), référence (TF-POLY...), désignation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.85rem 3rem 0.85rem 3rem",
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "var(--text-primary)",
                backgroundColor: "#f8fafc",
                border: "1.5px solid #e2e8f0",
                borderRadius: "10px",
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
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#475569",
                  cursor: "pointer",
                }}
                title="Effacer la recherche"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Boutons de Gammes Harmonisés (Design Pro Cohérent) */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
                Sélectionner une gamme :
              </span>
              {(selectedCategory !== "all" || searchQuery || selectedGrammage !== "all" || selectedCertif !== "all") && (
                <button
                  onClick={resetFilters}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--primary-blue)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <RotateCcw size={12} />
                  <span>Réinitialiser les critères</span>
                </button>
              )}
            </div>

            {/* Rangée de Boutons d'une Seule et Même Famille Graphique */}
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
              {/* Bouton "Toutes les gammes" */}
              <button
                onClick={() => setSelectedCategory("all")}
                className={`designer-category-pill ${selectedCategory === "all" ? "is-active" : ""}`}
              >
                <span>Toutes les gammes</span>
                <span className="pill-count-badge">
                  {productsList.length}
                </span>
              </button>

              {/* Boutons pour chaque catégorie avec palette harmonieuse */}
              {categoriesList.map((cat) => {
                const active = selectedCategory === cat.slug;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`designer-category-pill ${active ? "is-active" : ""}`}
                  >
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. GRILLE PRINCIPALE (SIDEBAR + CARTES PRODUITS) */}
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "2.2rem", alignItems: "start" }} className="catalogue-layout-grid">
          {/* SIDEBAR TECHNIQUE SOBRE */}
          <aside
            style={{
              backgroundColor: "#ffffff",
              padding: "1.5rem",
              borderRadius: "14px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 2px 10px rgba(15, 23, 42, 0.03)",
              display: "flex",
              flexDirection: "column",
              gap: "1.6rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #f1f5f9", paddingBottom: "0.75rem" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--primary-blue)", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <SlidersHorizontal size={16} />
                <span>Spécifications</span>
              </h3>
            </div>

            {/* Filtre Titrage / Grammage */}
            <div>
              <label style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)", display: "block", marginBottom: "0.65rem" }}>
                Titrage & Épaisseur
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.84rem" }}>
                {[
                  { label: "Tous les titrages", val: "all" },
                  { label: "Titrage Fin (< 200 g/m²)", val: "light" },
                  { label: "Titrage Moyen (200 - 350 g/m²)", val: "medium" },
                  { label: "Titrage Robuste (> 350 g/m²)", val: "heavy" },
                ].map((item) => (
                  <label
                    key={item.val}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.55rem",
                      cursor: "pointer",
                      padding: "0.35rem 0.45rem",
                      borderRadius: "6px",
                      backgroundColor: selectedGrammage === item.val ? "rgba(15, 43, 92, 0.06)" : "transparent",
                      color: selectedGrammage === item.val ? "var(--primary-blue)" : "var(--text-secondary)",
                      fontWeight: selectedGrammage === item.val ? 700 : 500,
                      transition: "all 0.15s ease",
                    }}
                  >
                    <input
                      type="radio"
                      name="grammage"
                      checked={selectedGrammage === item.val}
                      onChange={() => setSelectedGrammage(item.val)}
                      style={{ accentColor: "var(--primary-blue)", width: "15px", height: "15px" }}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filtre Certifications */}
            <div>
              <label style={{ fontSize: "0.76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)", display: "block", marginBottom: "0.65rem" }}>
                Normes & Certifications
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.84rem" }}>
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
                      gap: "0.55rem",
                      cursor: "pointer",
                      padding: "0.35rem 0.45rem",
                      borderRadius: "6px",
                      backgroundColor: selectedCertif === item.val ? "rgba(15, 43, 92, 0.06)" : "transparent",
                      color: selectedCertif === item.val ? "var(--primary-blue)" : "var(--text-secondary)",
                      fontWeight: selectedCertif === item.val ? 700 : 500,
                      transition: "all 0.15s ease",
                    }}
                  >
                    <input
                      type="radio"
                      name="certif"
                      checked={selectedCertif === item.val}
                      onChange={() => setSelectedCertif(item.val)}
                      style={{ accentColor: "var(--primary-blue)", width: "15px", height: "15px" }}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Encadré d'Assistance Directe */}
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "1.1rem",
                fontSize: "0.82rem",
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: "var(--primary-blue)", display: "block", marginBottom: "0.3rem" }}>
                Cahier des charges sur-mesure
              </strong>
              <p style={{ color: "var(--text-secondary)", marginBottom: "0.7rem" }}>
                Nous importons vos titrages, compositions et coloris exacts pour vos cadences de production.
              </p>
              <a
                href="https://wa.me/213561219466"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--primary-blue)",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                <span>Échanger avec notre expert</span>
                <span>&rarr;</span>
              </a>
            </div>
          </aside>

          {/* ZONE DE GRILLE PRODUITS */}
          <div>
            {/* Compteur de résultats épuré */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.3rem" }}>
              <div style={{ fontSize: "0.92rem", color: "var(--text-secondary)" }}>
                <strong style={{ color: "var(--primary-blue)" }}>{filteredProducts.length}</strong> référence{filteredProducts.length > 1 ? "s" : ""} disponible{filteredProducts.length > 1 ? "s" : ""}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>
                Dépôt central Toufiltex • Tlemcen
              </div>
            </div>

            {/* Grille de Produits */}
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "4rem 2rem",
                  textAlign: "center",
                  borderRadius: "14px",
                  border: "1.5px dashed #cbd5e1",
                }}
              >
                <div style={{ width: "54px", height: "54px", borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", color: "var(--primary-blue)" }}>
                  <Package size={26} />
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                  Aucune référence trouvée
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", maxWidth: "420px", margin: "0 auto 1.3rem" }}>
                  Modifiez votre recherche ou sélectionnez &quot;Toutes les gammes&quot; pour afficher l&apos;ensemble du catalogue.
                </p>
                <button
                  onClick={resetFilters}
                  style={{
                    padding: "0.65rem 1.5rem",
                    borderRadius: "8px",
                    background: "var(--primary-blue)",
                    color: "#ffffff",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.88rem",
                  }}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1.75rem",
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
            <div style={{ width: "42px", height: "42px", border: "3px solid rgba(15, 43, 92, 0.15)", borderTopColor: "var(--primary-blue)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
            <p style={{ fontWeight: 600, color: "var(--primary-blue)", fontSize: "0.92rem" }}>Chargement du catalogue...</p>
          </div>
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
