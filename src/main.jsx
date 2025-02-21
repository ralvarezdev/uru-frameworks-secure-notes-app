import './index.css'
import {lazy, StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import {loadVite} from "@ralvarezdev/js-mode";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {
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
import CombinedProvider from "./context/Combined.jsx";

// Import the pages
const App = lazy(() => import('./App.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard.jsx'))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail/VerifyEmail.jsx'))
const ResetPassword = lazy(() => import('./pages/ResetPassword/ResetPassword.jsx'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'))
const LogIn = lazy(() => import('./pages/LogIn/LogIn.jsx'))
const SignUp = lazy(() => import('./pages/SignUp/SignUp.jsx'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword/ForgotPassword.jsx'))
const TOTPCode = lazy(() => import('./pages/LogIn/TwoFactorAuth/TOTPCode/TOTPCode.jsx'))
const RecoveryCode = lazy(() => import('./pages/LogIn/TwoFactorAuth/RecoveryCode/RecoveryCode.jsx'))
const EmailCode = lazy(() => import('./pages/LogIn/TwoFactorAuth/EmailCode/EmailCode.jsx'))

// Load environment variables
loadVite()

// Create the browser router
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App/>}>
            <Route path={LOG_IN} element={<LogIn/>}/>
            <Route path={SIGN_UP} element={<SignUp/>}/>
            <Route path={TWO_FACTOR_AUTHENTICATOR_TOTP_CODE}
                   element={<TOTPCode/>}/>
            <Route path={TWO_FACTOR_AUTHENTICATION_RECOVERY_CODE}
                   element={<RecoveryCode/>}/>
            <Route path={TWO_FACTOR_AUTHENTICATION_EMAIL_CODE}
                   element={<EmailCode/>}/>
            <Route path={VERIFY_EMAIL} element={<VerifyEmail/>}/>
            <Route path={FORGOT_PASSWORD} element={<ForgotPassword/>}/>
            <Route path={RESET_PASSWORD} element={<ResetPassword/>}/>
            <Route path={DASHBOARD} element={<Dashboard/>}/>
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
            <Suspense fallback={
                <div className='app__loading-container'>
                    <div
                        className='app__loading-container__spinner'/>
                </div>
            }>
                <CombinedProvider>
                    <RouterProvider router={router}>
                        <App/>
                    </RouterProvider>
                </CombinedProvider>
            </Suspense>
        </QueryClientProvider>
    </StrictMode>
)
