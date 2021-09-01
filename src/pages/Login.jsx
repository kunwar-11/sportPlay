import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "../styles/login.css";
import { API_URL, setupAuthHeaderForServiceCalls, validation } from "../util";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ emailError: "", passwordError: "" });
  const { state } = useLocation();
  const navigate = useNavigate();
  const { authDispatch } = useAuth();
  useEffect(() => {
    if (state?.from) {
      toast.error("Session Expired Please Login To Continue", {
        position: "bottom-right",
        theme: "dark",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [state?.from]);
  const loginHandler = async (e) => {
    e.preventDefault();
    if (validation(email, password, setError)) {
      try {
        const {
          data: { name, token, userId },
          status,
        } = await axios.post(`${API_URL}/auth/login`, {
          email,
          password,
        });
        if (status === 200) {
          authDispatch({ type: "LOGIN", payload: { name, token, userId } });
          localStorage?.setItem(
            "UserDetails",
            JSON.stringify({ name, token, userId, login: true })
          );
          toast.success(`Welcome ${name}`, {
            position: "bottom-right",
            autoClose: 3000,
            theme: "dark",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setupAuthHeaderForServiceCalls(token);
          navigate(state?.from ? state?.from : "/");
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 401) {
          if (error.response.data.message === "Incoorect Password") {
            return toast.error(`Incorrect Password`, {
              position: "bottom-right",
              theme: "dark",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          if (
            error.response.data.message === "User not found ! Please Sign Up"
          ) {
            return toast.error(`${error.response.data.message}`, {
              position: "bottom-right",
              theme: "dark",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
        return toast.error("Unable to log in Please Try again", {
          position: "bottom-right",
          theme: "dark",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <form onSubmit={loginHandler} className="login">
      <h1>Login</h1>
      <div className="input-container">
        <input
          type="text"
          value={email}
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
          className="inputText"
        />
        <small className="error">{error.emailError}</small>
      </div>
      <div className="password">
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
            className="inputText"
          />
          <small className="error">{error.passwordError}</small>
        </div>
        <div
          style={{ width: "fit-content", padding: "0.5rem" }}
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Log In
      </button>

      <small style={{ textAlign: "center", margin: "1rem 0rem" }}>
        not yet signed up ,{" "}
        <Link to="/signup">
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Sign Up Here
          </span>{" "}
        </Link>
      </small>
    </form>
  );
};
