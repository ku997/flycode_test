import {
  CREATE_USERS,
  CREATE_USERS_SUCCSESS,
  CREATE_USERS_ERROR,
  LOADING,
  ERROR,
  READY,
  CHANGE_USERS_PAGE,
  CHANGE_USERS_FILTERS,
} from "../../constants/actionTypes";

import { cloneDeep, assign } from "lodash";
const INITIAL_STATE = { page: 1 };

export const getUsers = (state = INITIAL_STATE, action) => {
  const NEW_STATE = cloneDeep(state);
  switch (action.type) {
    case CREATE_USERS:
      assign(NEW_STATE, { status: LOADING });
      return NEW_STATE;
    case CREATE_USERS_SUCCSESS:
      assign(NEW_STATE, action.payload, { status: READY });
      return NEW_STATE;
    case CREATE_USERS_ERROR:
      assign(NEW_STATE, { status: ERROR });
      return NEW_STATE;
    case CHANGE_USERS_PAGE:
      assign(NEW_STATE, { page: action.payload });
      return NEW_STATE;
    case CHANGE_USERS_FILTERS:
      assign(NEW_STATE, action.payload);
      return NEW_STATE;
    default:
      return state;
  }
};
