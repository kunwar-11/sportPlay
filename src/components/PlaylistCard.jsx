import { Avatar } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeVideoFromPlaylist } from "../api_calls";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import "../styles/playlistcard.css";
const PlaylistCard = ({
  each: { thumbnail, image, title, channel, views, date, _id },
  type,
  genre,
  playlistId,
}) => {
  const { dispatch } = useData();
  const {
    state: { token, userId },
  } = useAuth();
  const navigate = useNavigate();
  const truncateTitle = (str) => {
    if (str.length > 47) {
      return str.substring(0, 49) + "...";
    }
    return str;
  };
  return (
    <div className="videocard">
      <Link to={`/videos/${_id}`}>
        <div className="videoThumbnail">
          <img src={thumbnail} alt="thumbnail" />
        </div>
      </Link>
      <div className="videoDescription">
        <Avatar src={image} />
        <div className="videoTexts">
          <p className="videoTitle">{truncateTitle(title)}</p>
          <div className="container">
            <div className="videoStats">
              <small className="text__muted channel">{channel}</small>
              <small className="text__muted">
                {`${views} views `}.{` ${date} `}
              </small>
            </div>
            <div className="deleteIcon">
              <Delete
                onClick={() =>
                  removeVideoFromPlaylist({
                    dispatch,
                    navigate,
                    token,
                    userId,
                    videoId: _id,
                    type,
                    genre,
                    playlistId,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
