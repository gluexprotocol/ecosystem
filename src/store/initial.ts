import { FilterState } from "./type";

export const initialFilterState: FilterState = {
  searchTerm: "",
  selectedCategories: [],
  selectedChains: [],
  sortOption: "name",
  sortDirection: "asc",
};
