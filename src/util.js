import { Navigate, Route } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
export const isInPlayList = (playlist, playId) => {
  if (playlist.some((each) => each._id === playId)) {
    return true;
  }
  return false;
};

export const findVideo = (videoId, videos) => {
  return videos.find((each) => each._id === videoId);
};
export const navigateToLogin = (navigate) => {
  toast.error(`Session Expired Please Login To Continue`, {
    position: "bottom-right",
    autoClose: 3000,
    theme: "dark",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  navigate("/login");
};
export const validation = (email, password, setError) => {
  let valid = true;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.trim()) {
    if (re.test(email)) {
      setError((prev) => ({ ...prev, emailError: "" }));
    } else {
      setError((prev) => ({ ...prev, emailError: "Enter in Correct format" }));
      valid = false;
    }
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
  if (credentials.confirmPassword.trim()) {
    if (credentials.confirmPassword === credentials.password) {
      setError((prev) => ({ ...prev, confirmPasswordError: "" }));
    } else {
      setError((prev) => ({
        ...prev,
        confirmPasswordError: "password does not match",
      }));
      valid = false;
    }
  } else {
    setError((prev) => ({
      ...prev,
      confirmPasswordError: "Re enter password",
    }));
    valid = false;
  }

  return valid;
};

export const API_URL = "https://lit-cliffs-11509.herokuapp.com";

export function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  delete axios.defaults.headers.common["Authorization"];
}

// export function setupAuthExceptionHandler(logoutUser, navigate) {
//   const UNAUTHORIZED = 401;
//   axios.interceptors.response.use(undefined, (error) => {
//     console.log("hi");
//     if (error?.response?.status === UNAUTHORIZED) {
//       logoutUser();
//       navigate("/login");
//     }
//     return Promise.reject(error);
//   });
// }

export const PrivateRoute = ({ path, ...rest }) => {
  const {
    state: { login },
  } = useAuth();
  if (login) {
    return <Route path={path} {...rest} />;
  }
  return <Navigate to="/login" replace state={{ from: path }} />;
};
