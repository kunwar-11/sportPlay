import React from "react";
import ReactPlayer from "react-player";
import { useData } from "../contexts/DataContext";
import { VideoBar } from "./VideoBar";
import "../styles/videoplayer.css";
export const VideoPlayer = ({ video }) => {
  const { dispatch } = useData();
  const addToHistory = () => {
    dispatch({ type: "ADD_TO_HISTORY", payload: video });
    dispatch({ type: "INCREASE_VIEWS", payload: video._id });
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
