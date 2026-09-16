"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { Plus, Eye, Check, ShieldCheck, MessageCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items } = useCart();
  const isInCart = items.some((item) => item.product.id === product.id);
  const [imgSrc, setImgSrc] = useState(product.imageUrl);

  // Images locales sécurisées si l'URL distante échoue
  const fallbackImage =
    product.categoryName?.toLowerCase().includes("polyester")
      ? "/images/fils-polyester.jpg"
      : product.categoryName?.toLowerCase().includes("confection")
      ? "/images/fils-confection.jpg"
      : "/images/bobines-fil-industriel.jpg";

  const whatsappMessage = encodeURIComponent(
    `Bonjour Toufiltex, je souhaite une cotation de gros pour la référence ${product.reference} — ${product.name}. Pouvez-vous me transmettre la fiche technique et vos disponibilités ?`
  );

  return (
    <article className="designer-product-card">
      {/* 1. VISUEL PRODUIT HAUTE PRÉCISION */}
      <div className="card-visual-wrap">
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc(fallbackImage)}
          className="card-product-image"
        />

        {/* Voile photographique subtil */}
        <div className="card-image-gradient" />

        {/* Badges Supérieurs */}
        <div className="card-top-badges">
          <span className="card-category-tag">
            {product.categoryName || "Gamme Industrielle"}
          </span>

          <span className="card-stock-status">
            <span className="stock-dot" />
            <span>En stock</span>
          </span>
        </div>

        {/* Badges Inférieurs : Référence & Titrage */}
        <div className="card-bottom-info">
          <span className="card-ref-badge">
            {product.reference}
          </span>

          {product.grammage > 0 && (
            <span className="card-spec-badge">
              {product.grammage} g/m²
            </span>
          )}
        </div>
      </div>

      {/* 2. DÉTAILS TECHNIQUES & TITRE */}
      <div className="card-content-wrap">
        <h3 className="card-product-title">
          {product.name}
        </h3>

        <p className="card-product-composition">
          {product.composition}
        </p>

        {/* Spécifications architecturales sobres */}
        <div className="card-tech-chips">
          {product.width > 0 && (
            <span className="tech-chip">
              Laize : {product.width} cm
            </span>
          )}

          {product.minOrderMeters > 0 && (
            <span className="tech-chip">
              Min. {product.minOrderMeters} m
            </span>
          )}

          {product.certifications && product.certifications[0] && (
            <span className="tech-chip certif-chip">
              <ShieldCheck size={12} />
              <span>{product.certifications[0].split(" ")[0]}</span>
            </span>
          )}
        </div>

        {/* Nuances disponibles */}
        {product.colors && product.colors.length > 0 && (
          <div className="card-colors-row">
            <span className="colors-label">Nuances :</span>
            <div className="colors-dots">
              {product.colors.map((hex, i) => (
                <span
                  key={i}
                  className="color-swatch-dot"
                  style={{ backgroundColor: hex }}
                  title={`Teinte : ${hex}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* 3. ACTIONS COHÉRENTES & PROFESSIONNELLES */}
        <div className="card-actions-grid">
          <Link
            href={`/catalogue/${product.id}`}
            className="btn-card-details"
          >
            <Eye size={15} />
            <span>Fiche</span>
          </Link>

          <button
            onClick={() => addItem(product)}
            className={`btn-card-quote ${isInCart ? "is-added" : ""}`}
          >
            {isInCart ? (
              <>
                <Check size={15} />
                <span>Sélectionné</span>
              </>
            ) : (
              <>
                <Plus size={15} />
                <span>Devis</span>
              </>
            )}
          </button>
        </div>

        {/* Contact direct WhatsApp sobre & corporate */}
        <a
          href={`https://wa.me/213561219466?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-card-whatsapp"
        >
          <MessageCircle size={15} />
          <span>Cotation directe sur WhatsApp</span>
        </a>
      </div>
    </article>
  );
}
