import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import LogIn from "./pages/LogIn/LogIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import {useEffect} from "react";
import {useAuth} from "./context/isAuth.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";

// App component
function App() {
    const navigate = useNavigate();
    const {isAuth} = useAuth();

    // Redirect to the login page if the user is not authenticated
    useEffect(() => {
        const allowedNotAuthPaths = ['/login', '/signup', '/forgot-password'];

        // Redirect to the login page if the user is not authenticated
        if (!isAuth)
            if (!allowedNotAuthPaths.includes(window.location.pathname))
                navigate('/login')
    }, [navigate, isAuth]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
            </Routes>
        </>
    )
}

export default App
