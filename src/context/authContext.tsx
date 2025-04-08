import { createContext, ReactNode, useContext, useState } from "react";

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

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(
    localStorage.getItem("access-token") && localStorage.getItem("client") && localStorage.getItem("uid") ? true : false
  );

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
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
