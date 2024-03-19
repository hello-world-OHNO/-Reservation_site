import React, { createContext, useContext, useState, ReactNode } from 'react';

// AuthContextの作成
type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({ isLoggedIn: false, login: () => { }, logout: () => { } });

export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProviderの作成
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
