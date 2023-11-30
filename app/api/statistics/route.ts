import { Product } from "../../types/Product";
import { NextRequest, NextResponse } from "next/server";
import { fetchProducts } from "../products/route";
import { ProductStatistics } from "../../types/Statistics";

export async function GET(): Promise<NextResponse> {
  try {
    const products: Product[] = await fetchProducts();

    // Filter products costing less than 40 EUR
    const brandsUnder40: Record<string, number> = products
      .filter((p: Product) => (p.priceR || p.priceO) < 40)
      .reduce((acc: Record<string, number>, p: Product) => {
        acc[p.brand] = (acc[p.brand] || 0) + 1;
        return acc;
      }, {});

    const mostProductsUnder40Brand: string = Object.keys(brandsUnder40).reduce(
      (a: string, b: string) => (brandsUnder40[a] > brandsUnder40[b] ? a : b)
    );

    // Find brand with largest selection of sizes
    const brandSizeCounts: Record<string, Set<string>> = products.reduce(
      (acc: Record<string, Set<string>>, p: Product) => {
        p.sizes.forEach((size: string) => {
          if (!acc[p.brand]) acc[p.brand] = new Set();
          acc[p.brand].add(size);
        });
        return acc;
      },
      {}
    );

    const largestSizeSelectionBrand: string = Object.keys(
      brandSizeCounts
    ).reduce((a: string, b: string) =>
      brandSizeCounts[a].size > brandSizeCounts[b].size ? a : b
    );

    // Compute the lowest average price for size "32"
    const size32Prices: Record<string, number[]> = products
      .filter((p: Product) => p.sizes.includes("32"))
      .reduce((acc: Record<string, number[]>, p: Product) => {
        if (!acc[p.brand]) acc[p.brand] = [];
        acc[p.brand].push(p.priceR || p.priceO);
        return acc;
      }, {});

    const lowestAvgPriceBrandSize32: string = Object.keys(size32Prices).reduce(
      (a: string, b: string) => {
        const avgA: number =
          size32Prices[a].reduce(
            (sum: number, price: number) => sum + price,
            0
          ) / size32Prices[a].length;
        const avgB: number =
          size32Prices[b].reduce(
            (sum: number, price: number) => sum + price,
            0
          ) / size32Prices[b].length;
        return avgA < avgB ? a : b;
      }
    );

    const response: ProductStatistics = {
      mostProductsUnder40Brand,
      largestSizeSelectionBrand,
      lowestAvgPriceBrandSize32,
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
