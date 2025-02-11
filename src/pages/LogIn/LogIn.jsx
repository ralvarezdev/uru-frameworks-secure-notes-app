import './LogIn.css'
import PrimaryButton from "../../components/Button/Primary/Primary.jsx";
import Input from "../../components/Input/Input.jsx";
import Auth from "../../layouts/Auth/Auth.jsx";
import Link from "../../components/Link/Link.jsx";
import Text from "../../components/Text/Text.jsx";
import Form from "../../components/Form/Form.jsx";
import PasswordInput from "../../components/Input/Password/Password.jsx";
import {redirect, useActionData} from "react-router-dom";
import requestAPI from "../../utils/api.js";
import {useLogIn} from "../../context/LogIn.jsx";
import {useEffect, useState} from "react";

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
    if (response.status === 'success') redirect('/dashboard');
    else if (response.status === 'error') return {message:response.message}

    // Check if the credentials are invalid or the user needs 2FA
    if (response.data?.is_totp_recovery_code || response.data?.totp_code)
        return {username, password}

    return response.data
}

// LogIn page
export default function LogIn() {
    const {setLogIn}=useLogIn();
    const data = useActionData()
    const [errors, setErrors] = useState(data);

    // Check if the user needs to enter the 2FA code
    useEffect(() => {
        // Check if the user needs to enter the TOTP code
        if (data?.username && data?.password){
            // Set the username and password in the context
            setLogIn(data);

            // Redirect to the TOTP page
            return redirect('/login/2fa/totp');
        }

        /*
        // Check if there is an error message
        if (data?.message)
            // Create an error notification
            return
         */

        // Set the errors
        setErrors({...data});
    }, [data, setLogIn, setErrors]);

    // Handle change
    const handleChange = () => {
        if (errors)
            setErrors(null);
    }

    return (
        <Auth title='Log In'>
            <Form className='form' method='post' action='/login'>
                <Input type="text" id="username" name="username"
                       label="Username" placeholder="e.g. user123" error={errors?.username&&"username not found"} onChange={handleChange}
                       required/>
                <PasswordInput id="password" name="password" label="Password"
                               placeholder="e.g. pass123" error={errors?.password&& "invalid password"} onChange={handleChange} required/>
                <PrimaryButton
                    className='submit-button'>Continue</PrimaryButton>
            </Form>
            <ul className='footer-container'>
                <li>
                    <Text className='text'>Don&#39;t you have an
                        account?</Text>
                    <Link className='text' to='/signup'>Sign Up</Link>
                </li>
                <li>
                    <Text className='text'>Forgot your password?</Text>
                    <Link className='text' to='/forgot-password'>Reset
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