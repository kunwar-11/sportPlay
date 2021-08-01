import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  name: "",
  token: null,
  login: false,
};

const authReducer = (state, action) => {};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
