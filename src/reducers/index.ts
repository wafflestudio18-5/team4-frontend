import { isLoggedReducer, userInfoReducer } from "./authReducer";
import { combineReducers } from "redux";

export default combineReducers({
  isLoggedReducer,
  userInfoReducer,
});
