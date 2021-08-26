import React from "react";
import ReactPlayer from "react-player";
import { useData } from "../contexts/DataContext";
import { VideoBar } from "./VideoBar";
import "../styles/videoplayer.css";
import axios from "axios";
import { API_URL } from "../util";
import { useAuth } from "../contexts/AuthContext";
export const VideoPlayer = ({ video }) => {
  const { dispatch } = useData();
  const {
    state: { userId },
  } = useAuth();
  const addToHistory = async () => {
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      const { data, status } = await axios.post(
        `${API_URL}/history/${userId}`,
        {
          videoId: video._id,
        }
      );
      dispatch({ type: "INCREASE_VIEWS", payload: video._id });
      if (status === 201) {
        dispatch({ type: "ADD_TO_HISTORY", payload: data.video });
        dispatch({ type: "STATUS", payload: "success" });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "STATUS", payload: "error" });
    }
  };
  return (
    <div className="videoPlayer">
      <div className="player-wrapper">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video._id}`}
          className="react-player"
          controls
          width="100%"
          height="100%"
          playing
          onStart={addToHistory}
        />
      </div>
      <VideoBar video={video} />
    </div>
  );
};
