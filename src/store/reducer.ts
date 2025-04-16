import { FilterAction } from "./actions";
import { initialFilterState } from "./initial";
import { FilterState } from "./type";

export const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };

    case "TOGGLE_CATEGORY":
      return {
        ...state,
        selectedCategories: state.selectedCategories.includes(action.payload)
          ? state.selectedCategories.filter((c) => c !== action.payload)
          : [...state.selectedCategories, action.payload],
      };

    case "TOGGLE_CHAIN":
      return {
        ...state,
        selectedChains: state.selectedChains.includes(action.payload)
          ? state.selectedChains.filter((c) => c !== action.payload)
          : [...state.selectedChains, action.payload],
      };

    case "SET_SORT_OPTION":
      return {
        ...state,
        sortOption: action.payload.option,
        sortDirection: action.payload.direction,
      };

    case "RESET":
      return initialFilterState;

    default:
      return state;
  }
};
