import React from "react";
import { Search, X } from "lucide-react";

interface SearchInputProps {
  searchTerm: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  onChange,
  onClear,
}) => {
  return (
    <div className="relative flex-grow backdrop-blur-md w-full sm:max-w-md">
      <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-white/60" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className={`bg-zinc-800/30 py-2 pr-8 pl-12 border focus:border-zinc-800 border-transparent rounded-lg focus:outline-none w-full text-white/75 focus:text-white transition-colors duration-300 placeholder-white/60 ${
          searchTerm
            ? "hover:bg-zinc-800/50 hover:border-zinc-700"
            : "hover:bg-zinc-800/50 cursor-pointer opacity-70 hover:opacity-100 focus:opacity-100"
        }`}
      />
      {searchTerm && (
        <button
          onClick={onClear}
          className="right-0 absolute inset-y-0 flex items-center pr-3"
        >
          <X className="w-4 h-4 text-white/50 hover:text-white transition-all cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
