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

export const validation = (email, password, setError) => {
  let valid = true;
  if (email.trim()) {
    setError((prev) => ({ ...prev, emailError: "" }));
  } else {
    setError((prev) => ({ ...prev, emailError: "Enter your Email" }));
    valid = false;
  }
  if (password.trim()) {
    setError((prev) => ({ ...prev, passwordError: "" }));
  } else {
    setError((prev) => ({ ...prev, passwordError: "Enter your password" }));
    valid = false;
  }

  return valid;
};

export const signUpValidation = (credentials, setError) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let valid = true;
  if (credentials.firstName.trim()) {
    setError((prev) => ({ ...prev, firstNameError: "" }));
  } else {
    setError((prev) => ({ ...prev, firstNameError: "Enter your first name" }));
    valid = false;
  }
  if (credentials.lastName.trim()) {
    setError((prev) => ({ ...prev, lastNameError: "" }));
  } else {
    setError((prev) => ({ ...prev, lastNameError: "Enter your last name" }));
    valid = false;
  }
  if (credentials.email.trim()) {
    if (re.test(credentials.email)) {
      setError((prev) => ({ ...prev, emailError: "" }));
    } else {
      setError((prev) => ({ ...prev, emailError: "Enter in Correct format" }));
      valid = false;
    }
  } else {
    setError((prev) => ({ ...prev, emailError: "Enter your email" }));
    valid = false;
  }
  if (credentials.password.trim()) {
    setError((prev) => ({ ...prev, passwordError: "" }));
  } else {
    setError((prev) => ({
      ...prev,
      passwordError: "Enter your password name",
    }));
    valid = false;
  }
  return valid;
};

export const PrivateRoute = ({ path, ...rest }) => {
  const { login } = useAuth();
  if (login) {
    return <Route path={path} {...rest} />;
  }
  return <Navigate to="/login" replace state={{ from: path }} />;
};
