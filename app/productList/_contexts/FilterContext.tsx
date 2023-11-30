import React, { createContext, useContext, ReactNode } from "react";

interface FilterContextProps {
  minPrice: number;
  maxPrice: number;
  availableSizes: string[];
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  onPriceFilterChange: (minPrice: number, maxPrice: number) => void;
  resetFilters: () => void;
}

// Add children to the type definition for the provider props
interface FilterProviderProps extends FilterContextProps {
  children: ReactNode; // ReactNode is a type that includes anything that can be rendered: numbers, strings, elements or an array containing these types.
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};

export const FilterProvider: React.FC<FilterProviderProps> = ({
  children,
  minPrice,
  maxPrice,
  onPriceFilterChange,
  availableSizes,
  selectedSizes,
  setSelectedSizes,
  resetFilters,
}) => {
  return (
    <FilterContext.Provider
      value={{
        minPrice,
        maxPrice,
        onPriceFilterChange,
        availableSizes,
        selectedSizes,
        setSelectedSizes,
        resetFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
