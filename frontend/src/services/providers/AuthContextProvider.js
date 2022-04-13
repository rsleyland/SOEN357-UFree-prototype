import { createContext, useEffect, useState } from "react";

// Context & Context provider used to store state of current logged in user. 
// Will grab user stored in localstorage if application is refreshed.

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