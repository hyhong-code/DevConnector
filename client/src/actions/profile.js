import { GET_PROFILE, PROFILE_ERROR } from "./acitonTypes";
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
