import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
// axios.defaults.withCredentials = true;

const AuthContext = createContext(null)

export default function AuthProvider ({children}) {

    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    const login = (userData) => {
        setUser(userData)
        setIsLoggedIn(true)
        console.log("user data stored using login")
    }

    useEffect( () => {

        const checkExistingSession = async () => {

            try {
                const response = await axios.get("/api/v1/users/current-user")
                if(response?.data.data) {
                    setUser(response.data.data)
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

        checkExistingSession()
    }, [login])

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

    return (
        <AuthContext.Provider value={{user, isLoggedIn, loading, login, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>  useContext(AuthContext) 

