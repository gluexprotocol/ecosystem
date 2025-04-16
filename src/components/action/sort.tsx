import React, { useEffect, useRef, useState } from "react";
import { ArrowUpDown, Check, ChevronDown } from "lucide-react";

interface SortProps {
  sortOption: string;
  sortDirection: "asc" | "desc";
  onChangeSort: (option: string, direction: "asc" | "desc") => void;
}

interface SortOption {
  label: string;
  option: string;
  direction: "asc" | "desc";
}

const SORT_OPTIONS: SortOption[] = [
  { label: "Default", option: "default", direction: "asc" },
  { label: "Name (A to Z)", option: "name", direction: "asc" },
  { label: "Name (Z to A)", option: "name", direction: "desc" },
  { label: "Number of Chains (Asc)", option: "chains", direction: "asc" },
  {
    label: "Number of Chains (Des)",
    option: "chains",
    direction: "desc",
  },
];

const Sort: React.FC<SortProps> = ({
  sortOption,
  sortDirection,
  onChangeSort,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortChange = (option: string, direction: "asc" | "desc") => {
    onChangeSort(option, direction);
    setIsSortOpen(false);
  };

  return (
    <div className="relative" ref={sortRef}>
      <button
        onClick={() => setIsSortOpen(!isSortOpen)}
        className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-md border transition-all backdrop-blur-md duration-300 ${
          isSortOpen
            ? "bg-zinc-900 border-zinc-800 text-white/80 hover:bg-zinc-800"
            : "bg-zinc-800/30 border-transparent"
        }`}
      >
        <ArrowUpDown className="w-4 h-4" />
        <span>Sort</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isSortOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isSortOpen && (
        <div className="top-full -right-6 sm:right-0 z-10 absolute border-zinc-800 bg-black/60 shadow-xl mt-2 border backdrop-blur-md filter-dropdown rounded-lg w-64 overflow-hidden">
          <div className="p-3 border-zinc-800 border-b">
            <h3 className="font-semibold text-white text-sm">Sort Protocols</h3>
          </div>
          <div className="space-y-1 p-2">
            {SORT_OPTIONS.map(({ label, option, direction }) => (
              <button
                key={`${option}-${direction}`}
                onClick={() => handleSortChange(option, direction)}
                className={`flex items-center justify-between w-full p-2.5 rounded-md transition-colors duration-200 
                  ${
                    sortOption === option && sortDirection === direction
                      ? "bg-[#4ade80]/10 text-[#4ade80]"
                      : "text-white/80 hover:bg-zinc-800/70"
                  }`}
              >
                <span className="text-start">{label}</span>
                {sortOption === option && sortDirection === direction && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
