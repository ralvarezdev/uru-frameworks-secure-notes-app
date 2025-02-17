import './SignUp.css'
import Input from "../../components/Input/Input.jsx";
import Auth from "../../layouts/Auth/Auth.jsx";
import Password from "../../components/Input/Password/Password.jsx";
import {useNavigate} from "react-router-dom";
import {sendRequest} from "../../utils/api.js";
import {useState} from "react";
import {useNotification} from "../../context/Notification.jsx";
import {useMutation} from "react-query";

// Sign up request handler
async function SignUpHandleRequest({
                                       firstName,
                                       lastName,
                                       password,
                                       passwordConfirmation,
                                       username,
                                       email
                                   }) {
    // Check if the passwords match
    if (password !== passwordConfirmation) return {
        status: 'fail',
        data: {
            password: ['The passwords do not match'],
            passwordConfirmation: ['The passwords do not match']
        }
    }

    // Send the request to the API
    const [, response] = await sendRequest('POST', '/auth/signup', {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password
    });

    // Check if the user was signed up successfully
    if (response?.status !== 'error')
        return {...response};

    throw new Error(response?.message)
}

// Sign up page
export default function SignUp() {
    const navigate = useNavigate()
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setOnError] = useState(false);

    // Sign up mutation
    const mutation = useMutation(SignUpHandleRequest, {
        onSuccess: (data) => {
            if (data?.status !== 'success')
                setOnError(true);
            else {
                addInfoNotification('Signed up successfully!');
                navigate('/login');
            }
        },
        onError: (error) => addErrorNotification(error.message)
    });

    // Handle the form submission
    const handleSubmit = (formData) => {
        const firstName = formData.get("first-name");
        const lastName = formData.get("last-name");
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        const passwordConfirmation = formData.get("password-confirmation");
        mutation.mutate({
            username,
            password,
            passwordConfirmation,
            firstName,
            lastName,
            email
        });
    };

    return (
        <Auth action='/signup' titleText='Sign Up'
              footer={[{
                  to: '/login',
                  text: 'Do you have an account?',
                  children: 'Log In'
              }]}
              isOnError={isOnError} setOnError={setOnError}
              onSubmit={handleSubmit}
              isSubmitting={mutation.isLoading}>
            <Input type="text" id="first-name" name="first-name"
                   label="First Name" placeholder="e.g. John"
                   error={mutation.data?.data?.first_name?.[0]}
                   isOnError={isOnError}
                   required/>
            <Input type="text" id="last-name" name="last-name"
                   label="Last Name" placeholder="e.g. Smith"
                   error={mutation.data?.data?.last_name?.[0]}
                   isOnError={isOnError}
                   required/>
            <Input type="text" id="username" name="username"
                   label="Username" placeholder="e.g. user123"
                   error={mutation.data?.data?.username?.[0]}
                   isOnError={isOnError}
                   required/>
            <Input type="email" id="email" name="email"
                   label="Email" placeholder="e.g. johnsmith@email.com"
                   error={mutation.data?.data?.email?.[0]}
                   isOnError={isOnError}
                   required/>
            <Password id="password" name="password" label="Password"
                      placeholder="e.g. SecureNotesBestApp100$$"
                      error={mutation.data?.data?.password?.[0]}
                      isOnError={isOnError} required/>
            <Password id="password-confirmation" name="password-confirmation"
                      label="Password Confirmation"
                      placeholder="e.g. SecureNotesBestApp100$$"
                      error={mutation.data?.data?.password?.[0]}
                      isOnError={isOnError} required/>
        </Auth>
    )
}