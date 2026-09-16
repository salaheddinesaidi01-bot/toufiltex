"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Search, Filter, X, SlidersHorizontal, RotateCcw } from "lucide-react";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("cat") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrammage, setSelectedGrammage] = useState<string>("all");
  const [selectedCertif, setSelectedCertif] = useState<string>("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== "all") {
        const cat = CATEGORIES.find((c) => c.slug === selectedCategory);
        if (cat && product.categoryId !== cat.id) return false;
      }

      // Search match
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesRef = product.reference.toLowerCase().includes(q);
        const matchesComp = product.composition.toLowerCase().includes(q);
        const matchesUsage = product.usage.toLowerCase().includes(q);
        if (!matchesName && !matchesRef && !matchesComp && !matchesUsage) return false;
      }

      // Grammage filter
      if (selectedGrammage === "light" && product.grammage >= 200) return false;
      if (selectedGrammage === "medium" && (product.grammage < 200 || product.grammage > 350)) return false;
      if (selectedGrammage === "heavy" && product.grammage <= 350) return false;

      // Certifications filter
      if (selectedCertif !== "all") {
        const hasCert = product.certifications?.some((c) =>
          c.toLowerCase().includes(selectedCertif.toLowerCase())
        );
        if (!hasCert) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, selectedGrammage, selectedCertif]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSelectedGrammage("all");
    setSelectedCertif("all");
  };

  return (
    <div style={{ padding: "3rem 0 6rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
            <span className="badge badge-gold">Sourcing Matières & Échantillonnage</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, color: "var(--text-primary)" }}>
            Catalogue des Tissus & Fils
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", maxWidth: "700px", marginTop: "0.4rem" }}>
            Explorez notre collection de tissus haut de gamme pour l&apos;ameublement, l&apos;hôtellerie,
            la mode et l&apos;industrie. Ajoutez des métrages ou des échantillons gratuits à votre devis.
          </p>
        </div>

        {/* Search & Category Pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2.5rem" }}>
          {/* Search Bar */}
          <div style={{ position: "relative", maxWidth: "600px" }}>
            <Search
              size={19}
              color="var(--text-muted)"
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Rechercher par nom, référence (ex: SAT-EGY), composition, lin, coton..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{ paddingLeft: "2.8rem", fontSize: "0.95rem" }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                }}
              >
                <X size={17} />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={() => setSelectedCategory("all")}
              style={{
                padding: "0.55rem 1.2rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.88rem",
                fontWeight: selectedCategory === "all" ? 700 : 500,
                background: selectedCategory === "all" ? "var(--color-gold)" : "rgba(255, 255, 255, 0.05)",
                color: selectedCategory === "all" ? "#0b1120" : "var(--text-secondary)",
                border: selectedCategory === "all" ? "1px solid var(--color-gold-light)" : "1px solid var(--border-subtle)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Tous les tissus ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  style={{
                    padding: "0.55rem 1.2rem",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.88rem",
                    fontWeight: active ? 700 : 500,
                    background: active ? "var(--color-gold)" : "rgba(255, 255, 255, 0.05)",
                    color: active ? "#0b1120" : "var(--text-secondary)",
                    border: active ? "1px solid var(--color-gold-light)" : "1px solid var(--border-subtle)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout: Filters + Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "2.5rem", alignItems: "start" }}>
          {/* Desktop Filter Sidebar */}
          <aside
            className="glass"
            style={{
              padding: "1.5rem",
              borderRadius: "var(--radius-md)",
              display: "flex",
              flexDirection: "column",
              gap: "1.8rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <SlidersHorizontal size={17} color="var(--color-gold)" />
                <span>Filtres Spécifiques</span>
              </h3>
              {(selectedGrammage !== "all" || selectedCertif !== "all" || searchQuery !== "" || selectedCategory !== "all") && (
                <button
                  onClick={resetFilters}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--color-gold-light)",
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  <RotateCcw size={12} /> Réinitialiser
                </button>
              )}
            </div>

            {/* Grammage Filter */}
            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", display: "block", marginBottom: "0.7rem" }}>
                Grammage (g/m²)
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.85rem" }}>
                {[
                  { label: "Tous les grammages", val: "all" },
                  { label: "Léger (< 200 g/m²)", val: "light" },
                  { label: "Moyen (200 - 350 g/m²)", val: "medium" },
                  { label: "Lourd (> 350 g/m²)", val: "heavy" },
                ].map((item) => (
                  <label key={item.val} style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", color: selectedGrammage === item.val ? "var(--color-gold-light)" : "var(--text-secondary)" }}>
                    <input
                      type="radio"
                      name="grammage"
                      checked={selectedGrammage === item.val}
                      onChange={() => setSelectedGrammage(item.val)}
                      style={{ accentColor: "var(--color-gold)" }}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Certifications Filter */}
            <div>
              <label style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", display: "block", marginBottom: "0.7rem" }}>
                Certifications & Normes
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem", fontSize: "0.85rem" }}>
                {[
                  { label: "Toutes certifications", val: "all" },
                  { label: "OEKO-TEX Standard 100", val: "oeko-tex" },
                  { label: "GOTS Bio", val: "gots" },
                  { label: "Norme Feu M1", val: "m1" },
                ].map((item) => (
                  <label key={item.val} style={{ display: "flex", alignItems: "center", gap: "0.6rem", cursor: "pointer", color: selectedCertif === item.val ? "var(--color-gold-light)" : "var(--text-secondary)" }}>
                    <input
                      type="radio"
                      name="certif"
                      checked={selectedCertif === item.val}
                      onChange={() => setSelectedCertif(item.val)}
                      style={{ accentColor: "var(--color-gold)" }}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Information box */}
            <div style={{ background: "rgba(197, 155, 39, 0.08)", border: "1px solid var(--border-gold)", borderRadius: "var(--radius-sm)", padding: "1rem", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              <strong style={{ color: "var(--color-gold-light)", display: "block", marginBottom: "0.3rem" }}>
                Besoin d&apos;une référence spéciale ?
              </strong>
              Notre bureau d&apos;études textile développe des armures et coloris sur cahier des charges dès 300 mètres.
            </div>
          </aside>

          {/* Product Grid Area */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                <strong style={{ color: "var(--text-primary)" }}>{filteredProducts.length}</strong> référence{filteredProducts.length > 1 ? "s" : ""} trouvée{filteredProducts.length > 1 ? "s" : ""}
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="card" style={{ padding: "4rem 2rem", textAlign: "center", color: "var(--text-muted)" }}>
                <Filter size={40} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  Aucun tissu ne correspond à votre recherche
                </h3>
                <p style={{ fontSize: "0.9rem", maxWidth: "450px", margin: "0 auto 1.5rem" }}>
                  Essayez de modifier vos filtres de recherche ou de réinitialiser les critères.
                </p>
                <button onClick={resetFilters} className="btn btn-secondary btn-sm">
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "2rem",
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "5rem 0", textAlign: "center" }}>Chargement du catalogue...</div>}>
      <CatalogueContent />
    </Suspense>
  );
}
