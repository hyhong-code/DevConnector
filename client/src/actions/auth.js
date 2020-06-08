import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "../actions/acitonTypes";
import axios from "axios";
import { setAlert } from "../actions/alert";
import setAuthToken from "../utils/setAuthToken";

// load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    // set global token header if there is a token
    setAuthToken(localStorage.token);
  }

  try {
    const resp = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: resp.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
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
      payload: resp.data,
    });

    // Load user after successful register
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors; // get the errors array
    if (errors.length) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const newUser = { email, password };
  const body = JSON.stringify(newUser);
  try {
    const resp = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: resp.data,
    });

    // load user after successful login
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors; // get the errors array
    if (errors.length) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout user
export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
