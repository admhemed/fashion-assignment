// TODO:use a custom input from shadcn-ui
import React from "react";
import { useFilterContext } from "./FilterContext";

const PriceFilter: React.FC = () => {
  const { minPrice, maxPrice, onPriceFilterChange } = useFilterContext();

  const [localMinPrice, setLocalMinPrice] = React.useState<number>(0);
  const [localMaxPrice, setLocalMaxPrice] = React.useState<number>(Infinity);

  const handleMinPriceBlur = () => {
    const newMinPrice = localMinPrice || 0;
    onPriceFilterChange(newMinPrice, maxPrice);
  };

  const handleMaxPriceBlur = () => {
    const newMaxPrice = localMaxPrice || Infinity;
    console.log("maxPrice:", minPrice, newMaxPrice);
    onPriceFilterChange(minPrice, newMaxPrice);
  };

  const handleKeyDown = (e: React.KeyboardEvent, handler: () => void) => {
    if (e.key === "Enter") {
      handler();
    }
  };
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert the input value to a number before setting the state
    const value = e.target.value === "" ? 0 : Number(e.target.value);
    setLocalMinPrice(value);
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert the input value to a number before setting the state
    const value = e.target.value === "" ? 0 : Number(e.target.value);
    setLocalMaxPrice(value);
  };
  return (
    <div className="flex justify-center gap-4 my-4 filter-container">
      <div className="flex flex-col items-center w-[10em]">
        <label
          htmlFor="max-price"
          className="text-sm font-medium text-gray-700"
        >
          Min Price
        </label>
        <input
          type="number"
          placeholder="Min Price"
          onBlur={handleMinPriceBlur}
          onChange={handleMinPriceChange} // Refactored line
          onKeyDown={(e) => handleKeyDown(e, () => handleMinPriceBlur())}
          value={localMinPrice || ""}
          min={0}
          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="flex flex-col items-center  w-[10em]">
        <label
          htmlFor="max-price"
          className="text-sm font-medium text-gray-700"
        >
          Max Price
        </label>

        <input
          type="number"
          placeholder="Max Price"
          onBlur={handleMaxPriceBlur}
          onChange={handleMaxPriceChange}
          onKeyDown={(e) => handleKeyDown(e, () => handleMaxPriceBlur())}
          value={localMaxPrice}
          min={0}
          className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
