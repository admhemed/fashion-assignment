import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import { useFilterContext } from "./FilterContext";
// a container for all the filters
const Filter: React.FC = () => {
  const { resetFilters } = useFilterContext();

  return (
    <div className="flex items-end justify-center gap-4 my-4 filter-container">
      <PriceFilter />
      <SizeFilter />
      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="px-4 py-1 h-[38px]  mb-[16px]
         text-gray-700 transition duration-300
          ease-in-out bg-transparent border
           border-gray-300 rounded hover:border-gray-500 hover:text-gray-900"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filter;
