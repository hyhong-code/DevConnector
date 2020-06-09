import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
} from "./actionTypes";
import axios from "axios";
import { setAlert } from "./alert";

// Get current users profile
export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
      },
    });
  }
};

// Create or update profile
// @params: history - history object, for redirecting upon finish
// @params: update = boolean value indicating updating or creating profile
export const createProfile = (formData, history, update = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ ...formData });
    const resp = await axios.post("/api/profile", body, config);
    dispatch({
      type: GET_PROFILE,
      payload: resp.data,
    });

    dispatch(
      setAlert(update ? "Profile updated" : "Profile created", "success")
    );

    if (!update) {
      history.push("/dashboard");
    }
  } catch (error) {
    const errors = error.response.data.errors; // get the errors array
    if (errors.length) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
      },
    });
  }
};

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ ...formData });
    const resp = await axios.put("/api/profile/experience", body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: resp.data,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors; // get the errors array
    if (errors.length) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
      },
    });
  }
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ ...formData });
    const resp = await axios.put("/api/profile/education", body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: resp.data,
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors; // get the errors array

    if (errors.length) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
      },
    });
  }
};

// Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    console.log("clicked");
    const resp = await axios.delete(`/api/profile/experience/${id}`);

    console.log(resp);
    dispatch({
      type: UPDATE_PROFILE,
      payload: resp.data,
    });

    dispatch(setAlert("Experience removed"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
      },
    });
  }
};

// Delete experience
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const resp = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: resp.data,
    });

    dispatch(setAlert("Education removed"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
      },
    });
  }
};

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can not be undone!")) {
    try {
      const resp = await axios.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("You account has been permanantly deleted"));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.data.msg,
          status: error.response.status,
        },
      });
    }
  }
};
