import {
  CREATE_POST_BY_ID,
  CREATE_POST_BY_ID_SUCCSESS,
  CREATE_POSTS_ERROR,
} from "../../constants/actionTypes";
import { getSinglePostsQuery } from "../../queries";

export function getPostById(postId) {
  return dispatch => {
    dispatch({
      type: CREATE_POST_BY_ID,
    });
    return Promise.resolve(getSinglePostsQuery(postId))
      .then(value => {
        dispatch({
          type: CREATE_POST_BY_ID_SUCCSESS,
          payload: value.data,
        });
      })
      .catch(error => {
        console.warn("Загрузка постов не удалась. " + error);
        dispatch({
          type: CREATE_POSTS_ERROR,
        });
      });
  };
}
