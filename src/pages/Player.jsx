import React from "react";
import { useParams } from "react-router";
import { VideoPlayer, Notes, FooterBar } from "../components";
import "../styles/player.css";
export const Player = () => {
  const { videoId } = useParams();
  return (
    <div className="player">
      <VideoPlayer videoId={videoId} />
      <Notes videoId={videoId} />
      <FooterBar />
    </div>
  );
};
