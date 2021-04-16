import {
  CREATE_POST,
  CREATE_POST_SUCCSESS,
  CREATE_POST_ERROR,
} from "../../constants/actionTypes";
import { createPostQuery } from "../../queries";

export function createPost(userId, title, body) {
  return dispatch => {
    dispatch({
      type: CREATE_POST,
    });
    Promise.resolve(createPostQuery(userId, title, body))
      .then(value => {
        dispatch({
          type: CREATE_POST_SUCCSESS,
          payload: value.data,
        });
      })
      .catch(error => {
        console.warn("Не удалось создать пост. " + error);
        dispatch({
          type: CREATE_POST_ERROR,
        });
      });
  };
}
