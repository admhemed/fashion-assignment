import React from "react";
import ProductItem from "./ProductItem";
import { Product } from "../types/Product";

interface ProductListProps {
  products: Product[];
  hasMore: boolean;
  loading: boolean;
}
const ProductList: React.FC<ProductListProps> = ({
  products,
  hasMore,
  loading,
}) => {
  // Rendering logic

  return (
    <div className="w-screen">
      <div className="min-h-screen bg-gray-100">
        <main className="container px-4 py-6 mx-auto">
          {/* Product grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          {loading && <p className="text-center">Loading...</p>}
          {!hasMore && <p className="text-center">No more products to load.</p>}
        </main>
      </div>
    </div>
  );
};

export default ProductList;
