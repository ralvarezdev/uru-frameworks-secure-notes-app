import {lazy, StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.jsx";
import AuthProvider from "./context/Auth.jsx";
import {loadVite} from "@ralvarezdev/js-mode";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import LogInProvider from "./context/LogIn.jsx";
import NotificationProvider from "./context/Notification.jsx";
import {QueryClient, QueryClientProvider} from "react-query";

// Import the pages
const App = lazy(() => import('./App.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.jsx'))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail/VerifyEmail.jsx'))
const ResetPassword = lazy(() => import('./pages/ResetPassword/ResetPassword.jsx'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'))
const LogIn = lazy(() => import('./pages/LogIn/LogIn.jsx'))
const SignUp = lazy(() => import('./pages/SignUp/SignUp.jsx'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/ForgotPassword.jsx'))
const TOTP = lazy(() => import('./pages/LogIn/TwoFactorAuth/TOTP/TOTP.jsx'))
const RecoveryCode = lazy(() => import('./pages/LogIn/TwoFactorAuth/RecoveryCode/RecoveryCode.jsx'))

// Load environment variables
loadVite()

// Create the browser router
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route path="/login" element={<LogIn/>}/>
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

// Create the query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchOnMount: false,
        },
    },
});

// Render the app
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
                <NotificationProvider>
                    <AuthProvider>
                        <LogInProvider>
                            <Suspense fallback={
                                <div className='app__loading-container'>
                                    <div
                                        className='app__loading-container__spinner'/>
                                </div>
                            }>
                                <RouterProvider router={router}>
                                    <App/>
                                </RouterProvider>
                            </Suspense>
                        </LogInProvider>
                    </AuthProvider>
                </NotificationProvider>
            </ErrorBoundary>
        </QueryClientProvider>
    </StrictMode>
)
