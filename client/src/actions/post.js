import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./actionTypes";
import axios from "axios";
import { setAlert } from "./alert";

// Get all posts
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

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const resp = await axios.put(`/api/posts/like/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, like: resp.data },
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

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const resp = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, like: resp.data },
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
