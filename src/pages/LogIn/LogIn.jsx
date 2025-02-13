import './LogIn.css'
import Input from "../../components/Input/Input.jsx";
import Auth from "../../layouts/Auth/Auth.jsx";
import Password from "../../components/Input/Password/Password.jsx";
import {useActionData, useNavigate} from "react-router-dom";
import requestAPI from "../../utils/api.js";
import {useLogIn} from "../../context/LogIn.jsx";
import {useCallback, useEffect, useState} from "react";
import {useNotification} from "../../context/Notification.jsx";

// LogIn action function
export async function LogInAction({request}) {
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    const response = await requestAPI('POST', '/auth/login', {
        username,
        password
    });

    // Check if the response is successful
    if (response.status === 'success') return {status: response.status}
    else if (response.status === 'error') return {
        status: response.status,
        message: response.message
    }

    // Check if the credentials are invalid or the user needs 2FA
    if (response.data?.is_totp_recovery_code || response.data?.totp_code)
        return {status: 'ongoing', data: {username, password}}

    return {status: response.status, data: response.data}
}

// LogIn page
export default function LogIn() {
    const {navigate} = useNavigate()
    const {setLogIn} = useLogIn();
    const actionData = useActionData()
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [areErrorsActive, setErrorsActive] = useState(false);

    // Handle an ongoing login action
    const handleOngoingAction = useCallback(({username, password}) => {
        setLogIn({username, password});
        navigate('/login/2fa/totp');
    }, [navigate, setLogIn]);

    // Handle the form change
    const handleChange = useCallback(() => {
        setErrorsActive((prevAreErrorsActive) => {
            if (prevAreErrorsActive) return false;
            return prevAreErrorsActive;
        });
    }, [setErrorsActive]);

    // Check if the user needs to enter the 2FA code
    useEffect(() => {
        if (!actionData) return;

        // Check if the login has completed
        if (actionData?.status === 'success') {
            addInfoNotification('Logged in successfully!');
            navigate('/');
            return
        }

        // Check if the user needs to enter the 2FA code
        if (actionData?.status === 'ongoing') {
            handleOngoingAction(actionData?.data);
            return
        }

        // Check if there is an error message
        if (actionData?.message) {
            addErrorNotification(actionData?.message);
            return
        }

        // Set the errors
        setErrorsActive(true);
    }, [actionData, navigate, handleOngoingAction, addErrorNotification, addInfoNotification, setErrorsActive]);

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
                  }]}>
            <Input type="text" id="username" name="username"
                   label="Username" placeholder="e.g. user123"
                   autoComplete="username"
                   error={actionData?.data?.username?.[0]}
                   onChange={handleChange}
                   isErrorActive={areErrorsActive}
                   required/>
            <Password id="password" name="password" label="Password"
                      placeholder="e.g. pass123"
                      autoComplete="current-password"
                      error={actionData?.data?.password?.[0]}
                      onChange={handleChange}
                      isErrorActive={areErrorsActive} required/>
        </Auth>
    )
}