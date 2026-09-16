import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS, CATEGORIES } from "@/lib/data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q");

  let filtered = [...PRODUCTS];

  if (category && category !== "all") {
    const cat = CATEGORIES.find((c) => c.slug === category);
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
    categories: CATEGORIES,
  });
}
