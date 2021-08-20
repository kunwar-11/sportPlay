import axios from "axios";
import { API_URL } from "./util";

export const loadLikedvideos = async (dispatch, token, userId, navigate) => {
  if (token) {
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      const {
        data: { likedVideos },
        status,
      } = await axios.get(`${API_URL}/likedvideos/${userId}`);
      if (status === 200) {
        dispatch({ type: "LOAD_LIKEDVIDEOS", payload: likedVideos });
        dispatch({ type: "STATUS", payload: "success" });
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        return navigate("/login");
      }
      console.log(error);
    }
  }
};
export const loadWatchlater = async (dispatch, token, userId, navigate) => {
  if (token) {
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      const {
        data: { watchlater },
        status,
      } = await axios.get(`${API_URL}/watchlater/${userId}`);
      if (status === 200) {
        dispatch({ type: "LOAD_WATCHLATER", payload: watchlater });
        dispatch({ type: "STATUS", payload: "success" });
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        return navigate("/login");
      }
      console.log(error);
    }
  }
};
export const loadPlaylists = async (dispatch, token, userId, navigate) => {
  if (token) {
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      const {
        data: { playlists },
        status,
      } = await axios.get(`${API_URL}/playlists/${userId}`);
      if (status === 200) {
        dispatch({ type: "LOAD_PLAYLIST", payload: playlists });
        dispatch({ type: "STATUS", payload: "success" });
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        return navigate("/login");
      }
      console.log(error);
    }
  }
};
export const loadHistory = async (dispatch, token, userId, navigate) => {
  if (token) {
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      const {
        data: { historyVideos },
        status,
      } = await axios.get(`${API_URL}/history/${userId}`);
      if (status === 200) {
        dispatch({ type: "LOAD_HISTORY", payload: historyVideos });
        dispatch({ type: "STATUS", payload: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
export const loadUnlikedvideos = async (dispatch, token, userId, navigate) => {
  if (token) {
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      const {
        data: { unlikedVideos },
        status,
      } = await axios.get(`${API_URL}/unlikedvideos/${userId}`);
      if (status === 200) {
        dispatch({ type: "LOAD_UNLIKEDVIDEOS", payload: unlikedVideos });
        dispatch({ type: "STATUS", payload: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  }
};
export const loadVideos = async (dispatch) => {
  try {
    dispatch({ type: "STATUS", payload: "loading" });
    const {
      data: { success, videos },
    } = await axios.get(`${API_URL}/videos`);
    if (success) {
      dispatch({ type: "LOAD_VIDEOS", payload: videos });
      dispatch({ type: "STATUS", payload: "success" });
    }
  } catch (error) {
    dispatch({ type: "STATUS", payload: "error" });
  }
};
