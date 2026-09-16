import { NextRequest, NextResponse } from "next/server";
import { getProducts, getCategories, addProduct, updateProduct, deleteProduct } from "@/lib/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q");

  const products = getProducts();
  const categories = getCategories();

  let filtered = [...products];

  if (category && category !== "all") {
    const cat = categories.find((c) => c.slug === category || c.id === category);
    if (cat) {
      filtered = filtered.filter((p) => p.categoryId === cat.id);
    }
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.reference.toLowerCase().includes(q) ||
        p.composition.toLowerCase().includes(q) ||
        p.usage.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    products: filtered,
    total: filtered.length,
    categories,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, id, ...productData } = body;

    if (action === "update" && id) {
      const updated = updateProduct(id, productData);
      if (!updated) {
        return NextResponse.json({ error: "Produit non trouvé" }, { status: 404 });
      }
      return NextResponse.json({ success: true, product: updated });
    }

    // Default is addProduct
    const created = addProduct(productData);
    return NextResponse.json({ success: true, product: created }, { status: 201 });
  } catch (error) {
    console.error("Erreur API Produits:", error);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement du produit" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID de produit requis" }, { status: 400 });
    }

    const ok = deleteProduct(id);
    if (!ok) {
      return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression produit:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
