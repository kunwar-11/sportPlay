import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FooterBar, Sidebar } from "../components";
import PlaylistCard from "../components/PlaylistCard";
import { useData } from "../contexts/DataContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../util";
import { useAuth } from "../contexts/AuthContext";
export const PlaylistDetails = () => {
  const {
    state: { status },
    dispatch,
  } = useData();
  const {
    state: { userId },
  } = useAuth();
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "STATUS", payload: "loading" });
        const {
          data: { playlist },
        } = await axios.get(`${API_URL}/playlists/${userId}/${playlistId}`);
        setPlaylist(playlist);
        dispatch({ type: "STATUS", payload: "success" });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [playlistId, userId, dispatch]);
  return (
    <div className="home">
      <Sidebar />
      {status === "loading" && <h1>Loading...</h1>}
      <div className="videoList">
        {playlist && status === "success" && (
          <>
            {playlist.videos.length > 0 ? (
              playlist.videos.map((each) => (
                <PlaylistCard
                  each={each}
                  key={each._id}
                  type={"REMOVE_FROM_PLAYLIST"}
                  id={playlistId}
                />
              ))
            ) : (
              <div style={{ textAlign: "center" }}>
                <p>PlayList Is Empty</p>
                <Link to="/">
                  <button className="btn btn-secondary btn-primary">
                    Back To SportTube
                  </button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
      <FooterBar />
    </div>
  );
};
