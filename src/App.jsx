import './App.css'
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import AppLayout from "./layouts/App/App.jsx";
import {useAuth} from "./context/Auth.jsx";
import {useLogIn} from "./context/LogIn.jsx";

// App component
export default function App() {
    const navigate = useNavigate();
    const {isAuth} = useAuth();
    const {logIn} = useLogIn();

    // Redirect to the login page if the user is not authenticated
    useEffect(() => {
        // Check if the user is authenticated
        const path = window.location.pathname;

        // Check if it's a verify email page or a reset password page
        let cleanedPath
        if (path.startsWith('/verify-email/') || path.startsWith('/reset-password/')) {
            cleanedPath = '/' + path.split('/')[1]
        } else {
            cleanedPath = path
        }

        if (isAuth) {
            if (['/login', '/signup', '/forgot-password', '/verify-email', '/login/2fa/totp', '/login/2fa/recovery-code'].includes(cleanedPath))
                navigate('/dashboard');

            return;
        }

        // Check if the user has entered his credentials and is on the 2FA step
        if (logIn) {
            if (!['/login/2fa/totp', '/login/2fa/recovery-code'].includes(cleanedPath))
                navigate('/login/2fa/totp');

            return;
        }

        // Redirect to the login page if the user is not authenticated
        if (!['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'].includes(cleanedPath))
            navigate('/login')
    }, [navigate, isAuth, logIn]);

    return (
        <AppLayout>
            <div className='app__main-container__app-container'>
                <Outlet/>
            </div>
        </AppLayout>
    )
}