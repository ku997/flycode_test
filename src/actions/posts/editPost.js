import {
    EDIT_POST,
    EDIT_POST_SUCCSESS,
    EDIT_POSTS_ERROR,
  } from "../../constants/actionTypes";
  import { editPostQuery } from "../../queries";
  
  export function editPost(postId, title, body) {
    return (dispatch) => {
      dispatch({
        type: EDIT_POST,
      });
      Promise.resolve(editPostQuery(postId, title, body))
        .then(value => {
          dispatch({
            type: EDIT_POST_SUCCSESS,
            payload: value.data,
          });
        })
        .catch(error => {
          console.warn("Загрузка постов не удалась. " + error);
          dispatch({
            type: EDIT_POSTS_ERROR,
          });
        });
    };
  }
  