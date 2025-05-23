import './App.css'
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import AppLayout from "./layouts/App/App.jsx";
import {useAuth} from "./context/Auth.jsx";
import {
    EMAIL_CODE_2FA_METHOD,
    RECOVERY_CODE_2FA_METHOD,
    TOTP_CODE_2FA_METHOD
} from "./constants.js";
import {
    BASE_RESET_PASSWORD,
    BASE_VERIFY_EMAIL,
    DASHBOARD,
    FORGOT_PASSWORD,
    LOG_IN,
    RESET_PASSWORD,
    SIGN_UP,
    TWO_FACTOR_AUTHENTICATION_EMAIL_CODE,
    TWO_FACTOR_AUTHENTICATION_RECOVERY_CODE,
    TWO_FACTOR_AUTHENTICATOR_TOTP_CODE,
    VERIFY_EMAIL
} from "./endpoints.js";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import {
    get2FAMethods,
    getIsLoggingIn, getPassword, setDecryptedKey,
} from "./sessionStorage/sessionStorage.js";
import {useNotes} from "./context/Notes.jsx";
import {useTags} from "./context/Tags.jsx";
import {onDashboardLoad} from "./utils/init.js";
import {getEncryptedKey, getSalt, getUserID} from "./utils/cookies.js";
import {getDecryptedKey} from "./utils/crypto.js";

// Authentication endpoints
const NO_AUTH_ENABLED_ENDPOINTS = [LOG_IN, SIGN_UP, FORGOT_PASSWORD, RESET_PASSWORD, VERIFY_EMAIL]
const AUTH_DISABLED_ENDPOINTS = [...NO_AUTH_ENABLED_ENDPOINTS, TWO_FACTOR_AUTHENTICATOR_TOTP_CODE, TWO_FACTOR_AUTHENTICATION_EMAIL_CODE, TWO_FACTOR_AUTHENTICATION_RECOVERY_CODE]

// App component
export default function App() {
    const {isAuth} = useAuth();
    const path = window.location.pathname;
    const [databaseLoaded, setDatabaseLoaded] = useState(false);
    const [keyLoaded, setKeyLoaded] = useState(false);
    const {loadTagsFromIndexedDB} = useTags();
    const {loadNotesFromIndexedDB} = useNotes();


    // Redirect to the login page if the user is not authenticated
    useEffect(() => {
        // Check if it's a verify email page or a reset password page
        let parsedPath
        if (path.startsWith(BASE_VERIFY_EMAIL))
            parsedPath = VERIFY_EMAIL
        else if (path.startsWith(BASE_RESET_PASSWORD))
            parsedPath = RESET_PASSWORD
        else
            parsedPath = path

        if (isAuth) {
            // Check if the database has been loaded
            if (!databaseLoaded) {
                // Get the user ID from cookies
                const userID = getUserID()

                // Load database
                setDatabaseLoaded(true)
                onDashboardLoad(userID, null, null, loadTagsFromIndexedDB, loadNotesFromIndexedDB).then()
            }

            // Check if the user key has been loaded
            if (!keyLoaded) {
                // Get the decrypted key
                getDecryptedKey(getPassword(), getSalt(), getEncryptedKey()).then(
                    key => setDecryptedKey(key)
                )

                // Load the key
                setKeyLoaded(true)
            }

            if (AUTH_DISABLED_ENDPOINTS.includes(parsedPath))
                window.location.href = DASHBOARD;
            return;
        }

        // Check if the user has entered his credentials and is on the 2FA step
        if (getIsLoggingIn()) {
            const twoFactorAuthenticationMethods = get2FAMethods()

            if (twoFactorAuthenticationMethods.includes(TOTP_CODE_2FA_METHOD) && parsedPath === TWO_FACTOR_AUTHENTICATOR_TOTP_CODE)
                return;

            if (twoFactorAuthenticationMethods.includes(EMAIL_CODE_2FA_METHOD) && parsedPath === TWO_FACTOR_AUTHENTICATION_EMAIL_CODE)
                return;

            if (twoFactorAuthenticationMethods.includes(RECOVERY_CODE_2FA_METHOD) && parsedPath === TWO_FACTOR_AUTHENTICATION_RECOVERY_CODE)
                return;

            window.location.href = TWO_FACTOR_AUTHENTICATION_EMAIL_CODE;
            return;
        }

        // Redirect to the login page if the user is not authenticated
        if (!NO_AUTH_ENABLED_ENDPOINTS.includes(parsedPath))
            window.location.href = LOG_IN
    }, [path, isAuth]);

    return (
        <AppLayout>
            <div className='app__main-container__app-container'>
                <ErrorBoundary>
                    <Outlet/>
                </ErrorBoundary>
            </div>
        </AppLayout>
    )
}