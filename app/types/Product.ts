// types/Product.ts
export interface Product {
  id: string;
  brand: string;
  description: string;
  priceO: number; // Original Price
  priceR?: number; // Reduced Price
  url: string;
  images: string[];
  sizes: string[];
}
