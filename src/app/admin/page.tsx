"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product, Category } from "@/lib/types";
import {
  FileText,
  Package,
  Layers,
  Search,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  X,
  ArrowLeft,
  Image as ImageIcon,
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

const PRESET_IMAGES = [
  { label: "Bobines Fil Industriel (Embouts verts)", url: "/images/bobines-fil-industriel.jpg" },
  { label: "Cônes Fil Polyester (Embouts rouges)", url: "/images/fils-polyester.jpg" },
  { label: "Fils de Confection (Embouts jaunes)", url: "/images/fils-confection.jpg" },
  { label: "Cônes & Ciseaux Atelier", url: "/images/fils-industriels-cones.jpg" },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"quotes" | "products" | "categories">("products");
  
  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [quotes, setQuotes] = useState<AdminQuote[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & filter states
  const [searchProduct, setSearchProduct] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [searchQuote, setSearchQuote] = useState("");

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<AdminQuote | null>(null);

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "",
    reference: "",
    categoryId: "",
    composition: "",
    grammage: 150,
    width: 0,
    usage: "Tissage & Confection Industrielle",
    imageUrl: "/images/fils-polyester.jpg",
    description: "",
    inStock: true,
  });

  // Category form state
  const [catForm, setCatForm] = useState({
    name: "",
    description: "",
  });

  // Notification message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      const resProd = await fetch("/api/produits");
      const dataProd = await resProd.json();
      if (dataProd.products) setProducts(dataProd.products);
      if (dataProd.categories) setCategories(dataProd.categories);

      const resQuotes = await fetch("/api/devis");
      const dataQuotes = await resQuotes.json();
      if (dataQuotes.quotes) setQuotes(dataQuotes.quotes);
    } catch (err) {
      console.error("Erreur chargement données admin:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open modal to create or edit product
  const handleOpenProductModal = (prod?: Product) => {
    if (prod) {
      setEditingProduct(prod);
      setProductForm({
        name: prod.name,
        reference: prod.reference,
        categoryId: prod.categoryId,
        composition: prod.composition,
        grammage: prod.grammage || 150,
        width: prod.width || 0,
        usage: prod.usage,
        imageUrl: prod.imageUrl,
        description: prod.description,
        inStock: prod.inStock,
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: "",
        reference: `TF-REF-${Math.floor(100 + Math.random() * 900)}`,
        categoryId: categories[0]?.id || "cat-1",
        composition: "100% Polyester",
        grammage: 150,
        width: 0,
        usage: "Tissage & Confection",
        imageUrl: "/images/fils-polyester.jpg",
        description: "Fil textile de haute ténacité pour application industrielle.",
        inStock: true,
      });
    }
    setIsProductModalOpen(true);
  };

  // Submit product create/update
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...productForm,
        action: editingProduct ? "update" : "create",
        id: editingProduct?.id,
      };

      const res = await fetch("/api/produits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(editingProduct ? "Produit modifié avec succès !" : "Nouveau produit ajouté au catalogue !");
        setIsProductModalOpen(false);
        fetchData();
      } else {
        alert("Erreur lors de l'enregistrement du produit.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau.");
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`Confirmez-vous la suppression de "${name}" du catalogue ?`)) return;
    try {
      const res = await fetch(`/api/produits?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Produit supprimé du catalogue.");
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit new category / gamme
  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catForm.name.trim()) return;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(catForm),
      });
      if (res.ok) {
        showToast("Nouvelle gamme créée avec succès !");
        setCatForm({ name: "", description: "" });
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete category / gamme
  const handleDeleteCategory = async (id: string, name: string) => {
    if (!window.confirm(`Supprimer la gamme "${name}" ?`)) return;
    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Gamme supprimée.");
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchProduct.toLowerCase()) ||
      p.reference.toLowerCase().includes(searchProduct.toLowerCase()) ||
      p.composition.toLowerCase().includes(searchProduct.toLowerCase());
    const matchesCat = filterCategory === "all" || p.categoryId === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", color: "#0f172a" }}>
      {/* HEADER ADMIN */}
      <header
        style={{
          background: "#0f2b5c",
          color: "#ffffff",
          padding: "1.2rem 2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <div
            style={{
              border: "2px solid #ffffff",
              padding: "0.25rem 0.8rem",
              borderRadius: "4px",
              fontWeight: 900,
              fontSize: "1.1rem",
              letterSpacing: "0.1em",
            }}
          >
            TOUFILTEX ADMIN
          </div>
          <span style={{ fontSize: "0.85rem", color: "#93c5fd" }}>
            Gestionnaire de Catalogue & Commandes B2B
          </span>
        </div>

        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            color: "#ffffff",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 700,
            padding: "0.45rem 0.9rem",
            borderRadius: "6px",
            background: "rgba(255, 255, 255, 0.12)",
            transition: "all 0.2s ease",
          }}
        >
          <ArrowLeft size={16} />
          <span>Voir le site public</span>
        </Link>
      </header>

      {/* TOAST MESSAGE */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#0f2b5c",
            color: "#ffffff",
            padding: "0.9rem 1.4rem",
            borderRadius: "8px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            zIndex: 9999,
            fontWeight: 700,
            fontSize: "0.9rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <CheckCircle size={18} color="#22c55e" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN CONTENT CONTAINER */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {/* TABS SELECTOR */}
        <div
          style={{
            display: "flex",
            gap: "0.8rem",
            borderBottom: "2px solid #e2e8f0",
            paddingBottom: "0.8rem",
            marginBottom: "2rem",
          }}
        >
          <button
            onClick={() => setActiveTab("products")}
            style={{
              padding: "0.65rem 1.4rem",
              borderRadius: "8px",
              border: "none",
              fontSize: "0.92rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: activeTab === "products" ? "#0f2b5c" : "#ffffff",
              color: activeTab === "products" ? "#ffffff" : "#475569",
              boxShadow: activeTab === "products" ? "0 4px 12px rgba(15, 43, 92, 0.2)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            <Package size={17} />
            <span>Catalogue & Produits ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            style={{
              padding: "0.65rem 1.4rem",
              borderRadius: "8px",
              border: "none",
              fontSize: "0.92rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: activeTab === "categories" ? "#0f2b5c" : "#ffffff",
              color: activeTab === "categories" ? "#ffffff" : "#475569",
              boxShadow: activeTab === "categories" ? "0 4px 12px rgba(15, 43, 92, 0.2)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            <Layers size={17} />
            <span>Gestion des Gammes ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("quotes")}
            style={{
              padding: "0.65rem 1.4rem",
              borderRadius: "8px",
              border: "none",
              fontSize: "0.92rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: activeTab === "quotes" ? "#0f2b5c" : "#ffffff",
              color: activeTab === "quotes" ? "#ffffff" : "#475569",
              boxShadow: activeTab === "quotes" ? "0 4px 12px rgba(15, 43, 92, 0.2)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            <FileText size={17} />
            <span>Devis & Bons de commande ({quotes.length})</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: CATALOGUE & GESTION DES PRODUITS                  */}
        {/* ======================================================== */}
        {activeTab === "products" && (
          <div>
            {/* Top action bar: Search + Filter + Add Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ display: "flex", gap: "1rem", flex: 1, maxWidth: "600px" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Search
                    size={18}
                    color="#94a3b8"
                    style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
                  />
                  <input
                    type="text"
                    placeholder="Rechercher par référence, nom de fil ou matière..."
                    value={searchProduct}
                    onChange={(e) => setSearchProduct(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.65rem 1rem 0.65rem 2.5rem",
                      borderRadius: "8px",
                      border: "1.5px solid #cbd5e1",
                      background: "#ffffff",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  style={{
                    padding: "0.65rem 1rem",
                    borderRadius: "8px",
                    border: "1.5px solid #cbd5e1",
                    background: "#ffffff",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                  }}
                >
                  <option value="all">Toutes les gammes</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => handleOpenProductModal()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.4rem",
                  borderRadius: "8px",
                  background: "#0f2b5c",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(15, 43, 92, 0.25)",
                }}
              >
                <Plus size={18} />
                <span>Ajouter un produit</span>
              </button>
            </div>

            {/* Products Table */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ background: "#f1f5f9", borderBottom: "1.5px solid #e2e8f0", color: "#475569", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    <th style={{ padding: "0.9rem 1.2rem" }}>Aperçu</th>
                    <th style={{ padding: "0.9rem 1.2rem" }}>Réf.</th>
                    <th style={{ padding: "0.9rem 1.2rem" }}>Nom du Fil</th>
                    <th style={{ padding: "0.9rem 1.2rem" }}>Gamme</th>
                    <th style={{ padding: "0.9rem 1.2rem" }}>Composition</th>
                    <th style={{ padding: "0.9rem 1.2rem" }}>Statut</th>
                    <th style={{ padding: "0.9rem 1.2rem", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: "1px solid #f1f5f9",
                        transition: "background 0.15s ease",
                      }}
                    >
                      <td style={{ padding: "0.8rem 1.2rem", width: "64px" }}>
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "6px",
                            overflow: "hidden",
                            background: "#f8fafc",
                            border: "1px solid #e2e8f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                          />
                        </div>
                      </td>
                      <td style={{ padding: "0.8rem 1.2rem", fontWeight: 800, color: "#0f2b5c" }}>
                        {p.reference}
                      </td>
                      <td style={{ padding: "0.8rem 1.2rem", fontWeight: 700, color: "#0f172a" }}>
                        {p.name}
                      </td>
                      <td style={{ padding: "0.8rem 1.2rem", color: "#475569" }}>
                        <span
                          style={{
                            padding: "0.2rem 0.55rem",
                            borderRadius: "4px",
                            background: "#eff6ff",
                            color: "#1e40af",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                          }}
                        >
                          {p.categoryName || "Gamme standard"}
                        </span>
                      </td>
                      <td style={{ padding: "0.8rem 1.2rem", color: "#64748b" }}>
                        {p.composition}
                      </td>
                      <td style={{ padding: "0.8rem 1.2rem" }}>
                        {p.inStock ? (
                          <span style={{ color: "#16a34a", fontWeight: 700, fontSize: "0.78rem" }}>
                            ● En stock
                          </span>
                        ) : (
                          <span style={{ color: "#ea580c", fontWeight: 700, fontSize: "0.78rem" }}>
                            ○ Sur commande
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "0.8rem 1.2rem", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "0.4rem" }}>
                          <button
                            onClick={() => handleOpenProductModal(p)}
                            title="Modifier ce produit"
                            style={{
                              padding: "0.4rem 0.65rem",
                              borderRadius: "6px",
                              border: "1px solid #cbd5e1",
                              background: "#ffffff",
                              cursor: "pointer",
                              color: "#0f2b5c",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.3rem",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                            }}
                          >
                            <Edit2 size={13} />
                            <span>Modifier</span>
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            title="Supprimer ce produit"
                            style={{
                              padding: "0.4rem 0.65rem",
                              borderRadius: "6px",
                              border: "1px solid #fecaca",
                              background: "#fef2f2",
                              cursor: "pointer",
                              color: "#dc2626",
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}>
                  Aucun produit trouvé dans cette recherche.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: GESTION DES GAMMES (CATÉGORIES)                    */}
        {/* ======================================================== */}
        {activeTab === "categories" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "2.5rem" }}>
            {/* Formulaire ajout de Gamme */}
            <div
              style={{
                background: "#ffffff",
                padding: "2rem",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
                height: "fit-content",
              }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f2b5c", marginBottom: "1.2rem" }}>
                + Ajouter une nouvelle gamme
              </h3>
              <form onSubmit={handleSaveCategory}>
                <div style={{ marginBottom: "1.2rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                    Nom de la gamme *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Fils Recyclés & Éco-textiles"
                    value={catForm.name}
                    onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.9rem",
                      borderRadius: "6px",
                      border: "1.5px solid #cbd5e1",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "1.4rem" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.4rem" }}>
                    Description de la gamme
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Description des applications, usages et spécifications de cette gamme..."
                    value={catForm.description}
                    onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.7rem 0.9rem",
                      borderRadius: "6px",
                      border: "1.5px solid #cbd5e1",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "6px",
                    background: "#0f2b5c",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(15, 43, 92, 0.2)",
                  }}
                >
                  Enregistrer la gamme
                </button>
              </form>
            </div>

            {/* Liste des Gammes existantes */}
            <div
              style={{
                background: "#ffffff",
                padding: "2rem",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
              }}
            >
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#0f2b5c", marginBottom: "1.2rem" }}>
                Gammes actives ({categories.length})
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {categories.map((c) => {
                  const prodCount = products.filter((p) => p.categoryId === c.id).length;
                  return (
                    <div
                      key={c.id}
                      style={{
                        padding: "1.2rem",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        background: "#f8fafc",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                          <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a" }}>{c.name}</h4>
                          <span
                            style={{
                              fontSize: "0.72rem",
                              fontWeight: 800,
                              background: "#e2e8f0",
                              color: "#475569",
                              padding: "0.15rem 0.5rem",
                              borderRadius: "999px",
                            }}
                          >
                            {prodCount} produit{prodCount > 1 ? "s" : ""}
                          </span>
                        </div>
                        {c.description && (
                          <p style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "0.3rem" }}>
                            {c.description}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteCategory(c.id, c.name)}
                        title="Supprimer cette gamme"
                        style={{
                          background: "#fee2e2",
                          border: "1px solid #fca5a5",
                          color: "#dc2626",
                          padding: "0.45rem",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: DEVIS REÇUS                                       */}
        {/* ======================================================== */}
        {activeTab === "quotes" && (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.88rem" }}>
              <thead>
                <tr style={{ background: "#f1f5f9", borderBottom: "1.5px solid #e2e8f0", color: "#475569", fontSize: "0.78rem", textTransform: "uppercase" }}>
                  <th style={{ padding: "1rem 1.2rem" }}>Réf. Devis</th>
                  <th style={{ padding: "1rem 1.2rem" }}>Société / Atelier</th>
                  <th style={{ padding: "1rem 1.2rem" }}>Wilaya & Contact</th>
                  <th style={{ padding: "1rem 1.2rem" }}>Statut</th>
                  <th style={{ padding: "1rem 1.2rem" }}>Détails</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => (
                  <tr key={q.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "1rem 1.2rem", fontWeight: 800, color: "#0f2b5c" }}>
                      {q.referenceNumber}
                    </td>
                    <td style={{ padding: "1rem 1.2rem", fontWeight: 700 }}>
                      {q.companyName}
                    </td>
                    <td style={{ padding: "1rem 1.2rem", color: "#475569" }}>
                      <div>{q.phone}</div>
                      <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{q.projectType}</div>
                    </td>
                    <td style={{ padding: "1rem 1.2rem" }}>
                      <span
                        style={{
                          padding: "0.25rem 0.6rem",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          background: q.status === "PENDING" ? "#fef3c7" : "#dcfce7",
                          color: q.status === "PENDING" ? "#b45309" : "#15803d",
                        }}
                      >
                        {q.status === "PENDING" ? "En attente" : "Traité"}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 1.2rem" }}>
                      <button
                        onClick={() => setSelectedQuote(q)}
                        style={{
                          padding: "0.35rem 0.8rem",
                          borderRadius: "6px",
                          border: "1px solid #cbd5e1",
                          background: "#ffffff",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                        }}
                      >
                        Consulter
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL CRÉATION / MODIFICATION PRODUIT                    */}
      {/* ======================================================== */}
      {isProductModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setIsProductModalOpen(false)}
        >
          <div
            style={{
              background: "#ffffff",
              width: "100%",
              maxWidth: "650px",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              overflow: "hidden",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "1.2rem 1.8rem",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f8fafc",
              }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#0f2b5c", margin: 0 }}>
                {editingProduct ? "Modifier le produit" : "Ajouter un nouveau produit au catalogue"}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveProduct} style={{ padding: "1.8rem", overflowY: "auto" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                    Référence unique *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: TF-POLY-104"
                    value={productForm.reference}
                    onChange={(e) => setProductForm({ ...productForm, reference: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "6px",
                      border: "1.5px solid #cbd5e1",
                      fontWeight: 700,
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                    Gamme / Catégorie *
                  </label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "6px",
                      border: "1.5px solid #cbd5e1",
                      fontWeight: 600,
                    }}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                  Nom commercial du fil *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fil Polyester Haute Ténacité 40/2 Blanc"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "6px",
                    border: "1.5px solid #cbd5e1",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", marginBottom: "1.2rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                    Composition *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 100% Polyester spun"
                    value={productForm.composition}
                    onChange={(e) => setProductForm({ ...productForm, composition: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "6px",
                      border: "1.5px solid #cbd5e1",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                    Usage principal
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Confection, Tissage, Broderie"
                    value={productForm.usage}
                    onChange={(e) => setProductForm({ ...productForm, usage: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: "6px",
                      border: "1.5px solid #cbd5e1",
                    }}
                  />
                </div>
              </div>

              {/* Visuel du produit */}
              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                  Photo du produit (Sélectionnez un visuel d&apos;atelier ou entrez une URL)
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.6rem", marginBottom: "0.6rem" }}>
                  {PRESET_IMAGES.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setProductForm({ ...productForm, imageUrl: img.url })}
                      style={{
                        border: productForm.imageUrl === img.url ? "2px solid #0f2b5c" : "1.5px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "0.3rem",
                        cursor: "pointer",
                        background: productForm.imageUrl === img.url ? "#eff6ff" : "#ffffff",
                        textAlign: "center",
                      }}
                    >
                      <img src={img.url} alt={img.label} style={{ width: "100%", height: "55px", objectFit: "contain" }} />
                      <span style={{ fontSize: "0.65rem", display: "block", marginTop: "0.2rem", fontWeight: 600 }}>
                        Visuel {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Ou URL personnalisée de l'image"
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.55rem 0.85rem",
                    borderRadius: "6px",
                    border: "1.5px solid #cbd5e1",
                    fontSize: "0.85rem",
                  }}
                />
              </div>

              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                  Description & Spécifications
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "6px",
                    border: "1.5px solid #cbd5e1",
                    fontFamily: "inherit",
                    fontSize: "0.88rem",
                  }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={productForm.inStock}
                  onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />
                <label htmlFor="inStockCheck" style={{ fontSize: "0.88rem", fontWeight: 700, cursor: "pointer" }}>
                  Produit actuellement disponible en stock à Tlemcen
                </label>
              </div>

              {/* Modal Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.8rem", borderTop: "1px solid #e2e8f0", paddingTop: "1.2rem" }}>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  style={{
                    padding: "0.65rem 1.2rem",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    background: "#ffffff",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  style={{
                    padding: "0.65rem 1.6rem",
                    borderRadius: "6px",
                    background: "#0f2b5c",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(15, 43, 92, 0.25)",
                  }}
                >
                  {editingProduct ? "Enregistrer les modifications" : "Ajouter le produit au catalogue"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
