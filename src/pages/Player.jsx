import React, { useEffect } from "react";
import { useParams } from "react-router";
import { VideoPlayer, Notes, FooterBar } from "../components";
import axios from "axios";
import "../styles/player.css";
import { API_URL } from "../util";
import { useState } from "react";
import { useData } from "../contexts/DataContext";
export const Player = () => {
  const { videoId } = useParams();
  const {
    state: { status },
    dispatch,
  } = useData();
  const [video, setVideo] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "STATUS", payload: "loading" });
        const {
          data: { success, video },
        } = await axios.get(`${API_URL}/videos/${videoId}`);
        if (success) {
          setVideo(video);
          dispatch({ type: "STATUS", payload: "success" });
        }
      } catch (error) {
        dispatch({ type: "STATUS", payload: "error" });
      }
    })();
  }, [dispatch, videoId]);
  console.log(status);
  console.log(video);
  return (
    <div className="player">
      {status === "loading" && <h1>Loading...</h1>}
      {video && (
        <>
          <VideoPlayer video={video} />
          <Notes video={video} />
          <FooterBar />
        </>
      )}
    </div>
  );
};
