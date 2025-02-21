import {createContext, useContext, useState} from 'react';
import cookieExists, {getCookie} from "../utils/cookies.js";
import LOGGER from "../logger.js";
import {onLogIn, onLogOut} from "../utils/init.js";
import {useTags} from "./Tags.jsx";
import {useNotes} from "./Notes.jsx";

// Create a context
const AuthContext = createContext(null);

// Check if the salt cookie exists
const initialIsAuth = cookieExists(import.meta.env.COOKIE_USER_ID_NAME)
if (import.meta.env.IS_DEBUG) LOGGER.info(`User is ${initialIsAuth ? "authenticated" : "not authenticated"}`)

// Create a provider
export function AuthProvider({children}) {
    const {loadTags, clearTags} = useTags();
    const {loadNotes, clearNotes} = useNotes();
    const [userID, setUserID] = useState(null);
    const [isAuth, setIsAuth] = useState(initialIsAuth);

    // Add logger to the setter
    let modifiedSetIsAuth = (value) => setIsAuth(value);
    if (import.meta.env.IS_DEBUG)
        // Add logger to the setter
        modifiedSetIsAuth = (value) => {
            // Check if the value is different
            if (value === isAuth) return;

            // Set the value
            setIsAuth(value);
            LOGGER.info(`User is ${value ? "authenticated" : "not authenticated"}`)

            // Check if the value is true
            if (!value) {
                // Remove the user ID
                setUserID(null)

                // Call the onLogOut function
                onLogOut(clearTags, clearNotes).then()
            } else {
                // Get the user ID from the cookie
                const userID = getCookie(import.meta.env.COOKIE_USER_ID_NAME)
                if (!userID && import.meta.env.IS_DEBUG) LOGGER.error("User ID not found in the cookie")
                else if (import.meta.env.IS_DEBUG) LOGGER.info(`User ID found in the cookie: ${userID}`)

                // Call the onAuth function
                onLogIn(userID, null, null, loadTags, loadNotes).then()

                // Set the user ID
                setUserID(userID)
            }
        }

    return (
        <AuthContext.Provider
            value={{isAuth, setIsAuth: modifiedSetIsAuth, userID}}>
            {children}
        </AuthContext.Provider>
    );
}

// Create a hook that shorthands the context
export function useAuth() {
    return useContext(AuthContext);
}