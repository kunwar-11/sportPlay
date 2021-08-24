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
import {
  addToLikedVideos,
  addToUnlikedVideos,
  addToWatchLater,
  removeVideoFromPlaylist,
} from "../api_calls";

export const VideoBar = ({ video }) => {
  const { title, views, date, _id } = video;
  const {
    state: { likedVideos, watchLater, unLikedVideos },
    dispatch,
  } = useData();
  const {
    state: { token, userId },
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
                removeVideoFromPlaylist({
                  dispatch,
                  navigate,
                  token,
                  userId,
                  videoId: _id,
                  type: "REMOVE_FROM_LIKED_VIDEOS",
                  genre: "likedvideos",
                })
              }
            />
          ) : (
            <ThumbUpAltOutlined
              onClick={() =>
                addToLikedVideos({
                  dispatch,
                  token,
                  userId,
                  videoId: _id,
                  unLikedVideos,
                  navigate,
                })
              }
            />
          )}
          {unLikedVideos && isInPlayList(unLikedVideos, _id) ? (
            <ThumbDown
              onClick={() =>
                removeVideoFromPlaylist({
                  dispatch,
                  navigate,
                  token,
                  userId,
                  videoId: _id,
                  type: "REMOVE_FROM_UNLIKED_VIDEOS",
                  genre: "unlikedvideos",
                })
              }
            />
          ) : (
            <ThumbDownAltOutlined
              onClick={() =>
                addToUnlikedVideos({
                  dispatch,
                  token,
                  userId,
                  videoId: _id,
                  likedVideos,
                  navigate,
                })
              }
            />
          )}
          {watchLater && isInPlayList(watchLater, _id) ? (
            <WatchLater
              onClick={() =>
                removeVideoFromPlaylist({
                  dispatch,
                  navigate,
                  token,
                  userId,
                  videoId: _id,
                  type: "REMOVE_FROM_WATCHLATER",
                  genre: "watchlater",
                })
              }
            />
          ) : (
            <WatchLaterOutlined
              onClick={() =>
                addToWatchLater({
                  dispatch,
                  navigate,
                  token,
                  userId,
                  videoId: _id,
                })
              }
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
