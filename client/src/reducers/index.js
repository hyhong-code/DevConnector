import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "../reducers/authReducer";

export default combineReducers({
  alert,
  auth,
});
