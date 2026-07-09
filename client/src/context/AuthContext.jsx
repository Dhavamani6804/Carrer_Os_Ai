import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch {
        return true;
    }
};

export function AuthProvider({ children }) {

    const savedToken = localStorage.getItem("token");

    if (savedToken && isTokenExpired(savedToken)) {
        localStorage.removeItem("token");
    }

    const validToken =
    savedToken && !isTokenExpired(savedToken)
        ? savedToken
        : null;

if (savedToken && !validToken) {
    localStorage.removeItem("token");
}

    const [token, setToken] = useState(validToken);

    const [user, setUser] = useState(
    validToken ? jwtDecode(validToken) : null
);

    const login = (jwt) => {
        localStorage.setItem("token", jwt);
        setToken(jwt);
        setUser(jwtDecode(jwt));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}