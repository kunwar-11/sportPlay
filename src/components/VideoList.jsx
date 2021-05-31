import React from "react";
import { useData } from "../contexts/DataContext";
import VideoCard from "./VideoCard";
import "../styles/videolist.css";
export const VideoList = () => {
  const {
    state: { videos },
  } = useData();
  return (
    <div className="videoList">
      {videos.map((each) => (
        <VideoCard each={each} key={each.playId} />
      ))}
    </div>
  );
};
