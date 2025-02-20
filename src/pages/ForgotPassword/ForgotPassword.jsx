import AuthLayout from "../../layouts/Auth/Auth.jsx";
import Input from "../../components/Input/Input.jsx";
import {useNotification} from "../../context/Notification.jsx";
import {useState} from "react";
import {sendRequest} from "../../utils/api.js";
import {useMutation} from "react-query";
import {LOG_IN, SIGN_UP} from "../../endpoints.js";

// Forgot password request handler
export async function ForgotPasswordHandleRequest({email}) {
    // Send the request to the API
    const [, response] = await sendRequest('POST', '/auth/password/forgot', {
        email,
    });

    // Check if the forgot password was successful
    if (response?.status !== 'error')
        return {...response};

    throw new Error(response?.message)
}

// Forgot password page
export default function ForgotPassword() {
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setOnError] = useState(false);

    // Forgot password mutation
    const mutation = useMutation(ForgotPasswordHandleRequest, {
        onSuccess: (data) => {
            if (data?.status !== 'success')
                setOnError(true);
            else {
                addInfoNotification('Check your email to reset your password!');
                window.location.href=LOG_IN;
            }
        },
        onError: (error) => addErrorNotification(error.message)
    });

    // Handle the form submission
    const handleSubmit = (formData) => {
        const email = formData.get("email");
        mutation.mutate({email});
    };

    return (
        <AuthLayout titleText='Forgot Password'
              footer={[{
                  to: SIGN_UP,
                  text: 'Don\'t you have an account?',
                  children: 'Sign Up'
              },
                  {
                      to: LOG_IN,
                      text: 'Remember your password?',
                      children: 'Log In'
                  }
              ]}
              isOnError={isOnError} setOnError={setOnError}
              onSubmit={handleSubmit}
              isSubmitting={mutation.isLoading}>
            <Input type="email" id="email" name="email"
                   label="Email" placeholder="Enter your email"
                   error={mutation.data?.data?.email?.[0]}
                   isOnError={isOnError}
                   required/>
        </AuthLayout>
    )
}