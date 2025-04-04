import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  logout: () => void;
  login: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: true,
  setLoggedIn: () => {},
  logout: () => {},
  login: () => {},
});

export const AuthContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("token") ? true : false
  );

  const login = () => {
    //TO DO
    setLoggedIn(true);
  };

  const logout = () => {
    //TO DO
    setLoggedIn(false);
  }

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(currentUser));
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
