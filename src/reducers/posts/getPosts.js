import {
  CREATE_POSTS,
  CREATE_POSTS_SUCCSESS,
  CREATE_POSTS_ERROR,
  EDIT_POST,
  EDIT_POST_SUCCSESS,
  EDIT_POSTS_ERROR,
  CREATE_POST_BY_ID,
  CREATE_POST_BY_ID_SUCCSESS,
  READY,
  LOADING,
  ERROR,
  GET_CURRENT_POST_ID,
  DELETE_POST,
  CREATE_POST,
  CREATE_POST_SUCCSESS,
  CREATE_POST_ERROR,
} from "../../constants/actionTypes";
import { assign, cloneDeep, filter, map, concat } from "lodash";

const INITIAL_STATE = { loadedPosts: [], isFull: false, currentPost: -1 };

export const getPosts = (state = INITIAL_STATE, action) => {
  let newState = cloneDeep(state);
  switch (action.type) {
    case CREATE_POSTS:
      assign(newState, { status: LOADING });
      return newState;
    case CREATE_POST_BY_ID:
      assign(newState, { status: LOADING });
      return newState;
    case CREATE_POST_BY_ID_SUCCSESS: {
      let post = concat(newState.loadedPosts,[action.payload]);
      assign(newState, { loadedPosts: post, status: READY });
      return newState;
    }
    case CREATE_POSTS_SUCCSESS:
      assign(newState, {
        loadedPosts: action.payload,
        status: READY,
        isFull: true,
      });
      return newState;
    case CREATE_POSTS_ERROR:
      assign(newState, { loadedPosts: [], status: ERROR });
      return newState;
    case GET_CURRENT_POST_ID:
      assign(newState, { currentPost: action.payload });
      return newState;
    case DELETE_POST:
      newState.loadedPosts = filter(newState.loadedPosts, post => {
        if (post.id !== +action.payload) return post;
      });
      return newState;
    case EDIT_POST:
      assign(newState, { status: LOADING });
      return newState;
    case EDIT_POST_SUCCSESS:
      assign(newState, {
        loadedPosts: map(newState.loadedPosts, post => {
          if (post.id == action.payload.id) post = action.payload;
          return post;
        }),
        status: READY,
      });
      return newState;
    case EDIT_POSTS_ERROR:
      assign(newState, { status: ERROR });
      return newState;
    case CREATE_POST:
      assign(newState, { status: LOADING });
      return newState;
    case CREATE_POST_SUCCSESS:
      {
        assign(action.payload, {id:Math.random()})
        let posts = concat([action.payload], newState.loadedPosts);
        Object.assign(newState, { loadedPosts: posts, status: READY });
      }
      return newState;
    case CREATE_POST_ERROR:
      assign(newState, { status: ERROR });
      return newState;
    default:
      return state;
  }
};
