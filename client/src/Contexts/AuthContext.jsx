import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";


const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const initialState = {
    isAuthenticated: false,
    token: Cookies.get('token') || null,
    username: Cookies.get('user') || null
}

export function AuthProvider({ children }) {

    const [user, setuser] = useState(initialState)

    const login = (token, username) => {
        setuser({
            isAuthenticated: true,
            token, username
        })
    }

    const logout = () => {
        setuser({ isAuthenticated: false, token: null, username: null })
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
    )
}