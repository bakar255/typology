import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User, token?: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
  };

export const AuthProvider = ({ children } : { children: ReactNode}) =>  {

    const [user, setUser ] = useState<User | null>(null);

    const login = (userData: User, token?: string) => {
     setUser(userData);
     localStorage.setItem("token_user", JSON.stringify(userData));
    }

    const logout = () => {
       setUser(null);
       localStorage.removeItem("token_user");
    }

    const value: AuthContextType = {user, login, logout, isAuthenticated: !!user}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}