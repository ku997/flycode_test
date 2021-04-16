import { CREATE_PAG_STATE } from "../../constants/actionTypes";

export function getPagState (state) {
  return {
    type: CREATE_PAG_STATE,
    payload: state,
  };
}
