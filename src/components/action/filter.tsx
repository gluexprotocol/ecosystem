import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Filter } from "lucide-react";

import { getChainColor } from "../../utils/chain.util";

interface EcosystemFilterProps {
  chains: Chain[];
  selectedChains: string[];
  selectedCategories: string[];
  onToggleChain: (chainKey: string) => void;
  onToggleCategory: (category: string) => void;
  onReset: () => void;
}

const EcosystemFilter: React.FC<EcosystemFilterProps> = ({
  chains,
  selectedChains,
  selectedCategories,
  onToggleChain,
  onToggleCategory,
  onReset,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const activeFilterCount = [selectedChains, selectedCategories].reduce(
    (acc, arr) => acc + (arr.length > 0 ? 1 : 0),
    0
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={filterRef}>
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md border transition-all backdrop-blur-md duration-300 ${
          isFilterOpen || activeFilterCount > 0
            ? "bg-zinc-900 border-zinc-800 text-white/80 hover:bg-zinc-800"
            : "bg-zinc-800/30 border-transparent"
        }`}
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="flex justify-center items-center bg-[#4ade80] backdrop-blur-md ml-1 rounded-full w-5 h-5 font-bold text-black text-xs">
            {activeFilterCount}
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isFilterOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isFilterOpen && (
        <div className="top-full sm:right-0 -left-3/4 sm:left-auto z-10 absolute bg-black/50 shadow-xl backdrop-blur-md filter-dropdown mt-2 border border-zinc-800 rounded-lg w-80 overflow-hidden">
          <div className="flex justify-between items-center p-3 border-zinc-800 border-b">
            <h3 className="font-semibold text-white text-sm">
              Filter Protocols
            </h3>
            <button
              onClick={onReset}
              className="text-white/60 hover:text-white/90 text-xs transition-colors duration-200 cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Chains Filter */}
          <div className="p-3 border-zinc-800 border-b">
            <h4 className="flex items-center mb-3 font-medium text-white/90 text-sm">
              Active Chains
            </h4>
            <div className="flex flex-wrap gap-2 p-0.5 max-h-40 overflow-y-auto custom-scrollbar">
              {chains && chains.length > 0 ? (
                chains.map((chain) => {
                  const isSelected = selectedChains.includes(chain.key);
                  const chainColorClass = isSelected
                    ? getChainColor(chain.key as any)
                    : "bg-zinc-700/50 text-zinc-300";
                  return (
                    <button
                      key={chain.key}
                      onClick={() => onToggleChain(chain.key)}
                      className={`${chainColorClass} cursor-pointer px-3 py-1 rounded-full text-xs transition-all duration-200 hover:opacity-90 ${
                        isSelected
                          ? "ring-1 ring-white/20"
                          : "hover:bg-zinc-600 hover:text-zinc-100"
                      }`}
                    >
                      {chain.name}
                      {isSelected && (
                        <span className="inline-flex items-center ml-1">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="text-white/50 text-xs italic">
                  No chains available
                </div>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="p-3 border-zinc-800 border-b">
            <h4 className="flex items-center mb-3 font-medium text-white/90 text-sm">
              Category
            </h4>
            <div className="flex flex-wrap gap-2 p-0.5 max-h-40 overflow-y-auto custom-scrollbar">
              {[
                "DEX",
                "POOLS",
                "LENDING",
                "STAKING",
                "RESTAKING",
                "YIELD",
                "DERIVATIVES",
                "MINTING",
                "STABLECOIN",
                "AMM",
              ].map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    onClick={() => onToggleCategory(category)}
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer transition-all duration-200 hover:opacity-90 bg-zinc-700/50 text-zinc-300 ${
                      isSelected
                        ? "ring-1 ring-white/20"
                        : "hover:bg-zinc-600 hover:text-zinc-100"
                    }`}
                  >
                    {category
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}

                    {isSelected && (
                      <span className="inline-flex items-center ml-1">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex justify-end bg-black/60 p-3">
            <button
              onClick={() => setIsFilterOpen(false)}
              className="bg-[#4ade80] hover:bg-[#4ade80]/90 px-5 py-2 rounded-md font-medium text-black text-sm transition-colors duration-300 cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcosystemFilter;
