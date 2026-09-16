"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { Plus, Eye, Check, ShieldCheck, MessageCircle, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

// Fonction utilitaire pour attribuer une couleur et un thème vibrant par catégorie
function getCategoryTheme(categoryName?: string) {
  const cat = (categoryName || "").toLowerCase();
  if (cat.includes("polyester")) {
    return {
      name: "Polyester",
      color: "#c24637",
      bgLight: "rgba(194, 70, 55, 0.08)",
      border: "rgba(194, 70, 55, 0.35)",
      gradient: "linear-gradient(135deg, #c24637 0%, #dc2626 100%)",
      badgeText: "100% POLYESTER",
      fallbackImg: "/images/fils-polyester.jpg",
    };
  }
  if (cat.includes("confection") || cat.includes("couture")) {
    return {
      name: "Confection",
      color: "#059669",
      bgLight: "rgba(5, 150, 105, 0.08)",
      border: "rgba(5, 150, 105, 0.35)",
      gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
      badgeText: "CONFECTION & COUTURE",
      fallbackImg: "/images/fils-confection.jpg",
    };
  }
  if (cat.includes("ameublement") || cat.includes("déco")) {
    return {
      name: "Ameublement",
      color: "#7c3aed",
      bgLight: "rgba(124, 58, 237, 0.08)",
      border: "rgba(124, 58, 237, 0.35)",
      gradient: "linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)",
      badgeText: "AMEUBLEMENT & DÉCO",
      fallbackImg: "/images/fils-industriels-cones.jpg",
    };
  }
  if (cat.includes("maille") || cat.includes("tricot")) {
    return {
      name: "Mailles",
      color: "#d97706",
      bgLight: "rgba(217, 119, 6, 0.08)",
      border: "rgba(217, 119, 6, 0.35)",
      gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
      badgeText: "MAILLES & TRICOTAGE",
      fallbackImg: "/images/bobines-fil-industriel.jpg",
    };
  }
  // Par défaut : Filature & Industriel
  return {
    name: "Industriel",
    color: "#0f2b5c",
    bgLight: "rgba(15, 43, 92, 0.08)",
    border: "rgba(15, 43, 92, 0.35)",
    gradient: "linear-gradient(135deg, #0f2b5c 0%, #2563eb 100%)",
    badgeText: "FILATURE INDUSTRIELLE",
    fallbackImg: "/images/bobines-fil-industriel.jpg",
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const isInCart = items.some((item) => item.product.id === product.id);
  const [imgSrc, setImgSrc] = useState(product.imageUrl);
  const theme = getCategoryTheme(product.categoryName);

  const whatsappMessage = encodeURIComponent(
    `Bonjour Toufiltex, je souhaite des informations et un devis de gros pour la référence ${product.reference} (${product.name}). Disponibilité à Tlemcen ?`
  );

  return (
    <div
      className="modern-catalogue-card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        border: `1.5px solid rgba(226, 232, 240, 0.9)`,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
      }}
    >
      {/* 1. CONTENEUR IMAGE AVEC ANIMATIONS & BADGES */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "230px",
          overflow: "hidden",
          backgroundColor: "#f1f5f9",
        }}
        className="card-image-container"
      >
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc(theme.fallbackImg)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="product-card-img"
        />

        {/* Voile dégradé léger pour lisibilité */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0) 50%, rgba(15, 23, 42, 0.65) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* BADGES SUPÉRIEURS */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            right: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          {/* Badge Catégorie Coloré */}
          <span
            style={{
              background: theme.gradient,
              color: "#ffffff",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.05em",
              padding: "0.32rem 0.75rem",
              borderRadius: "6px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <Sparkles size={11} />
            {theme.badgeText}
          </span>

          {/* Indicateur de stock animé */}
          <span
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(6px)",
              color: "#ffffff",
              fontSize: "0.72rem",
              fontWeight: 700,
              padding: "0.28rem 0.65rem",
              borderRadius: "9999px",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                boxShadow: "0 0 8px #22c55e",
                display: "inline-block",
              }}
            />
            <span>En Stock</span>
          </span>
        </div>

        {/* BADGE INFÉRIEUR SUR L'IMAGE : RÉFÉRENCE & TITRAGE */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "12px",
            right: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontSize: "0.82rem",
              fontWeight: 900,
              letterSpacing: "0.06em",
              color: "#ffffff",
              textShadow: "0 2px 6px rgba(0,0,0,0.8)",
              background: "rgba(15, 43, 92, 0.85)",
              padding: "0.2rem 0.55rem",
              borderRadius: "4px",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            RÉF: {product.reference}
          </span>

          {product.grammage > 0 && (
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#ffffff",
                background: "rgba(0, 0, 0, 0.6)",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                backdropFilter: "blur(4px)",
              }}
            >
              {product.grammage} g/m²
            </span>
          )}
        </div>
      </div>

      {/* 2. CORPS DE LA CARTE AVEC DÉTAILS TECHNIQUES & NUANCES */}
      <div
        style={{
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Titre du Produit */}
        <h3
          style={{
            fontSize: "1.15rem",
            fontWeight: 800,
            marginBottom: "0.4rem",
            color: "var(--text-primary)",
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>

        {/* Composition Technique */}
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            marginBottom: "0.85rem",
            lineHeight: 1.5,
          }}
        >
          {product.composition}
        </p>

        {/* Spécifications sous forme de tags colorés */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
            marginBottom: "1rem",
            fontSize: "0.74rem",
          }}
        >
          {product.width > 0 && (
            <span
              style={{
                padding: "0.2rem 0.55rem",
                borderRadius: "5px",
                backgroundColor: "#f1f5f9",
                color: "#334155",
                fontWeight: 600,
                border: "1px solid #e2e8f0",
              }}
            >
              Laize: {product.width} cm
            </span>
          )}

          {product.minOrderMeters > 0 && (
            <span
              style={{
                padding: "0.2rem 0.55rem",
                borderRadius: "5px",
                backgroundColor: theme.bgLight,
                color: theme.color,
                fontWeight: 700,
                border: `1px solid ${theme.border}`,
              }}
            >
              Min: {product.minOrderMeters} m
            </span>
          )}

          {product.certifications && product.certifications[0] && (
            <span
              style={{
                padding: "0.2rem 0.55rem",
                borderRadius: "5px",
                backgroundColor: "rgba(34, 197, 94, 0.08)",
                color: "#15803d",
                fontWeight: 700,
                border: "1px solid rgba(34, 197, 94, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              <ShieldCheck size={12} />
              {product.certifications[0].split(" ")[0]}
            </span>
          )}
        </div>

        {/* Nuancier de Couleurs Disponibles */}
        {product.colors && product.colors.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              marginBottom: "1.2rem",
              paddingTop: "0.5rem",
              borderTop: "1px dashed #e2e8f0",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Nuances :</span>
            <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
              {product.colors.map((hex, i) => (
                <span
                  key={i}
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: hex,
                    border: "1.5px solid #cbd5e1",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                    display: "inline-block",
                    transition: "transform 0.2s ease",
                  }}
                  className="color-dot-hover"
                  title={`Teinte : ${hex}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* 3. BOUTONS D'ACTION MODERNES & COLORÉS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.55rem",
            marginTop: "auto",
            paddingTop: "0.4rem",
          }}
        >
          {/* Bouton Fiche Détails */}
          <Link
            href={`/catalogue/${product.id}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              padding: "0.6rem 0.8rem",
              borderRadius: "8px",
              border: "1.5px solid #0f2b5c",
              backgroundColor: "#ffffff",
              color: "#0f2b5c",
              fontSize: "0.84rem",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            className="card-btn-outline"
          >
            <Eye size={15} />
            <span>Fiche</span>
          </Link>

          {/* Bouton Ajouter au devis */}
          <button
            onClick={() => addItem(product)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.4rem",
              padding: "0.6rem 0.8rem",
              borderRadius: "8px",
              border: "none",
              background: isInCart ? "#16a34a" : theme.gradient,
              color: "#ffffff",
              fontSize: "0.84rem",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: isInCart ? "0 4px 12px rgba(22, 163, 74, 0.3)" : "0 4px 14px rgba(15, 43, 92, 0.2)",
              transition: "all 0.25s ease",
            }}
            className="card-btn-primary"
          >
            {isInCart ? (
              <>
                <Check size={16} />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Devis</span>
              </>
            )}
          </button>
        </div>

        {/* Bouton Pleine Largeur WhatsApp Direct pour cette référence */}
        <a
          href={`https://wa.me/213561219466?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "0.6rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            padding: "0.55rem 0.8rem",
            borderRadius: "8px",
            backgroundColor: "rgba(37, 211, 102, 0.12)",
            color: "#15803d",
            border: "1px solid rgba(37, 211, 102, 0.35)",
            fontSize: "0.8rem",
            fontWeight: 700,
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          className="card-btn-whatsapp"
        >
          <MessageCircle size={15} color="#25d366" />
          <span>Commander par WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
