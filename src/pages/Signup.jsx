import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { API_URL, signUpValidation } from "../util";
import "../styles/login.css";
import axios from "axios";
import { toast } from "react-toastify";

export const Signup = () => {
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showReEnteredPassword, setShowReEnteredPassword] = useState(false);
  const [error, setError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });
  const navigate = useNavigate();
  const signUpHandler = async (e) => {
    e.preventDefault();
    if (signUpValidation(userInput, setError)) {
      try {
        const {
          data: { success },
        } = await axios.post(`${API_URL}/auth/signup`, {
          firstName: userInput?.firstName,
          lastName: userInput?.lastName,
          email: userInput?.email,
          password: userInput?.password,
        });
        if (success) {
          navigate("/login");
          toast.success("Sign Up Successfull", {
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
      } catch (error) {
        toast.error("Unable To Sign Up Please Try Again", {
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
    return console.log("not validated");
  };
  return (
    <form onSubmit={signUpHandler} className="login signup">
      <h1>Sign Up</h1>
      <div className="input-container">
        <input
          type="text"
          value={userInput.firstName}
          placeholder="Enter your First Name"
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, firstName: e.target.value }))
          }
          className="inputText"
        />
        <small className="error">{error.firstNameError}</small>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput.lastName}
          placeholder="Enter your Last Name"
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, lastName: e.target.value }))
          }
          className="inputText"
        />
        <small className="error">{error.lastNameError}</small>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={userInput.email}
          placeholder="Enter your Email"
          onChange={(e) =>
            setUserInput((prev) => ({ ...prev, email: e.target.value }))
          }
          className="inputText"
        />
        <small className="error">{error.emailError}</small>
      </div>
      <div className="password">
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            value={userInput.password}
            placeholder="Enter your Password"
            onChange={(e) =>
              setUserInput((prev) => ({ ...prev, password: e.target.value }))
            }
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
      <div className="password">
        <div className="input-container">
          <input
            type={showReEnteredPassword ? "text" : "password"}
            value={userInput.confirmPassword}
            placeholder="Re Enter your Password"
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
            className="inputText"
          />
          <small className="error">{error.confirmPasswordError}</small>
        </div>
        <div
          style={{ width: "fit-content", padding: "0.5rem" }}
          onClick={() => {
            setShowReEnteredPassword((prev) => !prev);
          }}
        >
          {showReEnteredPassword ? <VisibilityOff /> : <Visibility />}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>

      <small style={{ textAlign: "center", margin: "1rem 0rem" }}>
        allready have an account ,{" "}
        <Link to="/login">
          <span
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Login Here
          </span>{" "}
        </Link>
      </small>
    </form>
  );
};
