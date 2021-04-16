import {
  CREATE_POSTS,
  CREATE_POSTS_SUCCSESS,
  CREATE_POSTS_ERROR,
} from "../../constants/actionTypes";
import { getPostsQuery } from "../../queries";
import { assign } from "lodash";

export function getPosts() {
  return async (dispatch, getState) => {
    let posts = assign([], getState().posts.loadedPosts);
    dispatch({
      type: CREATE_POSTS,
    });
    if (getState().posts.loadedPosts.length === 0 || !getState().posts.isFull) {
      Promise.resolve(getPostsQuery())
        .then(value => {
          dispatch({
            type: CREATE_POSTS_SUCCSESS,
            payload: value.data,
          });
        })
        .catch(error => {
          console.warn("Загрузка постов не удалась. " + error);
          dispatch({
            type: CREATE_POSTS_ERROR,
          });
        });
    } else {
      dispatch({
        type: CREATE_POSTS_SUCCSESS,
        payload: posts,
      });
    }
  };
}
