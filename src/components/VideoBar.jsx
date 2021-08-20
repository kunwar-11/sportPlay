import React, { useState } from "react";
import {
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  ThumbUp,
  ThumbDown,
  WatchLaterOutlined,
  WatchLater,
  PlaylistAdd,
} from "@material-ui/icons";
import { isInPlayList } from "../util";
import "../styles/videobar.css";
import { useData } from "../contexts/DataContext";
import PlaylistModal from "./PlaylistModal";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export const VideoBar = ({ video }) => {
  const { title, views, date, _id } = video;
  const {
    state: { likedVideos, watchLater, unLikedVideos },
    dispatch,
  } = useData();
  const {
    state: { token },
  } = useAuth();
  const navigate = useNavigate();

  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  return (
    <div className="videoBar">
      <div className="videoTitle">
        <h3>{title}</h3>
      </div>
      <div className="videoOptions">
        <div className="videoDetail">
          <p>
            {`${views} views`} . {date}
          </p>
        </div>
        <div className="videoLikeBar">
          {likedVideos && isInPlayList(likedVideos, _id) ? (
            <ThumbUp
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: _id })
              }
            />
          ) : (
            <ThumbUpAltOutlined
              onClick={() => {
                token
                  ? dispatch({
                      type: "ADD_TO_LIKED_VIDEOS",
                      payload: video,
                    })
                  : navigate("/login");
              }}
            />
          )}
          {unLikedVideos && isInPlayList(unLikedVideos, _id) ? (
            <ThumbDown
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_UNLIKED_VIDEOS",
                  payload: _id,
                });
              }}
            />
          ) : (
            <ThumbDownAltOutlined
              onClick={() => {
                token
                  ? dispatch({
                      type: "ADD_TO_UNLIKED_VIDEOS",
                      payload: video,
                    })
                  : navigate("/login");
              }}
            />
          )}
          {watchLater && isInPlayList(watchLater, _id) ? (
            <WatchLater
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_WATCHLATER", payload: _id })
              }
            />
          ) : (
            <WatchLaterOutlined
              onClick={() => {
                token
                  ? dispatch({
                      type: "ADD_TO_WATCHLATER",
                      payload: video,
                    })
                  : navigate("/login");
              }}
            />
          )}
          <PlaylistAdd
            onClick={() =>
              token ? setOpenPlaylistModal(true) : navigate("/login")
            }
          />
        </div>
      </div>
      {openPlaylistModal && (
        <PlaylistModal setOpenPlaylistModal={setOpenPlaylistModal} />
      )}
    </div>
  );
};
