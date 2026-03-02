import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
    login: (user: User, token: string) => void;
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
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth on mount
    useEffect(() => {
        const initAuth = () => {
            try {
                const savedToken = localStorage.getItem("token");
                const savedUser = localStorage.getItem("token_user");

                if (savedToken && savedUser) {
                    setToken(savedToken);
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error("Error initializing auth:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("token_user");
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = (userData: User, authToken: string) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem("token", authToken);
        localStorage.setItem("token_user", JSON.stringify(userData));
    };

    const logout = () => {
       setUser(null);
       setToken(null);
       localStorage.removeItem("token");
       localStorage.removeItem("token_user");
    };

    const value: AuthContextType = {
        user, 
        token,
        isLoading,
        login, 
        logout, 
        isAuthenticated: !!user && !!token
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}