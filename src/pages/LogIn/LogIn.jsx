import Input from "../../components/Input/Input.jsx";
import AuthLayout from "../../layouts/Auth/Auth.jsx";
import Password from "../../components/Input/Password/Password.jsx";
import {sendRequest} from "../../utils/api.js";
import {useCallback, useState} from "react";
import {useNotification} from "../../context/Notification.jsx";
import {useMutation} from "react-query";
import {
    DASHBOARD,
    FORGOT_PASSWORD,
    SIGN_UP,
    TWO_FACTOR_AUTHENTICATION_EMAIL_CODE
} from "../../endpoints.js";
import {
    set2FAMethods,
    setIsLoggingIn,
    setPassword,
    setUsername
} from "../../sessionStorage/sessionStorage.js";

// Log in request handler
export async function LogInHandleRequest({
                                             username,
                                             password,
                                             twoFactorAuthenticationCode,
                                             twoFactorAuthenticationMethod
                                         }) {
    const [, response] = await sendRequest('POST', '/auth/login', {
        username,
        password,
        "2fa_code": twoFactorAuthenticationCode,
        "2fa_method": twoFactorAuthenticationMethod
    });

    // Check if the credentials are invalid or the user needs 2FA
    if (response?.status === 'fail' && response?.data?.["2fa_methods"])
        return {
            status: 'fail',
            data: {
                username,
                password,
                twoFactorAuthenticationMethods: response?.data?.["2fa_methods"]
            }
        };

    if (response?.data?.["2fa_method"])
        throw new Error(response?.data?.["2fa_method"]?.[0]);

    if (response?.status === 'error')
        throw new Error(response?.message);

    return {...response};
}

// Log in page
export default function LogIn() {
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setIsOnError] = useState(false);

    // Log in mutation
    const mutation = useMutation(LogInHandleRequest, {
        onSuccess: (data) => {
            // Store the log in data in the session storage
            setUsername(data?.username);
            setPassword(data?.password)
            set2FAMethods(data?.twoFactorAuthenticationMethods);

            if (data?.status === 'fail' && data?.data?.twoFactorAuthenticationMethods)
                handle2FA();
            else if (data?.status !== 'success')
                setIsOnError(true);
            else {
                addInfoNotification('Logged in successfully!');
                window.location.href = DASHBOARD;
            }
        },
        onError: (error) => addErrorNotification(error.message)
    });

    // Handle the 2FA
    const handle2FA = useCallback(() => {
        setIsLoggingIn(true);
        window.location.href = TWO_FACTOR_AUTHENTICATION_EMAIL_CODE;
    }, []);

    // Handle the form submission
    const handleSubmit = (formData) => {
        const username = formData.get("username");
        const password = formData.get("password");
        mutation.mutate({username, password});
    };

    return (
        <AuthLayout titleText='Log In'
                    footer={[{
                        to: SIGN_UP,
                        text: 'Don\'t you have an account?',
                        children: 'Sign Up'
                    },
                        {
                            to: FORGOT_PASSWORD,
                            text: 'Forgot your password',
                            children: 'Reset'
                        }]}
                    isOnError={isOnError} setIsOnError={setIsOnError}
                    onSubmit={handleSubmit}
                    isSubmitting={mutation.isLoading}>
            <Input type="text" id="username" name="username"
                   label="Username" placeholder="Enter your username"
                   autoComplete="username"
                   error={mutation.data?.data?.username?.[0]}
                   isOnError={isOnError}
                   required/>
            <Password id="password" name="password" label="Password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      error={mutation.data?.data?.password?.[0]}
                      isOnError={isOnError} required/>
        </AuthLayout>
    );
}