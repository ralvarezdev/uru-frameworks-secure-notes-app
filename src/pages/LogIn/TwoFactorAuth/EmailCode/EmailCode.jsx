import Input from "../../../../components/Input/Input.jsx";
import Auth from "../../../../layouts/Auth/Auth.jsx";
import {useNavigate} from "react-router-dom";
import {useLogIn} from "../../../../context/LogIn.jsx";
import {useState} from "react";
import {useNotification} from "../../../../context/Notification.jsx";
import {useMutation} from "react-query";
import {LogInHandleRequest} from '../../LogIn.jsx'
import {
    DASHBOARD,
    TWO_FACTOR_AUTHENTICATION_EMAIL_CODE,
    TWO_FACTOR_AUTHENTICATION_RECOVERY_CODE,
    TWO_FACTOR_AUTHENTICATOR_TOTP_CODE
} from "../../../../endpoints.js";

// 2FA Email code page
export default function EmailCode() {
    const navigate = useNavigate();
    const {logIn, setLogIn} = useLogIn();
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setOnError] = useState(false);

    // 2FA Email code mutation
    const mutation = useMutation(LogInHandleRequest, {
        onSuccess: (data) => {
            if (data?.status !== 'success')
                setOnError(true);
            else {
                setLogIn(null)
                addInfoNotification('Logged in successfully!');
                navigate(DASHBOARD);
            }
        },
        onError: (error) => addErrorNotification(error.message)
    });

    // Handle the form submission
    const handleSubmit = (formData) => {
        const emailCode = formData.get("email-code");
        mutation.mutate({
            username: logIn?.username,
            password: logIn?.password,
            twoFactorAuthenticationCode: emailCode,
            twoFactorAuthenticationCodeType: TWO_FACTOR_AUTHENTICATION_EMAIL_CODE
        });
    };

    return (
        <Auth titleText='Email Code'
              footer={[{
                  to: TWO_FACTOR_AUTHENTICATION_RECOVERY_CODE,
                  text: 'Don\'t you have access to your 2FA?',
                  children: 'Recovery Code'
              },
                      logIn?.twoFactorAuthenticationMethods?.includes(TWO_FACTOR_AUTHENTICATOR_TOTP_CODE)
                      ? {
                          to: TWO_FACTOR_AUTHENTICATOR_TOTP_CODE,
                          text: 'Do you have access to your TOTP?',
                          children: 'TOTP Code'
                      } : null,
              ]}
              isOnError={isOnError} setOnError={setOnError}
              onSubmit={handleSubmit}
              isSubmitting={mutation.isLoading}>
            <Input type="text" id="email-code" name="email-code"
                   label="Email code" placeholder="Enter your email code"
                   error={mutation.data?.data?.["2fa_code"]?.[0]}
                   isOnError={isOnError}
                   required/>
        </Auth>
    );
}