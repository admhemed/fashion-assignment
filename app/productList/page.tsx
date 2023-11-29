"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Product } from "../types/Product";
import ProductsList from "./ProductsList";
import Filter from "./Filter";
import Head from "next/head";
import { FilterProvider } from "./FilterContext";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  const loadMoreProducts = useCallback(
    async (
      currentSelectedSizes: string[],
      currentMinPrice: number,
      currentMaxPrice: number,
      shouldLoadMore: boolean,
      page: number
    ) => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/products`, {
          params: {
            page,
            minPrice: currentMinPrice,
            maxPrice: currentMaxPrice,
            selectedSizes: currentSelectedSizes.join(","),
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
        mounted2.current = true;
      }
    },
    []
  );

  const mounted = useRef(false);
  const mounted2 = useRef(false);

  // Initial load
  useEffect(() => {
    if (!mounted.current) {
      loadMoreProducts(selectedSizes, minPrice, maxPrice, false, page);
      mounted.current = true;
    }
  }, [loadMoreProducts, selectedSizes, minPrice, maxPrice, page]); // Empty dependency array for initial load

  // Update on filter changes
  useEffect(() => {
    if (mounted2.current) {
      loadMoreProducts(selectedSizes, minPrice, maxPrice, false, 1);
      setPage(1);
    }
  }, [selectedSizes, minPrice, maxPrice, loadMoreProducts]);

  const handleFilterChange = (newMinPrice: number, newMaxPrice: number) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    setProducts([]);
    setPage(1);
  };

  const resetFilters = () => {
    setSelectedSizes([]);
    setMinPrice(0);
    setMaxPrice(Infinity);
    setProducts([]);
    setPage(1);
  };
  return (
    <FilterProvider
      minPrice={minPrice}
      maxPrice={maxPrice}
      onPriceFilterChange={handleFilterChange}
      availableSizes={availableSizes}
      selectedSizes={selectedSizes}
      setSelectedSizes={setSelectedSizes}
      resetFilters={resetFilters}
    >
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <Head>
          <title>Product List</title>
          <meta
            name="description"
            content="Browse our extensive catalog of products, featuring the latest trends and designs."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <header className="bg-white ">
          <div className="container px-4 py-6 mx-auto">
            <h1 className="text-2xl font-bold text-center">Product List</h1>
          </div>
        </header>
        <Filter />

        <ProductsList products={products} hasMore={hasMore} loading={loading} />
        <button
          onClick={() =>
            loadMoreProducts(selectedSizes, minPrice, maxPrice, true, page)
          }
          disabled={!hasMore}
          className={`mt-4 mb-8 px-6 py-2 w-[20rem] text-lg font-semibold rounded-md shadow-sm text-white transition-colors duration-150 ${
            hasMore ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Load More
        </button>
      </div>
    </FilterProvider>
  );
};

export default ProductsPage;
