"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { Plus, Eye, Check, ShieldCheck } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const isInCart = items.some((item) => item.product.id === product.id);

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Image container with badges */}
      <div style={{ position: "relative", width: "100%", height: "240px", overflow: "hidden" }}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
          className="product-img"
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(11, 17, 32, 0.85) 0%, rgba(11, 17, 32, 0.1) 60%, transparent 100%)",
          }}
        />

        {/* Top Badges */}
        <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {product.featured && (
            <span className="badge badge-gold" style={{ fontSize: "0.7rem", padding: "0.25rem 0.6rem" }}>
              Phare
            </span>
          )}
          {product.certifications && product.certifications[0] && (
            <span className="badge badge-outline" style={{ fontSize: "0.7rem", padding: "0.25rem 0.6rem", background: "rgba(11, 17, 32, 0.75)" }}>
              <ShieldCheck size={12} /> {product.certifications[0].split(" ")[0]}
            </span>
          )}
        </div>

        {/* Reference */}
        <div style={{ position: "absolute", bottom: "12px", left: "12px", right: "12px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: "0.78rem", color: "var(--color-gold-light)", fontWeight: 700, letterSpacing: "0.05em" }}>
            {product.reference}
          </span>
          <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)", background: "rgba(0,0,0,0.5)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
            {product.grammage} g/m²
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1.4rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            marginBottom: "0.4rem",
            color: "var(--text-primary)",
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>

        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem", flex: 1, lineHeight: 1.5 }}>
          {product.composition}
        </p>

        {/* Specs tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.2rem", fontSize: "0.76rem", color: "var(--text-muted)" }}>
          {product.width > 0 && <span>Laize: {product.width} cm</span>}
          <span>•</span>
          <span>Min: {product.minOrderMeters} m</span>
          <span>•</span>
          <span style={{ color: "var(--color-gold)" }}>{product.categoryName}</span>
        </div>

        {/* Color Palette Indicators */}
        {product.colors && product.colors.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.2rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginRight: "0.2rem" }}>Nuances :</span>
            {product.colors.map((hex, i) => (
              <span
                key={i}
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  backgroundColor: hex,
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "inline-block",
                }}
                title={hex}
              />
            ))}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginTop: "auto" }}>
          <Link
            href={`/catalogue/${product.id}`}
            className="btn btn-secondary btn-sm"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
          >
            <Eye size={15} />
            <span>Fiche</span>
          </Link>

          <button
            onClick={() => addItem(product)}
            className={`btn btn-sm ${isInCart ? "btn-secondary" : "btn-primary"}`}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}
          >
            {isInCart ? (
              <>
                <Check size={15} color="var(--color-gold-light)" />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <Plus size={15} />
                <span>Devis</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
