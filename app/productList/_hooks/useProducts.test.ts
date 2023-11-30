import React from "react";
import {
  render,
  waitFor,
  screen,
  renderHook,
  act,
} from "@testing-library/react";
import axios from "axios";
import useProducts from "./useProducts";

import mockAxios from "jest-mock-axios";

// Clear all mocks after each test
afterEach(() => {
  mockAxios.reset();
});

describe("useProducts Hook", () => {
  it("loads products successfully and updates state", async () => {
    const { result } = renderHook(() => useProducts());

    // Prepare the mock response data
    const mockResponseData = {
      data: {
        products: [
          {
            id: "1",
            brand: "Test Brand",
            description: "Test Description",
            priceO: 100, // Original Price
            priceR: 80, // Reduced Price (optional, can be omitted if not applicable)
            url: "http://example.com/product/1",
            images: [
              "http://example.com/image1.jpg",
              "http://example.com/image2.jpg",
            ],
            sizes: ["S", "M", "L"],
          },
          // ... add more products as needed for the test
        ],
        hasMore: true,
        availableSizes: ["S", "M"],
      },
    };

    // Use the 'act' hook to trigger the loadMoreProducts function
    await act(async () => {
      result.current.loadMoreProducts([], 0, 1000, true, 1);

      mockAxios.mockResponseFor(
        { url: "http://localhost:3000/api/products" },
        mockResponseData
      );
    });

    // Assertions to ensure the state was updated as expected
    await waitFor(() =>
      expect(result.current.products).toEqual(mockResponseData.data.products)
    );
    expect(result.current.hasMore).toEqual(mockResponseData.data.hasMore);
    expect(result.current.availableSizes).toEqual(
      mockResponseData.data.availableSizes
    );
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `http://localhost:3000/api/products`,
      expect.objectContaining({
        params: expect.objectContaining({
          page: 1,
          minPrice: 0,
          maxPrice: 1000,
          selectedSizes: "",
        }),
      })
    );
  });
});
