import {sendRequest} from "../../utils/api.js";
import {useLocation, useNavigate} from "react-router-dom";
import Password from "../../components/Input/Password/Password.jsx";
import AuthLayout from "../../layouts/Auth/Auth.jsx";
import {useNotification} from "../../context/Notification.jsx";
import {useState} from "react";
import {useMutation} from "react-query";
import {LOG_IN} from "../../endpoints.js";

// Reset password request handler
async function ResetPasswordHandleRequest({
                                              token,
                                              password,
                                              passwordConfirmation
                                          }) {
    // Check if the passwords match
    if (password !== passwordConfirmation) return {
        status: 'fail',
        data: {
            new_password: ['The passwords do not match'],
        }
    }

    const [, response] = await sendRequest('POST', '/auth/password/reset', {
        token,
        new_password: password,
    });

    // Check if the password was reset successfully
    if (response?.status !== 'error')
        return {...response};

    throw new Error(response?.message)
}

// Reset Password page
export default function ResetPassword() {
    const location = useLocation();
    const token = location.pathname.split('/')[2];
    const navigate = useNavigate();
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setOnError] = useState(false);

    // Reset password mutation
    const mutation = useMutation(ResetPasswordHandleRequest, {
        onSuccess: (data) => {
            if (data?.status === 'success') {
                addInfoNotification('Password reset successfully!');
                navigate(LOG_IN);
            } else if (data?.data?.token?.[0])
                addErrorNotification(data?.data?.token?.[0]);
            else
                setOnError(true);
        },
        onError: (error) => addErrorNotification(error.message)
    });

    // Handle the form submission
    const handleSubmit = (formData) => {
        const password = formData.get("password");
        const passwordConfirmation = formData.get("password-confirmation");
        mutation.mutate({password, passwordConfirmation, token});
    };

    return (
        <AuthLayout titleText='Reset Password'
              footer={[{
                  to: LOG_IN,
                  text: 'Remembered your password?',
                  children: 'Log In'
              }]}
              isOnError={isOnError} setOnError={setOnError}
              onSubmit={handleSubmit}
              isSubmitting={mutation.isLoading}>
            <Password id="password" name="password" label="Password"
                      placeholder="Enter your password"
                      error={mutation.data?.data?.new_password?.[0]}
                      isOnError={isOnError} required/>
            <Password id="password-confirmation" name="password-confirmation"
                      label="Password Confirmation"
                      placeholder="Confirm your password"
                      error={mutation.data?.data?.new_password?.[0]}
                      isOnError={isOnError} required/>
        </AuthLayout>
    );
}
