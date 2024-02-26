import React, { useState } from "react";

const LoggedUserContext = createContext();

const LoggedUserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  const login = (user) => {
    setLoggedUser(user);
  };

  const logout = () => {
    setLoggedUser(null);
  };

  return (
    <LoggedUserContext.Provider
      value={{ loggedUser, login, logout }}
    >
      {children}
    </LoggedUserContext.Provider>
  );
};

export default LoggedUserProvider;

export { LoggedUserContext };
