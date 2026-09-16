"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";
import { CraftNavbar } from "@/components/CraftNavbar";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Demande de cotation ou d'échantillons",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: "6.5rem", paddingBottom: "7rem", minHeight: "100vh", backgroundColor: "var(--bg-page)" }}>
      <CraftNavbar />
      <div className="container" style={{ marginTop: "1rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3rem" }}>
          <span className="card-badge" style={{ position: "static", display: "inline-block", marginBottom: "0.6rem" }}>
            SERVICE COMMERCIAL & LOGISTIQUE B2B
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "var(--text-primary)" }}>
            Contacter Toufiltex Algérie
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", marginTop: "0.6rem" }}>
            Pour toute demande d&apos;approvisionnement industriel, cotation de gros, expédition d&apos;échantillons physiques ou visite à Tlemcen, nos spécialistes sont à votre écoute directe.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
          {/* Coordinates */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="card" style={{ padding: "1.8rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(15, 43, 92, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f2b5c" }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>Siège & Plateforme Logistique</h3>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Stock central & arrivages</span>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                <strong>TOUFILTEX IMPORT</strong><br />
                Tlemcen, Algérie<br />
                Distribution et livraison directe vers les 58 wilayas
              </p>
            </div>

            <div className="card" style={{ padding: "1.8rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(15, 43, 92, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f2b5c" }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>Ligne Commerciale & WhatsApp</h3>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Du Samedi au Jeudi : 8h - 18h</span>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Téléphone & WhatsApp : <strong>+213 561 21 94 66</strong><br />
                Courriel commercial : <strong>salaheddinesaid101@gmail.com</strong>
              </p>
            </div>

            <div className="card" style={{ padding: "1.8rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "rgba(15, 43, 92, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0f2b5c" }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>Réactivité & Délais</h3>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Engagement qualité pro</span>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Cotation & Devis : <strong>Sous 24h ouvrées</strong><br />
                Expédition d&apos;échantillons : <strong>Envoi sous 48h</strong>
              </p>
            </div>
          </div>

          {/* Form */}
          <div
            className="card"
            style={{
              padding: "2.2rem",
              boxShadow: "0 6px 24px rgba(15, 43, 92, 0.05)",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#f0fdf4", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", border: "1px solid #bbf7d0" }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.6rem", color: "var(--text-primary)" }}>Message transmis avec succès</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.8rem" }}>
                  Merci pour votre message. Notre conseiller commercial à Tlemcen prendra contact avec vous dans les plus brefs délais.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.4rem", color: "var(--text-primary)" }}>
                  Formulaire de Contact Direct
                </h3>
                <p style={{ fontSize: "0.86rem", color: "var(--text-secondary)", marginBottom: "1.6rem" }}>
                  Renseignez vos coordonnées pour recevoir des fiches techniques ou être rappelé par nos technico-commerciaux :
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                      Votre Nom & Entreprise *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: M. Said — Atelier Textile"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                        Email Professionnel
                      </label>
                      <input
                        type="email"
                        placeholder="contact@societe.dz"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                      Objet de votre prise de contact
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="select"
                    >
                      <option value="Demande de cotation ou d'échantillons">Demande de cotation ou d&apos;échantillons</option>
                      <option value="Approvisionnement régulier de fils industriels">Approvisionnement régulier de fils industriels</option>
                      <option value="Demande de spécification technique sur-mesure">Demande de spécification technique sur-mesure</option>
                      <option value="Partenariat commercial ou distribution">Partenariat commercial ou distribution</option>
                      <option value="Autre demande">Autre demande</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                      Votre Message ou Spécifications *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Précisez les types de fils recherchés (polyester, confection...), les titrages, la wilaya de livraison..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: "0.95rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.4rem" }}
                  >
                    <Send size={17} />
                    <span>Envoyer mon Message</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
