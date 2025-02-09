import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import {AuthProvider} from "./context/isAuth.jsx";
import {loadVite} from "@ralvarezdev/js-mode";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LogIn from "./pages/LogIn/LogIn.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";

// Load environment variables
loadVite()

// Create a browser router
const router = createBrowserRouter([
    {
        path: '/login',
        element: <LogIn/>,
        action: async ({request}) => {
        },
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword/>,
        action: async ({request}) => {
        },
    },
    {
        path: '/signup',
        element: <SignUp/>,
        action: async ({request}) => {
        },
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}>
            <ErrorBoundary>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </ErrorBoundary>
        </RouterProvider>
    </StrictMode>,
)
