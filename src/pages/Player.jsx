import React, { useEffect } from "react";
import { useParams } from "react-router";
import { VideoPlayer, Notes, FooterBar } from "../components";
import axios from "axios";
import "../styles/player.css";
import { API_URL } from "../util";
import { useState } from "react";
import { useData } from "../contexts/DataContext";
import { useAuth } from "../contexts/AuthContext";
export const Player = () => {
  const { videoId } = useParams();
  const {
    state: { status },
    dispatch,
  } = useData();
  const {
    state: { userId },
  } = useAuth();
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
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "STATUS", payload: "loading" });
        const {
          data: {
            notes: { notes },
          },
          status,
        } = await axios.get(`${API_URL}/notes/${userId}`);
        if (status === 200) {
          dispatch({ type: "LOAD_NOTES", payload: notes });
          dispatch({ type: "STATUS", payload: "success" });
        }
      } catch (error) {
        dispatch({ type: "STATUS", payload: "error" });
      }
    })();
  }, [dispatch, userId]);
  return (
    <div className="player">
      {status === "loading" && !video && <h1>Loading...</h1>}
      {video && (
        <>
          <VideoPlayer video={video} />
          <Notes videoId={video._id} />
          <FooterBar />
        </>
      )}
    </div>
  );
};
