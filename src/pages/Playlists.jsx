import { Delete } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { FooterBar, Sidebar } from "../components";
import { useData } from "../contexts/DataContext";
import "../styles/playlist.css";
export const Playlists = () => {
  const {
    state: { playlists },
    dispatch,
  } = useData();
  return (
    <div className="home">
      <Sidebar />
      {playlists.length > 0 ? (
        <div className="videoList">
          {playlists.map((each) => (
            <div className="customPlaylist" key={each.id}>
              <Link to={`/playlists/${each.id}`} style={{ width: "inherit" }}>
                <img
                  src={
                    each.list.length > 0
                      ? each.list[0].thumbnail
                      : "https://i.etsystatic.com/19974575/d/il/2277bb/2285197080/il_340x270.2285197080_94j9.jpg?version=0"
                  }
                  alt="thumbnail"
                />
              </Link>
              <div className="customPlaylist-details">
                <h4>{each.name}</h4>
                <div className="divider"></div>
                <div className="customPlaylist-info">
                  {each.list.length > 0 ? (
                    <p>
                      {`${each.list.length} ${
                        each.list.length === 1 ? "Video" : "Videos"
                      }`}
                    </p>
                  ) : (
                    <p>playlist is empty</p>
                  )}
                  <div>
                    <Delete
                      onClick={() =>
                        dispatch({
                          type: "DELETE_PLAYLIST",
                          payload: each.id,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p>You Don't have any playlists</p>
          <Link to="/">
            <button className="btn btn-secondary btn-primary">
              Back To SportTube
            </button>
          </Link>
        </div>
      )}
      <FooterBar />
    </div>
  );
};
