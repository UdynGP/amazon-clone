import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }

    // Set a timeout to remove the 'auth' item from localStorage after 5 minutes
    const timeoutInMilliseconds = 300000;
    setTimeout(() => {
      localStorage.removeItem("auth");
    }, timeoutInMilliseconds);

    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);
