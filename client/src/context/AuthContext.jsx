import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, saveToken, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier usage
export const useAuth = () => useContext(AuthContext);
