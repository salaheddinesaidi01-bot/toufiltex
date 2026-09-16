"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/ProductCard";
import { CraftNavbar } from "@/components/CraftNavbar";
import {
  ShieldCheck,
  Check,
  ArrowLeft,
  Package,
  Layers,
  Sparkles,
  Clock,
} from "lucide-react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id || p.slug === resolvedParams.id);

  const { addItem, items } = useCart();
  const [selectedMeters, setSelectedMeters] = useState(product?.minOrderMeters || 20);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "#FFFFFF");
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) {
    return notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 3);

  const handleAddQuote = (sampleOnly = false) => {
    addItem(product, sampleOnly ? 1 : selectedMeters, sampleOnly, selectedColor);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <div style={{ paddingTop: "6.5rem", paddingBottom: "6rem", minHeight: "100vh", backgroundColor: "var(--bg-page)" }}>
      <CraftNavbar />
      <div className="container" style={{ marginTop: "1rem" }}>
        {/* Back Link */}
        <Link
          href="/catalogue"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "0.9rem",
            fontWeight: 600,
            marginBottom: "2rem",
          }}
        >
          <ArrowLeft size={16} />
          <span>Retour au catalogue Toufiltex</span>
        </Link>

        {/* Top Product Hero */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3.5rem",
            marginBottom: "5rem",
          }}
        >
          {/* Left: Image gallery */}
          <div>
            <div
              className="card"
              style={{
                position: "relative",
                height: "460px",
                width: "100%",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 8px 30px rgba(15, 43, 92, 0.08)",
              }}
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  display: "flex",
                  gap: "0.6rem",
                }}
              >
                <span className="card-badge" style={{ position: "static" }}>Réf: {product.reference}</span>
                <span style={{ background: "rgba(15, 23, 42, 0.85)", color: "#ffffff", padding: "0.3rem 0.75rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase" }}>
                  {product.categoryName}
                </span>
              </div>
            </div>

            {/* Quick badges under image */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
                marginTop: "1.2rem",
                textAlign: "center",
              }}
            >
              <div className="card" style={{ padding: "0.8rem", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Grammage / Titrage</span>
                <strong style={{ fontSize: "1rem", color: "#0f2b5c" }}>{product.grammage} g/m²</strong>
              </div>
              <div className="card" style={{ padding: "0.8rem", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Conditionnement</span>
                <strong style={{ fontSize: "1rem", color: "#0f2b5c" }}>{product.width} cm / Cône</strong>
              </div>
              <div className="card" style={{ padding: "0.8rem", borderRadius: "8px" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Disponibilité</span>
                <strong style={{ fontSize: "1rem", color: "#16a34a" }}>En Stock Tlemcen</strong>
              </div>
            </div>
          </div>

          {/* Right: Info & Quote Actions */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "1rem" }}>
              <span className="card-badge" style={{ position: "static", display: "inline-block", marginBottom: "0.6rem" }}>
                FICHE TECHNIQUE B2B
              </span>
              <h1 style={{ fontSize: "clamp(1.9rem, 2.8vw, 2.5rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.25 }}>
                {product.name}
              </h1>
              <p style={{ color: "#0f2b5c", fontWeight: 700, fontSize: "1.05rem", marginTop: "0.4rem" }}>
                {product.composition}
              </p>
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: "0.98rem", lineHeight: 1.68, marginBottom: "1.8rem" }}>
              {product.description}
            </p>

            {/* Usage */}
            <div style={{ marginBottom: "1.5rem", padding: "1.1rem", background: "#ffffff", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.3rem", fontWeight: 700, textTransform: "uppercase" }}>
                Domaines d&apos;application recommandés :
              </span>
              <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 600 }}>
                {product.usage}
              </p>
            </div>

            {/* Certifications list */}
            <div style={{ marginBottom: "1.8rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>
                Conformité & Certifications :
              </span>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                {product.certifications?.map((cert, idx) => (
                  <span key={idx} className="card-badge" style={{ position: "static", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                    <ShieldCheck size={14} /> {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: "1.8rem" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", display: "block", marginBottom: "0.6rem", fontWeight: 700, textTransform: "uppercase" }}>
                  Nuancier indicatif disponible :
                </span>
                <div style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
                  {product.colors.map((hex, i) => {
                    const isSelected = selectedColor === hex;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(hex)}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          backgroundColor: hex,
                          border: isSelected ? "3px solid #0f2b5c" : "1.5px solid #cbd5e1",
                          cursor: "pointer",
                          transform: isSelected ? "scale(1.15)" : "scale(1)",
                          boxShadow: isSelected ? "0 2px 8px rgba(15, 43, 92, 0.25)" : "none",
                          transition: "all 0.2s ease",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quote Action Box */}
            <div
              className="card"
              style={{
                padding: "1.8rem",
                borderRadius: "12px",
                border: "1.5px solid #e2e8f0",
                boxShadow: "0 6px 24px rgba(15, 43, 92, 0.06)",
                marginTop: "auto",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", fontWeight: 600 }}>
                    Volume estimé (Min : {product.minOrderMeters} unités/kg)
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.4rem" }}>
                    <input
                      type="number"
                      min={product.minOrderMeters}
                      step={10}
                      value={selectedMeters}
                      onChange={(e) => setSelectedMeters(Math.max(1, parseInt(e.target.value) || 1))}
                      className="input"
                      style={{ width: "100px", padding: "0.55rem 0.8rem", textAlign: "center", fontSize: "1.05rem", fontWeight: 700 }}
                    />
                    <span style={{ fontSize: "0.92rem", color: "var(--text-secondary)", fontWeight: 600 }}>unités / kg</span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.82rem", color: "#0f2b5c", display: "flex", alignItems: "center", gap: "0.3rem", fontWeight: 700 }}>
                    <Clock size={15} /> Cotation sous 24h
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Tarifs directs filature</span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "0.8rem" }}>
                <button
                  onClick={() => handleAddQuote(false)}
                  className="btn btn-primary"
                  style={{ padding: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  <Package size={17} />
                  <span>{addedSuccess ? "Ajouté à la cotation !" : "Ajouter au devis"}</span>
                </button>

                <button
                  onClick={() => handleAddQuote(true)}
                  className="btn btn-secondary"
                  style={{ padding: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
                >
                  <Sparkles size={15} color="#0f2b5c" />
                  <span>Échantillon 48h</span>
                </button>
              </div>

              {addedSuccess && (
                <div style={{ marginTop: "0.8rem", textAlign: "center", fontSize: "0.85rem", color: "#16a34a", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                  <Check size={16} /> Référence ajoutée à votre demande de cotation pro.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Data Sheet Section */}
        {product.technicalSpecs && (
          <div style={{ marginBottom: "5rem" }}>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-primary)" }}>
              <Layers size={22} color="#0f2b5c" />
              <span>Spécifications & Données d&apos;Usine</span>
            </h2>

            <div
              className="card"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem", textAlign: "left" }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", width: "35%", background: "#f8fafc", fontWeight: 700 }}>
                      Type d&apos;armure / Tissage
                    </th>
                    <td style={{ padding: "1rem 1.5rem", color: "var(--text-primary)", fontWeight: 600 }}>
                      {product.technicalSpecs.weaveType}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", background: "#f8fafc", fontWeight: 700 }}>
                      Numéro métrique / Titrage du fil
                    </th>
                    <td style={{ padding: "1rem 1.5rem", color: "var(--text-primary)", fontWeight: 600 }}>
                      {product.technicalSpecs.yarnCount}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", background: "#f8fafc", fontWeight: 700 }}>
                      Stabilité dimensionnelle / Retrait
                    </th>
                    <td style={{ padding: "1rem 1.5rem", color: "var(--text-primary)" }}>
                      {product.technicalSpecs.shrinkage}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", background: "#f8fafc", fontWeight: 700 }}>
                      Consignes de travail & Entretien
                    </th>
                    <td style={{ padding: "1rem 1.5rem", color: "var(--text-primary)" }}>
                      {product.technicalSpecs.washingTemp}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Related Fabrics */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "1.4rem", color: "var(--text-primary)" }}>
              Autres fils et matières complémentaires
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.8rem",
              }}
            >
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
