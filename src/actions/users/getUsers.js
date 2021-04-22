import {
  CREATE_USERS,
  CREATE_USERS_SUCCSESS,
  CREATE_USERS_ERROR,
} from "../../constants/actionTypes";
import { getUsersQuery } from "../../queries";
import { assign } from "lodash";

export function getUsers() {
  return (dispatch, getState) => {
    let users = assign([], getState().users.loadedUsers);
    dispatch({
      type: CREATE_USERS,
    });
    if (getState().users.loadedUsers.length === 0) {
      Promise.resolve(getUsersQuery())
        .then(value => {
          dispatch({
            type: CREATE_USERS_SUCCSESS,
            payload: value.data,
          });
        })
        .catch(error => {
          console.warn("Загрузка постов не удалась. " + error);
          dispatch({
            type: CREATE_USERS_ERROR,
          });
        });
    } else {
      dispatch({
        type: CREATE_USERS_SUCCSESS,
        payload: users,
      });
    }
  };
}
