import { CHANGE_USERS_FILTERS } from "../../constants/actionTypes";

export function getFilters (filters) {
  return {
    type: CHANGE_USERS_FILTERS,
    payload: filters,
  };
}
