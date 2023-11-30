// hooks/useProducts.ts
import { useState, useCallback, useRef } from "react";
import axios from "axios";
import { Product } from "../../types/Product"; // assuming this is your type definition for Product

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  availableSizes: string[];
  loadMoreProducts: (
    selectedSizes: string[],
    minPrice: number,
    maxPrice: number,
    shouldLoadMore: boolean,
    page: number
  ) => Promise<void>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  page: number;
}

const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  const loadMoreProducts = useCallback(
    async (
      selectedSizes: string[],
      minPrice: number,
      maxPrice: number,
      shouldLoadMore: boolean,
      page: number
    ): Promise<void> => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/products`, {
          params: {
            page,
            minPrice,
            maxPrice,
            selectedSizes: selectedSizes.join(","),
          },
        });
        const { products, hasMore, availableSizes } = response.data;

        setHasMore(hasMore);
        setPage((prev) => prev + 1);
        setProducts((prev) =>
          shouldLoadMore ? [...prev, ...products] : products
        );
        setAvailableSizes(availableSizes);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    products,
    loading,
    hasMore,
    availableSizes,
    loadMoreProducts,
    setPage,
    setProducts,
    page,
  };
};

export default useProducts;
