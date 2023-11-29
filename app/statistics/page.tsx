"use client";
import { useState, useEffect } from "react";
import { Product } from "../types/Product";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [lastIndex, setLastIndex] = useState<number>(0);
  const chunkSize = 20; // Number of products to load per "page"

  useEffect(() => {
    fetch(
      "https://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json"
    )
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const loadMoreProducts = () => {
    const newLastIndex = lastIndex + chunkSize;
    setDisplayedProducts(products.slice(0, newLastIndex));
    setLastIndex(newLastIndex);
  };

  // Initial load
  useEffect(() => {
    loadMoreProducts();
  }, [products]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadMoreProducts();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastIndex, products]);

  // More code to handle scrolling and loading more products...

  return (
    <div className="product-list">
      {displayedProducts.map((product) => (
        <div key={product.id} className="product">
          <img
            src={product.images[0]}
            alt={product.description}
            className="product-image"
          />
          <h3 className="product-brand">{product.brand}</h3>
          <p className="product-description">{product.description}</p>
          <div className="product-prices">
            <span className="original-price">${product.priceO.toFixed(2)}</span>
            {product.priceR && (
              <span className="reduced-price">
                ${product.priceR.toFixed(2)}
              </span>
            )}
          </div>
          <a href={product.url} className="product-link">
            View Product
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
