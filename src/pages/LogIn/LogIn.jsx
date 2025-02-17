import Input from "../../components/Input/Input.jsx";
import Auth from "../../layouts/Auth/Auth.jsx";
import Password from "../../components/Input/Password/Password.jsx";
import {useNavigate} from "react-router-dom";
import {sendRequest} from "../../utils/api.js";
import {useLogIn} from "../../context/LogIn.jsx";
import {useCallback, useState} from "react";
import {useNotification} from "../../context/Notification.jsx";
import {useMutation} from "react-query";

// Log in request handler
async function LogInHandleRequest({username, password}) {
    const [, response] = await sendRequest('POST', '/auth/login', {
        username,
        password
    });

    // Check if the credentials are invalid or the user needs 2FA
    if (response?.status === 'fail' && (response?.data?.is_totp_recovery_code || response?.data?.totp_code))
        return {status: 'ongoing', data: {username, password}}

    if (response?.status !== 'error')
        return {...response};

    throw new Error(response?.message)
}

// Log in page
export default function LogIn() {
    const navigate = useNavigate();
    const {setLogIn} = useLogIn();
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setOnError] = useState(false);

    // Log in mutation
    const mutation = useMutation(LogInHandleRequest, {
        onSuccess: (data) => {
            if (data?.status === 'ongoing')
                handleOngoingAction(data?.data);
            else if (data?.status !== 'success')
                setOnError(true);
            else {
                addInfoNotification('Logged in successfully!');
                navigate('/dashboard');
            }
        },
        onError: (error) => addErrorNotification(error.message)
    });

    // Handle the ongoing action
    const handleOngoingAction = useCallback(({username, password}) => {
        setLogIn({username, password});
        navigate('/login/2fa/totp');
    }, [navigate, setLogIn]);

    // Handle the form submission
    const handleSubmit = (formData) => {
        const username = formData.get("username");
        const password = formData.get("password");
        mutation.mutate({username, password});
    };

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
              isOnError={isOnError} setOnError={setOnError}
              onSubmit={handleSubmit}
              isSubmitting={mutation.isLoading}>
            <Input type="text" id="username" name="username"
                   label="Username" placeholder="e.g. user123"
                   autoComplete="username"
                   error={mutation.data?.data?.username?.[0]}
                   isOnError={isOnError}
                   required/>
            <Password id="password" name="password" label="Password"
                      placeholder="e.g. SecuteNotesBestApp100$$"
                      autoComplete="current-password"
                      error={mutation.data?.data?.password?.[0]}
                      isOnError={isOnError} required/>
        </Auth>
    );
}