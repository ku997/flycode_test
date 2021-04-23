import {
  CREATE_USERS,
  CREATE_USERS_SUCCSESS,
  CREATE_USERS_ERROR,
} from "../../constants/actionTypes";
import { getUsersQuery } from "../../queries";
import { map, assign } from "lodash";

export function getUsers(page) {
  return dispatch => {
    dispatch({
      type: CREATE_USERS,
    });
    Promise.resolve(getUsersQuery(page))
      .then(value => {
        let data = map(value.data.data, user => {
          user.key = user.id;
          return user;
        });
        let response = assign(value.data, { data });
        dispatch({
          type: CREATE_USERS_SUCCSESS,
          payload: response,
        });
      })
      .catch(error => {
        console.warn("Загрузка постов не удалась. " + error);
        dispatch({
          type: CREATE_USERS_ERROR,
        });
      });
  };
}
