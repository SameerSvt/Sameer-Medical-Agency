import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null)

export default function AuthProvider ({children}) {

    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isWholesaleApplied, setIsWholesaleApplied] = useState(user?.isWholesaleApplied)


    const login = (userData) => {
        setUser(userData)
        setIsLoggedIn(true)
        setLoading(false)
        console.log("user data stored using login")
    }

    const checkExistingSession = async () => {

            try {
                const response = await axios.get("/api/v1/users/current-user")
                if(response?.data?.data) {
                    setUser(response.data.data)
                    setIsWholesaleApplied(response.data.data?.isWholesaleApplied)
                    setIsLoggedIn(true)
                    console.log("user data stored using useEffect")
                }
            } catch (error) {
                setUser(null)
                setIsLoggedIn(false)
            } finally {
                setLoading(false)
            }
        }

    const logout = async () => {
        try {
            await axios.post("/api/v1/users/logout")
            console.log("logout successfull");
            alert("You are logged out");
            return true
        } catch (error) {
            console.error("Logout request failed:", error);
            return false
        } finally {
            setUser(null);
            setIsLoggedIn(false);
        }
    }

     useEffect( () => {
        checkExistingSession()
    }, [])

    return (
        <AuthContext.Provider value={{user, setUser, isLoggedIn, loading, login, logout, isWholesaleApplied, setIsWholesaleApplied, checkExistingSession}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>  useContext(AuthContext) 

