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
import { findVideo, isInPlayList } from "../util";
import "../styles/videobar.css";
import { useData } from "../contexts/DataContext";
import PlaylistModal from "./PlaylistModal";
export const VideoBar = ({ videoId }) => {
  const {
    state: { videos, likedVideos, watchLater, unLikedVideos },
    dispatch,
  } = useData();
  const { title, views, timestamp } = videos.find(
    (each) => each.playId === videoId
  );
  const [openPlaylistModal, setOpenPlaylistModal] = useState(false);
  return (
    <div className="videoBar">
      <div className="videoTitle">
        <h3>{title}</h3>
      </div>
      <div className="videoOptions">
        <div className="videoDetail">
          <p>
            {`${views} views`} . {timestamp}
          </p>
        </div>
        <div className="videoLikeBar">
          {isInPlayList(likedVideos, videoId) ? (
            <ThumbUp
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: videoId })
              }
            />
          ) : (
            <ThumbUpAltOutlined
              onClick={() =>
                dispatch({
                  type: "ADD_TO_LIKED_VIDEOS",
                  payload: findVideo(videoId, videos),
                })
              }
            />
          )}
          {isInPlayList(unLikedVideos, videoId) ? (
            <ThumbDown
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_UNLIKED_VIDEOS",
                  payload: videoId,
                });
              }}
            />
          ) : (
            <ThumbDownAltOutlined
              onClick={() =>
                dispatch({
                  type: "ADD_TO_UNLIKED_VIDEOS",
                  payload: findVideo(videoId, videos),
                })
              }
            />
          )}
          {isInPlayList(watchLater, videoId) ? (
            <WatchLater
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_WATCHLATER", payload: videoId })
              }
            />
          ) : (
            <WatchLaterOutlined
              onClick={() => {
                dispatch({
                  type: "ADD_TO_WATCHLATER",
                  payload: findVideo(videoId, videos),
                });
              }}
            />
          )}
          <PlaylistAdd onClick={() => setOpenPlaylistModal(true)} />
        </div>
      </div>
      {openPlaylistModal && (
        <PlaylistModal setOpenPlaylistModal={setOpenPlaylistModal} />
      )}
    </div>
  );
};
