import { useState, useContext, useEffect, createContext } from "react";
import api from "../services/api";
import { setAuthFailureHandler } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = user !== null;

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        setAuthFailureHandler(() => {
            setUser(null);
        });
    }, []);

    const checkAuth = async () => {
        try {
            console.log('inside the auth me')
            const response = await api.get("/auth/me");
            
            console.log('response : ', response.data);
            setUser(response.data.user);
            console.log("AUTH USER FROM CONTEXT:", user);
        } catch (error) {
            console.log('testing');
            console.log('error : ', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const response = await api.post(
            "/auth/login",
            {
                email,
                password,
            }
        );

        setUser(response.data.user);
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout,
                setUser,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return useContext(AuthContext);
}