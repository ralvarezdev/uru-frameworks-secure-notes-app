import {createContext, useContext, useState} from 'react';
import cookies from "../utils/cookies.js";
import {IS_DEBUG} from "@ralvarezdev/js-mode";
import LOGGER from "../logger.js";

// Create a context
const AuthContext = createContext(null);

// Check if the salt cookie exists
console.log(import.meta.env.COOKIE_SALT_NAME)
const initialIsAuth = cookies(import.meta.env.COOKIE_USER_ID_NAME)

// Log the initial value
if (IS_DEBUG) LOGGER.info(`User is ${initialIsAuth ? "authenticated" : "not authenticated"}`)

// Create a provider
export default function AuthProvider({children}) {
    const [isAuth, setIsAuth] = useState(initialIsAuth);

    // Add logger to the setter
    let modifiedSetIsAuth = (value) => setIsAuth(value);
    if (IS_DEBUG)
        // Add logger to the setter
        modifiedSetIsAuth = (value) => {
            setIsAuth(value);
            LOGGER.info(`User is ${value ? "authenticated" : "not authenticated"}`)
        }

    return (
        <AuthContext.Provider value={{isAuth, setIsAuth: modifiedSetIsAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

// Create a hook that shorthands the context
export function useAuth() {
    return useContext(AuthContext);
}