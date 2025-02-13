import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import AuthProvider from "./context/Auth.jsx";
import {loadVite} from "@ralvarezdev/js-mode";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import LogIn, {LogInAction} from "./pages/LogIn/LogIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import TOTP from "./pages/LogIn/TwoFactorAuth/TOTP/TOTP.jsx";
import RecoveryCode
    from "./pages/LogIn/TwoFactorAuth/RecoveryCode/RecoveryCode.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import LogInProvider from "./context/LogIn.jsx";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail.jsx";
import ResetPassword from "./pages/ResetPassword/ResetPassword.jsx";
import NotificationProvider from "./context/Notification.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

// Load environment variables
loadVite()

// Create the browser router
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route path="/login" element={<LogIn/>} action={LogInAction}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/login/2fa/totp" element={<TOTP/>}/>
            <Route path="/login/2fa/recovery-code" element={<RecoveryCode/>}/>
            <Route path="/verify-email/:token" element={<VerifyEmail/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Route>
    )
)

// Render the app
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <NotificationProvider>
                <AuthProvider>
                    <LogInProvider>
                        <RouterProvider router={router}>
                            <App/>
                        </RouterProvider>
                    </LogInProvider>
                </AuthProvider>
            </NotificationProvider>
        </ErrorBoundary>
    </StrictMode>,
)
