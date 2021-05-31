import React from "react";
import { Avatar } from "@material-ui/core";
import "../styles/videocard.css";
import { Link } from "react-router-dom";
const VideoCard = (props) => {
  const { thumbnail, image, title, channel, views, timestamp, playId } =
    props.each;

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
          <div className="videoStats">
            <small className="text__muted channel">{channel}</small>
            <small className="text__muted">
              {`${views} views `}.{` ${timestamp} `}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
