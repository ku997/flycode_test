import { CHANGE_USERS_PAGE } from "../../constants/actionTypes";

export function changePage (page) {
  return {
    type: CHANGE_USERS_PAGE,
    payload: page,
  };
}
