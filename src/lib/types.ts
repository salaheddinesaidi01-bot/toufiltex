export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  count?: number;
}

export interface Product {
  id: string;
  name: string;
  reference: string;
  slug: string;
  description: string;
  composition: string;
  grammage: number; // g/m²
  width: number; // cm
  usage: string;
  certifications: string[];
  colors: string[];
  imageUrl: string;
  featured?: boolean;
  minOrderMeters: number;
  inStock: boolean;
  categoryId: string;
  categoryName?: string;
  technicalSpecs?: {
    weaveType: string; // e.g. Sergé, Toile, Satin, Jacquard
    yarnCount: string; // e.g. Nm 40/2, Ne 30/1
    shrinkage: string; // e.g. < 2%
    washingTemp: string; // e.g. 40°C, 60°C
  };
}

export interface QuoteCartItem {
  product: Product;
  quantityMeters: number;
  sampleOnly: boolean;
  selectedColor?: string;
}

export interface QuoteRequestInput {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  projectType?: string;
  deadline?: string;
  notes?: string;
  items: {
    productId: string;
    productName: string;
    quantityMeters: number;
    sampleOnly: boolean;
    selectedColor?: string;
  }[];
}

export interface QuoteRequestRecord {
  id: string;
  referenceNumber: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  projectType?: string;
  deadline?: string;
  notes?: string;
  status: 'PENDING' | 'IN_REVIEW' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  items: {
    id: string;
    productId: string;
    productName: string;
    productRef: string;
    quantityMeters: number;
    sampleOnly: boolean;
    selectedColor?: string;
  }[];
}
