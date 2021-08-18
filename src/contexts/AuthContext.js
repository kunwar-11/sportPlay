import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import {
  setupAuthExceptionHandler,
  setupAuthHeaderForServiceCalls,
} from "../util";
import { useNavigate } from "react-router";
import { authReducer } from "../reducers/authReducer";
const AuthContext = createContext();

const initialState = {
  name: JSON.parse(localStorage?.getItem("UserDetails"))?.name || "",
  token: JSON.parse(localStorage?.getItem("UserDetails"))?.token || null,
  login: JSON.parse(localStorage?.getItem("UserDetails"))?.login || false,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  useEffect(() => {
    setupAuthExceptionHandler(logout, navigate);
  }, [navigate]);
  const logout = () => {
    localStorage?.removeItem("UserDetails");
    dispatch({ type: "LOGOUT" });
    setupAuthHeaderForServiceCalls(null);
  };
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
