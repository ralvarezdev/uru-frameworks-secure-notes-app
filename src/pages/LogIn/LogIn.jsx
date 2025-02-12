import './LogIn.css'
import ButtonPrimary from "../../components/Button/Primary/Primary.jsx";
import Input from "../../components/Input/Input.jsx";
import Auth from "../../layouts/Auth/Auth.jsx";
import Link from "../../components/Link/Link.jsx";
import Text from "../../components/Text/Text.jsx";
import Form from "../../components/Form/Form.jsx";
import PasswordInput from "../../components/Input/Password/Password.jsx";
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
    const {addErrorNotification, addInfoNotification} = useNotification();
    const actionData = useActionData()
    const [areErrorsActive, setErrorsActive] = useState(false);

    // Handle an ongoing login action
    const handleOngoingAction = useCallback(({username, password}) => {
        setLogIn({username, password});
        navigate('/login/2fa/totp');
    }, [navigate, setLogIn]);

    // Handle an error notification
    const handleErrorNotification = useCallback((error) => {
        addErrorNotification(error);
    }, [addErrorNotification]);

    // Handle an info notification
    const handleInfoNotification = useCallback((info) => {
        addInfoNotification(info);
    }, [addInfoNotification]);

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
            handleInfoNotification('Logged in successfully!');
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
            handleErrorNotification(actionData?.message);
            return
        }

        // Set the errors
        setErrorsActive(true);
    }, [actionData, navigate, handleOngoingAction, handleErrorNotification, handleInfoNotification, setErrorsActive]);

    return (
        <Auth title='Log In'>
            <Form className='form' method='post' action='/login'>
                <Input type="text" id="username" name="username"
                       label="Username" placeholder="e.g. user123" error={
                    actionData?.data?.username?.[0]} onChange={handleChange}
                       isErrorActive={areErrorsActive}
                       required/>
                <PasswordInput id="password" name="password" label="Password"
                               placeholder="e.g. pass123"
                               error={actionData?.data?.password?.[0]}
                               onChange={handleChange}
                               isErrorActive={areErrorsActive} required/>
                <ButtonPrimary
                    className='submit-button'>Continue</ButtonPrimary>
            </Form>
            <ul className='footer-container'>
                <li>
                    <Text>Don&#39;t you have an
                        account?</Text>
                    <Link to='/signup'>Sign Up</Link>
                </li>
                <li>
                    <Text>Forgot your password?</Text>
                    <Link to='/forgot-password'>Reset
                        Password</Link>
                </li>
            </ul>
        </Auth>
    )
}