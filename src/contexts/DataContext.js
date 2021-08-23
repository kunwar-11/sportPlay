import { createContext, useContext, useReducer } from "react";
import { dataReducerFunction } from "../reducers/dataReducer";
import { useEffect } from "react";
import {
  loadHistory,
  loadLikedvideos,
  loadPlaylists,
  loadUnlikedvideos,
  loadVideos,
  loadWatchlater,
} from "../api_calls";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
const DataContext = createContext();

const initialState = {
  videos: null,
  likedVideos: null,
  unLikedVideos: null,
  watchLater: null,
  history: null,
  playlists: null,
  notes: [],
  status: "",
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducerFunction, initialState);
  const navigate = useNavigate();
  const {
    state: { userId, token },
  } = useAuth();
  useEffect(() => {
    loadVideos(dispatch, token);
    loadLikedvideos(dispatch, token, userId, navigate);
    loadUnlikedvideos(dispatch, token, userId, navigate);
    loadPlaylists(dispatch, token, userId, navigate);
    loadWatchlater(dispatch, token, userId, navigate);
    loadHistory(dispatch, token, userId, navigate);
  }, [navigate, token, userId]);
  // useEffect(() => {
  //   (async () => {
  //     if (token) {
  //       try {
  //         dispatch({ type: "STATUS", payload: "loading" });
  //         const {
  //           data: { likedVideos },
  //           status,
  //         } = await axios.get(`${API_URL}/likedvideos/${userId}`);
  //         if (status === 200) {
  //           dispatch({ type: "LOAD_LIKEDVIDEOS", payload: likedVideos });
  //           dispatch({ type: "STATUS", payload: "success" });
  //         }
  //       } catch (error) {
  //         if (error?.response?.status === 401) {
  //           return navigate("/login");
  //         }
  //         console.log(error);
  //       }
  //     }
  //   })();
  // }, [token, userId, navigate]);
  // useEffect(() => {
  //   (async () => {
  //     if (token) {
  //       try {
  //         dispatch({ type: "STATUS", payload: "loading" });
  //         const {
  //           data: { watchlater },
  //           status,
  //         } = await axios.get(`${API_URL}/watchlater/${userId}`);
  //         if (status === 200) {
  //           dispatch({ type: "LOAD_WATCHLATER", payload: watchlater });
  //           dispatch({ type: "STATUS", payload: "success" });
  //         }
  //       } catch (error) {
  //         if (error?.response?.status === 401) {
  //           return navigate("/login");
  //         }
  //         console.log(error);
  //       }
  //     }
  //   })();
  // }, [token, userId, navigate]);
  // useEffect(() => {
  //   (async () => {
  //     if (token) {
  //       try {
  //         dispatch({ type: "STATUS", payload: "loading" });
  //         const {
  //           data: { playlists },
  //           status,
  //         } = await axios.get(`${API_URL}/playlists/${userId}`);
  //         if (status === 200) {
  //           dispatch({ type: "LOAD_PLAYLIST", payload: playlists });
  //           dispatch({ type: "STATUS", payload: "success" });
  //         }
  //       } catch (error) {
  //         if (error?.response?.status === 401) {
  //           return navigate("/login");
  //         }
  //         console.log(error);
  //       }
  //     }
  //   })();
  // }, [token, userId, navigate]);
  // useEffect(() => {
  //   (async () => {
  //     if (token) {
  //       try {
  //         dispatch({ type: "STATUS", payload: "loading" });
  //         const {
  //           data: { historyVideos },
  //           status,
  //         } = await axios.get(`${API_URL}/history/${userId}`);
  //         if (status === 200) {
  //           dispatch({ type: "LOAD_HISTORY", payload: historyVideos });
  //           dispatch({ type: "STATUS", payload: "success" });
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   })();
  // }, [token, userId]);
  // useEffect(() => {
  //   (async () => {
  //     if (token) {
  //       try {
  //         dispatch({ type: "STATUS", payload: "loading" });
  //         const {
  //           data: { unlikedVideos },
  //           status,
  //         } = await axios.get(`${API_URL}/unlikedvideos/${userId}`);
  //         if (status === 200) {
  //           dispatch({ type: "LOAD_UNLIKEDVIDEOS", payload: unlikedVideos });
  //           dispatch({ type: "STATUS", payload: "success" });
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   })();
  // }, [token, userId]);
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       dispatch({ type: "STATUS", payload: "loading" });
  //       const {
  //         data: { success, videos },
  //       } = await axios.get(`${API_URL}/videos`);
  //       if (success) {
  //         dispatch({ type: "LOAD_VIDEOS", payload: videos });
  //         dispatch({ type: "STATUS", payload: "success" });
  //       }
  //     } catch (error) {
  //       dispatch({ type: "STATUS", payload: "error" });
  //     }
  //   })();
  // }, []);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
