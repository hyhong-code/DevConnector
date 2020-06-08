import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
} from "../actions/acitonTypes";
import axios from "axios";
import { setAlert } from "../actions/alert";

export const loadUser = () => async (dispatch) => {};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const newUser = { name, email, password };
  const body = JSON.stringify(newUser);
  try {
    const resp = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        token: resp.data,
      },
    });
  } catch (error) {
    const errors = error.response.data.errors; // get the errors array
    console.log(error.response);
    if (errors.length) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger"))); // *****
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
