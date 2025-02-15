import Auth from "../../layouts/Auth/Auth.jsx";
import Form from "../../components/Form/Form.jsx";
import Input from "../../components/Input/Input.jsx";
import PrimaryButton from "../../components/Button/Primary/Primary.jsx";
import Paragraph from "../../components/Text/Paragraph/Paragraph.jsx";
import Link from "../../components/Link/Link.jsx";
import RequestAPI from "../../utils/api.js";
import {useActionData, useNavigate} from "react-router-dom";
import {useNotification} from "../../context/Notification.jsx";
import {useEffect, useState} from "react";

// Forgot password action
export async function ForgotPasswordAction({request}) {
    const formData = await request.formData();
    const email = formData.get("email");

    // Send the request to the API
   return requestAPI('POST', '/auth/password/forgot', {
       email,
   });
}

// Forgot password page
export default function ForgotPassword() {
    const navigate = useNavigate()
    const actionData = useActionData()
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setOnError] = useState(false);

    useEffect(() => {
        if (!actionData) return;

        // Check if the forgot password has completed successfully
        if (actionData?.status === 'success') {
            addInfoNotification('Check your email to reset your password!');
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
        <Auth action='/forgot-passsword' titleText='Forgot Password'
              footer={[{
                  to: '/signup',
                  text: 'Don\'t you have an account?',
                  children: 'Sign Up'
              },
                  {
                      to: '/login',
                      text: 'Remember your password?',
                      children: 'Log In'
                  }
              ]}
              isOnError={isOnError} setOnError={setOnError}>
            <Input type="email" id="email" name="email"
                   label="Email" placeholder="e.g. johnsmith@email.com"
                   error={actionData?.data?.email?.[0]}
                   isOnError={isOnError}
                   required/>
        </Auth>
    )
}