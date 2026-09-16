"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import {
  FileText,
  Trash2,
  CheckCircle,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Send,
  Plus,
} from "lucide-react";

export default function DevisPage() {
  const { items, removeItem, updateQuantity, toggleSample, clearCart } = useCart();

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    projectType: "Ameublement & Décoration",
    deadline: "1 mois",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successQuoteRef, setSuccessQuoteRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage("Veuillez sélectionner au moins un tissu ou fil dans le catalogue avant de demander un devis.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          quantityMeters: i.quantityMeters,
          sampleOnly: i.sampleOnly,
          selectedColor: i.selectedColor,
        })),
      };

      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessQuoteRef(data.referenceNumber || "TF-2026-VAL");
        clearCart();
      } else {
        setErrorMessage(data.error || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Impossible de joindre le serveur. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successQuoteRef) {
    return (
      <div style={{ padding: "5rem 0 8rem" }}>
        <div className="container" style={{ maxWidth: "700px", textAlign: "center" }}>
          <div
            className="glass"
            style={{
              padding: "3.5rem 2.5rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-gold)",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <CheckCircle size={38} />
            </div>

            <span className="badge badge-gold" style={{ marginBottom: "1rem" }}>
              Demande Enregistrée
            </span>

            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.8rem", color: "var(--text-primary)" }}>
              Merci pour votre confiance !
            </h1>

            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "2rem" }}>
              Votre demande de chiffrage a été transmise à notre département commercial avec le numéro de référence :
            </p>

            <div
              style={{
                background: "rgba(197, 155, 39, 0.15)",
                border: "1px dashed var(--color-gold)",
                borderRadius: "var(--radius-md)",
                padding: "1rem",
                display: "inline-block",
                marginBottom: "2rem",
              }}
            >
              <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--color-gold-light)", letterSpacing: "0.08em" }}>
                {successQuoteRef}
              </span>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "var(--radius-md)",
                padding: "1.2rem",
                textAlign: "left",
                marginBottom: "2.5rem",
                fontSize: "0.88rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-gold-light)", fontWeight: 600, marginBottom: "0.4rem" }}>
                <Clock size={16} /> Prochaines étapes :
              </div>
              <ul style={{ paddingLeft: "1.2rem" }}>
                <li>Un responsable de compte étudie vos métrages et les disponibilités de stock.</li>
                <li>Votre offre de prix B2B personnalisée vous sera envoyée par email sous <strong>24 heures ouvrées</strong>.</li>
                <li>Si vous avez sélectionné des échantillons, ils seront expédiés sans frais à l&apos;adresse communiquée.</li>
              </ul>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/catalogue" className="btn btn-primary">
                <span>Continuer la navigation</span>
              </Link>
              <Link href="/" className="btn btn-secondary">
                <span>Retour à l&apos;accueil</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "3.5rem 0 6rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "3rem", textAlign: "center" }}>
          <span className="badge badge-gold" style={{ marginBottom: "0.6rem" }}>
            Devis B2B & Échantillonnage
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "var(--text-primary)" }}>
            Finaliser votre Demande de Devis
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0.5rem auto 0", fontSize: "1rem" }}>
            Vérifiez vos références sélectionnées et renseignez les coordonnées de votre société pour recevoir votre chiffrage pro.
          </p>
        </div>

        {errorMessage && (
          <div
            style={{
              padding: "1rem 1.5rem",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "var(--radius-md)",
              color: "#fca5a5",
              marginBottom: "2rem",
              fontSize: "0.9rem",
            }}
          >
            {errorMessage}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "3rem", alignItems: "start" }}>
          {/* Left Col: Cart items */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FileText size={20} color="var(--color-gold)" />
                <span>Références sélectionnées ({items.length})</span>
              </h2>

              <Link
                href="/catalogue"
                className="btn btn-secondary btn-sm"
                style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
              >
                <Plus size={14} /> Ajouter d&apos;autres tissus
              </Link>
            </div>

            {items.length === 0 ? (
              <div className="card" style={{ padding: "3.5rem 2rem", textAlign: "center", color: "var(--text-muted)" }}>
                <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  Aucun tissu sélectionné dans votre panier de devis
                </p>
                <p style={{ fontSize: "0.88rem", marginBottom: "1.5rem" }}>
                  Sélectionnez les matières qui vous intéressent dans notre catalogue textile.
                </p>
                <Link href="/catalogue" className="btn btn-primary btn-sm">
                  Parcourir le catalogue
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="glass"
                    style={{
                      padding: "1.2rem",
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      gap: "1.2rem",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ position: "relative", width: "80px", height: "80px", borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                            {item.product.name}
                          </h4>
                          <span style={{ fontSize: "0.78rem", color: "var(--color-gold-light)", fontWeight: 600 }}>
                            Réf: {item.product.reference} • {item.product.composition}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--text-muted)",
                            cursor: "pointer",
                            padding: "0.3rem",
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.8rem", flexWrap: "wrap", gap: "0.6rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Métrage souhaité :</span>
                          <input
                            type="number"
                            min="1"
                            value={item.quantityMeters}
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                            className="input"
                            style={{ width: "70px", padding: "0.3rem 0.5rem", textAlign: "center", fontSize: "0.9rem" }}
                          />
                          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>m</span>
                        </div>

                        <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: item.sampleOnly ? "var(--color-gold-light)" : "var(--text-secondary)", cursor: "pointer" }}>
                          <input
                            type="checkbox"
                            checked={item.sampleOnly}
                            onChange={() => toggleSample(item.product.id)}
                            style={{ accentColor: "var(--color-gold)" }}
                          />
                          <span>Échantillon seulement</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Col: B2B Quote Form */}
          <div
            className="glass"
            style={{
              padding: "2.2rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-gold)",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.4rem", color: "var(--text-primary)" }}>
              Informations Entreprise & Projet
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.8rem" }}>
              Tous nos tarifs sont étudiés en fonction des volumes et des conditions de livraison.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  Raison Sociale / Société *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Atelier Haute Couture Paris, Hôtel Majestic..."
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                    Nom du Contact *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jean Dupont"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                    Téléphone direct *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+33 6 00 00 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  Email Professionnel *
                </label>
                <input
                  type="email"
                  required
                  placeholder="achat@entreprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                    Secteur d&apos;activité
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="select"
                  >
                    <option value="Ameublement & Décoration">Ameublement & Décoration</option>
                    <option value="Hôtellerie & Restauration">Hôtellerie & Restauration</option>
                    <option value="Mode & Prêt-à-porter">Mode & Prêt-à-porter</option>
                    <option value="Collectivités & Santé">Collectivités & Santé</option>
                    <option value="Industrie & Négoce">Industrie & Négoce</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                    Délai souhaité
                  </label>
                  <select
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="select"
                  >
                    <option value="Urgent (< 2 semaines)">Urgent (&lt; 2 semaines)</option>
                    <option value="1 mois">1 mois</option>
                    <option value="2 à 3 mois">2 à 3 mois</option>
                    <option value="Projet en cours d'étude">Projet en cours d&apos;étude</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  Remarques ou spécifications particulières
                </label>
                <textarea
                  rows={3}
                  placeholder="Précisez ici vos contraintes de teinte Pantone, adresse de livraison d'échantillons, certificats de conformité..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="btn btn-primary"
                style={{
                  padding: "1rem",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  marginTop: "0.5rem",
                  opacity: items.length === 0 ? 0.6 : 1,
                }}
              >
                <Send size={18} />
                <span>{isSubmitting ? "Envoi en cours..." : "Transmettre ma Demande de Devis"}</span>
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "var(--text-muted)", justifyContent: "center" }}>
                <ShieldCheck size={14} color="var(--color-gold)" />
                <span>Données protégées. Devis gratuit et sans engagement d&apos;achat.</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
