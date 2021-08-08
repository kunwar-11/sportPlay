import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "../styles/login.css";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const loginHandler = () => {};
  return (
    <form onSubmit={loginHandler} className="login">
      <h1>Login</h1>
      <input
        type="text"
        value={email}
        placeholder="Enter your Email"
        onChange={(e) => setEmail(e.target.value)}
        className="inputText"
      />
      <div className="password">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
          className="inputText"
        />
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
