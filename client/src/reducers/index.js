import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "../reducers/authReducer";
import profile from "./profileReducer";

export default combineReducers({
  alert,
  auth,
  profile,
});
