// I tried hard to keep this file as clean and small as possible
// I refactored product fetching into a hook
// used components for most of the UI
// MISSING: tests, checking types, and refactor metadata and layout into layout.tsx
// MISSING: handling missing dependency warning in the useEffect
// MISSING: unify styling among components
"use client";
import React, { useState, useEffect, useRef } from "react";
import ProductsList from "./_components/ProductsList";
import Filter from "./_components/Filter";
import Head from "next/head";
import { FilterProvider } from "./_components/FilterContext";
import useProducts from "./_hooks/useProducts";

const ProductsPage: React.FC = () => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const {
    setProducts,
    products,
    loading,
    hasMore,
    availableSizes,
    loadMoreProducts,
    setPage,
    page,
  } = useProducts();

  // Update on filter changes
  useEffect(() => {
    loadMoreProducts(selectedSizes, minPrice, maxPrice, false, 1);
    setPage(1);
    // loadMoreProducts should be added to the dependency array
    // TODO: create a function using useCallback to avoid this warning
  }, [selectedSizes, minPrice, maxPrice, setPage]);

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
  // TODO: Add a loading indicator
  // TODO: Refactor metadata and layout into layout.tsx
  return (
    <FilterProvider
      minPrice={minPrice}
      maxPrice={maxPrice}
      onPriceFilterChange={handleFilterChange}
      availableSizes={availableSizes} // this comes from route api/products
      selectedSizes={selectedSizes}
      setSelectedSizes={setSelectedSizes}
      resetFilters={resetFilters}
    >
      <div className="flex flex-col items-center justify-center overflow-hidden">
        {/* // TODO: Refactor metadata and layout into layout.tsx  */}
        <Head>
          <title></title>
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
