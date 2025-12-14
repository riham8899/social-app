import React, { createContext, useEffect, useState } from 'react'
export const authContext = createContext()


export const AuthContext = ({ children }) => {
    const [token, setToken] = useState(null)

    function insertUserToken(tkn) {
        setToken(tkn);

    }

    function logout() {
        localStorage.removeItem("token")
        setToken(null)
        
    }

    useEffect(function () {
        if (localStorage.getItem("token") != null) {
            setToken(localStorage.getItem("token"));

        }

    }, [])



    return (
        <authContext.Provider value={{ token, insertUserToken,logout }}>
            {children}
        </authContext.Provider>
    )
}
