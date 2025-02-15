import './LogIn.css'
import Input from "../../components/Input/Input.jsx";
import Auth from "../../layouts/Auth/Auth.jsx";
import Password from "../../components/Input/Password/Password.jsx";
import {useActionData, useNavigate} from "react-router-dom";
import requestAPI from "../../utils/api.js";
import {useLogIn} from "../../context/LogIn.jsx";
import {useCallback, useEffect, useState} from "react";
import {useNotification} from "../../context/Notification.jsx";

// Log in action
export async function LogInAction({request}) {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");

    // Send the request to the API
    const response = await requestAPI('POST', '/auth/login', {
        username,
        password
    });

    // Check if the credentials are invalid or the user needs 2FA
    if (response?.status==='fail' &&(response?.data?.is_totp_recovery_code || response?.data?.totp_code))
        return {status: 'ongoing', data: {username, password}}

    return response
}

// Log in page
export default function LogIn() {
    const navigate = useNavigate()
    const {setLogIn} = useLogIn();
    const actionData = useActionData()
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setOnError] = useState(false);

    // Handle an ongoing login action
    const handleOngoingAction = useCallback(({username, password}) => {
        setLogIn({username, password});
        navigate('/login/2fa/totp');
    }, [navigate, setLogIn]);

    // Check if the user needs to enter the 2FA code
    useEffect(() => {
        if (!actionData) return;

        // Check if the login has completed successfully
        if (actionData?.status === 'success') {
            addInfoNotification('Logged in successfully!');
            navigate('/dashboard');
            return
        }

        // Check if the user needs to enter the 2FA code
        if (actionData?.status === 'ongoing') {
            handleOngoingAction(actionData?.data);
            return
        }

        // Check if there was an error
        if (actionData?.status==='error') {
            addErrorNotification(actionData?.message);
            return
        }

        // Set the error state (failed validation)
        setOnError(true);
    }, [actionData, navigate, handleOngoingAction, addErrorNotification, addInfoNotification, setOnError]);

    return (
        <Auth action='/login' titleText='Log In'
              footer={[{
                  to: '/signup',
                  text: 'Don\'t you have an account?',
                  children: 'Sign Up'
              },
                  {
                      to: '/forgot-password',
                      text: 'Forgot your password',
                      children: 'Reset'
                  }]}
            isOnError={isOnError} setOnError={setOnError}>
            <Input type="text" id="username" name="username"
                   label="Username" placeholder="e.g. user123"
                   autoComplete="username"
                   error={actionData?.data?.username?.[0]}
                   isOnError={isOnError}
                   required/>
            <Password id="password" name="password" label="Password"
                      placeholder="e.g. pass123"
                      autoComplete="current-password"
                      error={actionData?.data?.password?.[0]}
                      isOnError={isOnError} required/>
        </Auth>
    )
}