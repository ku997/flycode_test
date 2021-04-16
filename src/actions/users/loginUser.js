import { LOGIN, LOGIN_SUCCSESS, LOGIN_ERROR } from "../../constants/actionTypes";
import { login } from "../../queries";
import {cloneDeep, assign} from 'lodash'

export function loginUser (email, password) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN,
    });
    return await Promise.resolve(login(email, password)) 
      .then((value) => {
        let response = assign(cloneDeep(value.data), {email}, {id: 1});
        dispatch({
          type: LOGIN_SUCCSESS,
          payload: response,
        });
      })
      .catch((error) => {
          console.warn('Аутентификация не удалась. ' + error);
        dispatch({
            type: LOGIN_ERROR,
          });
      })
  };
}
