import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import "../styles/playlistmodal.css";
import { API_URL, findVideo, isInPlayList } from "../util";
const PlaylistModal = ({ setOpenPlaylistModal }) => {
  const {
    state: { playlists, videos },
    dispatch,
  } = useData();
  const navigate = useNavigate();
  const [addPLaylist, setAddPlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const { videoId } = useParams();
  const {
    state: { token, userId },
  } = useAuth();
  const ref = useRef(null);
  const addNewPlaylist = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        dispatch({ type: "STATUS", payload: "loading" });
        const {
          data: { playlist },
          status,
        } = await axios.post(`${API_URL}/playlists/${userId}`, {
          name: playlistName,
          videoId,
        });
        if (status === 201) {
          dispatch({ type: "CREATE_PLAYLIST", payload: playlist });
          dispatch({ type: "STATUS", payload: "success" });
          setPlaylistName("");
          setAddPlaylist(false);
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: "STATUS", payload: "error" });
      }
      return;
    }
    return navigate("/login");
  };
  const addOrRemovePlaylistHandler = async (playlist) => {
    if (isInPlayList(playlist.videos, videoId)) {
      try {
        dispatch({ type: "STATUS", payload: "loading" });
        const {
          data: { playlistId, success },
        } = await axios.delete(
          `${API_URL}/playlists/${userId}/${playlist._id}/${videoId}`
        );
        if (success) {
          dispatch({
            type: "REMOVE_FROM_PLAYLIST",
            payload: { videoId, playlistId },
          });
          dispatch({ type: "STATUS", payload: "success" });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: "STATUS", payload: "error" });
      }
      return;
    }
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      const { data, status } = await axios.post(
        `${API_URL}/playlists/${userId}/${playlist._id}`,
        {
          videoId,
        }
      );
      if (status === 201) {
        dispatch({
          type: "ADD_TO_PLAYLIST",
          payload: {
            playlistId: playlist._id,
            video: findVideo(data.videoId, videos),
          },
        });
        dispatch({ type: "STATUS", payload: "success" });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "STATUS", payload: "error" });
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenPlaylistModal(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setOpenPlaylistModal]);
  return (
    <div className="playlist__modal" ref={ref}>
      <div className="modal__header">
        <h3>PlayLists</h3>
        <div className="modal__close">
          <i
            className="fas fa-times"
            onClick={() => setOpenPlaylistModal(false)}
          ></i>
        </div>
      </div>
      <div className="divider"></div>
      <div className="modal__body">
        {playlists.length > 0 && !addPLaylist ? (
          playlists.map((each) => {
            return (
              <form key={each._id} className="playlist">
                <input
                  type="checkbox"
                  checked={isInPlayList(each.videos, videoId)}
                  onChange={() =>
                    token
                      ? addOrRemovePlaylistHandler(each)
                      : navigate("/login")
                  }
                />
                <label>{each.name}</label>
              </form>
            );
          })
        ) : (
          <form onSubmit={addNewPlaylist} className="newPLaylist">
            <input
              type="text"
              className="inputText"
              placeholder="enter your playlist name..."
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              +
            </button>
          </form>
        )}
      </div>
      <div className="divider"></div>
      <div className="modal__footer">
        <button
          className="btn btn-primary-success"
          onClick={() => setAddPlaylist(true)}
        >
          Add New PLaylist
        </button>
      </div>
    </div>
  );
};

export default PlaylistModal;
