import React from "react";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import { useFilterContext } from "./FilterContext";

const Filter: React.FC = () => {
  const { resetFilters } = useFilterContext();

  return (
    <div className="flex justify-center gap-4 my-4 filter-container">
      <PriceFilter />
      <SizeFilter />
      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="px-4 py-2 h-[40px]
         text-gray-700 transition duration-300
          ease-in-out bg-transparent border-2
           border-gray-300 rounded hover:border-gray-500 hover:text-gray-900"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filter;
