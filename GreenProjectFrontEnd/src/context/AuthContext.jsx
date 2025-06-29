import React, {createContext, useContext, useEffect, useState} from 'react';


const AuthContext = createContext();
export  const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("auth")==="true");

    const login = (customerInfo) =>{
        localStorage.setItem("token", customerInfo.accessToken);
        localStorage.setItem("userName", customerInfo.username);
        localStorage.setItem("customerId", customerInfo.customerId);
        localStorage.setItem("auth", "true");
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("customerId");
        localStorage.removeItem("auth");
        setIsAuthenticated(false);
    }

    useEffect(() => {
        const authStatus = localStorage.getItem("auth");
        setIsAuthenticated(authStatus === "true");
    }, []);


    return (
        <AuthContext.Provider value={{user,login,logout,isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);