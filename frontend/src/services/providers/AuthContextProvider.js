import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=> {
        const user = localStorage.getItem('user');
        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);
    
    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider, AuthContext };