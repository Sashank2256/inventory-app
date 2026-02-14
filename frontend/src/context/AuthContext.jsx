import { createContext, useContext, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

// Decode JWT payload
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");

  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(
    storedToken ? parseJwt(storedToken) : null
  );

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    const newToken = res.data.token;
    localStorage.setItem("token", newToken);

    setToken(newToken);
    setUser(parseJwt(newToken));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
