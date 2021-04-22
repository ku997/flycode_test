import { combineReducers } from "redux";
import { getUsers } from "./user/getUsers";
import { getPosts } from "./posts/getPosts";
import { getPagState } from "./pagination/getPagState";
export const rootReducer = combineReducers({
  users: getUsers,
  posts: getPosts,
  pagState: getPagState,
});
