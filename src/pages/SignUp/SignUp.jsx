import './SignUp.css'
import Input from "../../components/Input/Input.jsx";
import Auth from "../../layouts/Auth/Auth.jsx";
import Password from "../../components/Input/Password/Password.jsx";
import {useActionData, useNavigate} from "react-router-dom";
import requestAPI from "../../utils/api.js";
import {useEffect, useState} from "react";
import {useNotification} from "../../context/Notification.jsx";

// Sign up action
export async function SignUpAction({request}) {
    const formData = await request.formData();
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirmation = formData.get("password-confirmation");

    // Check if the passwords match
    if (password !== passwordConfirmation) return {
        status: 'fail',
        data: {
            password: ['The passwords do not match'],
            passwordConfirmation: ['The passwords do not match']
        }
    }

    // Send the request to the API
   return requestAPI('POST', '/auth/signup', {
       first_name: firstName,
       last_name: lastName,
       username,
       email,
       password
   });
}

// Sign up page
export default function SignUp() {
    const navigate = useNavigate()
    const actionData = useActionData()
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setOnError] = useState(false);

    useEffect(() => {
        if (!actionData) return;

        // Check if the signup has completed successfully
        if (actionData?.status === 'success') {
            addInfoNotification('Signed up successfully!');
            navigate('/login');
            return
        }

        // Check if there was an error
        if (actionData?.status === 'error') {
            addErrorNotification(actionData?.message);
            return
        }

        // Set the error state (failed validation)
        setOnError(true);
    }, [actionData, navigate, addErrorNotification, addInfoNotification, setOnError]);

    return (
        <Auth action='/signup' titleText='Sign Up'
              footer={[{
                  to: '/login',
                  text: 'Do you have an account?',
                  children: 'Log In'
              }]}
            isOnError={isOnError} setOnError={setOnError}>
            <Input type="text" id="first-name" name="first-name"
                     label="First Name" placeholder="e.g. John"
                     error={actionData?.data?.first_name?.[0]}
                     isOnError={isOnError}
                     required/>
            <Input type="text" id="last-name" name="last-name"
                   label="Last Name" placeholder="e.g. Smith"
                   error={actionData?.data?.last_name?.[0]}
                   isOnError={isOnError}
                   required/>
            <Input type="text" id="username" name="username"
                   label="Username" placeholder="e.g. user123"
                   error={actionData?.data?.username?.[0]}
                   isOnError={isOnError}
                   required/>
            <Input type="email" id="email" name="email"
                   label="Email" placeholder="e.g. johnsmith@email.com"
                   error={actionData?.data?.email?.[0]}
                   isOnError={isOnError}
                   required/>
            <Password id="password" name="password" label="Password"
                      placeholder="e.g. pass123"
                      error={actionData?.data?.password?.[0]}
                      isOnError={isOnError} required/>
            <Password id="password-confirmation" name="password-confirmation" label="Password Confirmation"
                      placeholder="e.g. pass123"
                      error={actionData?.data?.password?.[0]}
                      isOnError={isOnError} required/>
        </Auth>
    )
}