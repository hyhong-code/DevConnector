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
    console.error(error.message);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
