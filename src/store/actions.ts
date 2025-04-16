export type FilterAction =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "TOGGLE_CATEGORY"; payload: string }
  | { type: "TOGGLE_CHAIN"; payload: string }
  | {
      type: "SET_SORT_OPTION";
      payload: { option: string; direction: "asc" | "desc" };
    }
  | { type: "RESET" };
