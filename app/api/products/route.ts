// MISSING: some variables are not typed
// MISSING: should create a type for the response
// MISSING: unit testing
import { Product } from "../../types/Product";
import { NextRequest, NextResponse } from "next/server";

// Handler for the API route
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");

  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "Infinity");
  const selectedSizes = searchParams.get("selectedSizes"); // Get the selectedSizes query parameter

  const pageSize = 15; // Set the number of items per page

  try {
    // whenever we need to fetch data from an external API, we need to use the fetch API
    // but it is no problem because Next.js caches the result of the fetch call
    const response = await fetch(
      "https://s3-eu-west-1.amazonaws.com/fid-recruiting/fid-task-4-ffront-products.json"
    );

    let products: Product[] = await response.json();

    // If size parameter is provided, filter the products by size
    if (selectedSizes) {
      products = products.filter((product: Product) => {
        // Ensure sizes is treated as an array
        const sizesArray = Array.isArray(product.sizes)
          ? product.sizes
          : [product.sizes];
        return selectedSizes
          .split(",")
          .some((item) => sizesArray.includes(item));
      });
    }

    // Filter by price range
    products = products.filter((product: Product) => {
      const price = product.priceR ?? product.priceO; // Use reduced price if available, otherwise original price
      return price >= minPrice && price <= maxPrice;
    });

    // Collect unique available sizes
    const availableSizes = new Set<string>();
    products.forEach((product: Product) => {
      product.sizes.forEach((size) => availableSizes.add(size));
    });

    const total = products.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    // Get the subset of products for the current page
    const paginatedProducts = products.slice(start, end);

    // Calculate if there are more products after this page
    const hasMore = page < totalPages;

    return NextResponse.json({
      page,
      pageSize,
      total,
      totalPages,
      products: paginatedProducts,
      availableSizes: Array.from(availableSizes), // Convert Set to Array

      hasMore, // Added the hasMore property
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
