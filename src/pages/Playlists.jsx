import { Delete } from "@material-ui/icons";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FooterBar, Sidebar } from "../components";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import "../styles/playlist.css";
import { API_URL } from "../util";
export const Playlists = () => {
  const {
    state: { playlists, status },
    dispatch,
  } = useData();
  const {
    state: { userId, token },
  } = useAuth();
  const deletePlaylist = async (playlistId) => {
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      const {
        data,
        data: { success },
      } = await axios.delete(`${API_URL}/playlists/${userId}/${playlistId}`);
      if (success) {
        dispatch({ type: "DELETE_PLAYLIST", payload: data.playlistId });
        dispatch({ type: "STATUS", payload: "success" });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "STATUS", payload: "error" });
    }
  };
  const navigate = useNavigate();
  return (
    <div className="home">
      <Sidebar />
      {status === "loading" && !playlists && <h1>Loading...</h1>}
      {playlists && (
        <>
          {playlists.length > 0 ? (
            <div className="videoList">
              {playlists.map((each) => (
                <div className="customPlaylist" key={each._id}>
                  <Link
                    to={`/playlists/${each._id}`}
                    style={{ width: "inherit" }}
                  >
                    <img
                      src={
                        each.videos.length > 0
                          ? each.videos[0].thumbnail
                          : "https://i.etsystatic.com/19974575/d/il/2277bb/2285197080/il_340x270.2285197080_94j9.jpg?version=0"
                      }
                      alt="thumbnail"
                    />
                  </Link>
                  <div className="customPlaylist-details">
                    <h4>{each.name}</h4>
                    <div className="divider"></div>
                    <div className="customPlaylist-info">
                      {each.videos.length > 0 ? (
                        <p>
                          {`${each.videos.length} ${
                            each.videos.length === 1 ? "Video" : "Videos"
                          }`}
                        </p>
                      ) : (
                        <p>playlist is empty</p>
                      )}
                      <div>
                        <Delete
                          onClick={() =>
                            token
                              ? deletePlaylist(each._id)
                              : navigate("/login")
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
        </>
      )}
      <FooterBar />
    </div>
  );
};
