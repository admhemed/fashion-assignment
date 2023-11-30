"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFilterContext } from "./FilterContext";

const SizeFilter: React.FC = () => {
  const {
    availableSizes: sizes,
    selectedSizes,
    setSelectedSizes,
  } = useFilterContext();

  const [open, setOpen] = React.useState(false);

  const toggleValue = (sizeValue: string) => {
    if (selectedSizes.includes(sizeValue)) {
      setSelectedSizes(selectedSizes.filter((value) => value !== sizeValue));
    } else {
      setSelectedSizes([...selectedSizes, sizeValue]);
    }
  };

  const displaySelectedSizes = () => {
    if (selectedSizes.length === 0) {
      return "Select sizes...";
    }
    return sizes
      .filter((size) => selectedSizes.includes(size))
      .map((size) => size)
      .join(", ");
  };

  return (
    <div className="flex justify-center gap-4 my-4 filter-container">
      <div className="flex flex-col items-center">
        <label
          htmlFor="max-price"
          className="text-sm font-medium text-gray-700"
        >
          Size
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="min-w-[10em] justify-between mt-1 h-[38px]"
            >
              {displaySelectedSizes()}
              <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="min-w-[10em] p-0 ">
            <Command>
              <CommandInput placeholder="Search size..." />
              <CommandEmpty>No size found.</CommandEmpty>
              <CommandGroup className="h-[450px]  overflow-scroll">
                {sizes.map((size) => (
                  <CommandItem
                    key={size}
                    value={size}
                    onSelect={() => toggleValue(size)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedSizes.includes(size)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {size}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default SizeFilter;
