import {
    CREATE_USERS,
    CREATE_USERS_SUCCSESS,
    CREATE_USERS_ERROR,
    LOADING,
    ERROR,
    READY,
  } from "../../constants/actionTypes";
  
  import { cloneDeep, assign } from "lodash";
  const INITIAL_STATE = {loadedUsers:[]};
  
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
        Object.assign(NEW_STATE, { status: ERROR });
        return NEW_STATE;
      default:
        return state;
    }
  };
  