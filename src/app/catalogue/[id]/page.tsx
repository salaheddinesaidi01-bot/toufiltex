"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/ProductCard";
import {
  ShieldCheck,
  Check,
  FileDown,
  ArrowLeft,
  Package,
  Layers,
  Sparkles,
  Info,
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

  const isInCart = items.some((i) => i.product.id === product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 3);

  const handleAddQuote = (sampleOnly = false) => {
    addItem(product, sampleOnly ? 1 : selectedMeters, sampleOnly, selectedColor);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <div style={{ padding: "3rem 0 6rem" }}>
      <div className="container">
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
            marginBottom: "2rem",
          }}
        >
          <ArrowLeft size={16} />
          <span>Retour au catalogue textile</span>
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
                height: "480px",
                width: "100%",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border-gold)",
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
                <span className="badge badge-gold">Réf: {product.reference}</span>
                <span className="badge badge-outline" style={{ background: "rgba(11, 17, 32, 0.8)" }}>
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
              <div className="glass" style={{ padding: "0.8rem", borderRadius: "var(--radius-sm)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Grammage</span>
                <strong style={{ fontSize: "1rem", color: "var(--color-gold-light)" }}>{product.grammage} g/m²</strong>
              </div>
              <div className="glass" style={{ padding: "0.8rem", borderRadius: "var(--radius-sm)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Laize Utile</span>
                <strong style={{ fontSize: "1rem", color: "var(--color-gold-light)" }}>{product.width} cm</strong>
              </div>
              <div className="glass" style={{ padding: "0.8rem", borderRadius: "var(--radius-sm)" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Disponibilité</span>
                <strong style={{ fontSize: "1rem", color: "#10b981" }}>En Stock</strong>
              </div>
            </div>
          </div>

          {/* Right: Info & Quote Actions */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "1rem" }}>
              <span className="badge badge-gold" style={{ marginBottom: "0.8rem" }}>
                Fiche Technique Produit
              </span>
              <h1 style={{ fontSize: "clamp(2rem, 3vw, 2.7rem)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>
                {product.name}
              </h1>
              <p style={{ color: "var(--color-gold)", fontWeight: 600, fontSize: "1.05rem", marginTop: "0.4rem" }}>
                {product.composition}
              </p>
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              {product.description}
            </p>

            {/* Usage */}
            <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.3rem" }}>
                Domaines d&apos;application recommandés :
              </span>
              <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontWeight: 500 }}>
                {product.usage}
              </p>
            </div>

            {/* Certifications list */}
            <div style={{ marginBottom: "2rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block", marginBottom: "0.6rem" }}>
                Labels & Certifications :
              </span>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                {product.certifications?.map((cert, idx) => (
                  <span key={idx} className="badge badge-gold" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <ShieldCheck size={14} /> {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: "2rem" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.7rem" }}>
                  Sélectionner un coloris indicatif :
                </span>
                <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
                  {product.colors.map((hex, i) => {
                    const isSelected = selectedColor === hex;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(hex)}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          backgroundColor: hex,
                          border: isSelected ? "3px solid var(--color-gold)" : "2px solid rgba(255,255,255,0.2)",
                          cursor: "pointer",
                          boxShadow: isSelected ? "0 0 12px var(--color-gold)" : "none",
                          transform: isSelected ? "scale(1.15)" : "scale(1)",
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
              className="glass"
              style={{
                padding: "1.8rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-gold)",
                marginTop: "auto",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>
                    Volume souhaité (Minimum : {product.minOrderMeters} m)
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "0.4rem" }}>
                    <input
                      type="number"
                      min={product.minOrderMeters}
                      step={10}
                      value={selectedMeters}
                      onChange={(e) => setSelectedMeters(Math.max(1, parseInt(e.target.value) || 1))}
                      className="input"
                      style={{ width: "110px", padding: "0.6rem 0.8rem", textAlign: "center", fontSize: "1.1rem", fontWeight: 700 }}
                    />
                    <span style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>mètres linéaires</span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-gold-light)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <Clock size={14} /> Chiffrage sous 24h
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Tarifs dégressifs B2B</span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "0.8rem" }}>
                <button
                  onClick={() => handleAddQuote(false)}
                  className="btn btn-primary"
                  style={{ padding: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  <Package size={18} />
                  <span>{addedSuccess ? "Ajouté au devis !" : "Ajouter au devis"}</span>
                </button>

                <button
                  onClick={() => handleAddQuote(true)}
                  className="btn btn-secondary"
                  style={{ padding: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
                >
                  <Sparkles size={16} color="var(--color-gold)" />
                  <span>Échantillon Offert</span>
                </button>
              </div>

              {addedSuccess && (
                <div style={{ marginTop: "0.8rem", textAlign: "center", fontSize: "0.85rem", color: "var(--color-gold-light)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
                  <Check size={16} /> Référence ajoutée à votre demande de devis en cours.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Data Sheet Section */}
        {product.technicalSpecs && (
          <div style={{ marginBottom: "5rem" }}>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <Layers size={22} color="var(--color-gold)" />
              <span>Spécifications Techniques & Conseils d&apos;Entretien</span>
            </h2>

            <div
              className="glass"
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem", textAlign: "left" }}>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", width: "35%", background: "rgba(255,255,255,0.02)" }}>
                      Type d&apos;armure / Tissage
                    </th>
                    <td style={{ padding: "1rem 1.5rem", color: "var(--text-primary)", fontWeight: 600 }}>
                      {product.technicalSpecs.weaveType}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", background: "rgba(255,255,255,0.02)" }}>
                      Numéro métrique / Titrage du fil
                    </th>
                    <td style={{ padding: "1rem 1.5rem", color: "var(--text-primary)" }}>
                      {product.technicalSpecs.yarnCount}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", background: "rgba(255,255,255,0.02)" }}>
                      Stabilité dimensionnelle / Retrait
                    </th>
                    <td style={{ padding: "1rem 1.5rem", color: "var(--text-primary)" }}>
                      {product.technicalSpecs.shrinkage}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ padding: "1rem 1.5rem", color: "var(--text-muted)", background: "rgba(255,255,255,0.02)" }}>
                      Consignes de lavage & Entretien
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
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "1.5rem" }}>
              Dans la même famille textile
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
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
