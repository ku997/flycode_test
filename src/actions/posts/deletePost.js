import { DELETE_POST } from "../../constants/actionTypes";

export function deletePost (payload) {
  return (dispatch) => {
    dispatch({
      type: DELETE_POST,
      payload
    });

  }   
}