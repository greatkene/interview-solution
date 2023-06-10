import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "./useReducer";

const rootReducer = combineReducers({
  users: usersReducer,
});

export default rootReducer;
