"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Demande d'information catalogue",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "4rem 0 7rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem" }}>
          <span className="badge badge-gold" style={{ marginBottom: "0.8rem" }}>
            Service Commercial B2B
          </span>
          <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, color: "var(--text-primary)" }}>
            Prendre Contact avec nos Équipes
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginTop: "0.6rem" }}>
            Pour toute demande d&apos;échantillonnage spécifique, visite de notre manufacture ou étude de projet personnalisé, nos conseillers vous répondent rapidement.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3.5rem" }}>
          {/* Coordinates */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.2rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(197, 155, 39, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold)" }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Manufacture & Siège</h3>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Complexe Industriel</span>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                TOUFILTEX S.A.<br />
                Zone Industrielle Textile BP 42<br />
                5070 Ksar Hellal / Monastir - Tunisie
              </p>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.2rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(197, 155, 39, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold)" }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Téléphones Directs</h3>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Du lundi au vendredi 8h - 18h</span>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Service Commercial : +216 73 000 111<br />
                Bureau de liaison Europe : +33 1 89 00 00 00<br />
                WhatsApp Professionnel : +216 98 000 222
              </p>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.2rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(197, 155, 39, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-gold)" }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Horaires & Disponibilité</h3>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Temps de réponse garanti</span>
                </div>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Emails & Devis : <strong>Réponse garantie sous 24h ouvrées</strong><br />
                Expédition d&apos;échantillons : <strong>Envoi sous 48h</strong>
              </p>
            </div>
          </div>

          {/* Form */}
          <div
            className="glass"
            style={{
              padding: "2.5rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-gold)",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.15)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.8rem" }}>Message envoyé avec succès</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.8rem" }}>
                  Merci pour votre prise de contact. Un ingénieur commercial Toufiltex prendra contact avec vous dans la journée.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn btn-secondary btn-sm">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                  Formulaire de Contact & Renseignements
                </h3>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.8rem" }}>
                  Vous avez une question spécifique sur nos tissus ou nos capacités de production ? Remplissez ce formulaire :
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                      Votre Nom & Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Sarah Martin"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                        Email Professionnel *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="s.martin@maison.fr"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        placeholder="+33 1 00 00 00 00"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                      Objet de la demande
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="select"
                    >
                      <option value="Demande d'information catalogue">Demande d&apos;information catalogue</option>
                      <option value="Développement exclusif sur cahier des charges">Développement exclusif sur cahier des charges</option>
                      <option value="Demande de visite manufacture">Demande de visite manufacture</option>
                      <option value="Partenariat ou distribution">Partenariat ou distribution</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                      Votre Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Décrivez votre besoin, les types de tissus ou le volume envisagé..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="textarea"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: "0.95rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
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
