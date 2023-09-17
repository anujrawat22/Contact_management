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

    const login = (token, user) => {
        setuser((prevState) => {
            prevState.isAuthenticated = true
            prevState.token = token
            prevState.user = user
        })
    }

    const logout = () => {
        setuser((prevState) => {
            prevState.isAuthenticated = false
            prevState.token = null
            prevState.user = null
        })
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
    )
}