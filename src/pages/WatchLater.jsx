import React from "react";
import { Link } from "react-router-dom";
import { FooterBar, Sidebar } from "../components";
import PlaylistCard from "../components/PlaylistCard";
import { useData } from "../contexts/DataContext";

export const WatchLater = () => {
  const {
    state: { watchLater, status },
  } = useData();

  return (
    <div className="home">
      <Sidebar />
      {status === "loading" && <h1>Loading...</h1>}
      {watchLater && status === "success" && (
        <>
          {watchLater.length > 0 ? (
            <div className="videoList">
              {watchLater.map((each, index) => (
                <PlaylistCard
                  each={each}
                  key={index}
                  type={"REMOVE_FROM_WATCHLATER"}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p>Nothing In your WatchLater Playlist</p>
              <Link to="/">
                <button className="btn btn-secondary btn-primary">
                  Back To SportTube
                </button>
              </Link>
            </div>
          )}
        </>
      )}
      <FooterBar />
    </div>
  );
};
