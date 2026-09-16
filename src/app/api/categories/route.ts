import { NextRequest, NextResponse } from "next/server";
import { getCategories, addCategory, updateCategory, deleteCategory } from "@/lib/store";

export async function GET() {
  const categories = getCategories();
  return NextResponse.json({ categories });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, id, ...catData } = body;

    if (action === "update" && id) {
      const updated = updateCategory(id, catData);
      if (!updated) {
        return NextResponse.json({ error: "Gamme non trouvée" }, { status: 404 });
      }
      return NextResponse.json({ success: true, category: updated });
    }

    const created = addCategory(catData);
    return NextResponse.json({ success: true, category: created }, { status: 201 });
  } catch (error) {
    console.error("Erreur API Catégories/Gammes:", error);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement de la gamme" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID de gamme requis" }, { status: 400 });
    }

    const ok = deleteCategory(id);
    if (!ok) {
      return NextResponse.json({ error: "Gamme introuvable" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression gamme:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
