"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/data";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Package,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface AdminQuote {
  id: string;
  referenceNumber: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  projectType: string;
  deadline: string;
  notes: string;
  status: "PENDING" | "IN_REVIEW" | "COMPLETED";
  createdAt: string;
  items: {
    productName: string;
    quantityMeters: number;
    sampleOnly: boolean;
  }[];
}

const INITIAL_QUOTES: AdminQuote[] = [
  {
    id: "q-1",
    referenceNumber: "TF-2026-4821",
    companyName: "Maison Saint-Germain Décoration",
    contactName: "Claire de Villeneuve",
    email: "c.villeneuve@saintgermain-deco.fr",
    phone: "+33 6 12 34 56 78",
    projectType: "Ameublement & Décoration",
    deadline: "1 mois",
    notes: "Rénovation de 24 suites d'hôtel. Besoin d'échantillons grands formats A3 pour validation client.",
    status: "PENDING",
    createdAt: "2026-09-14T10:30:00Z",
    items: [
      { productName: "Jacquard Vénitien Relief Arabesque", quantityMeters: 180, sampleOnly: false },
      { productName: "Toile de Lin Normand Pur Lavé", quantityMeters: 240, sampleOnly: false },
    ],
  },
  {
    id: "q-2",
    referenceNumber: "TF-2026-3914",
    companyName: "Manufacture & Confection Méditerranée",
    contactName: "Karim Ben Amor",
    email: "k.benamor@mcm-textile.com",
    phone: "+216 98 765 432",
    projectType: "Mode & Prêt-à-porter",
    deadline: "Urgent (< 2 semaines)",
    notes: "Commande pilote de jersey bio pour notre nouvelle collection éco-conçue automne-hiver.",
    status: "IN_REVIEW",
    createdAt: "2026-09-12T14:15:00Z",
    items: [
      { productName: "Jersey Coton Bio Peigné & Élasthanne", quantityMeters: 500, sampleOnly: false },
      { productName: "Molleton Coton Gratté Chaud 320g", quantityMeters: 350, sampleOnly: false },
    ],
  },
  {
    id: "q-3",
    referenceNumber: "TF-2026-2109",
    companyName: "Grand Palace & Spa Resort",
    contactName: "Marc Fontaine",
    email: "achats@grandpalace.ch",
    phone: "+41 22 700 80 90",
    projectType: "Hôtellerie & Restauration",
    deadline: "2 à 3 mois",
    notes: "Renouvellement complet du linge de lit de prestige.",
    status: "COMPLETED",
    createdAt: "2026-09-08T09:00:00Z",
    items: [
      { productName: "Satin de Coton d'Égypte 120 Fil", quantityMeters: 1200, sampleOnly: false },
    ],
  },
];

export default function AdminDashboardPage() {
  const [quotes, setQuotes] = useState<AdminQuote[]>(INITIAL_QUOTES);
  const [activeTab, setActiveTab] = useState<"quotes" | "catalog">("quotes");
  const [search, setSearch] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<AdminQuote | null>(null);

  // Attempt to fetch any freshly submitted quotes from local API
  useEffect(() => {
    async function loadQuotes() {
      try {
        const res = await fetch("/api/devis");
        if (res.ok) {
          const data = await res.json();
          if (data.quotes && data.quotes.length > 0) {
            setQuotes((prev) => {
              const combined = [...data.quotes, ...prev];
              // deduplicate by referenceNumber
              const seen = new Set();
              return combined.filter((q) => {
                if (seen.has(q.referenceNumber)) return false;
                seen.add(q.referenceNumber);
                return true;
              });
            });
          }
        }
      } catch (e) {
        // Fallback to initial mock quotes
      }
    }
    loadQuotes();
  }, []);

  const updateStatus = (id: string, newStatus: "PENDING" | "IN_REVIEW" | "COMPLETED") => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
    if (selectedQuote && selectedQuote.id === id) {
      setSelectedQuote((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const pendingCount = quotes.filter((q) => q.status === "PENDING").length;
  const inReviewCount = quotes.filter((q) => q.status === "IN_REVIEW").length;
  const completedCount = quotes.filter((q) => q.status === "COMPLETED").length;

  const filteredQuotes = quotes.filter(
    (q) =>
      q.companyName.toLowerCase().includes(search.toLowerCase()) ||
      q.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
      q.contactName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "3rem 0 6rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: "0.5rem" }}>
              Back-Office Commercial
            </span>
            <h1 style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--text-primary)" }}>
              Tableau de Bord & Suivi des Devis
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Gestion des demandes de cotation B2B, échantillons et catalogue de matières Toufiltex.
            </p>
          </div>

          <Link href="/catalogue" className="btn btn-secondary btn-sm" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <ExternalLink size={14} /> Voir le site public
          </Link>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Total Devis</span>
              <FileText size={18} color="var(--color-gold)" />
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--text-primary)", margin: "0.5rem 0 0.2rem", fontFamily: "var(--font-serif)" }}>
              {quotes.length}
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Toutes demandes confondues</span>
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>À Traiter (Nouveau)</span>
              <AlertCircle size={18} color="#f59e0b" />
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#f59e0b", margin: "0.5rem 0 0.2rem", fontFamily: "var(--font-serif)" }}>
              {pendingCount}
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Délai &lt; 24h</span>
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>En Cours d&apos;Étude</span>
              <Clock size={18} color="#3b82f6" />
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#3b82f6", margin: "0.5rem 0 0.2rem", fontFamily: "var(--font-serif)" }}>
              {inReviewCount}
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Chiffrage et stock en validation</span>
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Références Catalogue</span>
              <Layers size={18} color="var(--color-gold)" />
            </div>
            <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--color-gold)", margin: "0.5rem 0 0.2rem", fontFamily: "var(--font-serif)" }}>
              {PRODUCTS.length}
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Tissus et fils actifs</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "2rem" }}>
          <button
            onClick={() => setActiveTab("quotes")}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: activeTab === "quotes" ? "2px solid var(--color-gold)" : "2px solid transparent",
              color: activeTab === "quotes" ? "var(--color-gold-light)" : "var(--text-secondary)",
              fontSize: "1rem",
              fontWeight: activeTab === "quotes" ? 700 : 500,
              padding: "0.8rem 1.2rem",
              cursor: "pointer",
            }}
          >
            Demandes de Devis ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab("catalog")}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: activeTab === "catalog" ? "2px solid var(--color-gold)" : "2px solid transparent",
              color: activeTab === "catalog" ? "var(--color-gold-light)" : "var(--text-secondary)",
              fontSize: "1rem",
              fontWeight: activeTab === "catalog" ? 700 : 500,
              padding: "0.8rem 1.2rem",
              cursor: "pointer",
            }}
          >
            Catalogue Actif ({PRODUCTS.length})
          </button>
        </div>

        {/* TAB 1: QUOTES */}
        {activeTab === "quotes" && (
          <div>
            {/* Search filter */}
            <div style={{ marginBottom: "1.5rem", maxWidth: "450px" }}>
              <div style={{ position: "relative" }}>
                <Search size={17} color="var(--text-muted)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
                <input
                  type="text"
                  placeholder="Rechercher par société, référence ou contact..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input"
                  style={{ paddingLeft: "2.5rem", fontSize: "0.9rem" }}
                />
              </div>
            </div>

            {/* Table */}
            <div className="glass" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ background: "rgba(255, 255, 255, 0.03)", borderBottom: "1px solid var(--border-subtle)", color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>
                    <th style={{ padding: "1rem 1.2rem" }}>Réf. Devis</th>
                    <th style={{ padding: "1rem 1.2rem" }}>Société & Contact</th>
                    <th style={{ padding: "1rem 1.2rem" }}>Projet & Délais</th>
                    <th style={{ padding: "1rem 1.2rem" }}>Statut</th>
                    <th style={{ padding: "1rem 1.2rem" }}>Détails</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.map((q) => (
                    <tr
                      key={q.id}
                      style={{
                        borderBottom: "1px solid var(--border-subtle)",
                        transition: "background 0.2s ease",
                      }}
                    >
                      <td style={{ padding: "1.2rem", fontWeight: 700, color: "var(--color-gold-light)" }}>
                        {q.referenceNumber}
                      </td>
                      <td style={{ padding: "1.2rem" }}>
                        <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{q.companyName}</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          {q.contactName} • {q.email} • {q.phone}
                        </div>
                      </td>
                      <td style={{ padding: "1.2rem" }}>
                        <span style={{ fontSize: "0.85rem", color: "var(--text-primary)", display: "block" }}>
                          {q.projectType}
                        </span>
                        <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                          Délai : {q.deadline}
                        </span>
                      </td>
                      <td style={{ padding: "1.2rem" }}>
                        <select
                          value={q.status}
                          onChange={(e) => updateStatus(q.id, e.target.value as any)}
                          style={{
                            background:
                              q.status === "PENDING"
                                ? "rgba(245, 158, 11, 0.15)"
                                : q.status === "IN_REVIEW"
                                ? "rgba(59, 130, 246, 0.15)"
                                : "rgba(16, 185, 129, 0.15)",
                            color:
                              q.status === "PENDING"
                                ? "#fbbf24"
                                : q.status === "IN_REVIEW"
                                ? "#60a5fa"
                                : "#34d399",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: "var(--radius-sm)",
                            padding: "0.35rem 0.6rem",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          <option value="PENDING">Nouveau / En attente</option>
                          <option value="IN_REVIEW">En cours d&apos;étude</option>
                          <option value="COMPLETED">Chiffré & Transmis</option>
                        </select>
                      </td>
                      <td style={{ padding: "1.2rem" }}>
                        <button
                          onClick={() => setSelectedQuote(q)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "0.35rem 0.8rem", fontSize: "0.8rem" }}
                        >
                          Consulter
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal / Panel for viewing quote detail */}
            {selectedQuote && (
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.75)",
                  backdropFilter: "blur(6px)",
                  zIndex: 1000,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "1rem",
                }}
                onClick={() => setSelectedQuote(null)}
              >
                <div
                  className="glass"
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border-gold)",
                    padding: "2.5rem",
                    background: "#0f172a",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                    <div>
                      <span className="badge badge-gold" style={{ marginBottom: "0.4rem" }}>
                        Détails Devis
                      </span>
                      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)" }}>
                        {selectedQuote.referenceNumber}
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedQuote(null)}
                      style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "1.2rem" }}
                    >
                      ✕
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
                    <div>
                      <strong style={{ color: "var(--text-primary)" }}>Société :</strong> {selectedQuote.companyName}
                    </div>
                    <div>
                      <strong style={{ color: "var(--text-primary)" }}>Contact :</strong> {selectedQuote.contactName} ({selectedQuote.email} | {selectedQuote.phone})
                    </div>
                    <div>
                      <strong style={{ color: "var(--text-primary)" }}>Type de projet :</strong> {selectedQuote.projectType} • Délai : {selectedQuote.deadline}
                    </div>
                    {selectedQuote.notes && (
                      <div style={{ background: "rgba(255,255,255,0.03)", padding: "0.8rem", borderRadius: "var(--radius-sm)" }}>
                        <strong style={{ color: "var(--text-primary)" }}>Remarques :</strong> {selectedQuote.notes}
                      </div>
                    )}
                  </div>

                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.8rem" }}>
                    Tissus & Volumes demandés :
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
                    {selectedQuote.items?.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          padding: "0.8rem 1rem",
                          borderRadius: "var(--radius-sm)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{item.productName}</span>
                        <span style={{ color: "var(--color-gold-light)", fontWeight: 700 }}>
                          {item.sampleOnly ? "Échantillon gratuit" : `${item.quantityMeters} mètres`}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                    <button onClick={() => setSelectedQuote(null)} className="btn btn-secondary btn-sm">
                      Fermer
                    </button>
                    <a
                      href={`mailto:${selectedQuote.email}?subject=Chiffrage Devis Toufiltex ${selectedQuote.referenceNumber}`}
                      className="btn btn-primary btn-sm"
                    >
                      Répondre au client par email
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CATALOG */}
        {activeTab === "catalog" && (
          <div className="glass" style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "rgba(255, 255, 255, 0.03)", borderBottom: "1px solid var(--border-subtle)", color: "var(--text-muted)", fontSize: "0.8rem", textTransform: "uppercase" }}>
                  <th style={{ padding: "1rem 1.2rem" }}>Réf.</th>
                  <th style={{ padding: "1rem 1.2rem" }}>Nom du Tissu</th>
                  <th style={{ padding: "1rem 1.2rem" }}>Composition</th>
                  <th style={{ padding: "1rem 1.2rem" }}>Grammage</th>
                  <th style={{ padding: "1rem 1.2rem" }}>Laize</th>
                  <th style={{ padding: "1rem 1.2rem" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "1.2rem", fontWeight: 700, color: "var(--color-gold-light)" }}>{p.reference}</td>
                    <td style={{ padding: "1.2rem", fontWeight: 600, color: "var(--text-primary)" }}>{p.name}</td>
                    <td style={{ padding: "1.2rem", color: "var(--text-secondary)", fontSize: "0.85rem" }}>{p.composition}</td>
                    <td style={{ padding: "1.2rem", color: "var(--text-secondary)" }}>{p.grammage} g/m²</td>
                    <td style={{ padding: "1.2rem", color: "var(--text-secondary)" }}>{p.width > 0 ? `${p.width} cm` : "Bobine"}</td>
                    <td style={{ padding: "1.2rem" }}>
                      <Link href={`/catalogue/${p.id}`} className="btn btn-secondary btn-sm" style={{ padding: "0.35rem 0.8rem", fontSize: "0.78rem" }}>
                        Voir Fiche
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
