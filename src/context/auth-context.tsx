import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definir los tipos para el contexto
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  setRole: (role: string) => void;
  role: string | null;
}

interface User {
  email: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const login = (user: User) => {
    setIsAuthenticated(true);
    setUser(user);
    setRole(user.role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, setRole, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};