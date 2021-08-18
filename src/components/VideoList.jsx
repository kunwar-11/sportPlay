import React from "react";
import { useData } from "../contexts/DataContext";
import VideoCard from "./VideoCard";
import "../styles/videolist.css";
export const VideoList = () => {
  const {
    state: { videos, status },
  } = useData();
  return (
    <div className="videoList">
      {status === "loading" && <h1>Loading...</h1>}
      {videos && videos.map((each) => <VideoCard each={each} key={each._id} />)}
    </div>
  );
};
