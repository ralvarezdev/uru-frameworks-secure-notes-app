import {createContext, useContext, useState} from "react";

// Create a context
const LogInContext = createContext(null);

// Create a provider
export default function LogInProvider({children}) {
    const [logIn, setLogIn] = useState(null);

    return (
        <LogInContext.Provider value={{logIn, setLogIn}}>
            {children}
        </LogInContext.Provider>
    );
}

// Create a hook that shorthands the context
export function useLogIn() {
    return useContext(LogInContext);
}