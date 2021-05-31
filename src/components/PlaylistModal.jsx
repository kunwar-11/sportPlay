import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useData } from "../contexts/DataContext";
import "../styles/playlistmodal.css";
import { findVideo, isInPlayList } from "../util";
let id = 1234;
const PlaylistModal = ({ setOpenPlaylistModal }) => {
  const {
    state: { playlists, videos },
    dispatch,
  } = useData();
  const [addPLaylist, setAddPlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const { videoId } = useParams();
  const ref = useRef(null);
  const addNewPlaylist = (e) => {
    e.preventDefault();
    dispatch({
      type: "CREATE_PLAYLIST",
      payload: {
        id: ++id,
        name: playlistName,
        list: [findVideo(videoId, videos)],
      },
    });
    setPlaylistName("");
    setAddPlaylist(false);
  };
  const addOrRemovePlaylistHandler = (playlist) => {
    if (isInPlayList(playlist.list, videoId)) {
      return dispatch({
        type: "REMOVE_FROM_PLAYLIST",
        payload: { id: playlist.id, playId: videoId },
      });
    }
    return dispatch({
      type: "ADD_TO_PLAYLIST",
      payload: { video: findVideo(videoId, videos), id: playlist.id },
    });
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
            console.log(each);
            return (
              <form key={each.id} className="playlist">
                <input
                  type="checkbox"
                  checked={isInPlayList(each.list, videoId)}
                  onChange={() => addOrRemovePlaylistHandler(each)}
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
