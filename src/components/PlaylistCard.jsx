import { Avatar } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import "../styles/playlistcard.css";
const PlaylistCard = (props) => {
  const { thumbnail, image, title, channel, views, timestamp, playId } =
    props.each;
  const { dispatch } = useData();
  const truncateTitle = (str) => {
    if (str.length > 47) {
      return str.substring(0, 49) + "...";
    }
    return str;
  };
  return (
    <div className="videocard">
      <Link to={`/videos/${playId}`}>
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
                {`${views} views `}.{` ${timestamp} `}
              </small>
            </div>
            <div className="deleteIcon">
              <Delete
                onClick={() =>
                  dispatch({
                    type: props.type,
                    payload: { playId: playId, id: props.id },
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
