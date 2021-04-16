import { GET_CURRENT_POST_ID } from "../../constants/actionTypes";

export function getCurrentPostId(postId) {
    return {
      type: GET_CURRENT_POST_ID,
      payload: postId,
    }
}