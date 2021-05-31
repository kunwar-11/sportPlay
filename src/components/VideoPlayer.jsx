import React from "react";
import ReactPlayer from "react-player";
import { useData } from "../contexts/DataContext";
import { findVideo } from "../util";
import { VideoBar } from "./VideoBar";
import "../styles/videoplayer.css";
export const VideoPlayer = ({ videoId }) => {
  const {
    dispatch,
    state: { videos },
  } = useData();
  const addToHistory = () => {
    dispatch({ type: "ADD_TO_HISTORY", payload: findVideo(videoId, videos) });
    dispatch({ type: "INCREASE_VIEWS", payload: videoId });
  };
  console.log(findVideo(videoId, videos));
  return (
    <div className="videoPlayer">
      <div className="player-wrapper">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          className="react-player"
          controls
          width="100%"
          height="100%"
          playing
          onStart={addToHistory}
        />
      </div>
      <VideoBar videoId={videoId} />
    </div>
  );
};
