import './LogIn.css'
import PrimaryButton from "../../components/Button/Primary/Primary.jsx";
import Input from "../../components/Input/Input.jsx";
import Auth from "../../layouts/Auth/Auth.jsx";
import Link from "../../components/Link/Link.jsx";
import Text from "../../components/Text/Text.jsx";
import Form from "../../components/Form/Form.jsx";
import PasswordInput from "../../components/Input/Password/Password.jsx";
import {redirect, useActionData, useNavigate} from "react-router-dom";
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
    if (response.status === 'success') return redirect('/dashboard');
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
    const {addErrorNotification} = useNotification();
    const actionData = useActionData()
    const [areErrorsActive, setErrorsActive] = useState(false);

    // Handle an ongoing login action
    const handleOngoingAction = useCallback(({username, password}) => {
        // Set the username and password in the context
        setLogIn({username, password});

        // Redirect to the TOTP page
        navigate('/login/2fa/totp');
    }, [navigate, setLogIn]);

    // Handle an error
    const handleErrors = useCallback((error) => {
        // Create an error notification
        addErrorNotification(error);
    }, [addErrorNotification]);

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

        if (actionData?.status === 'ongoing') {
            handleOngoingAction(actionData?.data);
            return
        }

        // Check if there is an error message
        if (actionData?.message) {
            handleErrors(actionData?.message);
            return
        }

        // Set the errors
        setErrorsActive(true);
    }, [actionData, handleOngoingAction, handleErrors, setErrorsActive]);

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
                <PrimaryButton
                    className='submit-button'>Continue</PrimaryButton>
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

/*
    React.useEffect(() => {
        if (fetcher.state === "idle") {
            if (fetcher.data) {
                setSuccessMessage("Form submitted successfully!");
                setSubmissionError(null);
            } else if (fetcher.error) {
                setSubmissionError("An error occurred. Please try again.");
                setSuccessMessage(null);
            }
        }
    }, [fetcher]);

    return (
        <div>
            <h1>Submit to External API</h1>
            <fetcher.Form method="post" onSubmit={handleSubmit}>
                <input type="text" name="example" placeholder="Example input" />
                <button type="submit" disabled={fetcher.state !== "idle"}>
                    {fetcher.state === "submitting" ? "Submitting..." : "Submit"}
                </button>
            </fetcher.Form>
            {successMessage && <div className="success">{successMessage}</div>}
            {submissionError && <div className="error">{submissionError}</div>}
        </div>
    );
}
*/