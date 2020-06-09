import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./actionTypes";
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

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert("Post deleted", "success"));
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

// Add post
export const addPost = (formData) => async (dispatch) => {
  const body = JSON.stringify(formData);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.post("/api/posts", body, config);

    dispatch(setAlert("Post created", "success"));
    dispatch(getPosts());
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

// Get single post
export const getPost = (id) => async (dispatch) => {
  try {
    const resp = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
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

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const body = JSON.stringify(formData);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const resp = await axios.post(`/api/posts/comment/${postId}`, body, config);
    dispatch({
      type: ADD_COMMENT,
      payload: resp.data,
    });
    dispatch(setAlert("Comment added", "success"));
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

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment deleted", "success"));
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
