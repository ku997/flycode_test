import { combineReducers } from "redux";
import {loginUser} from './user/loginUser'
import { getPosts } from "./posts/getPosts";
import { getPagState} from './pagination/getPagState'
export const rootReducer = combineReducers({
    authUser: loginUser,
    posts: getPosts,
    pagState: getPagState
});
