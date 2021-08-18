import { createContext, useContext, useReducer } from "react";
import { dataReducerFunction } from "../reducers/dataReducer";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../util";
const DataContext = createContext();

const initialState = {
  videos: null,
  likedVideos: [],
  unLikedVideos: [],
  watchLater: [],
  history: [],
  playlists: [],
  notes: [],
  status: "",
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducerFunction, initialState);
  useEffect(() => {
    (async () => {
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
    })();
  }, []);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
