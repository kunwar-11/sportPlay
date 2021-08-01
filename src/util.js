import { Navigate, Route } from "react-router";
import { useAuth } from "./contexts/AuthContext";

export const isInPlayList = (playlist, playId) => {
  if (playlist.some((each) => each.playId === playId)) {
    return true;
  }
  return false;
};

export const findVideo = (videoId, videos) => {
  return videos.find((each) => each.playId === videoId);
};

export const PrivateRoute = ({ path, ...rest }) => {
  const { login } = useAuth();
  if (login) {
    return <Route path={path} {...rest} />;
  }
  return <Navigate to="/login" replace state={{ from: path }} />;
};
