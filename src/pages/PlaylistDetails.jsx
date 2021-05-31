import React from "react";
import { useParams } from "react-router";
import { FooterBar, Sidebar } from "../components";
import PlaylistCard from "../components/PlaylistCard";
import { useData } from "../contexts/DataContext";
import { Link } from "react-router-dom";
export const PlaylistDetails = () => {
  const {
    state: { playlists },
  } = useData();
  const { playlistId } = useParams();
  const playlist = playlists.find((each) => each.id === Number(playlistId));
  return (
    <div className="home">
      <Sidebar />
      <div className="videoList">
        {playlist ? (
          playlist.list.length > 0 ? (
            playlist.list.map((each) => (
              <PlaylistCard
                each={each}
                key={each.playId}
                type={"REMOVE_FROM_PLAYLIST"}
                id={Number(playlistId)}
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
          )
        ) : (
          <div style={{ textAlign: "center" }}>
            <p>You Don't Have Any PlayList</p>
            <Link to="/">
              <button className="btn btn-secondary btn-primary">
                Back To SportTube
              </button>
            </Link>
          </div>
        )}
      </div>
      <FooterBar />
    </div>
  );
};
