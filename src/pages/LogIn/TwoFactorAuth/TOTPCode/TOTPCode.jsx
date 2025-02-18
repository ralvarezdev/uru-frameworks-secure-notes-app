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
    TWO_FACTOR_AUTHENTICATION_RECOVERY_CODE
} from "../../../../endpoints.js";
import {TOTP_CODE_2FA_METHOD} from "../../../../constants.js";

// 2FA TOTP code page
export default function TOTPCode() {
    const navigate = useNavigate();
    const {logIn, setLogIn} = useLogIn();
    const {addErrorNotification, addInfoNotification} = useNotification();
    const [isOnError, setOnError] = useState(false);

    // 2FA TOTP code mutation
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
        const totpCode = formData.get("totp-code");
        mutation.mutate({
            username: logIn?.username,
            password: logIn?.password,
            twoFactorAuthenticationCode: totpCode,
            twoFactorAuthenticationCodeType: TOTP_CODE_2FA_METHOD
        });
    };

    return (
        <Auth titleText='TOTP'
              footer={[
                  {
                      to: TWO_FACTOR_AUTHENTICATION_RECOVERY_CODE,
                      text: 'Don\'t you have access to your 2FA?',
                      children: 'Recovery Code'
                  },
                  {
                      to: TWO_FACTOR_AUTHENTICATION_EMAIL_CODE,
                      text: 'Do you have access to your email?',
                      children: 'Email Code'
                  }]}
              isOnError={isOnError} setOnError={setOnError}
              onSubmit={handleSubmit}
              isSubmitting={mutation.isLoading}>
            <Input type="text" id="totp-code" name="totp-code"
                   label="TOTP code" placeholder="Enter your TOTP code"
                   error={mutation.data?.data?.["2fa_code"]?.[0]}
                   isOnError={isOnError}
                   required/>
        </Auth>
    );
}