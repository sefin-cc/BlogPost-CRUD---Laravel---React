import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState();

    const getUser = async () => {
        const res = await fetch('/api/user', {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await res.json();

        // Double Check if the token is correct
        if(res.ok){
            setUser(data);
        }
    }

    useEffect(() => {
        if(token){
            getUser();
        }
    },[token]);

    return(
        <AppContext.Provider value={{token, setToken, user, setUser}}>
            {children}
        </AppContext.Provider>
    );
};