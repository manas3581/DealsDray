import React, { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [authenticate, setAuthenticate] = useState(false);
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <userContext.Provider
      value={{
        authenticate,
        setAuthenticate,
        user,
        setUser,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
