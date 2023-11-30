// Import the type
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ProductStatistics } from "../types/Statistics";

const ProductsStatisticsPage: React.FC = () => {
  // Use the type in state declaration
  const [statistics, setStatistics] = useState<ProductStatistics | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/statistics");
      // Update state with the fetched data
      setStatistics(response.data);
    } catch (error) {
      console.error("Error loading statistics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Display the statistics details
        statistics && (
          <div>
            <p>
              Most Products Under 40 EUR: {statistics.mostProductsUnder40Brand}
            </p>
            <p>
              Largest Size Selection Brand:{" "}
              {statistics.largestSizeSelectionBrand}
            </p>
            <p>
              Lowest Average Price for Size 32:{" "}
              {statistics.lowestAvgPriceBrandSize32}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default ProductsStatisticsPage;
