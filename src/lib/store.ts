import fs from "fs";
import path from "path";
import { Product, Category } from "./types";
import { PRODUCTS, CATEGORIES } from "./data";

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

interface StoreData {
  products: Product[];
  categories: Category[];
}

function initStore(): StoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(STORE_FILE)) {
      const initial: StoreData = {
        products: PRODUCTS,
        categories: CATEGORIES,
      };
      fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const raw = fs.readFileSync(STORE_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error reading store:", error);
    return {
      products: PRODUCTS,
      categories: CATEGORIES,
    };
  }
}

function saveStore(data: StoreData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving store:", error);
  }
}

export function getProducts(): Product[] {
  const store = initStore();
  return store.products;
}

export function getCategories(): Category[] {
  const store = initStore();
  return store.categories;
}

export function addProduct(productData: Partial<Product>): Product {
  const store = initStore();
  const id = `prod-${Date.now()}`;
  const slug = (productData.name || "produit")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const category = store.categories.find((c) => c.id === productData.categoryId);

  const newProduct: Product = {
    id,
    name: productData.name || "Nouveau Fil",
    reference: productData.reference || `TF-REF-${Math.floor(100 + Math.random() * 900)}`,
    slug: `${slug}-${Math.floor(10 + Math.random() * 90)}`,
    description: productData.description || "Description du fil textile industriel Toufiltex.",
    composition: productData.composition || "100% Polyester",
    grammage: productData.grammage || 150,
    width: productData.width || 0,
    usage: productData.usage || "Tissage & Confection",
    certifications: productData.certifications || ["Qualité Industrielle", "OEKO-TEX"],
    colors: productData.colors || ["#FFFFFF", "#1E3A8A", "#059669"],
    imageUrl: productData.imageUrl || "/images/fils-polyester.jpg",
    featured: Boolean(productData.featured),
    minOrderMeters: productData.minOrderMeters || 10,
    inStock: productData.inStock !== false,
    categoryId: productData.categoryId || (store.categories[0]?.id || "cat-1"),
    categoryName: category?.name || "Filature & Fils Industriels",
  };

  store.products.unshift(newProduct);
  saveStore(store);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const store = initStore();
  const index = store.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const current = store.products[index];
  const category = updates.categoryId
    ? store.categories.find((c) => c.id === updates.categoryId)
    : store.categories.find((c) => c.id === current.categoryId);

  const updated: Product = {
    ...current,
    ...updates,
    id: current.id,
    categoryName: category?.name || current.categoryName,
  };

  store.products[index] = updated;
  saveStore(store);
  return updated;
}

export function deleteProduct(id: string): boolean {
  const store = initStore();
  const initialLength = store.products.length;
  store.products = store.products.filter((p) => p.id !== id);
  if (store.products.length !== initialLength) {
    saveStore(store);
    return true;
  }
  return false;
}

export function addCategory(catData: Partial<Category>): Category {
  const store = initStore();
  const id = `cat-${Date.now()}`;
  const slug = (catData.name || "gamme")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const newCat: Category = {
    id,
    name: catData.name || "Nouvelle Gamme",
    slug,
    description: catData.description || "Gamme de fils textiles importés par Toufiltex.",
    count: 0,
  };

  store.categories.push(newCat);
  saveStore(store);
  return newCat;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const store = initStore();
  const index = store.categories.findIndex((c) => c.id === id);
  if (index === -1) return null;

  const updated: Category = {
    ...store.categories[index],
    ...updates,
    id,
  };

  store.categories[index] = updated;
  saveStore(store);
  return updated;
}

export function deleteCategory(id: string): boolean {
  const store = initStore();
  const initialLength = store.categories.length;
  store.categories = store.categories.filter((c) => c.id !== id);
  if (store.categories.length !== initialLength) {
    saveStore(store);
    return true;
  }
  return false;
}
