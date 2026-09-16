"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { CraftNavbar } from "@/components/CraftNavbar";
import {
  FileText,
  Trash2,
  CheckCircle,
  Clock,
  ArrowRight,
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
    projectType: "Industrie & Confection Textile",
    deadline: "Sous 24h à 48h",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successQuoteRef, setSuccessQuoteRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage("Veuillez sélectionner au moins un fil ou produit dans le catalogue avant de demander un devis.");
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
        setSuccessQuoteRef(data.referenceNumber || `TF-${new Date().getFullYear()}-VAL`);
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
      <div style={{ paddingTop: "6.5rem", paddingBottom: "8rem", minHeight: "100vh", backgroundColor: "var(--bg-page)" }}>
        <CraftNavbar />
        <div className="container" style={{ maxWidth: "720px", textAlign: "center", marginTop: "2rem" }}>
          <div
            className="card"
            style={{
              padding: "3.5rem 2.5rem",
              borderRadius: "14px",
              border: "1.5px solid #e2e8f0",
              boxShadow: "0 12px 35px rgba(15, 43, 92, 0.08)",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                background: "#f0fdf4",
                color: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                border: "1px solid #bbf7d0",
              }}
            >
              <CheckCircle size={38} />
            </div>

            <span className="badge" style={{ background: "#0f2b5c", color: "#ffffff", marginBottom: "1rem" }}>
              Demande Enregistrée
            </span>

            <h1 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "0.8rem", color: "#0f172a" }}>
              Merci pour votre confiance !
            </h1>

            <p style={{ color: "#475569", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "2rem" }}>
              Votre demande de cotation B2B a été transmise à notre service commercial Toufiltex avec la référence :
            </p>

            <div
              style={{
                background: "rgba(15, 43, 92, 0.06)",
                border: "1.5px solid #0f2b5c",
                borderRadius: "8px",
                padding: "0.85rem 2rem",
                display: "inline-block",
                marginBottom: "2rem",
              }}
            >
              <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f2b5c", letterSpacing: "0.08em" }}>
                {successQuoteRef}
              </span>
            </div>

            <div
              style={{
                background: "#f8fafc",
                borderRadius: "10px",
                padding: "1.4rem",
                textAlign: "left",
                marginBottom: "2.5rem",
                fontSize: "0.9rem",
                color: "#475569",
                lineHeight: 1.65,
                border: "1px solid #e2e8f0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#0f2b5c", fontWeight: 700, marginBottom: "0.5rem" }}>
                <Clock size={18} /> Prochaines étapes :
              </div>
              <ul style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <li>Notre équipe commerciale à Tlemcen étudie vos volumes et spécifications.</li>
                <li>Votre offre de prix pro adaptée vous sera transmise sous <strong>24 heures ouvrées</strong>.</li>
                <li>Pour les demandes d&apos;échantillons, l&apos;expédition physique est déclenchée sous 48h sur toute l&apos;Algérie.</li>
              </ul>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/catalogue" className="btn btn-primary">
                <span>Consulter d&apos;autres fils</span>
                <ArrowRight size={16} />
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
    <div style={{ paddingTop: "6.5rem", paddingBottom: "6rem", minHeight: "100vh", backgroundColor: "var(--bg-page)" }}>
      <CraftNavbar />
      <div className="container" style={{ marginTop: "1rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <span className="card-badge" style={{ position: "static", display: "inline-block", marginBottom: "0.6rem" }}>
            DEVIS EXPRESS B2B & ÉCHANTILLONNAGE
          </span>
          <h1 style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", fontWeight: 800, color: "var(--text-primary)" }}>
            Finaliser votre Demande de Cotation
          </h1>
          <p style={{ color: "var(--text-secondary)", maxWidth: "620px", margin: "0.5rem auto 0", fontSize: "0.95rem" }}>
            Vérifiez vos références sélectionnées et renseignez vos coordonnées professionnelles pour recevoir votre tarification directe d&apos;usine sous 24h.
          </p>
        </div>

        {errorMessage && (
          <div
            style={{
              padding: "1rem 1.5rem",
              background: "#fee2e2",
              border: "1px solid #f87171",
              borderRadius: "8px",
              color: "#b91c1c",
              marginBottom: "2rem",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            {errorMessage}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
          {/* Left Col: Cart items */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
                <FileText size={20} color="#0f2b5c" />
                <span>Références sélectionnées ({items.length})</span>
              </h2>

              <Link
                href="/catalogue"
                className="btn btn-secondary btn-sm"
                style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
              >
                <Plus size={14} /> Ajouter d&apos;autres fils
              </Link>
            </div>

            {items.length === 0 ? (
              <div className="card" style={{ padding: "3.5rem 2rem", textAlign: "center" }}>
                <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  Aucun fil sélectionné dans votre panier de cotation
                </p>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                  Sélectionnez les matières et références qui vous intéressent dans notre catalogue Toufiltex.
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
                    className="card"
                    style={{
                      padding: "1.2rem",
                      display: "flex",
                      gap: "1.2rem",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ position: "relative", width: "80px", height: "80px", borderRadius: "8px", overflow: "hidden", flexShrink: 0, border: "1px solid #e2e8f0" }}>
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
                          <span style={{ fontSize: "0.78rem", color: "#0f2b5c", fontWeight: 700 }}>
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
                          title="Supprimer la référence"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.8rem", flexWrap: "wrap", gap: "0.6rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Quantité estimée :</span>
                          <input
                            type="number"
                            min="1"
                            value={item.quantityMeters}
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                            className="input"
                            style={{ width: "70px", padding: "0.3rem 0.5rem", textAlign: "center", fontSize: "0.9rem" }}
                          />
                          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>kg / bobines</span>
                        </div>

                        <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: item.sampleOnly ? "#0f2b5c" : "var(--text-secondary)", cursor: "pointer", fontWeight: item.sampleOnly ? 700 : 500 }}>
                          <input
                            type="checkbox"
                            checked={item.sampleOnly}
                            onChange={() => toggleSample(item.product.id)}
                            style={{ accentColor: "#0f2b5c" }}
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
            className="card"
            style={{
              padding: "2.2rem",
              borderRadius: "12px",
              boxShadow: "0 6px 24px rgba(15, 43, 92, 0.05)",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.3rem", color: "var(--text-primary)" }}>
              Informations Entreprise & Atelier
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.6rem" }}>
              Tarification dégressive d&apos;importation directe selon les volumes et la régularité des commandes.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                  Raison Sociale / Nom de l&apos;atelier *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: SARL Confection Moderne, Atelier de Tissage..."
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                    Nom du Contact *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: M. Said"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="input"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+213 Ex: 05 61 21 94 66"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                  Email Professionnel
                </label>
                <input
                  type="email"
                  placeholder="contact@societe.dz"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                    Secteur d&apos;activité
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="select"
                  >
                    <option value="Industrie & Confection Textile">Industrie & Confection Textile</option>
                    <option value="Atelier de Couture & Prêt-à-porter">Atelier de Couture & Prêt-à-porter</option>
                    <option value="Tissage & Tricotage">Tissage & Tricotage</option>
                    <option value="Tapisserie & Ameublement">Tapisserie & Ameublement</option>
                    <option value="Distribution & Commerce de gros">Distribution & Commerce de gros</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                    Délai souhaité
                  </label>
                  <select
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="select"
                  >
                    <option value="Urgent (< 48h)">Urgent (&lt; 48h)</option>
                    <option value="Sous 1 à 2 semaines">Sous 1 à 2 semaines</option>
                    <option value="Approvisionnement régulier mensuel">Approvisionnement régulier mensuel</option>
                    <option value="Échantillonnage préliminaire">Échantillonnage préliminaire</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                  Spécifications techniques ou wilaya de livraison
                </label>
                <textarea
                  rows={3}
                  placeholder="Précisez votre wilaya, le titrage précis, coloris Pantone, cadence d'approvisionnement..."
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
                  padding: "0.95rem",
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  marginTop: "0.4rem",
                  opacity: items.length === 0 ? 0.6 : 1,
                  cursor: items.length === 0 ? "not-allowed" : "pointer",
                }}
              >
                <Send size={17} />
                <span>{isSubmitting ? "Envoi en cours..." : "Transmettre ma Demande de Cotation"}</span>
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "var(--text-muted)", justifyContent: "center" }}>
                <ShieldCheck size={15} color="#0f2b5c" />
                <span>Service commercial direct basé à Tlemcen • Cotation gratuite sans intermédiaire</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
