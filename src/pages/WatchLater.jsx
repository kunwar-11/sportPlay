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
      {status === "loading" && !watchLater && <h1>Loading...</h1>}
      {watchLater && (
        <>
          {watchLater.length > 0 ? (
            <div className="videoList">
              {watchLater.map((each) => (
                <PlaylistCard
                  each={each}
                  key={each._id}
                  type={"REMOVE_FROM_WATCHLATER"}
                  genre="watchlater"
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
