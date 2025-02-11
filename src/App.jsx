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
        if (isAuth) {
            if (['/login', '/signup', '/forgot-password', '/login/2fa/totp', '/login/2fa/recovery-code'].includes(path))
                navigate('/dashboard');

            return;
        }

        // Check if the user has entered his credentials and is on the 2FA step
        if (logIn) {
            if (!['/login/2fa/totp', '/login/2fa/recovery-code'].includes(path))
                navigate('/login/2fa/totp');

            return;
        }

        // Redirect to the login page if the user is not authenticated
        if (!['/login', '/signup', '/forgot-password', '/reset-password', '/verify-email'].includes(path))
            navigate('/login')

    }, [navigate, isAuth, logIn]);

    return (
        <AppLayout>
            <Outlet/>
        </AppLayout>
    )
}