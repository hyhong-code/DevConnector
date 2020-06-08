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
