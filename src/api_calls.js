import axios from "axios";
import { API_URL, isInPlayList } from "./util";

//LOADING DATAS
export const loadVideos = async (dispatch, token) => {
  try {
    if (!token) dispatch({ type: "STATUS", payload: "loading" });
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

//ADDING TO BACKEND(POST REQ)

export const addToLikedVideos = async ({
  dispatch,
  token,
  userId,
  videoId,
  unLikedVideos,
  navigate,
}) => {
  if (token) {
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      if (isInPlayList(unLikedVideos, videoId)) {
        const {
          data: { success, video },
        } = await axios.delete(`${API_URL}/unlikedvideos/${userId}/${videoId}`);
        if (success) {
          console.log(video);
        }
      }
      const {
        data: { video },
        status,
      } = await axios.post(`${API_URL}/likedvideos/${userId}`, {
        videoId,
      });
      if (status === 201) {
        dispatch({
          type: "ADD_TO_LIKED_VIDEOS",
          payload: video,
        });
        dispatch({ type: "STATUS", payload: "success" });
      }
      return;
    } catch (error) {
      console.log(error);
      dispatch({ type: "STATUS", payload: "error" });
    }
    return navigate("/login");
  }
};

export const addToUnlikedVideos = async ({
  dispatch,
  token,
  userId,
  videoId,
  likedVideos,
  navigate,
}) => {
  if (token) {
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      if (isInPlayList(likedVideos, videoId)) {
        const {
          data: { success, video },
        } = await axios.delete(`${API_URL}/likedvideos/${userId}/${videoId}`);
        if (success) {
          console.log(video);
        }
      }
      const {
        data: { video },
        status,
      } = await axios.post(`${API_URL}/unlikedvideos/${userId}`, {
        videoId,
      });
      if (status === 201) {
        dispatch({
          type: "ADD_TO_UNLIKED_VIDEOS",
          payload: video,
        });
        dispatch({ type: "STATUS", payload: "success" });
      }
      return;
    } catch (error) {
      console.log(error);
      dispatch({ type: "STATUS", payload: "error" });
    }
    return navigate("/login");
  }
};

export const addToWatchLater = async ({
  dispatch,
  navigate,
  token,
  userId,
  videoId,
}) => {
  if (token) {
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      const {
        data: { video },
        status,
      } = await axios.post(`${API_URL}/watchlater/${userId}`, {
        videoId,
      });
      if (status === 201) {
        dispatch({ type: "ADD_TO_WATCHLATER", payload: video });
        dispatch({ type: "STATUS", payload: "success" });
      }
      return;
    } catch (error) {
      console.log(error);
      dispatch({ type: "STATUS", payload: "error" });
    }
  }
  return navigate("/login");
};
