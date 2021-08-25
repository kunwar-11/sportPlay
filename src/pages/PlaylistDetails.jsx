import React, { useEffect } from "react";
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
    state: { status, currentPlaylist },
    dispatch,
  } = useData();
  const {
    state: { userId },
  } = useAuth();
  const { playlistId } = useParams();
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "STATUS", payload: "loading" });
        const {
          data: { playlist },
        } = await axios.get(`${API_URL}/playlists/${userId}/${playlistId}`);
        dispatch({ type: "CURRENT_PLAYLIST", payload: playlist });
        dispatch({ type: "STATUS", payload: "success" });
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      dispatch({ type: "PLAYLIST_DETAILS_CLEANUP" });
    };
  }, [playlistId, userId, dispatch]);
  return (
    <div className="home">
      <Sidebar />
      {status === "loading" && !currentPlaylist && <h1>Loading...</h1>}
      <div className="videoList">
        {currentPlaylist && (
          <>
            {currentPlaylist.videos.length > 0 ? (
              currentPlaylist.videos.map((each) => (
                <PlaylistCard
                  each={each}
                  key={each._id}
                  type={"REMOVE_FROM_PLAYLIST"}
                  playlistId={playlistId}
                  genre="playlists"
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
