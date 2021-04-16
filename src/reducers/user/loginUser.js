import {
  LOGIN,
  LOGIN_SUCCSESS,
  LOGIN_ERROR,
  LOADING,
  ERROR,
  READY,
} from "../../constants/actionTypes";

import { cloneDeep, assign } from "lodash";
const INITIAL_STATE = {};

export const loginUser = (state = INITIAL_STATE, action) => {
  const NEW_STATE = cloneDeep(state);
  switch (action.type) {
    case LOGIN:
      assign(NEW_STATE, { status: LOADING });
      return NEW_STATE;
    case LOGIN_SUCCSESS:
      assign(NEW_STATE, action.payload, { status: READY });
      return NEW_STATE;
    case LOGIN_ERROR:
      Object.assign(NEW_STATE, { status: ERROR });
      return NEW_STATE;
    default:
      return state;
  }
};
