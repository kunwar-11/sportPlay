import { createContext, useContext, useReducer } from "react";
import { dataReducerFunction } from "../reducers/dataReducer";
import { data } from "../data";
const DataContext = createContext();

const initialState = {
  videos: data(),
  likedVideos: [],
  unLikedVideos: [],
  watchLater: [],
  history: [],
  playlists: [],
  notes: [],
};

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducerFunction, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
