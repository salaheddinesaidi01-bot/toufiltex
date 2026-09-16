"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { X, Trash2, ArrowRight, Package, Check, Sparkles } from "lucide-react";

export function QuoteDrawer() {
  const { items, removeItem, updateQuantity, toggleSample, isDrawerOpen, setIsDrawerOpen, clearCart } = useCart();

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="drawer-backdrop" onClick={() => setIsDrawerOpen(false)} />

      {/* Drawer panel */}
      <aside className="drawer-panel" style={{ padding: "1.5rem", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "1.2rem",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "var(--color-gold-glow)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-gold)",
              }}
            >
              <Package size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Mon Panier de Devis</h3>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {items.length} référence{items.length > 1 ? "s" : ""} sélectionnée{items.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: "0.4rem",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Item List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.2rem 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
              <Package size={48} strokeWidth={1} style={{ margin: "0 auto 1rem", opacity: 0.4 }} />
              <p style={{ fontWeight: 600, fontSize: "1.05rem", color: "var(--text-primary)", marginBottom: "0.4rem" }}>
                Votre panier de devis est vide
              </p>
              <p style={{ fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                Parcourez notre catalogue et sélectionnez les tissus ou fils souhaités pour recevoir un chiffrage personnalisé.
              </p>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="btn btn-secondary btn-sm"
              >
                Explorer le catalogue
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.9rem",
                  display: "flex",
                  gap: "0.8rem",
                  position: "relative",
                }}
              >
                {/* Image */}
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    fill
                    sizes="70px"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h4
                      style={{
                        fontSize: "0.92rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        paddingRight: "0.5rem",
                      }}
                    >
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        padding: "0.2rem",
                      }}
                      title="Supprimer la référence"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-gold-light)", fontWeight: 600 }}>
                    Réf: {item.product.reference} • {item.product.grammage} g/m²
                  </span>

                  {/* Quantity & Sample controls */}
                  <div style={{ marginTop: "0.6rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Métrage :</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantityMeters}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                        style={{
                          width: "60px",
                          padding: "0.25rem 0.4rem",
                          background: "rgba(0,0,0,0.3)",
                          border: "1px solid var(--border-subtle)",
                          borderRadius: "4px",
                          color: "#fff",
                          fontSize: "0.85rem",
                          textAlign: "center",
                        }}
                      />
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>m</span>
                    </div>

                    <button
                      onClick={() => toggleSample(item.product.id)}
                      style={{
                        background: item.sampleOnly ? "rgba(197, 155, 39, 0.2)" : "transparent",
                        border: item.sampleOnly ? "1px solid var(--color-gold)" : "1px solid var(--border-subtle)",
                        borderRadius: "4px",
                        padding: "0.2rem 0.5rem",
                        fontSize: "0.72rem",
                        color: item.sampleOnly ? "var(--color-gold-light)" : "var(--text-secondary)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      {item.sampleOnly && <Check size={12} />}
                      Échantillon gratuit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.2rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              <span>Références à chiffrer :</span>
              <strong style={{ color: "var(--text-primary)" }}>{items.length}</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "var(--color-gold-light)", background: "rgba(197, 155, 39, 0.1)", padding: "0.5rem 0.8rem", borderRadius: "var(--radius-sm)" }}>
              <Sparkles size={14} style={{ flexShrink: 0 }} />
              <span>Chiffrage sur-mesure dégressif selon volume & conditions de livraison B2B.</span>
            </div>

            <Link
              href="/devis"
              onClick={() => setIsDrawerOpen(false)}
              className="btn btn-primary"
              style={{ width: "100%", textAlign: "center", padding: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            >
              <span>Finaliser ma Demande</span>
              <ArrowRight size={17} />
            </Link>

            <button
              onClick={clearCart}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "0.78rem",
                cursor: "pointer",
                textAlign: "center",
                padding: "0.2rem",
              }}
            >
              Vider le panier de devis
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
