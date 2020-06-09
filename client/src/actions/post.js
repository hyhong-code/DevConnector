import { GET_POSTS, POST_ERROR, PROFILE_ERROR } from "./actionTypes";
import axios from "axios";
import { setAlert } from "./alert";

export const getPosts = () => async (dispatch) => {
  try {
    const resp = await axios.get("/api/posts");
    dispatch({
      type: GET_POSTS,
      payload: resp.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};
